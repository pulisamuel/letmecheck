import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PieChart, Pie, Cell } from 'recharts'
import { BarChart3, RefreshCw, Target, BookOpen, GraduationCap, Lightbulb, CheckCircle, XCircle, Clock } from 'lucide-react'

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(t)
  }, [score])
  const r = 80, circ = 2 * Math.PI * r
  const offset = circ - (animated / 100) * circ
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : score >= 30 ? '#f97316' : '#ef4444'
  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="-rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        <circle cx="100" cy="100" r={r} fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 1.5s ease-out', filter:`drop-shadow(0 0 8px ${color}60)` }} />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-extrabold" style={{ color }}>{animated}%</p>
        <p className="text-xs text-slate-500 font-medium mt-0.5">ATS Score</p>
      </div>
    </div>
  )
}

const ELIGIBILITY_STYLE = {
  High:       'bg-green-500/20 text-green-400 border-green-500/20',
  Medium:     'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  'Low-Medium':'bg-orange-500/20 text-orange-400 border-orange-500/20',
  Low:        'bg-red-500/20 text-red-400 border-red-500/20',
}

export default function Dashboard() {
  const { analysisResult, enrolledCourses, courseProgress, analysisHistory } = useApp()

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in space-y-5">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl mx-auto">📊</div>
          <h2 className="text-2xl font-extrabold text-white">No Analysis Yet</h2>
          <p className="text-slate-400">Upload your resume and select a job role to see your personalized dashboard</p>
          <Link to="/analyze" className="btn-primary">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { score, eligibility, jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, breakdown, recommendations, requiredCoverage } = analysisResult

  const breakdownData = [
    { name:'Required Skills', value:breakdown.requiredSkills, color:'#3b82f6', max:60 },
    { name:'Bonus Skills',    value:breakdown.niceToHave,    color:'#8b5cf6', max:20 },
    { name:'Experience',      value:breakdown.experience,    color:'#22c55e', max:20 },
  ]
  const skillPieData = [
    { name:'Found',   value:foundRequired.length,  fill:'#3b82f6' },
    { name:'Missing', value:missingRequired.length, fill:'rgba(255,255,255,0.06)' },
  ]
  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a,b) => a+b, 0) / enrolledCourses.length) : 0

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label"><BarChart3 className="w-3.5 h-3.5 text-blue-400" /> Your Results</div>
            <h1 className="page-title">My Dashboard</h1>
            <p className="page-subtitle">Analysis for <span className="text-blue-400 font-semibold">{jobRole}</span></p>
          </div>
          <Link to="/analyze" className="btn-secondary text-xs"><RefreshCw className="w-3.5 h-3.5" /> Re-analyze</Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
          {[
            { label:'ATS Score',       value:`${score}%`,                                                    icon:'🎯', from:'from-blue-600',   to:'to-blue-700' },
            { label:'Eligibility',     value:eligibility,                                                    icon:'✅', from:'from-purple-600', to:'to-purple-700' },
            { label:'Skills Found',    value:`${foundRequired.length}/${foundRequired.length+missingRequired.length}`, icon:'💡', from:'from-green-600',  to:'to-green-700' },
            { label:'Courses Enrolled',value:enrolledCourses.length,                                         icon:'📚', from:'from-orange-600', to:'to-orange-700' },
          ].map(stat => (
            <div key={stat.label} className="card card-hover card-lift group">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.from} ${stat.to} rounded-xl flex items-center justify-center text-lg mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main 3-col */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Score Ring */}
          <div className="card flex flex-col items-center">
            <h3 className="font-bold text-white mb-4 self-start text-sm">Overall ATS Score</h3>
            <ScoreRing score={score} />
            <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-bold ${ELIGIBILITY_STYLE[eligibility] || ELIGIBILITY_STYLE['Low']}`}>
              {eligibility} Eligibility
            </div>
            <p className="text-slate-500 text-xs mt-3 text-center leading-relaxed">
              {score >= 75 ? "Strong candidate! Keep polishing your resume." :
               score >= 50 ? "Good foundation! A few more skills will help." :
               score >= 30 ? "On the right track. Focus on missing skills." :
               "Start building required skills to improve."}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="card">
            <h3 className="font-bold text-white mb-4 text-sm">Score Breakdown</h3>
            <div className="space-y-4">
              {breakdownData.map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">{item.name}</span>
                    <span className="font-bold" style={{ color:item.color }}>{item.value}/{item.max}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width:`${(item.value/item.max)*100}%`, backgroundColor:item.color, boxShadow:`0 0 8px ${item.color}60` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Required Skills Coverage</p>
              <p className="text-2xl font-extrabold text-blue-400 mt-1">{requiredCoverage}%</p>
            </div>
          </div>

          {/* Skills Pie */}
          <div className="card">
            <h3 className="font-bold text-white mb-4 text-sm">Required Skills Status</h3>
            <div className="flex justify-center">
              <PieChart width={160} height={160}>
                <Pie data={skillPieData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {skillPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="flex justify-center gap-8 mt-2">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-blue-400">{foundRequired.length}</p>
                <p className="text-xs text-slate-500">Found</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-red-400">{missingRequired.length}</p>
                <p className="text-xs text-slate-500">Missing</p>
              </div>
            </div>
            {enrolledCourses.length > 0 && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-xs text-green-400 font-medium">Learning Progress</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width:`${avgProgress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-green-400">{avgProgress}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="card mb-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-yellow-400" /> Personalized Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                  <p className="text-sm text-slate-300">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="card">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" /> Skills You Have
            </h3>
            <div className="flex flex-wrap gap-1.5 stagger-children">
              {foundRequired.map(s => <span key={s} className="skill-badge bg-green-500/20 text-green-400 border border-green-500/20">{s}</span>)}
              {foundNiceToHave.slice(0,5).map(s => <span key={s} className="skill-badge bg-blue-500/20 text-blue-400 border border-blue-500/20">{s}</span>)}
              {foundRequired.length === 0 && <p className="text-slate-500 text-sm">No matching skills found</p>}
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4 text-red-400" /> Skills to Learn
            </h3>
            <div className="flex flex-wrap gap-1.5 stagger-children">
              {missingRequired.map(s => <span key={s} className="skill-badge bg-red-500/20 text-red-400 border border-red-500/20">{s}</span>)}
              {missingNiceToHave.slice(0,4).map(s => <span key={s} className="skill-badge bg-orange-500/20 text-orange-400 border border-orange-500/20">{s}</span>)}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          {[
            { to:'/skills',      icon:Target,       label:'View Skills Gap',  desc:'Detailed skill analysis' },
            { to:'/courses',     icon:BookOpen,     label:'Browse Courses',   desc:'Fill your skill gaps' },
            { to:'/my-courses',  icon:GraduationCap,label:'My Learning',      desc:'Track your progress' },
          ].map(({ to, icon:Icon, label, desc }) => (
            <Link key={to} to={to} className="card card-hover card-lift text-center group block">
              <Icon className="w-7 h-7 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <p className="font-bold text-white text-sm">{label}</p>
              <p className="text-slate-500 text-xs mt-1">{desc}</p>
            </Link>
          ))}
        </div>

        {/* History */}
        {analysisHistory && analysisHistory.length >= 1 && (
          <div className="card mt-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-slate-400" /> Past Analysis Records
              <span className="badge bg-white/5 text-slate-400 border border-white/10">{analysisHistory.length}</span>
            </h3>
            <div className="space-y-2">
              {analysisHistory.map((record, i) => {
                const sc = record.score
                const col = sc >= 75 ? 'text-green-400' : sc >= 50 ? 'text-yellow-400' : 'text-red-400'
                const bg  = sc >= 75 ? 'bg-green-500/10 border-green-500/20' : sc >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-red-500/10 border-red-500/20'
                return (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${bg}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xs ${bg} border ${col}`}>{sc}%</div>
                      <div>
                        <p className="font-semibold text-white text-sm">{record.jobRole}</p>
                        <p className="text-xs text-slate-500">
                          {record.analyzedAt ? new Date(record.analyzedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}
                          {' · '}{record.eligibility} eligibility
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${col}`}>{sc}%</p>
                      <p className="text-xs text-slate-500">{record.foundRequired?.length || 0} skills</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
