import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PieChart, Pie, Cell } from 'recharts'

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animated / 100) * circumference
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : score >= 30 ? '#f97316' : '#ef4444'

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="16" />
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-extrabold" style={{ color }}>{animated}%</p>
        <p className="text-xs text-slate-500 font-medium">ATS Score</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { analysisResult, enrolledCourses, courseProgress, analysisHistory } = useApp()

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-7xl mb-6">📊</div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">No Analysis Yet</h2>
          <p className="text-slate-500 mb-6">Upload your resume and select a job role to see your personalized dashboard</p>
          <Link to="/analyze" className="btn-primary">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { score, eligibility, eligibilityColor, jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, breakdown, recommendations, requiredCoverage, experienceYears } = analysisResult

  const eligibilityBadge = {
    High: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Low-Medium': 'bg-orange-100 text-orange-700 border-orange-200',
    Low: 'bg-red-100 text-red-700 border-red-200',
  }

  const breakdownData = [
    { name: 'Required Skills', value: breakdown.requiredSkills, fill: '#3b82f6', max: 60 },
    { name: 'Bonus Skills', value: breakdown.niceToHave, fill: '#8b5cf6', max: 20 },
    { name: 'Experience', value: breakdown.experience, fill: '#22c55e', max: 20 },
  ]

  const skillPieData = [
    { name: 'Found', value: foundRequired.length, fill: '#3b82f6' },
    { name: 'Missing', value: missingRequired.length, fill: '#e2e8f0' },
  ]

  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a, b) => a + b, 0) / enrolledCourses.length)
    : 0

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">My Dashboard</h1>
            <p className="text-slate-500 mt-1">Analysis for <span className="font-semibold text-primary-600">{jobRole}</span></p>
          </div>
          <Link to="/analyze" className="btn-secondary text-sm">Re-analyze →</Link>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
          {[
            { label: 'ATS Score', value: `${score}%`, icon: '🎯', color: 'from-blue-500 to-blue-600' },
            { label: 'Eligibility', value: eligibility, icon: '✅', color: 'from-purple-500 to-purple-600' },
            { label: 'Skills Found', value: `${foundRequired.length}/${foundRequired.length + missingRequired.length}`, icon: '💡', color: 'from-green-500 to-green-600' },
            { label: 'Courses Enrolled', value: enrolledCourses.length, icon: '📚', color: 'from-orange-500 to-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="card card-lift">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl mb-3 shadow-md transition-transform duration-200 group-hover:scale-110`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Score Ring */}
          <div className="card flex flex-col items-center">
            <h3 className="font-bold text-slate-800 mb-4 self-start">Overall ATS Score</h3>
            <ScoreRing score={score} />
            <div className={`mt-4 px-4 py-2 rounded-full border text-sm font-bold ${eligibilityBadge[eligibility] || eligibilityBadge['Low']}`}>
              {eligibility} Eligibility
            </div>
            <p className="text-slate-500 text-xs mt-3 text-center">
              {score >= 75 ? "You're a strong candidate! Keep polishing your resume." :
               score >= 50 ? "Good foundation! A few more skills will make you stand out." :
               score >= 30 ? "You're on the right track. Focus on the missing skills." :
               "Start building the required skills to improve your score."}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {breakdownData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">{item.name}</span>
                    <span className="font-bold" style={{ color: item.fill }}>{item.value}/{item.max}</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: item.fill }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">Required Skills Coverage</p>
              <p className="text-2xl font-extrabold text-primary-600 mt-1">{requiredCoverage}%</p>
            </div>
          </div>

          {/* Skills Pie */}
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4">Required Skills Status</h3>
            <div className="flex justify-center">
              <PieChart width={160} height={160}>
                <Pie data={skillPieData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {skillPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-primary-600">{foundRequired.length}</p>
                <p className="text-xs text-slate-500">Found</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-red-400">{missingRequired.length}</p>
                <p className="text-xs text-slate-500">Missing</p>
              </div>
            </div>
            {enrolledCourses.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs text-green-700 font-medium">Learning Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${avgProgress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-green-700">{avgProgress}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              💡 Personalized Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-slate-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              ✅ Skills You Have
            </h3>
            <div className="flex flex-wrap gap-2 stagger-children">
              {foundRequired.map(skill => (
                <span key={skill} className="skill-badge bg-green-100 text-green-700 border border-green-200">{skill}</span>
              ))}
              {foundNiceToHave.slice(0, 5).map(skill => (
                <span key={skill} className="skill-badge bg-blue-100 text-blue-700 border border-blue-200">{skill}</span>
              ))}
              {foundRequired.length === 0 && <p className="text-slate-400 text-sm">No matching skills found in resume</p>}
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              🎯 Skills to Learn
            </h3>
            <div className="flex flex-wrap gap-2 stagger-children">
              {missingRequired.map(skill => (
                <span key={skill} className="skill-badge bg-red-100 text-red-700 border border-red-200">{skill}</span>
              ))}
              {missingNiceToHave.slice(0, 4).map(skill => (
                <span key={skill} className="skill-badge bg-orange-100 text-orange-700 border border-orange-200">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          <Link to="/skills" className="card card-lift hover:shadow-md transition-all duration-200 text-center group">
            <div className="text-3xl mb-2 transition-transform duration-200 group-hover:scale-110">🎯</div>
            <p className="font-bold text-slate-800">View Skills Gap</p>
            <p className="text-slate-500 text-sm mt-1">See detailed skill analysis</p>
          </Link>
          <Link to="/courses" className="card card-lift hover:shadow-md transition-all duration-200 text-center group">
            <div className="text-3xl mb-2 transition-transform duration-200 group-hover:scale-110">📚</div>
            <p className="font-bold text-slate-800">Browse Courses</p>
            <p className="text-slate-500 text-sm mt-1">Find courses to fill gaps</p>
          </Link>
          <Link to="/my-courses" className="card card-lift hover:shadow-md transition-all duration-200 text-center group">
            <div className="text-3xl mb-2 transition-transform duration-200 group-hover:scale-110">🎓</div>
            <p className="font-bold text-slate-800">My Learning</p>
            <p className="text-slate-500 text-sm mt-1">Track your progress</p>
          </Link>
        </div>

        {/* Past Analysis History */}
        {analysisHistory && analysisHistory.length > 1 && (
          <div className="card mt-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              🕐 Past Analysis Records
              <span className="badge bg-slate-100 text-slate-600">{analysisHistory.length}</span>
            </h3>
            <div className="space-y-2">
              {analysisHistory.map((record, i) => {
                const scoreColor = record.score >= 75 ? 'text-green-600' : record.score >= 50 ? 'text-yellow-600' : 'text-red-500'
                const bgColor = record.score >= 75 ? 'bg-green-50 border-green-100' : record.score >= 50 ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'
                return (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${bgColor} transition-all`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm ${bgColor} border ${scoreColor}`}>
                        {record.score}%
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{record.jobRole}</p>
                        <p className="text-xs text-slate-400">
                          {record.analyzedAt ? new Date(record.analyzedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                          {' · '}{record.eligibility} eligibility
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${scoreColor}`}>{record.score}%</p>
                      <p className="text-xs text-slate-400">{record.foundRequired?.length || 0} skills matched</p>
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
