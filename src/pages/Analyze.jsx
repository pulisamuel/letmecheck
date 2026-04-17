import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { JOB_ROLES } from '../utils/resumeAnalyzer'
import { Upload, FileText, Search, Sparkles, CheckCircle, XCircle, Shield, Zap, Target, X } from 'lucide-react'

const ALL_ROLES = Object.keys(JOB_ROLES)

const ROLE_ICONS = {
  'Frontend Developer':'⚛️','Backend Developer':'🔧','Full Stack Developer':'🔄',
  'Data Scientist':'🤖','Data Analyst':'📊','DevOps Engineer':'☁️',
  'UI/UX Designer':'🎨','Machine Learning Engineer':'🧠','Cybersecurity Analyst':'🔒',
  'Product Manager':'📋','Cloud Engineer':'🌩️','Mobile Developer':'📱',
  'QA Engineer':'🧪','Blockchain Developer':'⛓️','Site Reliability Engineer':'⚙️',
  'Database Administrator':'🗄️','Business Analyst':'📈','Technical Writer':'✍️',
  'Solutions Architect':'🏛️','AI Engineer':'🤖',
}

const ROLE_ALIASES = {
  'software engineer':'Full Stack Developer','software developer':'Full Stack Developer',
  'web developer':'Full Stack Developer','frontend engineer':'Frontend Developer',
  'front end developer':'Frontend Developer','react developer':'Frontend Developer',
  'backend engineer':'Backend Developer','back end developer':'Backend Developer',
  'node developer':'Backend Developer','data engineer':'Data Scientist',
  'ml engineer':'Machine Learning Engineer','cloud architect':'Solutions Architect',
  'security engineer':'Cybersecurity Analyst','security analyst':'Cybersecurity Analyst',
  'ios developer':'Mobile Developer','android developer':'Mobile Developer',
  'react native developer':'Mobile Developer','flutter developer':'Mobile Developer',
  'test engineer':'QA Engineer','automation engineer':'QA Engineer','qa analyst':'QA Engineer',
  'dba':'Database Administrator','db admin':'Database Administrator',
  'sre':'Site Reliability Engineer','reliability engineer':'Site Reliability Engineer',
  'ba':'Business Analyst','scrum master':'Product Manager','agile coach':'Product Manager',
  'ux designer':'UI/UX Designer','ui designer':'UI/UX Designer','product designer':'UI/UX Designer',
  'web3 developer':'Blockchain Developer','smart contract developer':'Blockchain Developer',
  'solidity developer':'Blockchain Developer','tech writer':'Technical Writer',
  'enterprise architect':'Solutions Architect','devops':'DevOps Engineer','platform engineer':'DevOps Engineer',
}

function validateJobRole(input) {
  const trimmed = input.trim()
  if (!trimmed) return { valid: false, message: 'Please enter a job role' }
  if (trimmed.length < 2) return { valid: false, message: 'Job role is too short' }
  if (trimmed.length > 60) return { valid: false, message: 'Job role is too long' }
  const exact = ALL_ROLES.find(r => r.toLowerCase() === trimmed.toLowerCase())
  if (exact) return { valid: true, matched: exact, message: '' }
  const alias = ROLE_ALIASES[trimmed.toLowerCase()]
  if (alias) return { valid: true, matched: alias, message: '', aliasOf: alias }
  const partial = ALL_ROLES.find(r => r.toLowerCase().includes(trimmed.toLowerCase()) || trimmed.toLowerCase().includes(r.toLowerCase()))
  if (partial) return { valid: true, matched: partial, message: '', suggestion: partial }
  const aliasEntry = Object.entries(ROLE_ALIASES).find(([a]) => a.includes(trimmed.toLowerCase()) || trimmed.toLowerCase().includes(a.split(' ')[0]))
  if (aliasEntry) return { valid: true, matched: aliasEntry[1], message: '', suggestion: aliasEntry[1] }
  return { valid: false, declined: true, message: `"${trimmed}" is not a supported role. Pick from the 20 below.` }
}

