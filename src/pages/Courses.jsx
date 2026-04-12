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
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  }

  const handleEnrollClick = () => {
    setShowModal(true)
  }

  const handleConfirm = () => {
    onEnroll(course)
    setShowModal(false)
    // Open the real course page
    window.open(COURSE_URLS[course.id] || `https://www.google.com/search?q=${encodeURIComponent(course.title + ' ' + course.provider)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col animate-fade-in">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{course.image}</div>
          <span className={`badge ${levelColor[course.level] || 'bg-slate-100 text-slate-600'}`}>{course.level}</span>
        </div>
        <h3 className="font-bold text-slate-800 mb-1 leading-tight">{course.title}</h3>
        <p className="text-slate-500 text-xs mb-3">{course.description}</p>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">🏫 {course.provider}</span>
          <span className="flex items-center gap-1">⏱️ {course.duration}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold text-slate-700 text-sm">{course.rating}</span>
          <span className="text-slate-400 text-xs">({(course.students / 1000).toFixed(0)}k students)</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className={`font-bold text-sm ${course.free ? 'text-green-600' : 'text-slate-700'}`}>
            {course.price}
          </span>
          {enrolled ? (
            <div className="flex gap-2">
              <a
                href={COURSE_URLS[course.id] || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-primary-100 text-primary-700 px-3 py-2 rounded-xl font-semibold border border-primary-200 hover:bg-primary-200 transition-colors"
              >
                Go to Course ↗
              </a>
              <Link to="/my-courses" className="text-sm bg-green-100 text-green-700 px-3 py-2 rounded-xl font-semibold border border-green-200 hover:bg-green-200 transition-colors">
                ✓ Enrolled
              </Link>
            </div>
          ) : (
            <button
              onClick={handleEnrollClick}
              className="text-sm bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary-700 transition-colors active:scale-95"
            >
              Enroll Now →
            </button>
          )}
        </div>
      </div>

      {/* Enroll Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">{course.image}</div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">{course.title}</h3>
              <p className="text-slate-500 text-sm">{course.provider} · {course.duration} · {course.price}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-semibold text-blue-800 mb-2">📋 What happens next:</p>
              <ol className="text-sm text-blue-700 space-y-1.5">
                <li className="flex gap-2"><span className="font-bold">1.</span> We'll track this course in your learning dashboard</li>
                <li className="flex gap-2"><span className="font-bold">2.</span> You'll be taken to <span className="font-semibold">{course.provider}</span> to complete enrollment</li>
                <li className="flex gap-2"><span className="font-bold">3.</span> After finishing, upload your certificate here to verify completion</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 btn-primary"
              >
                Enroll & Open Course ↗
              </button>
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
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Course Library</h1>
          <p className="text-slate-500">Curated courses to help you land your dream job — click Enroll to go directly to the course platform</p>
        </div>

        {/* Role Selector */}
        <div className="card mb-6">
          <p className="text-sm font-semibold text-slate-600 mb-3">Browse by Job Role</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(COURSES_DB).map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field max-w-xs"
          />
          <div className="flex gap-2 flex-wrap">
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'Free'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === f ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Skills gap hint */}
        {analysisResult && selectedRole === analysisResult.jobRole && analysisResult.missingRequired.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">Skills you need to learn for {selectedRole}:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysisResult.missingRequired.map(skill => (
                  <span key={skill} className="badge bg-amber-100 text-amber-700 border border-amber-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold animate-fade-in z-50 flex items-center gap-2">
            ✅ {toast}
          </div>
        )}

        {/* Courses Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                enrolled={enrolledCourses.some(c => c.id === course.id)}
                onEnroll={handleEnroll}
              />
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
