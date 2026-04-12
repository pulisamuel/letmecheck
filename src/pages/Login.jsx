import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { loginUser, registerUser } = useApp()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    college: '', year: '', graduation: '', goal: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  // ── Sign In ────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    try {
      await loginUser(form.email.trim(), form.password)
      // onAuthStateChanged in AppContext handles the rest
    } catch (err) {
      const msg = err.message?.includes('Invalid login') || err.message?.includes('invalid_credentials')
        ? 'Invalid email or password. Please try again.'
        : err.message?.includes('Email not confirmed')
        ? 'Please confirm your email — check your inbox.'
        : err.message?.includes('fetch') || err.message?.includes('Failed') || err.message?.includes('YOUR_SUPABASE')
        ? '⚙️ Supabase not configured yet. Add your URL and key to src/supabase.js'
        : err.message || 'Login failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // ── Register ───────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.college || !form.year || !form.graduation) {
      setError('Please fill in all required fields'); return
    }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email'); return }
    setLoading(true); setError('')
    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        college: form.college.trim(),
        year: form.year,
        graduation: form.graduation,
        goal: form.goal,
      })
      setSuccess('Account created! Signing you in...')
    } catch (err) {
      const msg = err.message?.includes('already registered') || err.message?.includes('already been registered')
        ? 'This email is already registered. Please sign in instead.'
        : err.message?.includes('Password') || err.message?.includes('password')
        ? 'Password is too weak. Use at least 6 characters.'
        : err.message?.includes('fetch') || err.message?.includes('Failed') || err.message?.includes('YOUR_SUPABASE')
        ? '⚙️ Supabase not configured yet. Add your URL and key to src/supabase.js'
        : err.message || 'Registration failed. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl animate-fade-in">

        {/* ── Left panel — branding ─────────────────────────────────────────── */}
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-primary-600 to-purple-700 p-7 text-white">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md">L</div>
              <div>
                <p className="font-extrabold text-sm leading-tight">LetMeCheck</p>
                <p className="text-xs text-blue-200">Guidance System</p>
              </div>
            </div>
            <h2 className="text-xl font-extrabold leading-tight mb-2">Your Personal Career Guidance System</h2>
            <p className="text-blue-100 text-xs leading-relaxed">Get your ATS score, discover skill gaps, and access curated courses — built for students.</p>
          </div>

          <div className="space-y-2 my-4">
            {[
              { icon: '🎯', text: 'ATS Resume Scoring' },
              { icon: '📊', text: 'Skills Gap Analysis' },
              { icon: '📚', text: '50+ Curated Courses' },
              { icon: '🎤', text: 'Mock Interview Practice' },
              { icon: '☁️', text: 'Data saved across devices' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-2 text-xs">
                <span className="w-6 h-6 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">{f.icon}</span>
                <span className="text-blue-100">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Firebase status hint */}
          <div className="bg-white/10 rounded-xl p-3 border border-white/20">
            <p className="text-xs font-semibold text-blue-200 mb-1.5">⚡ Powered by Supabase</p>
            <p className="text-xs text-blue-200/80 leading-relaxed">
              Real accounts · Data synced across devices · Each user gets their own private dashboard
            </p>
            <div className="mt-2 pt-2 border-t border-white/10">
              <p className="text-xs text-yellow-300 font-medium">⚙️ Setup required</p>
              <p className="text-xs text-blue-200/70 mt-0.5">Add your Supabase URL and key to <code className="bg-white/10 px-1 rounded">src/supabase.js</code></p>
            </div>
          </div>
        </div>

        {/* ── Right panel — form ────────────────────────────────────────────── */}
        <div className="flex-1 bg-white p-7 flex flex-col justify-center overflow-y-auto max-h-screen">
          {/* Tab switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${mode === m ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {m === 'login' ? '🔑 Sign In' : '✨ Create Account'}
              </button>
            ))}
          </div>

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <div className="space-y-3 animate-fade-in">
              <div>
                <p className="text-lg font-extrabold text-slate-800">Welcome back!</p>
                <p className="text-xs text-slate-400">Sign in to continue your career journey</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="your@email.com" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter your password" className="input-field" />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg flex items-start gap-1.5">
                  <span className="flex-shrink-0">⚠️</span><span>{error}</span>
                </div>
              )}

              <button onClick={handleLogin} disabled={loading}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 active:scale-95 shadow-md'}`}>
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in...</span>
                  : 'Sign In →'}
              </button>

              <p className="text-center text-xs text-slate-400">
                Don't have an account?{' '}
                <button onClick={() => setMode('register')} className="text-primary-600 font-semibold hover:underline">Create one free</button>
              </p>
            </div>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === 'register' && (
            <div className="space-y-2.5 animate-fade-in">
              <div>
                <p className="text-lg font-extrabold text-slate-800">Create your account</p>
                <p className="text-xs text-slate-400">Your data will be saved and synced across devices</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Your full name" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Password *</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
                    placeholder="Min 6 characters" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm Password *</label>
                  <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                    placeholder="Repeat password" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">College / University *</label>
                  <input type="text" value={form.college} onChange={e => set('college', e.target.value)}
                    placeholder="e.g. IIT Delhi, NIT Trichy, VIT" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Current Year *</label>
                  <select value={form.year} onChange={e => set('year', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {['1st Year','2nd Year','3rd Year','4th Year','Graduate','Post Graduate'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Graduation Year *</label>
                  <select value={form.graduation} onChange={e => set('graduation', e.target.value)} className="input-field">
                    <option value="">Select</option>
                    {['2024','2025','2026','2027','2028','2029','2030'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Career Goal</label>
                  <select value={form.goal} onChange={e => set('goal', e.target.value)} className="input-field">
                    <option value="">Select your goal (optional)</option>
                    {['Frontend Developer','Backend Developer','Full Stack Developer','Data Scientist','Data Analyst','DevOps Engineer','UI/UX Designer','Machine Learning Engineer','Cybersecurity Analyst','Product Manager','Cloud Engineer','Mobile Developer','QA Engineer','AI Engineer','Blockchain Developer','Solutions Architect'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg flex items-start gap-1.5">
                  <span className="flex-shrink-0">⚠️</span><span>{error}</span>
                </div>
              )}
              {success && (
                <div className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg flex items-center gap-1.5">
                  <span>✅</span><span>{success}</span>
                </div>
              )}

              <button onClick={handleRegister} disabled={loading}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 active:scale-95 shadow-md'}`}>
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</span>
                  : 'Create Account →'}
              </button>

              <p className="text-center text-xs text-slate-400">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} className="text-primary-600 font-semibold hover:underline">Sign in</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
