import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Home() {
  const { profile, analysisResult } = useApp()
  const fileRef = useRef()
  const navigate = useNavigate()
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
    navigate('/analyze')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-6">

      {/* Welcome back banner */}
      {profile.name && analysisResult && (
        <div className="mb-8 w-full max-w-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Welcome back, {profile.name}!</p>
              <p className="text-xs text-gray-400">Last score: <span className="text-blue-400 font-bold">{analysisResult.score}%</span> · {analysisResult.jobRole}</p>
            </div>
          </div>
          <Link to="/dashboard" className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-semibold transition flex-shrink-0">
            Dashboard →
          </Link>
        </div>
      )}

      {/* Hero */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        LetMeCheck 🚀
      </h1>
      <p className="text-gray-400 text-center max-w-lg mb-8 leading-relaxed">
        Analyze your resume with AI and boost your ATS score instantly. Discover skill gaps, get curated courses, and land your dream job.
      </p>

      {/* Main card */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md border border-white/10">

        {/* File upload */}
        <div
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer mb-4 transition-all duration-200 ${
            dragOver ? 'border-blue-400 bg-blue-500/10' :
            file ? 'border-green-400 bg-green-500/10' :
            'border-white/20 hover:border-blue-400 hover:bg-white/5'
          }`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
          onClick={() => fileRef.current.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={e => handleFile(e.target.files[0])}
          />
          {file ? (
            <div className="animate-fade-in">
              <p className="text-2xl mb-1">✅</p>
              <p className="text-green-400 font-semibold text-sm">{file.name}</p>
              <p className="text-green-300 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB · Ready</p>
              <button
                className="mt-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
                onClick={e => { e.stopPropagation(); setFile(null) }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <p className="text-3xl mb-2">📄</p>
              <p className="text-white font-semibold text-sm">Drop your resume here</p>
              <p className="text-gray-400 text-xs mt-1">or click to browse · PDF only</p>
            </div>
          )}
        </div>

        {/* Job description textarea */}
        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste Job Description (optional) — helps improve analysis accuracy"
          rows={3}
          className="w-full mb-4 p-3 rounded-xl bg-white text-black text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-900/50"
        >
          🎯 Analyze Resume
        </button>

        {/* Or go to full analyzer */}
        <p className="text-center text-xs text-gray-500 mt-3">
          Want more options?{' '}
          <Link to="/analyze" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Open full analyzer →
          </Link>
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {[
          { to: '/dashboard', label: '📊 Dashboard' },
          { to: '/skills',    label: '🎯 Skills Gap' },
          { to: '/courses',   label: '📚 Courses' },
          { to: '/interview', label: '🎤 Mock Interview' },
          { to: '/profile',   label: '👤 Profile' },
        ].map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Privacy note */}
      <p className="text-sm text-gray-500 mt-8 flex items-center gap-1.5">
        <span>🔒</span> Your data is secure and never stored on any server
      </p>
    </div>
  )
}
