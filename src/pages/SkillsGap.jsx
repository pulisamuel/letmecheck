import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { JOB_ROLES } from '../utils/resumeAnalyzer'
import { Target, CheckCircle, XCircle, BookOpen, ArrowLeft } from 'lucide-react'

function SkillBar({ skill, found, index }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01] animate-fade-in
      ${found ? 'bg-green-500/8 border-green-500/15' : 'bg-red-500/8 border-red-500/15'}`}
      style={{ animationDelay:`${index*40}ms` }}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
        ${found ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {found ? '✓' : '✗'}
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-sm ${found ? 'text-green-300' : 'text-red-300'}`}>{skill}</p>
        <p className={`text-xs ${found ? 'text-green-500/70' : 'text-red-500/70'}`}>
          {found ? 'Found in your resume' : 'Not found — needs improvement'}
        </p>
      </div>
      {!found && (
        <Link to="/courses" className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-600/30 transition-colors flex-shrink-0">
          Learn →
        </Link>
      )}
    </div>
  )
}

export default function SkillsGap() {
  const { analysisResult } = useApp()
  const [activeTab, setActiveTab] = useState('required')

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in space-y-5">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl mx-auto">🎯</div>
          <h2 className="text-2xl font-extrabold text-white">No Analysis Yet</h2>
          <p className="text-slate-400">Analyze your resume first to see your skills gap</p>
          <Link to="/analyze" className="btn-primary">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, score } = analysisResult
  const roleData = JOB_ROLES[jobRole]

  if (!roleData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in space-y-4">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-xl font-extrabold text-white">Role Not Supported</h2>
          <p className="text-slate-400">"{jobRole}" doesn't have a detailed skills map. Re-analyze with one of the 20 supported roles.</p>
          <Link to="/analyze" className="btn-primary">Re-analyze →</Link>
        </div>
      </div>
    )
  }

  const allRequired   = [...foundRequired.map(s=>({skill:s,found:true})), ...missingRequired.map(s=>({skill:s,found:false}))]
  const allNiceToHave = [...foundNiceToHave.map(s=>({skill:s,found:true})), ...missingNiceToHave.map(s=>({skill:s,found:false}))]
  const requiredPct   = Math.round((foundRequired.length / roleData.requiredSkills.length) * 100)
  const bonusPct      = Math.round((foundNiceToHave.length / roleData.niceToHave.length) * 100)

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="page-header">
          <div className="section-label"><Target className="w-3.5 h-3.5 text-purple-400" /> Skill Analysis</div>
          <h1 className="page-title">Skills Gap Analysis</h1>
          <p className="page-subtitle">Detailed breakdown for <span className="text-blue-400 font-semibold">{jobRole}</span></p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/20">
            <p className="text-blue-300/70 text-xs font-medium">Overall Score</p>
            <p className="text-4xl font-extrabold text-white mt-1">{score}%</p>
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" style={{ width:`${score}%` }} />
            </div>
          </div>
          <div className="card">
            <p className="text-slate-500 text-xs font-medium">Required Skills</p>
            <p className="text-4xl font-extrabold text-white mt-1">{requiredPct}%</p>
            <p className="text-xs text-slate-500 mt-1">{foundRequired.length} of {roleData.requiredSkills.length} found</p>
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width:`${requiredPct}%` }} />
            </div>
          </div>
          <div className="card">
            <p className="text-slate-500 text-xs font-medium">Bonus Skills</p>
            <p className="text-4xl font-extrabold text-white mt-1">{bonusPct}%</p>
            <p className="text-xs text-slate-500 mt-1">{foundNiceToHave.length} of {roleData.niceToHave.length} found</p>
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width:`${bonusPct}%` }} />
            </div>
          </div>
        </div>

        {/* Coverage Map */}
        <div className="card mb-6">
          <h3 className="font-bold text-white mb-5 text-sm">Skills Coverage Map</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-3">Required ({foundRequired.length}/{roleData.requiredSkills.length})</p>
              <div className="space-y-1.5">
                {roleData.requiredSkills.map(skill => {
                  const found = foundRequired.includes(skill)
                  return (
                    <div key={skill} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${found ? 'bg-green-400' : 'bg-red-400'}`} />
                      <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                        <div className={`h-full rounded-md flex items-center px-2 text-xs font-medium transition-all duration-700
                          ${found ? 'bg-green-500/30 text-green-300' : 'bg-red-500/15 text-red-400'}`}
                          style={{ width: found ? '100%' : '30%' }}>
                          {skill}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-3">Bonus ({foundNiceToHave.length}/{roleData.niceToHave.length})</p>
              <div className="space-y-1.5">
                {roleData.niceToHave.map(skill => {
                  const found = foundNiceToHave.includes(skill)
                  return (
                    <div key={skill} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${found ? 'bg-blue-400' : 'bg-white/20'}`} />
                      <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                        <div className={`h-full rounded-md flex items-center px-2 text-xs font-medium transition-all duration-700
                          ${found ? 'bg-blue-500/30 text-blue-300' : 'bg-white/5 text-slate-500'}`}
                          style={{ width: found ? '100%' : '25%' }}>
                          {skill}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="flex gap-2 mb-5 bg-white/3 border border-white/8 p-1 rounded-xl">
            {[
              { id:'required', label:`Required Skills (${roleData.requiredSkills.length})` },
              { id:'bonus',    label:`Bonus Skills (${roleData.niceToHave.length})` },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200
                  ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {(activeTab === 'required' ? allRequired : allNiceToHave).map((item, i) => (
              <SkillBar key={item.skill} skill={item.skill} found={item.found} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link to="/courses" className="btn-primary flex-1 justify-center">
            <BookOpen className="w-4 h-4" /> Browse Courses to Fill Gaps
          </Link>
          <Link to="/dashboard" className="btn-secondary flex-1 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
