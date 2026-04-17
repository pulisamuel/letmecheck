/**
 * analysisApi.js
 * ─────────────────────────────────────────────────────────────────────────────
 * API service layer for resume analysis.
 *
 * Architecture:
 *  - Primary:  Supabase Edge Function  POST /functions/v1/analyze-resume
 *  - Fallback: Client-side analysis    (runs in browser if API unavailable)
 *
 * The Edge Function receives { resumeText, jobRole } and returns the same
 * analysis result shape as the client-side analyzeResume() function.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { supabase } from '../supabase'
import { analyzeResume } from './resumeAnalyzer'

const EDGE_FUNCTION_NAME = 'analyze-resume'
const API_TIMEOUT_MS = 15_000

// ── Call Supabase Edge Function ───────────────────────────────────────────────
async function callEdgeFunction(resumeText, jobRole) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

  try {
    const { data, error } = await supabase.functions.invoke(EDGE_FUNCTION_NAME, {
      body: { resumeText, jobRole },
      signal: controller.signal,
    })

    if (error) throw new Error(error.message)
    if (!data || typeof data.score !== 'number') throw new Error('Invalid response from analysis API')

    return { success: true, result: data }
  } catch (err) {
    if (err.name === 'AbortError') {
      return { success: false, error: 'Analysis API timed out' }
    }
    return { success: false, error: err.message }
  } finally {
    clearTimeout(timeout)
  }
}

// ── Main analysis function — API first, fallback to client-side ───────────────
export async function analyzeResumeViaAPI(resumeText, jobRole) {
  // Try Edge Function first
  const apiResult = await callEdgeFunction(resumeText, jobRole)

  if (apiResult.success) {
    console.info('[analysisApi] Used Edge Function for analysis')
    return { result: apiResult.result, source: 'api' }
  }

  // Fallback to client-side analysis
  console.warn('[analysisApi] Edge Function unavailable, using client-side analysis:', apiResult.error)
  const result = analyzeResume(resumeText, jobRole)

  if (!result) {
    throw new Error(`Job role "${jobRole}" is not supported. Please select from the 20 supported roles.`)
  }

  return { result, source: 'client' }
}

// ── Save analysis result to Supabase users table ──────────────────────────────
export async function saveAnalysisResult(userId, result, history = []) {
  if (!userId) return

  const record = { ...result, analyzedAt: new Date().toISOString() }
  const newHistory = [record, ...history].slice(0, 10) // keep last 10

  const { error } = await supabase
    .from('users')
    .update({
      analysis_result: result,
      analysis_history: newHistory,
    })
    .eq('id', userId)

  if (error) {
    console.error('[analysisApi] Failed to save analysis result:', error.message)
  }

  return newHistory
}