export default function Analyze() {
  const [file, setFile]                   = useState(null)
  const [jobRole, setJobRole]             = useState('')
  const [roleInput, setRoleInput]         = useState('')
  const [roleSuggestions, setRoleSuggestions] = useState([])
  const [roleValidation, setRoleValidation]   = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading]             = useState(false)
  const [loadingStep, setLoadingStep]     = useState('')
  const [error, setError]                 = useState('')
  const [dragOver, setDragOver]           = useState(false)
  const [step, setStep]                   = useState(1)
  const fileRef = useRef()
  const { setAnalysisResult } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [jobDesc] = useState(location.state?.jobDesc || '')

  const handleRoleInput = (val) => {
    setRoleInput(val); setRoleValidation(null); setJobRole(''); setError('')
    if (val.length > 0) {
      const direct = ALL_ROLES.filter(r => r.toLowerCase().includes(val.toLowerCase()))
      const aliases = Object.entries(ROLE_ALIASES).filter(([a]) => a.includes(val.toLowerCase())).map(([,r]) => r)
      setRoleSuggestions([...new Set([...direct, ...aliases])].slice(0, 8))
      setShowSuggestions(true)
    } else {
      setRoleSuggestions(ALL_ROLES.slice(0, 8)); setShowSuggestions(true)
    }
  }

  const selectRole = (role) => {
    setRoleInput(role); setJobRole(role); setRoleSuggestions([])
    setShowSuggestions(false); setRoleValidation({ valid: true, matched: role, message: '' })
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

  const handleFile = async (f) => {
    if (!f) return
    const { validatePDFFile } = await import('../utils/pdfUploader')
    const check = await validatePDFFile(f)
    if (!check.valid) { setError(`❌ ${check.error}`); setFile(null); return }
    setFile(f); setError(''); setStep(s => Math.max(s, 2))
  }

  const handleAnalyze = async () => {
    if (!file) { setError('Please upload your resume'); return }
    const validation = validateJobRole(roleInput)
    if (!validation.valid) { setError(validation.message); return }
    setLoading(true); setError(''); setLoadingStep('Reading PDF...')
    try {
      const { processResumeFile } = await import('../utils/pdfUploader')
      const processed = await processResumeFile(file)
      if (!processed.success) { setError(`❌ ${processed.error}`); return }
      setLoadingStep('Analyzing resume...')
      const { analyzeResumeViaAPI } = await import('../utils/analysisApi')
      const { result } = await analyzeResumeViaAPI(processed.text, validation.matched)
      setLoadingStep('Saving results...')
      await setAnalysisResult(result)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please try again.')
    } finally { setLoading(false); setLoadingStep('') }
  }

  const canAnalyze = file && roleInput.trim().length >= 2 && !loading

  const STEPS = [
    { n:1, label:'Upload Resume' },
    { n:2, label:'Select Role' },
    { n:3, label:'Get Score' },
  ]

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="page-header">
          <div className="section-label"><Sparkles className="w-3.5 h-3.5 text-blue-400" /> AI-Powered Analysis</div>
          <h1 className="page-title">Resume Analyzer</h1>
          <p className="page-subtitle">Upload your resume and get an instant ATS score with personalized guidance</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${step >= s.n
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 border border-white/10 text-slate-500'}`}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className={`text-xs font-medium hidden sm:block transition-colors ${step >= s.n ? 'text-blue-400' : 'text-slate-600'}`}>{s.label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px transition-all duration-300 ${step > s.n ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 — Upload */}
        <div className="card mb-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2 text-base">
            <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
            Upload Your Resume
          </h2>
          <div
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
              ${dragOver ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
              : file ? 'border-green-400/50 bg-green-500/5'
              : 'border-white/10 hover:border-blue-400/40 hover:bg-white/3'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            onClick={() => fileRef.current.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            {file ? (
              <div className="animate-scale-in space-y-3">
                <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-7 h-7 text-green-400" />
                </div>
                <p className="font-bold text-green-400">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                <button className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                  onClick={e => { e.stopPropagation(); setFile(null); setStep(1) }}>Remove file</button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-7 h-7 text-blue-400" />
                </div>
                <p className="font-semibold text-white">Drop your resume here</p>
                <p className="text-sm text-slate-500">or click to browse · PDF only</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-sm font-semibold text-blue-300">
                  Browse Files
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2 — Job Role */}
        <div className="card mb-5">
          <h2 className="font-bold text-white mb-1 flex items-center gap-2 text-base">
            <span className="w-6 h-6 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
            Target Job Role
          </h2>
          <p className="text-slate-500 text-xs mb-4 ml-8">Type a job title — 20 supported roles</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10" />
            <input
              type="text" value={roleInput}
              onChange={e => handleRoleInput(e.target.value)}
              onFocus={() => {
                const m = roleInput ? ALL_ROLES.filter(r => r.toLowerCase().includes(roleInput.toLowerCase())) : ALL_ROLES.slice(0, 8)
                setRoleSuggestions(m.slice(0, 8)); setShowSuggestions(true)
              }}
              onBlur={handleRoleBlur}
              onKeyDown={e => {
                if (e.key === 'Enter' && roleSuggestions.length > 0) selectRole(roleSuggestions[0])
                if (e.key === 'Escape') setShowSuggestions(false)
              }}
              placeholder="e.g. Frontend Developer, AI Engineer..."
              className="input-field pl-10 pr-10"
              autoComplete="off"
            />
            {roleInput && (
              <button onClick={() => { setRoleInput(''); setJobRole(''); setRoleValidation(null); setShowSuggestions(false) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
            {showSuggestions && roleSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden max-h-64 overflow-y-auto">
                {roleSuggestions.map(r => (
                  <button key={r} onMouseDown={() => selectRole(r)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex items-center gap-2.5 text-slate-300 hover:text-white">
                    <span className="text-base">{ROLE_ICONS[r] || '💼'}</span>
                    <span className="font-medium">{r}</span>
                    <span className="ml-auto text-xs text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full">Supported</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {roleValidation && (
            <div className={`mt-2 flex items-start gap-2 text-xs animate-fade-in ${roleValidation.valid ? 'text-green-400' : 'text-red-400'}`}>
              {roleValidation.valid ? <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> : <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
              <span className="font-medium">
                {roleValidation.valid ? `Role confirmed: "${roleValidation.matched}"` : roleValidation.message}
              </span>
            </div>
          )}

          {/* Role chips */}
          <div className="mt-4">
            <p className="text-xs text-slate-600 mb-2">All 20 supported roles:</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_ROLES.map(role => (
                <button key={role} onMouseDown={() => selectRole(role)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 border
                    ${jobRole === role
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md'
                      : 'bg-white/5 text-slate-400 border-white/8 hover:border-blue-400/40 hover:text-white hover:bg-white/8'}`}>
                  <span>{ROLE_ICONS[role] || '💼'}</span>
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm animate-fade-in flex items-start gap-2">
            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <button onClick={handleAnalyze} disabled={!canAnalyze}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3
            ${!canAnalyze
              ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99]'}`}>
          {loading ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {loadingStep || 'Analyzing...'}
            </span>
          ) : (
            <><Sparkles className="w-5 h-5" /> Analyze & Get My Score</>
          )}
        </button>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: Shield, label: 'Private & Secure', desc: 'Analyzed locally' },
            { icon: Zap, label: 'Instant Results', desc: 'Score in seconds' },
            { icon: Target, label: '20 Job Roles', desc: 'Precise per role' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center p-4 bg-white/3 border border-white/5 rounded-xl">
              <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="font-semibold text-white text-xs">{label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
