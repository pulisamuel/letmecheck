import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Post Graduate']
const goalOptions = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Data Scientist', 'Data Analyst', 'DevOps Engineer',
  'UI/UX Designer', 'Machine Learning Engineer', 'Cybersecurity Analyst', 'Product Manager'
]
const graduationOptions = ['2024', '2025', '2026', '2027', '2028', '2029', '2030']

export default function Profile() {
  const { profile, setProfile, analysisResult, enrolledCourses, courseProgress } = useApp()
  const [form, setForm] = useState({ ...profile })
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const completedCourses = enrolledCourses.filter(c => (courseProgress[c.id] || 0) === 100)
  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a, b) => a + b, 0) / enrolledCourses.length)
    : 0

  const profileCompletion = [
    form.name, form.email, form.college, form.year, form.graduation, form.goal
  ].filter(Boolean).length

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and career goals</p>
        </div>

        {/* Profile Card */}
        <div className="card mb-6 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-extrabold border-2 border-white/30">
              {form.name ? form.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold">{form.name || 'Your Name'}</h2>
              <p className="text-blue-100 mt-1">{form.email || 'your@email.com'}</p>
              <p className="text-blue-200 text-sm mt-1">
                {form.college && `${form.college}`}
                {form.year && ` · ${form.year}`}
                {form.graduation && ` · Class of ${form.graduation}`}
              </p>
              {form.goal && (
                <span className="inline-flex items-center gap-1 mt-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  🎯 Goal: {form.goal}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Profile Complete</p>
              <p className="text-3xl font-extrabold">{Math.round((profileCompletion / 6) * 100)}%</p>
              <div className="mt-2 w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${(profileCompletion / 6) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'profile', label: '👤 Profile Info' },
            { id: 'stats', label: '📊 My Stats' },
            { id: 'achievements', label: '🏆 Achievements' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Form */}
        {activeTab === 'profile' && (
          <div className="card animate-fade-in">
            <h3 className="font-bold text-slate-800 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">College / University *</label>
                <input
                  type="text"
                  value={form.college}
                  onChange={e => handleChange('college', e.target.value)}
                  placeholder="e.g. MIT, Stanford, IIT Delhi"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Year *</label>
                <select
                  value={form.year}
                  onChange={e => handleChange('year', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select year</option>
                  {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Graduation Year *</label>
                <select
                  value={form.graduation}
                  onChange={e => handleChange('graduation', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select year</option>
                  {graduationOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Career Goal *</label>
                <select
                  value={form.goal}
                  onChange={e => handleChange('goal', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select your goal</option>
                  {goalOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Profile completion hints */}
            {profileCompletion < 6 && (
              <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-semibold text-amber-800 mb-2">Complete your profile to get better recommendations:</p>
                <div className="flex flex-wrap gap-2">
                  {!form.name && <span className="badge bg-amber-100 text-amber-700">Name</span>}
                  {!form.email && <span className="badge bg-amber-100 text-amber-700">Email</span>}
                  {!form.college && <span className="badge bg-amber-100 text-amber-700">College</span>}
                  {!form.year && <span className="badge bg-amber-100 text-amber-700">Year</span>}
                  {!form.graduation && <span className="badge bg-amber-100 text-amber-700">Graduation</span>}
                  {!form.goal && <span className="badge bg-amber-100 text-amber-700">Career Goal</span>}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="btn-primary flex-1"
              >
                {saved ? '✅ Saved!' : 'Save Profile'}
              </button>
              {form.goal && (
                <Link to="/analyze" className="btn-secondary flex-1 text-center">
                  Analyze for {form.goal} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'ATS Score', value: analysisResult ? `${analysisResult.score}%` : 'N/A', icon: '🎯', color: 'from-blue-500 to-blue-600' },
                { label: 'Courses Enrolled', value: enrolledCourses.length, icon: '📚', color: 'from-purple-500 to-purple-600' },
                { label: 'Courses Completed', value: completedCourses.length, icon: '🏆', color: 'from-green-500 to-green-600' },
                { label: 'Avg Progress', value: `${avgProgress}%`, icon: '📈', color: 'from-orange-500 to-orange-600' },
              ].map(stat => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl mb-3 shadow-md`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                  <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {analysisResult && (
              <div className="card">
                <h3 className="font-bold text-slate-800 mb-4">Latest Analysis</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold">
                    {analysisResult.score}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{analysisResult.jobRole}</p>
                    <p className="text-slate-500 text-sm">Eligibility: <span className="font-semibold text-primary-600">{analysisResult.eligibility}</span></p>
                    <p className="text-slate-500 text-sm">Skills found: {analysisResult.foundRequired.length}/{analysisResult.foundRequired.length + analysisResult.missingRequired.length}</p>
                  </div>
                  <Link to="/dashboard" className="ml-auto btn-secondary text-sm">View Details →</Link>
                </div>
              </div>
            )}

            {!analysisResult && (
              <div className="card text-center py-8">
                <div className="text-4xl mb-3">📄</div>
                <p className="font-semibold text-slate-700">No analysis yet</p>
                <p className="text-slate-500 text-sm mt-1 mb-4">Upload your resume to see your stats</p>
                <Link to="/analyze" className="btn-primary text-sm">Analyze Resume →</Link>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🎯', title: 'First Analysis', desc: 'Completed your first resume analysis', unlocked: !!analysisResult },
                { icon: '📚', title: 'Learner', desc: 'Enrolled in your first course', unlocked: enrolledCourses.length > 0 },
                { icon: '🔥', title: 'Dedicated', desc: 'Enrolled in 3+ courses', unlocked: enrolledCourses.length >= 3 },
                { icon: '🏆', title: 'Achiever', desc: 'Completed a course', unlocked: completedCourses.length > 0 },
                { icon: '⭐', title: 'High Scorer', desc: 'Achieved 75%+ ATS score', unlocked: analysisResult?.score >= 75 },
                { icon: '👤', title: 'Profile Pro', desc: 'Completed your profile', unlocked: profileCompletion === 6 },
                { icon: '🚀', title: 'Go-Getter', desc: 'Completed 3+ courses', unlocked: completedCourses.length >= 3 },
                { icon: '💡', title: 'Skill Builder', desc: 'Enrolled in 5+ courses', unlocked: enrolledCourses.length >= 5 },
                { icon: '🌟', title: 'Star Student', desc: 'Achieved 90%+ ATS score', unlocked: analysisResult?.score >= 90 },
              ].map(achievement => (
                <div
                  key={achievement.title}
                  className={`card text-center transition-all duration-200 ${achievement.unlocked ? 'border-yellow-200 bg-yellow-50' : 'opacity-50 grayscale'}`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="font-bold text-slate-800 text-sm">{achievement.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{achievement.desc}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 badge bg-yellow-100 text-yellow-700 border border-yellow-200">Unlocked ✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
