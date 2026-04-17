import React, { useState, useRef } from 'react'
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle, TrendingUp, Target, Zap, Shield, ArrowRight, Download } from 'lucide-react'

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()
  const resultsRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    if (!f.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file')
      return
    }
    setFile(f)
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please upload your resume first')
      return
    }

    setAnalyzing(true)
    
    // Simulate analysis (replace with your actual API call)
    setTimeout(() => {
      setResults({
        score: 78,
        strengths: [
          'Strong technical skills section',
          'Clear work experience timeline',
          'Quantified achievements',
          'Relevant keywords present'
        ],
        weaknesses: [
          'Missing action verbs in some descriptions',
          'Inconsistent formatting',
          'Could add more metrics'
        ],
        missingKeywords: [
          'React', 'TypeScript', 'AWS', 'CI/CD', 'Agile', 'REST APIs'
        ],
        suggestions: [
          'Add more quantifiable results (e.g., "Increased performance by 40%")',
          'Use stronger action verbs like "Spearheaded", "Architected", "Optimized"',
          'Include relevant certifications if you have any',
          'Tailor your resume to match the job description keywords'
        ]
      })
      setAnalyzing(false)
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }, 3000)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">AI-Powered Analysis</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                LetMeCheck
              </span>
              <span className="ml-4">🚀</span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl md:text-3xl font-semibold text-gray-300 max-w-3xl mx-auto">
              AI-powered Resume Analyzer to boost your ATS score instantly
            </p>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Get instant feedback on your resume with our advanced AI. Discover what recruiters see and optimize for Applicant Tracking Systems.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/70"
            >
              Analyze Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Line */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your data is private and never stored on our servers</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/40 rounded-full" />
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload-section" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl w-full space-y-8 animate-fade-in">
            {/* Section Header */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold">Upload Your Resume</h2>
              <p className="text-gray-400">Drop your PDF resume and let AI do the magic</p>
            </div>

            {/* Glassmorphism Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              {/* File Upload */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragOver
                    ? 'border-blue-400 bg-blue-500/10 scale-105'
                    : file
                    ? 'border-green-400 bg-green-500/10'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
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
                  <div className="space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-400">{file.name}</p>
                      <p className="text-sm text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
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
                      <p className="text-lg font-semibold">Drop your resume here</p>
                      <p className="text-sm text-gray-400 mt-2">or click to browse • PDF only</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Job Description (Optional) */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Job Description <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description here to get tailored feedback..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-white placeholder-gray-500"
                />
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file || analyzing}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  !file || analyzing
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing your resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {results && (
          <section ref={resultsRef} className="min-h-screen px-6 py-20">
            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
              {/* Results Header */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">Your ATS Score</h2>
                <p className="text-gray-400">Here's what our AI found in your resume</p>
              </div>

              {/* Score Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50">
                  <span className="text-5xl font-extrabold">{results.score}%</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {results.score >= 80 ? 'Excellent!' : results.score >= 60 ? 'Good Job!' : 'Needs Improvement'}
                  </h3>
                  <p className="text-gray-400">
                    {results.score >= 80
                      ? 'Your resume is well-optimized for ATS systems'
                      : results.score >= 60
                      ? "Your resume is decent, but there's room for improvement"
                      : 'Your resume needs significant optimization'}
                  </p>
                </div>
                {/* Progress Bar */}
                <div className="max-w-md mx-auto">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${results.score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold">Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {results.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold">Weaknesses</h3>
                  </div>
                  <ul className="space-y-3">
                    {results.weaknesses.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Keywords */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold">Missing Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-300 font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">Suggestions</h3>
                  </div>
                  <ul className="space-y-3">
                    {results.suggestions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setResults(null)
                    setFile(null)
                    setJobDesc('')
                    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all duration-300"
                >
                  Analyze Another Resume
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
              <p className="text-gray-400">Three simple steps to optimize your resume</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Upload, title: 'Upload Resume', desc: 'Drop your PDF resume into our secure analyzer' },
                { icon: Sparkles, title: 'AI Analyzes', desc: 'Our AI scans for ATS compatibility and keywords' },
                { icon: TrendingUp, title: 'Get Insights', desc: 'Receive actionable feedback to improve your score' }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center space-y-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {i + 1}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
              <p className="text-gray-400">Everything you need to land your dream job</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Target, title: 'ATS Scoring', desc: 'Get a precise score on how well your resume passes ATS filters' },
                { icon: Zap, title: 'Keyword Matching', desc: 'Identify missing keywords that recruiters are looking for' },
                { icon: FileText, title: 'Job Comparison', desc: 'Compare your resume against specific job descriptions' },
                { icon: Sparkles, title: 'AI Suggestions', desc: 'Receive intelligent recommendations to improve your resume' }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">LetMeCheck</span>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">Built with AI • Your privacy matters</p>
                <p className="text-xs text-gray-500 mt-1">© 2024 LetMeCheck. All rights reserved.</p>
              </div>
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
