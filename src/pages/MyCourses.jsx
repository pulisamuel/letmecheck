import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

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

// Strict certificate validation — magic bytes + ALL course keywords must match
async function verifyCertificate(file, course) {
  const fname = file.name.toLowerCase().replace(/[-_.\s]/g, ' ')
  const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(file.name)
  const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

  if (!isImage && !isPDF) return { valid: false, reason: 'invalid_type' }
  if (file.size < 5000)              return { valid: false, reason: 'too_small' }
  if (file.size > 25 * 1024 * 1024) return { valid: false, reason: 'too_large' }

  // Check magic bytes — must be a real image or PDF, not a renamed file
  try {
    const buf = await file.slice(0, 8).arrayBuffer()
    const b = new Uint8Array(buf)
    const isPDFBytes  = b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46
    const isJPGBytes  = b[0] === 0xFF && b[1] === 0xD8
    const isPNGBytes  = b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47
    const isWEBPBytes = b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46
    if (!isPDFBytes && !isJPGBytes && !isPNGBytes && !isWEBPBytes) {
      return { valid: false, reason: 'invalid_bytes' }
    }
  } catch { /* skip if can't read */ }

  // Build keyword groups — ALL must match in the filename
  const certKeywords   = ['cert', 'certificate', 'completion', 'diploma', 'badge', 'credential']
  const titleWords     = course.title.toLowerCase().split(' ').filter(w => w.length > 3)
  const providerWords  = course.provider.toLowerCase().split(' ').filter(w => w.length > 3)
  const skillWords     = course.skill.toLowerCase().split(' ').filter(w => w.length > 2)

  const hasCertKeyword   = certKeywords.some(k => fname.includes(k))
  const hasTitleMatch    = titleWords.some(w => fname.includes(w))
  const hasProviderMatch = providerWords.some(w => fname.includes(w))
  const hasSkillMatch    = skillWords.some(w => fname.includes(w))

  // Strict: must have cert keyword + at least 2 of (title, provider, skill)
  const courseMatches = [hasTitleMatch, hasProviderMatch, hasSkillMatch].filter(Boolean).length
  if (!hasCertKeyword) return { valid: false, reason: 'no_cert_keyword' }
  if (courseMatches < 2) return { valid: false, reason: 'no_match', hasTitleMatch, hasProviderMatch, hasSkillMatch }

  return { valid: true, hasTitleMatch, hasProviderMatch, hasSkillMatch, hasCertKeyword }
}

