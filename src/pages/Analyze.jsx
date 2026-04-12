import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { extractTextFromPDF, analyzeResume, JOB_ROLES } from '../utils/resumeAnalyzer'

const ALL_ROLES = Object.keys(JOB_ROLES)

const ROLE_ICONS = {
  'Frontend Developer': '⚛️', 'Backend Developer': '🔧', 'Full Stack Developer': '🔄',
  'Data Scientist': '🤖', 'Data Analyst': '📊', 'DevOps Engineer': '☁️',
  'UI/UX Designer': '🎨', 'Machine Learning Engineer': '🧠',
  'Cybersecurity Analyst': '🔒', 'Product Manager': '📋',
  'Cloud Engineer': '🌩️', 'Mobile Developer': '📱', 'QA Engineer': '🧪',
  'Blockchain Developer': '⛓️', 'Site Reliability Engineer': '⚙️',
  'Database Administrator': '🗄️', 'Business Analyst': '📈',
  'Technical Writer': '✍️', 'Solutions Architect': '🏛️', 'AI Engineer': '🤖',
}

// Aliases map common variations to the 20 supported roles
const ROLE_ALIASES = {
  'software engineer': 'Full Stack Developer',
  'software developer': 'Full Stack Developer',
  'web developer': 'Full Stack Developer',
  'frontend engineer': 'Frontend Developer',
  'front end developer': 'Frontend Developer',
  'react developer': 'Frontend Developer',
  'backend engineer': 'Backend Developer',
  'back end developer': 'Backend Developer',
  'node developer': 'Backend Developer',
  'data engineer': 'Data Scientist',
  'ml engineer': 'Machine Learning Engineer',
  'cloud architect': 'Solutions Architect',
  'security engineer': 'Cybersecurity Analyst',
  'security analyst': 'Cybersecurity Analyst',
  'infosec analyst': 'Cybersecurity Analyst',
  'ios developer': 'Mobile Developer',
  'android developer': 'Mobile Developer',
  'react native developer': 'Mobile Developer',
  'flutter developer': 'Mobile Developer',
  'test engineer': 'QA Engineer',
  'automation engineer': 'QA Engineer',
  'qa analyst': 'QA Engineer',
  'dba': 'Database Administrator',
  'db admin': 'Database Administrator',
  'sre': 'Site Reliability Engineer',
  'reliability engineer': 'Site Reliability Engineer',
  'ba': 'Business Analyst',
  'scrum master': 'Product Manager',
  'agile coach': 'Product Manager',
  'ux designer': 'UI/UX Designer',
  'ui designer': 'UI/UX Designer',
  'product designer': 'UI/UX Designer',
  'web3 developer': 'Blockchain Developer',
  'smart contract developer': 'Blockchain Developer',
  'solidity developer': 'Blockchain Developer',
  'tech writer': 'Technical Writer',
  'enterprise architect': 'Solutions Architect',
  'devops': 'DevOps Engineer',
  'platform engineer': 'DevOps Engineer',
}

