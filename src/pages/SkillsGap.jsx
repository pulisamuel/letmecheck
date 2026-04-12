import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { JOB_ROLES } from '../utils/resumeAnalyzer'

function SkillBar({ skill, found, index }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-sm animate-fade-in"
      style={{ animationDelay: `${index * 50}ms`, borderColor: found ? '#bbf7d0' : '#fecaca', backgroundColor: found ? '#f0fdf4' : '#fff5f5' }}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${found ? 'bg-green-500 text-white' : 'bg-red-100 text-red-500'}`}>
        {found ? '✓' : '✗'}
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-sm ${found ? 'text-green-800' : 'text-red-800'}`}>{skill}</p>
        <p className={`text-xs ${found ? 'text-green-600' : 'text-red-500'}`}>
          {found ? 'Found in your resume' : 'Not found — needs improvement'}
        </p>
      </div>
      {!found && (
        <Link to="/courses" className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-primary-700 transition-colors flex-shrink-0">
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
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-7xl mb-6">🎯</div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">No Analysis Yet</h2>
          <p className="text-slate-500 mb-6">Analyze your resume first to see your skills gap</p>
          <Link to="/analyze" className="btn-primary">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, score } = analysisResult
  const roleData = JOB_ROLES[jobRole]

  const allRequired = [
    ...foundRequired.map(s => ({ skill: s, found: true })),
    ...missingRequired.map(s => ({ skill: s, found: false })),
  ]
  const allNiceToHave = [
    ...foundNiceToHave.map(s => ({ skill: s, found: true })),
    ...missingNiceToHave.map(s => ({ skill: s, found: false })),
  ]

  const requiredPct = Math.round((foundRequired.length / roleData.requiredSkills.length) * 100)
  const bonusPct = Math.round((foundNiceToHave.length / roleData.niceToHave.length) * 100)

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Skills Gap Analysis</h1>
          <p className="text-slate-500">Detailed breakdown for <span className="font-semibold text-primary-600">{jobRole}</span></p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <p className="text-blue-100 text-sm font-medium">Overall Score</p>
            <p className="text-4xl font-extrabold mt-1">{score}%</p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${score}%` }} />
            </div>
          </div>
          <div className="card">
            <p className="text-slate-500 text-sm font-medium">Required Skills</p>
            <p className="text-4xl font-extrabold text-slate-800 mt-1">{requiredPct}%</p>
            <p className="text-sm text-slate-500 mt-1">{foundRequired.length} of {roleData.requiredSkills.length} found</p>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full transition-all duration-1000" style={{ width: `${requiredPct}%` }} />
            </div>
          </div>
          <div className="card">
            <p className="text-slate-500 text-sm font-medium">Bonus Skills</p>
            <p className="text-4xl font-extrabold text-slate-800 mt-1">{bonusPct}%</p>
            <p className="text-sm text-slate-500 mt-1">{foundNiceToHave.length} of {roleData.niceToHave.length} found</p>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${bonusPct}%` }} />
            </div>
          </div>
        </div>

        {/* Visual Gap Chart */}
        <div className="card mb-8">
          <h3 className="font-bold text-slate-800 mb-6">Skills Coverage Map</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-3">Required Skills ({foundRequired.length}/{roleData.requiredSkills.length})</p>
              <div className="space-y-2">
                {roleData.requiredSkills.map((skill) => {
                  const found = foundRequired.includes(skill)
                  return (
                    <div key={skill} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${found ? 'bg-green-500' : 'bg-red-400'}`} />
                      <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden">
                        <div
                          className={`h-full rounded-md flex items-center px-2 text-xs font-medium transition-all duration-700 ${found ? 'bg-green-500 text-white' : 'bg-red-100 text-red-600'}`}
                          style={{ width: found ? '100%' : '30%' }}
                        >
                          {skill}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-3">Bonus Skills ({foundNiceToHave.length}/{roleData.niceToHave.length})</p>
              <div className="space-y-2">
                {roleData.niceToHave.map((skill) => {
                  const found = foundNiceToHave.includes(skill)
                  return (
                    <div key={skill} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${found ? 'bg-blue-500' : 'bg-slate-300'}`} />
                      <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden">
                        <div
                          className={`h-full rounded-md flex items-center px-2 text-xs font-medium transition-all duration-700 ${found ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}
                          style={{ width: found ? '100%' : '25%' }}
                        >
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
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('required')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'required' ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Required Skills ({roleData.requiredSkills.length})
            </button>
            <button
              onClick={() => setActiveTab('bonus')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'bonus' ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Bonus Skills ({roleData.niceToHave.length})
            </button>
          </div>

          <div className="space-y-2">
            {(activeTab === 'required' ? allRequired : allNiceToHave).map((item, i) => (
              <SkillBar key={item.skill} skill={item.skill} found={item.found} index={i} />
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex gap-4">
          <Link to="/courses" className="btn-primary flex-1 text-center">
            📚 Browse Courses to Fill Gaps
          </Link>
          <Link to="/dashboard" className="btn-secondary flex-1 text-center">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
