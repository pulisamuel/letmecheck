import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Sparkles, Shield, Eye, EyeOff } from 'lucide-react'

const FEATURES = [
  { icon: '🎯', text: 'ATS Resume Scoring' },
  { icon: '📊', text: 'Skills Gap Analysis' },
  { icon: '📚', text: '50+ Curated Courses' },
  { icon: '🎤', text: 'Mock Interview Practice' },
  { icon: '☁️', text: 'Data synced across devices' },
]

const YEARS    = ['1st Year','2nd Year','3rd Year','4th Year','Graduate','Post Graduate']
const GRAD_YRS = ['2024','2025','2026','2027','2028','2029','2030']
const GOALS    = [
  'Frontend Developer','Backend Developer','Full Stack Developer','Data Scientist',
  'Data Analyst','DevOps Engineer','UI/UX Designer','Machine Learning Engineer',
  'Cybersecurity Analyst','Product Manager','Cloud Engineer','Mobile Developer',
  'QA Engineer','AI Engineer','Blockchain Developer','Solutions Architect',
]

export default function Login() {
  const { loginUser, registerUser } = useApp()
  const [mode, setMode]       = useState('login')
  const [form, setForm]       = useState({ name:'', email:'', password:'', confirm:'', college:'', year:'', graduation:'', goal:'' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [showPw, setShowPw]   = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    try {
      await loginUser(form.email.trim(), form.password)
    } catch (err) {
      const msg = err.message?.includes('Invalid login') || err.message?.includes('invalid_credentials')
        ? 'Invalid email or password. Please try again.'
        : err.message?.includes('Email not confirmed')
        ? 'Please confirm your email — check your inbox.'
        : err.message?.includes('fetch') || err.message?.includes('Failed')
        ? '⚙️ Supabase not configured yet. Add your URL and key to src/supabase.js'
        : err.message || 'Login failed. Please try again.'
      setError(msg)
    } finally { setLoading(false) }
  }

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.college || !form.year || !form.graduation) {
      setError('Please fill in all required fields'); return
    }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email'); return }
    setLoading(true); setError('')
    try {
      await registerUser({ name: form.name.trim(), email: form.email.trim(), password: form.password, college: form.college.trim(), year: form.year, graduation: form.graduation, goal: form.goal })
      setSuccess('Account created! Signing you in...')
    } catch (err) {
      const msg = err.message?.includes('already registered') || err.message?.includes('already been registered')
        ? 'This email is already registered. Please sign in instead.'
        : err.message?.includes('Password') || err.message?.includes('password')
        ? 'Password is too weak. Use at least 6 characters.'
        : err.message?.includes('fetch') || err.message?.includes('Failed')
        ? '⚙️ Supabase not configured yet. Add your URL and key to src/supabase.js'
        : err.message || 'Registration failed. Please try again.'
      setError(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl glow-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl glow-pulse" style={{ animationDelay:'2s' }} />
      </div>

      <div className="relative w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl shadow-black/60 animate-fade-in border border-white/10">

        {/* ── Left branding panel ──────────────────────────────────────────── */}
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-blue-600/30 to-purple-700/30 backdrop-blur-xl border-r border-white/10 p-8 text-white">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg">L</div>
              <div>
                <p className="font-extrabold text-sm">LetMeCheck</p>
                <p className="text-xs text-blue-300/70">Career AI Platform</p>
              </div>
            </div>
            <h2 className="text-2xl font-extrabold leading-tight mb-3">
              Your Personal<br />Career Guidance<br />System
            </h2>
            <p className="text-blue-100/70 text-sm leading-relaxed">
              Get your ATS score, discover skill gaps, and access curated courses — built for students.
            </p>
          </div>

          <div className="space-y-2.5 my-6">
            {FEATURES.map(f => (
              <div key={f.text} className="flex items-center gap-3 text-sm">
                <span className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-base">{f.icon}</span>
                <span className="text-blue-100/80">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <p className="text-xs font-semibold text-blue-200">Powered by Supabase</p>
            </div>
            <p className="text-xs text-blue-200/60 leading-relaxed">
              Real accounts · Data synced across devices · Each user gets their own private dashboard
            </p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-yellow-300 font-medium">⚙️ Setup required</p>
              <p className="text-xs text-blue-200/50 mt-0.5">Add your Supabase URL and key to <code className="bg-white/10 px-1 rounded">src/supabase.js</code></p>
            </div>
          </div>
        </div>

        {/* ── Right form panel ─────────────────────────────────────────────── */}
        <div className="flex-1 bg-gray-950/80 backdrop-blur-xl p-8 flex flex-col justify-center overflow-y-auto max-h-screen">
          {/* Tab switcher */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 mb-6">
            {['login','register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200
                  ${mode === m ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                {m === 'login' ? '🔑 Sign In' : '✨ Create Account'}
              </button>
            ))}
          </div>

          {/* ── LOGIN ── */}
          {mode === 'login' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <p className="text-xl font-extrabold text-white">Welcome back!</p>
                <p className="text-xs text-slate-500 mt-1">Sign in to continue your career journey</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleLogin()}
                      placeholder="Enter your password" className="input-field pr-10" />
                    <button onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl flex items-start gap-2">
                  <span className="flex-shrink-0">⚠️</span><span>{error}</span>
                </div>
              )}

              <button onClick={handleLogin} disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
                  ${loading ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-95'}`}>
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in...</span>
                  : 'Sign In →'}
              </button>

              <p className="text-center text-xs text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => setMode('register')} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Create one free</button>
              </p>
            </div>
          )}

          {/* ── REGISTER ── */}
          {mode === 'register' && (
            <div className="space-y-3 animate-fade-in">
              <div>
                <p className="text-xl font-extrabold text-white">Create your account</p>
                <p className="text-xs text-slate-500 mt-1">Your data will be saved and synced across devices</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password *</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 chars" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Confirm *</label>
                  <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Repeat password" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">College / University *</label>
                  <input type="text" value={form.college} onChange={e => set('college', e.target.value)} placeholder="e.g. IIT Delhi, NIT Trichy, VIT" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Current Year *</label>
                  <select value={form.year} onChange={e => set('year', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Graduation *</label>
                  <select value={form.graduation} onChange={e => set('graduation', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {GRAD_YRS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Career Goal</label>
                  <select value={form.goal} onChange={e => set('goal', e.target.value)} className="input-field">
                    <option value="">Select your goal (optional)</option>
                    {GOALS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl flex items-start gap-2">
                  <span className="flex-shrink-0">⚠️</span><span>{error}</span>
                </div>
              )}
              {success && (
                <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-2.5 rounded-xl flex items-center gap-2">
                  <span>✅</span><span>{success}</span>
                </div>
              )}

              <button onClick={handleRegister} disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
                  ${loading ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-95'}`}>
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</span>
                  : 'Create Account →'}
              </button>

              <p className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in</button>
              </p>
            </div>
          )}

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-slate-600">
            <Shield className="w-3.5 h-3.5" />
            <span>Your data is private and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
