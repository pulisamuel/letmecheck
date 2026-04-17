import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { COURSES_DB, JOB_ROLES } from '../utils/resumeAnalyzer'

// Real course URLs mapped by course id
const COURSE_URLS = {
  fe1: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
  fe2: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
  fe3: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
  fe4: 'https://frontendmasters.com/courses/typescript-v4/',
  fe5: 'https://www.udemy.com/course/nextjs-react-the-complete-guide/',
  be1: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
  be2: 'https://www.coursera.org/specializations/python',
  be3: 'https://www.udemy.com/course/the-complete-sql-bootcamp/',
  be4: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
  be5: 'https://www.pluralsight.com/courses/rest-api-design',
  ds1: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
  ds2: 'https://www.udemy.com/course/machinelearning/',
  ds3: 'https://www.coursera.org/specializations/deep-learning',
  ds4: 'https://www.edx.org/course/statistics-and-data-science',
  ds5: 'https://www.coursera.org/learn/python-for-applied-data-science-ai',
  fs1: 'https://www.udemy.com/course/mern-stack-front-to-back/',
  fs2: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
  fs3: 'https://nextjs.org/learn',
  fs4: 'https://www.udemy.com/course/the-complete-sql-bootcamp/',
  do1: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03',
  do2: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
  do3: 'https://www.pluralsight.com/courses/continuous-integration-delivery',
  do4: 'https://www.udemy.com/course/linux-administration-bootcamp/',
  ux1: 'https://www.coursera.org/professional-certificates/google-ux-design',
  ux2: 'https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/',
  ux3: 'https://www.interaction-design.org/courses/user-research-methods-and-best-practices',
  ux4: 'https://designcode.io/figma-handbook',
  ml1: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
  ml2: 'https://course.fast.ai/',
  ml3: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops',
  ml4: 'https://huggingface.co/learn/nlp-course/chapter1/1',
  cs1: 'https://www.udemy.com/course/comptia-security-sy0-601-complete-course-exam/',
  cs2: 'https://www.udemy.com/course/learn-ethical-hacking-from-scratch/',
  cs3: 'https://www.cybrary.it/course/soc-analyst/',
  cs4: 'https://www.pluralsight.com/courses/linux-security-fundamentals',
  pm1: 'https://www.coursera.org/learn/uva-darden-digital-product-management',
  pm2: 'https://www.udemy.com/course/agile-fundamentals-scrum-kanban-scrumban/',
  pm3: 'https://mode.com/sql-tutorial/',
  pm4: 'https://www.pluralsight.com/courses/user-story-mapping',
  da1: 'https://www.coursera.org/professional-certificates/google-data-analytics',
  da2: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
  da3: 'https://www.tableau.com/learn/training',
  da4: 'https://www.coursera.org/learn/excel-data-analysis',
}

function CourseCard({ course, enrolled, onEnroll }) {
  const [showModal, setShowModal] = useState(false)

  const levelColor = {
    Beginner:     'bg-green-500/15 text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    Advanced:     'bg-red-500/15 text-red-400 border-red-500/20',
  }

  return (
    <>
      <div className="card card-hover card-lift flex flex-col animate-fade-in">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{course.image}</div>
          <span className={`badge border ${levelColor[course.level] || 'bg-white/5 text-slate-400 border-white/10'}`}>{course.level}</span>
        </div>
        <h3 className="font-bold text-white mb-1 leading-tight text-sm">{course.title}</h3>
        <p className="text-slate-500 text-xs mb-3 leading-relaxed">{course.description}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span>🏫 {course.provider}</span>
          <span>⏱️ {course.duration}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="font-semibold text-white text-xs">{course.rating}</span>
          <span className="text-slate-500 text-xs">({(course.students/1000).toFixed(0)}k students)</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className={`font-bold text-xs ${course.free ? 'text-green-400' : 'text-slate-300'}`}>{course.price}</span>
          {enrolled ? (
            <div className="flex gap-2">
              <a href={COURSE_URLS[course.id] || '#'} target="_blank" rel="noopener noreferrer"
                className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-500/25 transition-colors">
                Go to Course ↗
              </a>
              <Link to="/my-courses" className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-500/25 transition-colors">
                ✓ Enrolled
              </Link>
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}
              className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg font-semibold transition-all duration-200 active:scale-95">
              Enroll Now →
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center mb-5">
              <div className="text-4xl mb-3">{course.image}</div>
              <h3 className="text-lg font-extrabold text-white mb-1">{course.title}</h3>
              <p className="text-slate-400 text-xs">{course.provider} · {course.duration} · {course.price}</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-blue-300 mb-2">📋 What happens next:</p>
              <ol className="text-xs text-blue-300/80 space-y-1.5">
                <li className="flex gap-2"><span className="font-bold">1.</span> We'll track this course in your learning dashboard</li>
                <li className="flex gap-2"><span className="font-bold">2.</span> You'll be taken to <span className="font-semibold">{course.provider}</span> to complete enrollment</li>
                <li className="flex gap-2"><span className="font-bold">3.</span> After finishing, upload your certificate here to verify</li>
              </ol>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => {
                onEnroll(course); setShowModal(false)
                window.open(COURSE_URLS[course.id] || `https://www.google.com/search?q=${encodeURIComponent(course.title+' '+course.provider)}`, '_blank', 'noopener,noreferrer')
              }} className="btn-primary flex-1">Enroll & Open ↗</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Courses() {
  const { analysisResult, enrolledCourses, enrollCourse } = useApp()
  const [selectedRole, setSelectedRole] = useState(analysisResult?.jobRole || Object.keys(COURSES_DB)[0])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const courses = COURSES_DB[selectedRole] || []
  const filtered = courses.filter(c => {
    const matchFilter = filter === 'All' || c.level === filter || (filter === 'Free' && c.free)
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.skill.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handleEnroll = (course) => {
    enrollCourse(course)
    setToast(`Enrolled in "${course.title}"`)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="page-header">
          <h1 className="page-title">Course Library</h1>
          <p className="page-subtitle">Curated courses to help you land your dream job — click Enroll to go directly to the platform</p>
        </div>

        {/* Role Selector */}
        <div className="card mb-5">
          <p className="text-xs font-semibold text-slate-400 mb-3">Browse by Job Role</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(COURSES_DB).map(role => (
              <button key={role} onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200
                  ${selectedRole === role
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 border border-white/8 hover:border-white/20 hover:text-white'}`}>
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input type="text" placeholder="Search courses..." value={search}
            onChange={e => setSearch(e.target.value)} className="input-field max-w-xs" />
          <div className="flex gap-2 flex-wrap">
            {['All','Beginner','Intermediate','Advanced','Free'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                  ${filter === f
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/5 border border-white/8 text-slate-400 hover:border-white/20 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Skills gap hint */}
        {analysisResult && selectedRole === analysisResult.jobRole && analysisResult.missingRequired.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-5 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-semibold text-yellow-400 text-sm">Skills you need to learn for {selectedRole}:</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {analysisResult.missingRequired.map(skill => (
                  <span key={skill} className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl font-semibold toast-enter z-50 flex items-center gap-2">
            ✅ {toast}
          </div>
        )}

        {/* Courses Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course}
                enrolled={enrolledCourses.some(c => c.id === course.id)} onEnroll={handleEnroll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500">No courses found matching your search</p>
          </div>
        )}

        {enrolledCourses.length > 0 && (
          <div className="mt-8 text-center">
            <Link to="/my-courses" className="btn-primary">
              🎓 View My Enrolled Courses ({enrolledCourses.length})
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
