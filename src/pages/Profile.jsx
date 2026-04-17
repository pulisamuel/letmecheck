import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { User, BarChart3, Trophy, Save, CheckCircle } from 'lucide-react'

const YEAR_OPTIONS = ['1st Year','2nd Year','3rd Year','4th Year','Graduate','Post Graduate']
const GOAL_OPTIONS = [
  'Frontend Developer','Backend Developer','Full Stack Developer','Data Scientist','Data Analyst',
  'DevOps Engineer','UI/UX Designer','Machine Learning Engineer','Cybersecurity Analyst','Product Manager',
  'Cloud Engineer','Mobile Developer','QA Engineer','Blockchain Developer','Site Reliability Engineer',
  'Database Administrator','Business Analyst','Technical Writer','Solutions Architect','AI Engineer',
]
const GRAD_OPTIONS = ['2024','2025','2026','2027','2028','2029','2030']

export default function Profile() {
  const { profile, setProfile, analysisResult, enrolledCourses, courseProgress } = useApp()
  const [form, setForm]           = useState({ ...profile })
  const [saved, setSaved]         = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  React.useEffect(() => { setForm({ ...profile }) }, [profile])

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = async () => {
    await setProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const completedCourses = enrolledCourses.filter(c => (courseProgress[c.id] || 0) === 100)
  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a,b) => a+b, 0) / enrolledCourses.length) : 0
  const profileCompletion = [form.name, form.email, form.college, form.year, form.graduation, form.goal].filter(Boolean).length

  const TABS = [
    { id:'profile',      label:'Profile Info',  Icon:User },
    { id:'stats',        label:'My Stats',      Icon:BarChart3 },
    { id:'achievements', label:'Achievements',  Icon:Trophy },
  ]

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="page-header">
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your personal information and career goals</p>
        </div>

        {/* Profile Hero Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl" />
          <div className="relative flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white border border-white/20 shadow-xl flex-shrink-0">
              {form.name ? form.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-white">{form.name || 'Your Name'}</h2>
              <p className="text-blue-300/70 text-sm mt-0.5">{form.email || 'your@email.com'}</p>
              <p className="text-slate-400 text-xs mt-1">
                {[form.college, form.year, form.graduation && `Class of ${form.graduation}`].filter(Boolean).join(' · ')}
              </p>
              {form.goal && (
                <span className="inline-flex items-center gap-1 mt-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white">
                  🎯 {form.goal}
                </span>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-slate-400 text-xs">Profile Complete</p>
              <p className="text-3xl font-extrabold text-white">{Math.round((profileCompletion/6)*100)}%</p>
              <div className="mt-1.5 w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" style={{ width:`${(profileCompletion/6)*100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-white/3 border border-white/8 p-1 rounded-xl">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-200
                ${activeTab === id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>

        {/* Profile Form */}
        {activeTab === 'profile' && (
          <div className="card animate-fade-in">
            <h3 className="font-bold text-white mb-5 text-sm">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { field:'name',    label:'Full Name *',          type:'text',  placeholder:'Your full name' },
                { field:'email',   label:'Email Address *',      type:'email', placeholder:'your@email.com' },
                { field:'college', label:'College / University *',type:'text', placeholder:'e.g. IIT Delhi, VIT' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field} className={field === 'college' ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
                  <input type={type} value={form[field]} onChange={e => handleChange(field, e.target.value)}
                    placeholder={placeholder} className="input-field" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Current Year *</label>
                <select value={form.year} onChange={e => handleChange('year', e.target.value)} className="input-field">
                  <option value="">Select year</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Graduation Year *</label>
                <select value={form.graduation} onChange={e => handleChange('graduation', e.target.value)} className="input-field">
                  <option value="">Select year</option>
                  {GRAD_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Career Goal *</label>
                <select value={form.goal} onChange={e => handleChange('goal', e.target.value)} className="input-field">
                  <option value="">Select your goal</option>
                  {GOAL_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {profileCompletion < 6 && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-xs font-semibold text-yellow-400 mb-2">Complete your profile for better recommendations:</p>
                <div className="flex flex-wrap gap-1.5">
                  {!form.name && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Name</span>}
                  {!form.email && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Email</span>}
                  {!form.college && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">College</span>}
                  {!form.year && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Year</span>}
                  {!form.graduation && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Graduation</span>}
                  {!form.goal && <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Career Goal</span>}
                </div>
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <button onClick={handleSave}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                  ${saved ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'btn-primary'}`}>
                {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Profile</>}
              </button>
              {form.goal && (
                <Link to="/analyze" className="btn-secondary flex-1 justify-center text-xs">
                  Analyze for {form.goal} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
              {[
                { label:'ATS Score',         value:analysisResult ? `${analysisResult.score}%` : 'N/A', icon:'🎯', from:'from-blue-600',   to:'to-blue-700' },
                { label:'Courses Enrolled',  value:enrolledCourses.length,                              icon:'📚', from:'from-purple-600', to:'to-purple-700' },
                { label:'Courses Completed', value:completedCourses.length,                             icon:'🏆', from:'from-green-600',  to:'to-green-700' },
                { label:'Avg Progress',      value:`${avgProgress}%`,                                   icon:'📈', from:'from-orange-600', to:'to-orange-700' },
              ].map(stat => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.from} ${stat.to} rounded-xl flex items-center justify-center text-lg mb-3 shadow-lg`}>{stat.icon}</div>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {analysisResult ? (
              <div className="card">
                <h3 className="font-bold text-white mb-4 text-sm">Latest Analysis</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0">
                    {analysisResult.score}
                  </div>
                  <div>
                    <p className="font-bold text-white">{analysisResult.jobRole}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Eligibility: <span className="font-semibold text-blue-400">{analysisResult.eligibility}</span></p>
                    <p className="text-slate-400 text-xs">Skills: {analysisResult.foundRequired.length}/{analysisResult.foundRequired.length + analysisResult.missingRequired.length} found</p>
                  </div>
                  <Link to="/dashboard" className="ml-auto btn-secondary text-xs">View Details →</Link>
                </div>
              </div>
            ) : (
              <div className="card text-center py-10">
                <div className="text-4xl mb-3">📄</div>
                <p className="font-semibold text-white">No analysis yet</p>
                <p className="text-slate-500 text-sm mt-1 mb-4">Upload your resume to see your stats</p>
                <Link to="/analyze" className="btn-primary text-xs">Analyze Resume →</Link>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 stagger-children">
              {[
                { icon:'🎯', title:'First Analysis',  desc:'Completed your first resume analysis',  unlocked:!!analysisResult },
                { icon:'📚', title:'Learner',          desc:'Enrolled in your first course',          unlocked:enrolledCourses.length > 0 },
                { icon:'🔥', title:'Dedicated',        desc:'Enrolled in 3+ courses',                 unlocked:enrolledCourses.length >= 3 },
                { icon:'🏆', title:'Achiever',         desc:'Completed a course',                     unlocked:completedCourses.length > 0 },
                { icon:'⭐', title:'High Scorer',      desc:'Achieved 75%+ ATS score',                unlocked:analysisResult?.score >= 75 },
                { icon:'👤', title:'Profile Pro',      desc:'Completed your profile',                 unlocked:profileCompletion === 6 },
                { icon:'🚀', title:'Go-Getter',        desc:'Completed 3+ courses',                   unlocked:completedCourses.length >= 3 },
                { icon:'💡', title:'Skill Builder',    desc:'Enrolled in 5+ courses',                 unlocked:enrolledCourses.length >= 5 },
                { icon:'🌟', title:'Star Student',     desc:'Achieved 90%+ ATS score',                unlocked:analysisResult?.score >= 90 },
              ].map(a => (
                <div key={a.title}
                  className={`card text-center transition-all duration-200 ${a.unlocked ? 'border-yellow-500/20 bg-yellow-500/5' : 'opacity-40 grayscale'}`}>
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <p className="font-bold text-white text-xs">{a.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{a.desc}</p>
                  {a.unlocked && <span className="inline-block mt-2 badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Unlocked ✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
