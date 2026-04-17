import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const features = [
  { icon: '📄', title: 'Resume Analysis', desc: 'Upload your resume and get an instant ATS-style score with detailed feedback', path: '/analyze', color: 'from-blue-500 to-blue-600' },
  { icon: '📊', title: 'Smart Dashboard', desc: 'View your eligibility score, skill breakdown, and personalized recommendations', path: '/dashboard', color: 'from-purple-500 to-purple-600' },
  { icon: '🎯', title: 'Skills Gap Analysis', desc: 'Discover exactly which skills you need to land your dream job', path: '/skills', color: 'from-orange-500 to-orange-600' },
  { icon: '📚', title: 'Curated Courses', desc: 'Access hand-picked courses to fill your skill gaps and advance your career', path: '/courses', color: 'from-green-500 to-green-600' },
  { icon: '🎓', title: 'Learning Tracker', desc: 'Track your course progress and get feedback on your learning journey', path: '/my-courses', color: 'from-pink-500 to-pink-600' },
  { icon: '👤', title: 'Profile Setup', desc: 'Set up your profile with your goals, education, and career aspirations', path: '/profile', color: 'from-teal-500 to-teal-600' },
]

const steps = [
  { num: '01', title: 'Create Your Profile', desc: 'Enter your details, education, and career goals' },
  { num: '02', title: 'Upload Your Resume', desc: 'Upload your resume and select your target job role' },
  { num: '03', title: 'Get Your Score', desc: 'Receive an ATS-style score with detailed analysis' },
  { num: '04', title: 'Bridge the Gap', desc: 'Follow personalized course recommendations to improve' },
]

export default function Home() {
  const { profile, analysisResult } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-8 py-20">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              🎓 Your Personal Career Guidance System
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Land Your Dream Job<br />
              <span className="text-yellow-300">with Confidence</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Upload your resume, get an instant ATS score, discover skill gaps, and access curated courses — all in one place designed for students like you.
            </p>            <div className="flex flex-wrap gap-4">
              <Link to="/analyze" className="bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
                🚀 Analyze My Resume
              </Link>
              <Link to="/profile" className="bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
                Set Up Profile →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16">
            {[
              { num: '20+', label: 'Job Roles Supported' },
              { num: '60+', label: 'Curated Courses' },
              { num: '100%', label: 'Free to Use' },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <p className="text-3xl font-extrabold text-yellow-300">{stat.num}</p>
                <p className="text-blue-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome back banner */}
      {profile.name && analysisResult && (
        <div className="max-w-5xl mx-auto px-8 mt-8 animate-fade-in">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">Welcome back, {profile.name}! 👋</p>
                <p className="text-sm text-slate-500">Your last analysis: <span className="font-semibold text-primary-600">{analysisResult.jobRole}</span> — Score: <span className="font-bold text-green-600">{analysisResult.score}%</span></p>
              </div>
            </div>
            <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">View Dashboard →</Link>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Everything You Need to Succeed</h2>
          <p className="text-slate-500 text-lg">A complete toolkit for your career journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.path}
              to={f.path}
              className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-200`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">How It Works</h2>
            <p className="text-slate-400">Four simple steps to your dream career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Ready to Start Your Journey?</h2>
        <p className="text-slate-500 mb-8 text-lg">Join thousands of students who have already found their career path</p>
        <Link to="/analyze" className="btn-primary text-lg px-10 py-4 inline-block">
          🎯 Get My Career Score Now
        </Link>
      </div>
    </div>
  )
}
