import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { extractTextFromCertificate, verifyCertificateContent } from '../utils/certVerifier'

// Course URLs (same as Courses.jsx)
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

function CourseProgressCard({ course, progress, onVerify }) {
  const [showCertUpload, setShowCertUpload] = useState(false)
  const [certFile, setCertFile]             = useState(null)
  const [certPreview, setCertPreview]       = useState(null)
  const [verifying, setVerifying]           = useState(false)
  const [verifyStep, setVerifyStep]         = useState('')
  const [verifyResult, setVerifyResult]     = useState(null)
  const [dragOver, setDragOver]             = useState(false)
  const isCompleted = progress === 100

  const levelColor = {
    Beginner:     'bg-green-500/15 text-green-400 border-green-500/20',
    Intermediate: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    Advanced:     'bg-red-500/15 text-red-400 border-red-500/20',
  }
  const progressColor = progress >= 75 ? 'from-green-500 to-emerald-500'
    : progress >= 50 ? 'from-blue-500 to-blue-600'
    : progress >= 25 ? 'from-yellow-500 to-orange-500'
    : 'from-slate-600 to-slate-700'
  const statusLabel = isCompleted ? '✅ Completed' : progress > 0 ? '🔄 In Progress' : '⏳ Not Started'

  const handleCertFile = (f) => {
    if (!f) return
    setCertFile(f); setVerifyResult(null)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = e => setCertPreview(e.target.result)
      reader.readAsDataURL(f)
    } else { setCertPreview(null) }
  }

  const handleVerify = async () => {
    if (!certFile) return
    setVerifying(true); setVerifyResult(null)
    setVerifyStep('Checking file type...')
    const isImage = certFile.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(certFile.name)
    const isPDF   = certFile.type === 'application/pdf' || certFile.name.toLowerCase().endsWith('.pdf')
    if (!isImage && !isPDF) { setVerifyResult({ success:false, message:'❌ Invalid file type. Only JPG, PNG, or PDF.' }); setVerifying(false); return }
    if (certFile.size < 5000) { setVerifyResult({ success:false, message:'❌ File too small (min 5 KB).' }); setVerifying(false); return }
    if (certFile.size > 25*1024*1024) { setVerifyResult({ success:false, message:'❌ File too large (max 25 MB).' }); setVerifying(false); return }
    setVerifyStep('Validating file integrity...')
    try {
      const buf = await certFile.slice(0,8).arrayBuffer(); const b = new Uint8Array(buf)
      const ok = (b[0]===0x25&&b[1]===0x50&&b[2]===0x44&&b[3]===0x46)||(b[0]===0xFF&&b[1]===0xD8)||(b[0]===0x89&&b[1]===0x50&&b[2]===0x4E&&b[3]===0x47)||(b[0]===0x52&&b[1]===0x49&&b[2]===0x46&&b[3]===0x46)
      if (!ok) { setVerifyResult({ success:false, message:'❌ Not a real image or PDF. Upload the actual certificate.' }); setVerifying(false); return }
    } catch {}
    setVerifyStep(isImage ? 'Reading certificate image (OCR)...' : 'Reading certificate PDF...')
    const text = await extractTextFromCertificate(certFile)
    setVerifyStep('Verifying certificate content...')
    const result = verifyCertificateContent(text, course)
    if (result.valid) { setVerifyResult({ success:true, message:`✅ ${result.message}` }); onVerify(course.id) }
    else { setVerifyResult({ success:false, message:`❌ ${result.message}` }) }
    setVerifyStep(''); setVerifying(false)
  }

  return (
    <div className={`card animate-fade-in transition-all duration-300 ${isCompleted ? 'border-green-500/20 bg-green-500/5' : ''}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl flex-shrink-0">{course.image}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-sm leading-tight">{course.title}</h3>
            <span className={`badge flex-shrink-0 border ${levelColor[course.level] || 'bg-white/5 text-slate-400 border-white/10'}`}>{course.level}</span>
          </div>
          <p className="text-slate-500 text-xs mt-1">{course.provider} · {course.duration}</p>
          <p className="text-xs text-slate-500 mt-0.5">Skill: <span className="font-medium text-blue-400">{course.skill}</span></p>
          <p className="text-xs mt-1 font-semibold text-slate-400">{statusLabel}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-slate-400">Course Progress</span>
          <span className="text-xs font-bold text-blue-400">{progress}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`} style={{ width:`${progress}%` }} />
        </div>
        <p className="text-xs text-slate-600 mt-1.5">Progress updates when you submit your completion certificate.</p>
      </div>

      <div className="flex gap-2 mb-4">
        <a href={COURSE_URLS[course.id]||'#'} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-2 text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-500/25 transition-colors">
          {progress === 0 ? '▶ Start Course ↗' : '↗ Continue on Platform'}
        </a>
        {!isCompleted && (
          <button onClick={() => setShowCertUpload(!showCertUpload)}
            className="flex-1 py-2 text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/20 rounded-xl hover:bg-green-500/25 transition-colors">
            🏆 Submit Certificate
          </button>
        )}
      </div>

      {showCertUpload && !isCompleted && (
        <div className="border border-dashed border-green-500/30 rounded-xl p-4 bg-green-500/5 animate-fade-in">
          <p className="text-xs font-bold text-green-400 mb-1">Upload Your Completion Certificate</p>
          <p className="text-xs text-green-400/60 mb-3">Complete on <span className="font-semibold">{course.provider}</span>, download your certificate, then upload here.</p>
          <div
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 mb-3
              ${dragOver ? 'border-green-400 bg-green-500/15' : certFile ? 'border-green-400/50 bg-green-500/8' : 'border-white/10 hover:border-green-400/40'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleCertFile(e.dataTransfer.files[0]) }}
            onClick={() => document.getElementById(`cert-${course.id}`).click()}
          >
            <input id={`cert-${course.id}`} type="file" accept="image/*,.pdf" className="hidden" onChange={e => handleCertFile(e.target.files[0])} />
            {certFile ? (
              <div>
                {certPreview && <img src={certPreview} alt="Certificate preview" className="w-full max-h-32 object-contain rounded-lg border border-green-500/20 bg-black/20 shadow-sm mb-2" />}
                {!certPreview && <p className="text-xl mb-1">📄</p>}
                <p className="font-semibold text-green-400 text-xs">{certFile.name}</p>
                <p className="text-green-400/60 text-xs">{(certFile.size/1024).toFixed(1)} KB</p>
                <button onClick={() => { setCertFile(null); setCertPreview(null); setVerifyResult(null) }}
                  className="mt-1 text-xs text-slate-500 hover:text-red-400 transition-colors">Remove</button>
              </div>
            ) : (
              <div>
                <p className="text-xl mb-1">📎</p>
                <p className="text-xs text-slate-400 font-medium">Drop certificate or click to browse</p>
                <p className="text-xs text-slate-600 mt-0.5">JPG, PNG, PDF</p>
              </div>
            )}
          </div>

          {certFile && !verifyResult && (
            <button onClick={handleVerify} disabled={verifying}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all duration-200
                ${verifying ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white active:scale-95'}`}>
              {verifying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {verifyStep || 'Verifying...'}
                </span>
              ) : '🔍 Verify Certificate Content'}
            </button>
          )}

          {verifyResult && (
            <div className={`mt-3 p-3 rounded-xl text-xs font-medium animate-fade-in
              ${verifyResult.success ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {verifyResult.message}
            </div>
          )}
        </div>
      )}

      {isCompleted && (
        <div className="p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20 rounded-xl text-center animate-fade-in">
          <p className="text-2xl mb-1">🏆</p>
          <p className="font-extrabold text-green-400 text-sm">Course Completed!</p>
          <p className="text-green-400/60 text-xs mt-1">Certificate verified · Skill added to your profile</p>
        </div>
      )}
    </div>
  )
}

export default function MyCourses() {
  const { enrolledCourses, courseProgress, updateProgress } = useApp()

  const handleVerify = (courseId) => {
    updateProgress(courseId, 100)
  }

  const completed = enrolledCourses.filter(c => (courseProgress[c.id] || 0) === 100)
  const inProgress = enrolledCourses.filter(c => (courseProgress[c.id] || 0) > 0 && (courseProgress[c.id] || 0) < 100)
  const notStarted = enrolledCourses.filter(c => (courseProgress[c.id] || 0) === 0)

  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a, b) => a + b, 0) / enrolledCourses.length)
    : 0

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in space-y-5">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl mx-auto">🎓</div>
          <h2 className="text-2xl font-extrabold text-white">No Courses Yet</h2>
          <p className="text-slate-400">Enroll in courses to start your learning journey and fill your skill gaps</p>
          <Link to="/courses" className="btn-primary">Browse Courses →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">My Learning</h1>
            <p className="page-subtitle">Complete courses on their platforms, then submit your certificate here</p>
          </div>
          <Link to="/courses" className="btn-secondary text-xs">+ Add Courses</Link>
        </div>

        {/* How it works */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">ℹ️</span>
          <div>
            <p className="font-bold text-blue-300 text-sm mb-1">How course completion works</p>
            <ol className="text-xs text-blue-300/70 space-y-0.5">
              <li>1. Click <strong className="text-blue-300">"Start Course"</strong> to go to the platform and complete it</li>
              <li>2. Download your <strong className="text-blue-300">completion certificate</strong> from the platform</li>
              <li>3. Click <strong className="text-blue-300">"Submit Certificate"</strong> and upload it here for verification</li>
              <li>4. Once verified, your progress updates to <strong className="text-blue-300">100% automatically</strong></li>
            </ol>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
          {[
            { label:'Total Enrolled', value:enrolledCourses.length, icon:'📚', from:'from-blue-600',   to:'to-blue-700' },
            { label:'Completed',      value:completed.length,       icon:'🏆', from:'from-green-600',  to:'to-green-700' },
            { label:'In Progress',    value:inProgress.length,      icon:'🔄', from:'from-yellow-600', to:'to-orange-600' },
            { label:'Avg Progress',   value:`${avgProgress}%`,      icon:'📈', from:'from-purple-600', to:'to-purple-700' },
          ].map(stat => (
            <div key={stat.label} className="card">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.from} ${stat.to} rounded-xl flex items-center justify-center text-lg mb-3 shadow-lg`}>{stat.icon}</div>
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Overall progress */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-sm">Overall Learning Progress</h3>
            <span className="text-xl font-extrabold text-blue-400">{avgProgress}%</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width:`${avgProgress}%` }} />
          </div>
        </div>

        {/* Course sections */}
        {notStarted.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-slate-400 mb-4 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-slate-500 rounded-full" /> Not Started ({notStarted.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {notStarted.map(course => <CourseProgressCard key={course.id} course={course} progress={courseProgress[course.id]||0} onVerify={handleVerify} />)}
            </div>
          </div>
        )}
        {inProgress.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-yellow-400 mb-4 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" /> In Progress ({inProgress.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {inProgress.map(course => <CourseProgressCard key={course.id} course={course} progress={courseProgress[course.id]||0} onVerify={handleVerify} />)}
            </div>
          </div>
        )}
        {completed.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-green-400 mb-4 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> Completed ({completed.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {completed.map(course => <CourseProgressCard key={course.id} course={course} progress={courseProgress[course.id]||0} onVerify={handleVerify} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
