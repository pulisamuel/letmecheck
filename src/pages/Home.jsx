import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Upload, FileText, Sparkles, CheckCircle, AlertCircle,
  TrendingUp, Target, Zap, Shield, ArrowRight, Star,
  BarChart3, BookOpen, Mic, User, ChevronDown
} from 'lucide-react'

// ─── Reusable Glass Card ──────────────────────────────────────────────────────
function GlassCard({ children, className = '', hover = true }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  )
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function StatBadge({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  )
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, gradient }) {
  return (
    <GlassCard className="p-6 group cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </GlassCard>
  )
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ number, icon: Icon, title, desc }) {
  return (
    <div className="relative group">
      <GlassCard className="p-8 text-center">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/50">
          {number}
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </GlassCard>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const { profile, analysisResult } = useApp()
  const fileRef = useRef()
  const navigate = useNavigate()
  const uploadRef = useRef()

  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [jobDesc, setJobDesc] = useState('')

  const handleFile = (f) => {
    if (!f) return
    if (!f.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file')
      return
    }
    setFile(f)
  }

  const handleAnalyze = () => {
    if (!file) {
      alert('Please upload your resume first')
      return
    }
    navigate('/analyze', { state: { jobDesc } })
  }

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white overflow-x-hidden">

      {/* ── Ambient Background Orbs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl glow-pulse" />
        <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">

        {/* ══════════════════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-up">

            {/* Welcome back banner */}
            {profile.name && analysisResult && (
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-scale-in">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                  {profile.name.charAt(0)}
                </div>
                <span className="text-sm text-gray-300">
                  Welcome back, <span className="font-semibold text-white">{profile.name}</span>
                </span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg font-semibold">
                  Last score: {analysisResult.score}%
                </span>
                <Link to="/dashboard" className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Dashboard →
                </Link>
              </div>
            )}

            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full animate-fade-in">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">AI-Powered Career Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                LetMeCheck
              </span>
              <span className="ml-3 text-7xl">🚀</span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl md:text-3xl font-semibold text-gray-200 max-w-3xl mx-auto leading-snug">
              AI-powered Resume Analyzer to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                boost your ATS score
              </span>{' '}
              instantly
            </p>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Get instant, actionable feedback on your resume. Discover what recruiters and ATS systems see — and fix it before they do.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={scrollToUpload}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/60 active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                Analyze Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {analysisResult && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-semibold text-lg transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5" />
                  View Dashboard
                </Link>
              )}
            </div>

            {/* Trust Line */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your data is private and never stored on our servers</span>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              <StatBadge value="20+" label="Job Roles" />
              <div className="w-px h-8 bg-white/10" />
              <StatBadge value="50+" label="Curated Courses" />
              <div className="w-px h-8 bg-white/10" />
              <StatBadge value="100%" label="Private & Secure" />
              <div className="w-px h-8 bg-white/10" />
              <StatBadge value="AI" label="Powered Analysis" />
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToUpload}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors animate-bounce"
          >
            <span className="text-xs">Scroll to analyze</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            UPLOAD SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section ref={uploadRef} className="px-6 py-24">
          <div className="max-w-2xl mx-auto space-y-8">

            {/* Section Header */}
            <div className="text-center space-y-3 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold">
                Upload Your Resume
              </h2>
              <p className="text-gray-400">Drop your PDF and let AI do the heavy lifting</p>
            </div>

            {/* Main Upload Card */}
            <GlassCard className="p-8 space-y-6 animate-fade-up" hover={false}>

              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragOver
                    ? 'border-blue-400 bg-blue-500/10 scale-[1.02]'
                    : file
                    ? 'border-green-400/60 bg-green-500/5'
                    : 'border-white/15 hover:border-blue-400/50 hover:bg-white/3'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
                onClick={() => fileRef.current.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {file ? (
                  <div className="space-y-4 animate-scale-in">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-400">{file.name}</p>
                      <p className="text-sm text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      className="text-sm text-gray-500 hover:text-red-400 transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Drop your resume here</p>
                      <p className="text-sm text-gray-400 mt-2">or click to browse · PDF only</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-sm font-semibold text-blue-300">
                      Browse Files
                    </div>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Job Description
                  <span className="ml-2 text-xs text-gray-500 font-normal">(Optional — improves accuracy)</span>
                </label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description here to get tailored keyword matching and role-specific feedback..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none text-white placeholder-gray-600 text-sm"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  !file
                    ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Analyze My Resume
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Or go to full analyzer */}
              <p className="text-center text-xs text-gray-500">
                Want more options?{' '}
                <Link to="/analyze" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Open full analyzer →
                </Link>
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Three steps to a better resume and more interview calls</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 stagger-children">
              <StepCard
                number="1"
                icon={Upload}
                title="Upload Resume"
                desc="Drop your PDF resume into our secure, private analyzer. No account needed."
              />
              <StepCard
                number="2"
                icon={Sparkles}
                title="AI Analyzes"
                desc="Our AI scans for ATS compatibility, keywords, and role-specific requirements."
              />
              <StepCard
                number="3"
                icon={TrendingUp}
                title="Get Insights"
                desc="Receive a detailed score, missing keywords, and actionable improvement tips."
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FEATURES SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Full Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Everything You Need</h2>
              <p className="text-gray-400 max-w-xl mx-auto">A complete career toolkit built for students and job seekers</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              <FeatureCard
                icon={Target}
                title="ATS Scoring"
                desc="Get a precise score on how well your resume passes Applicant Tracking Systems."
                gradient="bg-gradient-to-br from-blue-600 to-blue-700"
              />
              <FeatureCard
                icon={Zap}
                title="Keyword Matching"
                desc="Identify missing keywords that recruiters and ATS systems are looking for."
                gradient="bg-gradient-to-br from-purple-600 to-purple-700"
              />
              <FeatureCard
                icon={BookOpen}
                title="50+ Courses"
                desc="Curated courses to fill your skill gaps and land your target role faster."
                gradient="bg-gradient-to-br from-green-600 to-emerald-700"
              />
              <FeatureCard
                icon={Mic}
                title="Mock Interview"
                desc="Practice with AI-powered interview questions tailored to your target role."
                gradient="bg-gradient-to-br from-orange-600 to-red-600"
              />
            </div>

            {/* Quick Nav Links */}
            <div className="flex flex-wrap justify-center gap-3 pt-4 stagger-children">
              {[
                { to: '/dashboard', label: '📊 Dashboard', desc: 'View your analysis' },
                { to: '/skills', label: '🎯 Skills Gap', desc: 'Find what to learn' },
                { to: '/courses', label: '📚 Courses', desc: 'Browse 50+ courses' },
                { to: '/interview', label: '🎤 Mock Interview', desc: 'Practice questions' },
                { to: '/profile', label: '👤 Profile', desc: 'Manage your info' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex flex-col items-center gap-1 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center space-y-6">
              {/* Background decoration */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

              <div className="relative space-y-6">
                <div className="text-5xl">🎯</div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to land your{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    dream job?
                  </span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Join thousands of students who improved their ATS score and got more interview calls.
                </p>
                <button
                  onClick={scrollToUpload}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze My Resume Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Free · Private · No account required</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-white/10 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg">
                  L
                </div>
                <div>
                  <p className="font-bold text-white">LetMeCheck</p>
                  <p className="text-xs text-gray-500">Career Guidance System</p>
                </div>
              </div>

              {/* Center */}
              <div className="text-center">
                <p className="text-sm text-gray-400">Built with AI · Designed for students</p>
                <p className="text-xs text-gray-600 mt-1">© 2024 LetMeCheck. All rights reserved.</p>
              </div>

              {/* Privacy */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>100% Private & Secure</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