function validateJobRole(input) {
  const trimmed = input.trim()
  if (!trimmed) return { valid: false, message: 'Please enter a job role' }
  if (trimmed.length < 2) return { valid: false, message: 'Job role is too short' }
  if (trimmed.length > 60) return { valid: false, message: 'Job role is too long' }

  // Exact match
  const exact = ALL_ROLES.find(r => r.toLowerCase() === trimmed.toLowerCase())
  if (exact) return { valid: true, matched: exact, message: '' }

  // Alias exact match
  const alias = ROLE_ALIASES[trimmed.toLowerCase()]
  if (alias) return { valid: true, matched: alias, message: '', aliasOf: alias }

  // Partial match — input is contained in a known role or vice versa
  const partial = ALL_ROLES.find(r =>
    r.toLowerCase().includes(trimmed.toLowerCase()) ||
    trimmed.toLowerCase().includes(r.toLowerCase())
  )
  if (partial) return { valid: true, matched: partial, message: '', suggestion: partial }

  // Alias partial match
  const aliasEntry = Object.entries(ROLE_ALIASES).find(([a]) =>
    a.includes(trimmed.toLowerCase()) || trimmed.toLowerCase().includes(a.split(' ')[0])
  )
  if (aliasEntry) return { valid: true, matched: aliasEntry[1], message: '', suggestion: aliasEntry[1] }

  // Decline — not recognized
  return {
    valid: false,
    declined: true,
    message: `"${trimmed}" is not a supported job role. Please select from the 20 supported roles below.`,
  }
}

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [jobRole, setJobRole] = useState('')
  const [roleInput, setRoleInput] = useState('')
  const [roleSuggestions, setRoleSuggestions] = useState([])
  const [roleValidation, setRoleValidation] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [step, setStep] = useState(1)
  const fileRef = useRef()
  const { setAnalysisResult } = useApp()
  const navigate = useNavigate()

  const handleRoleInput = (val) => {
    setRoleInput(val)
    setRoleValidation(null)
    setJobRole('')
    setError('')
    if (val.length > 0) {
      const directMatches = ALL_ROLES.filter(r => r.toLowerCase().includes(val.toLowerCase()))
      const aliasMatches = Object.entries(ROLE_ALIASES)
        .filter(([a]) => a.includes(val.toLowerCase()))
        .map(([, role]) => role)
      const combined = [...new Set([...directMatches, ...aliasMatches])].slice(0, 8)
      setRoleSuggestions(combined)
      setShowSuggestions(true)
    } else {
      setRoleSuggestions(ALL_ROLES.slice(0, 8))
      setShowSuggestions(true)
    }
  }

  const selectRole = (role) => {
    setRoleInput(role)
    setJobRole(role)
    setRoleSuggestions([])
    setShowSuggestions(false)
    setRoleValidation({ valid: true, matched: role, message: '' })
    setStep(s => Math.max(s, 3))
  }

  const handleRoleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      if (!roleInput.trim()) return
      const result = validateJobRole(roleInput)
      setRoleValidation(result)
      if (result.valid) {
        setJobRole(result.matched)
        if (result.suggestion && result.suggestion !== roleInput) setRoleInput(result.suggestion)
        setStep(s => Math.max(s, 3))
      }
    }, 150)
  }

  const handleFile = (f) => {
    if (f && (f.type === 'application/pdf' || f.name.endsWith('.pdf'))) {
      setFile(f); setError(''); setStep(s => Math.max(s, 2))
    } else {
      setError('Please upload a PDF file')
    }
  }

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }

  const handleAnalyze = async () => {
    if (!file) { setError('Please upload your resume'); return }
    const validation = validateJobRole(roleInput)
    if (!validation.valid) { setError(validation.message); return }
    const resolvedRole = validation.matched
    setLoading(true); setError('')
    try {
      const text = await extractTextFromPDF(file)
      const analysisText = text.length > 50 ? text : `resume ${file.name} ${resolvedRole}`
      const result = analyzeResume(analysisText, resolvedRole)
      setAnalysisResult(result)
      navigate('/dashboard')
    } catch {
      setError('Failed to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canAnalyze = file && roleInput.trim().length >= 2 && !loading

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Resume Analyzer</h1>
          <p className="text-slate-500">Upload your resume and get an instant ATS-style score with personalized guidance</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[{ n: 1, label: 'Upload Resume' }, { n: 2, label: 'Enter Role' }, { n: 3, label: 'Get Score' }].map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s.n ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-slate-200 text-slate-500'}`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? 'text-primary-600' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 transition-all duration-300 ${step > s.n ? 'bg-primary-400' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 — Upload */}
        <div className="card mb-6">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
            Upload Your Resume
          </h2>
          <div
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${dragOver ? 'border-primary-400 bg-primary-50' : file ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/50'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            {file ? (
              <div className="animate-fade-in">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-bold text-green-700 text-lg">{file.name}</p>
                <p className="text-green-600 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB — Ready to analyze</p>
                <button className="mt-3 text-sm text-slate-500 hover:text-red-500 transition-colors"
                  onClick={e => { e.stopPropagation(); setFile(null); setStep(1) }}>Remove file</button>
              </div>
            ) : (
              <div>
                <div className="text-5xl mb-3">📄</div>
                <p className="font-semibold text-slate-700 text-lg">Drop your resume here</p>
                <p className="text-slate-400 text-sm mt-1">or click to browse — PDF format only</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">Browse Files</div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2 — Job Role */}
        <div className="card mb-6">
          <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
            <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
            Enter Your Target Job Role
          </h2>
          <p className="text-slate-400 text-xs mb-4 ml-9">Type a job title — only our 20 supported roles are accepted</p>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg z-10">🔍</span>
            <input
              type="text"
              value={roleInput}
              onChange={e => handleRoleInput(e.target.value)}
              onFocus={() => {
                const matches = roleInput
                  ? ALL_ROLES.filter(r => r.toLowerCase().includes(roleInput.toLowerCase()))
                  : ALL_ROLES.slice(0, 8)
                setRoleSuggestions(matches.slice(0, 8))
                setShowSuggestions(true)
              }}
              onBlur={handleRoleBlur}
              onKeyDown={e => {
                if (e.key === 'Enter' && roleSuggestions.length > 0) selectRole(roleSuggestions[0])
                if (e.key === 'Escape') setShowSuggestions(false)
              }}
              placeholder="e.g. Frontend Developer, AI Engineer, QA Engineer..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 bg-white text-slate-800 placeholder-slate-400"
              autoComplete="off"
            />
            {roleInput && (
              <button onClick={() => { setRoleInput(''); setJobRole(''); setRoleValidation(null); setShowSuggestions(false) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl">×</button>
            )}

            {/* Dropdown */}
            {showSuggestions && roleSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden max-h-64 overflow-y-auto">
                {roleSuggestions.map(r => (
                  <button key={r} onMouseDown={() => selectRole(r)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors border-b border-slate-50 last:border-0 flex items-center gap-2">
                    <span>{ROLE_ICONS[r] || '💼'}</span>
                    <span className="font-medium">{r}</span>
                    <span className="ml-auto text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Supported</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validation feedback */}
          {roleValidation && (
            <div className={`mt-2 flex items-start gap-2 text-sm animate-fade-in ${roleValidation.valid ? 'text-green-600' : 'text-red-500'}`}>
              <span className="flex-shrink-0 mt-0.5">{roleValidation.valid ? '✅' : '🚫'}</span>
              <span className="font-medium">
                {roleValidation.valid
                  ? `Role confirmed: "${roleValidation.matched}"${roleValidation.aliasOf ? ` (matched as ${roleValidation.aliasOf})` : ''}`
                  : roleValidation.message}
              </span>
            </div>
          )}

          {/* All 20 role chips */}
          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-2">All 20 supported roles:</p>
            <div className="flex flex-wrap gap-2">
              {ALL_ROLES.map(role => (
                <button key={role} onMouseDown={() => selectRole(role)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    jobRole === role
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
                  }`}>
                  <span>{ROLE_ICONS[role] || '💼'}</span>
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm animate-fade-in">
            🚫 {error}
          </div>
        )}

        {/* Analyze Button */}
        <button onClick={handleAnalyze} disabled={!canAnalyze}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${!canAnalyze ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-purple-700 active:scale-95'}`}>
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing your resume...
            </span>
          ) : '🎯 Analyze & Get My Score'}
        </button>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🔒', title: 'Private & Secure', desc: 'Your resume is analyzed locally' },
            { icon: '⚡', title: 'Instant Results', desc: 'Get your score in seconds' },
            { icon: '🎯', title: '20 Job Roles', desc: 'Precise analysis per role' },
          ].map(info => (
            <div key={info.title} className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl mb-2">{info.icon}</div>
              <p className="font-semibold text-slate-700 text-sm">{info.title}</p>
              <p className="text-slate-400 text-xs mt-1">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