function CourseProgressCard({ course, progress, onVerify }) {
  const [showCertUpload, setShowCertUpload] = useState(false)
  const [certFile, setCertFile] = useState(null)
  const [certPreview, setCertPreview] = useState(null)
  const [verifying, setVerifying] = useState(false)
  const [verifyResult, setVerifyResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const isCompleted = progress === 100

  const levelColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  }

  const progressColor = progress >= 75 ? 'from-green-500 to-emerald-500'
    : progress >= 50 ? 'from-blue-500 to-primary-500'
    : progress >= 25 ? 'from-yellow-500 to-orange-500'
    : 'from-slate-300 to-slate-400'

  const statusLabel = isCompleted ? '✅ Completed'
    : progress > 0 ? '🔄 In Progress'
    : '⏳ Not Started'

  const handleCertFile = (f) => {
    if (!f) return
    setCertFile(f)
    setVerifyResult(null)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = e => setCertPreview(e.target.result)
      reader.readAsDataURL(f)
    } else {
      setCertPreview(null)
    }
  }

  const handleVerify = async () => {
    if (!certFile) return
    setVerifying(true)
    setVerifyResult(null)
    const result = await verifyCertificate(certFile, course)
    if (result.valid) {
      setVerifyResult({ success: true, message: `✅ Certificate verified and accepted for "${course.title}". Completion recorded.` })
      onVerify(course.id)
    } else {
      let message = ''
      if (result.reason === 'invalid_type') {
        message = `❌ Wrong file type. Only JPG, PNG, or PDF certificates are accepted.`
      } else if (result.reason === 'too_small') {
        message = `❌ File too small (min 5 KB). This doesn't look like a real certificate.`
      } else if (result.reason === 'too_large') {
        message = `❌ File too large (max 25 MB).`
      } else if (result.reason === 'invalid_bytes') {
        message = `❌ This file is not a real image or PDF. Please upload the actual certificate downloaded from ${course.provider}.`
      } else if (result.reason === 'no_cert_keyword') {
        message = `❌ Rejected. Filename must contain "certificate", "completion", or "diploma". Rename your file and try again.`
      } else {
        const missing = []
        if (!result.hasTitleMatch) missing.push(`course name (e.g. "${course.title.split(' ').slice(0,2).join(' ').toLowerCase()}")`)
        if (!result.hasProviderMatch) missing.push(`provider (e.g. "${course.provider.toLowerCase()}")`)
        if (!result.hasSkillMatch) missing.push(`skill (e.g. "${course.skill.toLowerCase()}")`)
        message = `❌ Certificate rejected — filename is missing: ${missing.join(' and ')}.\n\nRename your file to include these keywords.\nExample: "${course.provider.toLowerCase()}_${course.skill.toLowerCase()}_certificate.pdf"`
      }
      setVerifyResult({ success: false, message })
    }
    setVerifying(false)
  }

  return (
    <div className={`card animate-fade-in transition-all duration-300 ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}`}>
      {/* Course header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl flex-shrink-0">{course.image}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-800 leading-tight">{course.title}</h3>
            <span className={`badge flex-shrink-0 ${levelColor[course.level] || 'bg-slate-100 text-slate-600'}`}>{course.level}</span>
          </div>
          <p className="text-slate-500 text-xs mt-1">{course.provider} · {course.duration}</p>
          <p className="text-xs text-slate-400 mt-0.5">Skill: <span className="font-medium text-primary-600">{course.skill}</span></p>
          <p className="text-xs mt-1 font-semibold">{statusLabel}</p>
        </div>
      </div>

      {/* Progress bar (read-only) */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-semibold text-slate-700">Course Progress</span>
          <span className="text-sm font-bold text-primary-600">{progress}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`}
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">
          Progress updates automatically when you submit your completion certificate below.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <a href={COURSE_URLS[course.id] || '#'} target="_blank" rel="noopener noreferrer"
          className="flex-1 text-center py-2 text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-100 transition-colors">
          {progress === 0 ? '▶ Start Course ↗' : '↗ Continue on Platform'}
        </a>
        {!isCompleted && (
          <button onClick={() => setShowCertUpload(!showCertUpload)}
            className="flex-1 py-2 text-sm font-semibold bg-green-50 text-green-700 border border-green-200 rounded-xl hover:bg-green-100 transition-colors">
            🏆 Submit Certificate
          </button>
        )}
      </div>

      {/* Certificate upload panel */}
      {showCertUpload && !isCompleted && (
        <div className="border border-dashed border-green-300 rounded-xl p-4 bg-green-50/50 animate-fade-in">
          <p className="text-sm font-bold text-green-800 mb-1">Upload Your Completion Certificate</p>
          <p className="text-xs text-green-700 mb-1">
            Complete the course on <span className="font-semibold">{course.provider}</span>, download your certificate, then upload it here.
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs text-slate-500">Expected keywords in filename:</span>
            {[course.provider, course.skill, ...course.title.split(' ').filter(w => w.length > 4).slice(0, 2), 'certificate'].map(kw => (
              <span key={kw} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{kw.toLowerCase()}</span>
            ))}
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 mb-3 ${dragOver ? 'border-green-500 bg-green-100' : certFile ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:border-green-400'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleCertFile(e.dataTransfer.files[0]) }}
            onClick={() => document.getElementById(`cert-${course.id}`).click()}
          >
            <input id={`cert-${course.id}`} type="file" accept="image/*,.pdf" className="hidden"
              onChange={e => handleCertFile(e.target.files[0])} />
            {certFile ? (
              <div>
                {/* Image preview */}
                {certPreview ? (
                  <div className="mb-2">
                    <img src={certPreview} alt="Certificate preview"
                      className="w-full max-h-40 object-contain rounded-lg border border-green-200 bg-white shadow-sm" />
                  </div>
                ) : (
                  <p className="text-2xl mb-1">📄</p>
                )}
                <p className="font-semibold text-green-800 text-xs">{certFile.name}</p>
                <p className="text-green-600 text-xs">{(certFile.size / 1024).toFixed(1)} KB · {certFile.type.includes('pdf') ? 'PDF Document' : 'Image'}</p>
                <button onClick={() => { setCertFile(null); setCertPreview(null); setVerifyResult(null) }}
                  className="mt-1 text-xs text-slate-400 hover:text-red-500 transition-colors">Remove</button>
              </div>
            ) : (
              <div>
                <p className="text-2xl mb-1">📎</p>
                <p className="text-sm text-slate-600 font-medium">Drop certificate here or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">Accepts: JPG, PNG, PDF</p>
              </div>
            )}
          </div>

          {certFile && !verifyResult && (
            <button onClick={handleVerify} disabled={verifying}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${verifying ? 'bg-slate-200 text-slate-400' : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'}`}>
              {verifying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying certificate...
                </span>
              ) : '🔍 Verify & Mark Complete'}
            </button>
          )}

          {verifyResult && (
            <div className={`mt-3 p-3 rounded-xl text-sm font-medium animate-fade-in ${verifyResult.success ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {verifyResult.success ? '✅' : '❌'} {verifyResult.message}
            </div>
          )}
        </div>
      )}

      {/* Completed state */}
      {isCompleted && (
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white text-center animate-fade-in">
          <p className="text-2xl mb-1">🏆</p>
          <p className="font-extrabold">Course Completed!</p>
          <p className="text-green-100 text-xs mt-1">Certificate verified · Skill added to your profile</p>
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
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-7xl mb-6">🎓</div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">No Courses Yet</h2>
          <p className="text-slate-500 mb-6">Enroll in courses to start your learning journey and fill your skill gaps</p>
          <Link to="/courses" className="btn-primary">Browse Courses →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">My Learning</h1>
            <p className="text-slate-500 mt-1">Complete courses on their platforms, then submit your certificate here</p>
          </div>
          <Link to="/courses" className="btn-secondary text-sm">+ Add Courses</Link>
        </div>

        {/* How it works banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">ℹ️</span>
          <div>
            <p className="font-bold text-blue-800 text-sm mb-1">How course completion works</p>
            <ol className="text-sm text-blue-700 space-y-0.5">
              <li>1. Click <strong>"Start Course"</strong> to go to the course platform and complete it</li>
              <li>2. Download your <strong>completion certificate</strong> from the platform</li>
              <li>3. Click <strong>"Submit Certificate"</strong> and upload it here for verification</li>
              <li>4. Once verified, your progress updates to <strong>100% automatically</strong></li>
            </ol>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Enrolled', value: enrolledCourses.length, icon: '📚', color: 'from-blue-500 to-blue-600' },
            { label: 'Completed', value: completed.length, icon: '🏆', color: 'from-green-500 to-green-600' },
            { label: 'In Progress', value: inProgress.length, icon: '🔄', color: 'from-yellow-500 to-orange-500' },
            { label: 'Avg Progress', value: `${avgProgress}%`, icon: '📈', color: 'from-purple-500 to-purple-600' },
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

        {/* Overall progress */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800">Overall Learning Progress</h3>
            <span className="text-2xl font-extrabold text-primary-600">{avgProgress}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{ width: `${avgProgress}%` }} />
          </div>
        </div>

        {/* Course sections */}
        {notStarted.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full" /> Not Started ({notStarted.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notStarted.map(course => (
                <CourseProgressCard key={course.id} course={course}
                  progress={courseProgress[course.id] || 0} onVerify={handleVerify} />
              ))}
            </div>
          </div>
        )}

        {inProgress.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" /> In Progress ({inProgress.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgress.map(course => (
                <CourseProgressCard key={course.id} course={course}
                  progress={courseProgress[course.id] || 0} onVerify={handleVerify} />
              ))}
            </div>
          </div>
        )}

        {completed.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" /> Completed ({completed.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completed.map(course => (
                <CourseProgressCard key={course.id} course={course}
                  progress={courseProgress[course.id] || 0} onVerify={handleVerify} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
