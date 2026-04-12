import React, { useState, useEffect, useRef } from "react"
import { useApp } from "../context/AppContext"
import { getQuestionsForRole, scoreAnswer, INTERVIEW_QUESTIONS } from "../utils/interviewQuestions"
import { JOB_ROLES } from "../utils/resumeAnalyzer"

const PHASES = { SETUP: "setup", BRIEFING: "briefing", INTERVIEW: "interview", RESULT: "result" }
const TYPES = { TECHNICAL: "technical", BEHAVIORAL: "behavioral" }

function TypingText({ text, speed = 18, onDone }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true); onDone && onDone() }
    }, speed)
    return () => clearInterval(id)
  }, [text])
  return <span>{displayed}{!done && <span className="animate-pulse">|</span>}</span>
}

function ScoreBar({ score, label, color }) {
  const [w, setW] = useState(0)
  useEffect(() => { setTimeout(() => setW(score), 200) }, [score])
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${w}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function Interview() {
  const { analysisResult, profile } = useApp()
  const [phase, setPhase] = useState(PHASES.SETUP)
  const [jobRole, setJobRole] = useState(analysisResult?.jobRole || "")
  const [interviewType, setInterviewType] = useState(TYPES.TECHNICAL)
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [scores, setScores] = useState([])
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)
  const [timerActive, setTimerActive] = useState(false)
  const [questionTyped, setQuestionTyped] = useState(false)
  const [showIdeal, setShowIdeal] = useState(false)
  const [roleInput, setRoleInput] = useState(analysisResult?.jobRole || "")
  const [roleSuggestions, setRoleSuggestions] = useState([])
  const [roleError, setRoleError] = useState("")
  const timerRef = useRef(null)
  const textareaRef = useRef(null)

  const allRoles = Object.keys(INTERVIEW_QUESTIONS)

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0 && timerActive) {
      handleSubmitAnswer(true)
    }
    return () => clearTimeout(timerRef.current)
  }, [timerActive, timeLeft])

  const handleRoleInput = (val) => {
    setRoleInput(val)
    setRoleError("")
    if (val.length > 1) {
      const matches = allRoles.filter(r => r.toLowerCase().includes(val.toLowerCase()))
      setRoleSuggestions(matches.slice(0, 6))
    } else {
      setRoleSuggestions([])
    }
  }

  const selectRole = (role) => {
    setRoleInput(role)
    setJobRole(role)
    setRoleSuggestions([])
    setRoleError("")
  }

  const validateAndStart = () => {
    const trimmed = roleInput.trim()
    if (!trimmed) { setRoleError("Please enter a job role"); return }
    const exact = allRoles.find(r => r.toLowerCase() === trimmed.toLowerCase())
    if (exact) {
      setJobRole(exact)
      startInterview(exact)
    } else {
      const partial = allRoles.find(r => r.toLowerCase().includes(trimmed.toLowerCase()))
      if (partial) {
        setJobRole(partial)
        setRoleInput(partial)
        startInterview(partial)
      } else {
        setJobRole(trimmed)
        startInterview(trimmed)
      }
    }
  }

  const startInterview = (role) => {
    const qs = getQuestionsForRole(role)
    const pool = qs[interviewType] || qs.technical || []
    const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 5)
    setQuestions(selected)
    setAnswers([])
    setScores([])
    setCurrentQ(0)
    setCurrentAnswer("")
    setPhase(PHASES.BRIEFING)
  }

  const beginInterview = () => {
    setPhase(PHASES.INTERVIEW)
    setTimeLeft(120)
    setTimerActive(true)
    setQuestionTyped(false)
    setShowHint(false)
    setShowIdeal(false)
  }

  const handleSubmitAnswer = (timedOut = false) => {
    clearTimeout(timerRef.current)
    setTimerActive(false)
    const ans = timedOut ? (currentAnswer || "[No answer — time ran out]") : currentAnswer
    const q = questions[currentQ]
    const s = scoreAnswer(ans, q.ideal)
    const newAnswers = [...answers, ans]
    const newScores = [...scores, s]
    setAnswers(newAnswers)
    setScores(newScores)
    setShowIdeal(true)

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(i => i + 1)
        setCurrentAnswer("")
        setTimeLeft(120)
        setTimerActive(true)
        setShowHint(false)
        setShowIdeal(false)
        setQuestionTyped(false)
      } else {
        setPhase(PHASES.RESULT)
      }
    }, 3500)
  }

  const timerColor = timeLeft > 60 ? "#22c55e" : timeLeft > 30 ? "#f59e0b" : "#ef4444"
  const timerPct = (timeLeft / 120) * 100

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const grade = avgScore >= 80 ? { label: "Excellent", color: "#22c55e", emoji: "🏆" }
    : avgScore >= 65 ? { label: "Good", color: "#3b82f6", emoji: "👍" }
    : avgScore >= 45 ? { label: "Average", color: "#f59e0b", emoji: "📈" }
    : { label: "Needs Work", color: "#ef4444", emoji: "💪" }

  // SETUP PHASE
  if (phase === PHASES.SETUP) {
    return (
      <div className="min-h-screen p-8 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl">🎤</div>
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Mock Interview</h1>
            <p className="text-slate-500">Practice with AI-powered interview questions tailored to your target role</p>
          </div>

          <div className="card mb-6">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
              Enter Your Target Job Role
            </h2>
            <div className="relative">
              <input
                type="text"
                value={roleInput}
                onChange={e => handleRoleInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && roleSuggestions.length === 0 && validateAndStart()}
                placeholder="e.g. Frontend Developer, Data Scientist, DevOps Engineer..."
                className="input-field pr-10"
                autoComplete="off"
              />
              {roleInput && (
                <button onClick={() => { setRoleInput(""); setJobRole(""); setRoleSuggestions([]) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg">×</button>
              )}
              {roleSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {roleSuggestions.map(r => (
                    <button key={r} onClick={() => selectRole(r)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors border-b border-slate-50 last:border-0 font-medium">
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {roleError && <p className="text-red-500 text-xs mt-2">⚠️ {roleError}</p>}
            {jobRole && !roleError && (
              <p className="text-green-600 text-xs mt-2 font-medium">✓ Role selected: <span className="font-bold">{jobRole}</span></p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <p className="text-xs text-slate-400 w-full mb-1">Popular roles:</p>
              {["Frontend Developer","Data Scientist","DevOps Engineer","Product Manager","UI/UX Designer"].map(r => (
                <button key={r} onClick={() => selectRole(r)}
                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-primary-100 hover:text-primary-700 rounded-lg transition-colors font-medium text-slate-600">
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="card mb-6">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
              Interview Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: TYPES.TECHNICAL, icon: "💻", title: "Technical Interview", desc: "Coding concepts, system design, tools & frameworks" },
                { type: TYPES.BEHAVIORAL, icon: "🤝", title: "Behavioral Interview", desc: "Soft skills, teamwork, problem-solving scenarios" },
              ].map(opt => (
                <button key={opt.type} onClick={() => setInterviewType(opt.type)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${interviewType === opt.type ? "border-primary-500 bg-primary-50" : "border-slate-200 hover:border-primary-300"}`}>
                  <div className="text-3xl mb-2">{opt.icon}</div>
                  <p className="font-bold text-slate-800 text-sm">{opt.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card mb-6 bg-slate-50">
            <h3 className="font-bold text-slate-700 mb-3">📋 Interview Format</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "❓", val: "5", label: "Questions" },
                { icon: "⏱️", val: "2 min", label: "Per Question" },
                { icon: "📊", val: "Scored", label: "With Feedback" },
              ].map(f => (
                <div key={f.label} className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <p className="font-extrabold text-slate-800">{f.val}</p>
                  <p className="text-xs text-slate-500">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={validateAndStart}
            disabled={!roleInput.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${!roleInput.trim() ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg hover:shadow-xl active:scale-95"}`}>
            🎤 Start Mock Interview
          </button>
        </div>
      </div>
    )
  }

  // BRIEFING PHASE
  if (phase === PHASES.BRIEFING) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 animate-fade-in">
        <div className="max-w-lg w-full">
          <div className="card text-center">
            <div className="text-6xl mb-4">🎙️</div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Ready for Your Interview?</h2>
            <p className="text-slate-500 mb-6">You will be asked <strong>5 {interviewType}</strong> questions for <strong>{jobRole}</strong></p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left space-y-2">
              {[
                "Each question has a 2-minute timer",
                "Type your answer clearly and in detail",
                "Use the hint button if you get stuck",
                "Your answers will be scored and reviewed",
                "Be professional — treat it like a real interview",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-blue-800">
                  <span className="font-bold text-blue-600 flex-shrink-0">{i + 1}.</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPhase(PHASES.SETUP)} className="btn-secondary flex-1">← Change Setup</button>
              <button onClick={beginInterview} className="btn-primary flex-1">Begin Interview →</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // INTERVIEW PHASE
  if (phase === PHASES.INTERVIEW) {
    const q = questions[currentQ]
    return (
      <div className="min-h-screen p-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">🎤</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{jobRole} — {interviewType === TYPES.TECHNICAL ? "Technical" : "Behavioral"}</p>
                <p className="text-slate-400 text-xs">Question {currentQ + 1} of {questions.length}</p>
              </div>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct / 100)}`}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-extrabold" style={{ color: timerColor }}>{timeLeft}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {questions.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i < currentQ ? "bg-green-500" : i === currentQ ? "bg-primary-500" : "bg-slate-200"}`} />
            ))}
          </div>

          {/* Question card */}
          <div className="card mb-4 border-l-4 border-primary-500">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">Q{currentQ + 1}</div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-lg leading-relaxed">
                  <TypingText text={q.q} speed={15} onDone={() => setQuestionTyped(true)} />
                </p>
                {questionTyped && (
                  <button onClick={() => setShowHint(!showHint)}
                    className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors">
                    💡 {showHint ? "Hide hint" : "Show hint"}
                  </button>
                )}
                {showHint && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 animate-fade-in">
                    <span className="font-semibold">Hint: </span>{q.hint}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Answer area */}
          {!showIdeal ? (
            <div className="card">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Answer</label>
              <textarea
                ref={textareaRef}
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here... Be detailed and professional. Use examples where possible."
                rows={7}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 text-sm leading-relaxed"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-400">{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <button onClick={() => handleSubmitAnswer(false)}
                  disabled={currentAnswer.trim().length < 5}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${currentAnswer.trim().length < 5 ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-primary-600 text-white hover:bg-primary-700 active:scale-95 shadow-md"}`}>
                  Submit Answer →
                </button>
              </div>
            </div>
          ) : (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-extrabold text-white shadow-md ${scores[currentQ] >= 70 ? "bg-green-500" : scores[currentQ] >= 45 ? "bg-yellow-500" : "bg-red-400"}`}>
                  {scores[currentQ]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {scores[currentQ] >= 70 ? "Great answer! 🎉" : scores[currentQ] >= 45 ? "Decent answer 👍" : "Needs improvement 📚"}
                  </p>
                  <p className="text-slate-500 text-xs">Score: {scores[currentQ]}/100</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs font-semibold text-green-800 mb-1">Key points to cover:</p>
                <div className="flex flex-wrap gap-1.5">
                  {q.ideal.map(kw => {
                    const covered = answers[currentQ]?.toLowerCase().includes(kw.toLowerCase())
                    return (
                      <span key={kw} className={`text-xs px-2 py-0.5 rounded-full font-medium ${covered ? "bg-green-200 text-green-800" : "bg-red-100 text-red-600"}`}>
                        {covered ? "✓" : "✗"} {kw}
                      </span>
                    )
                  })}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center animate-pulse">
                {currentQ + 1 < questions.length ? "Next question loading..." : "Calculating your results..."}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // RESULT PHASE
  if (phase === PHASES.RESULT) {
    return (
      <div className="min-h-screen p-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{grade.emoji}</div>
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Interview Complete!</h1>
            <p className="text-slate-500">Here is your detailed performance report for <span className="font-semibold text-primary-600">{jobRole}</span></p>
          </div>

          {/* Overall score */}
          <div className="card mb-6 text-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
            <p className="text-slate-400 text-sm mb-2">Overall Score</p>
            <p className="text-7xl font-extrabold mb-2" style={{ color: grade.color }}>{avgScore}</p>
            <p className="text-xl font-bold" style={{ color: grade.color }}>{grade.label}</p>
            <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${avgScore}%`, backgroundColor: grade.color }} />
            </div>
          </div>

          {/* Per-question scores */}
          <div className="card mb-6">
            <h3 className="font-bold text-slate-800 mb-4">Question-by-Question Breakdown</h3>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <ScoreBar key={i} score={scores[i] || 0} label={`Q${i + 1}: ${q.q.slice(0, 55)}...`}
                  color={scores[i] >= 70 ? "#22c55e" : scores[i] >= 45 ? "#f59e0b" : "#ef4444"} />
              ))}
            </div>
          </div>

          {/* Detailed review */}
          <div className="card mb-6">
            <h3 className="font-bold text-slate-800 mb-4">Detailed Review</h3>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="border border-slate-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-slate-800 text-sm flex-1">{q.q}</p>
                    <span className={`badge flex-shrink-0 ${scores[i] >= 70 ? "bg-green-100 text-green-700" : scores[i] >= 45 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {scores[i]}/100
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mb-2">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Your answer:</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{answers[i] || "No answer provided"}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {q.ideal.map(kw => {
                      const covered = answers[i]?.toLowerCase().includes(kw.toLowerCase())
                      return (
                        <span key={kw} className={`text-xs px-2 py-0.5 rounded-full font-medium ${covered ? "bg-green-100 text-green-700" : "bg-red-50 text-red-500"}`}>
                          {covered ? "✓" : "✗"} {kw}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback summary */}
          <div className="card mb-6 bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-100">
            <h3 className="font-bold text-primary-800 mb-3">📋 Overall Feedback</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {avgScore >= 80
                ? "Outstanding performance! You demonstrated strong knowledge and communicated your answers clearly. You are well-prepared for real interviews. Keep practicing to maintain this level."
                : avgScore >= 65
                ? "Good job! You showed solid understanding of the core concepts. Focus on adding more specific examples and keywords to strengthen your answers further."
                : avgScore >= 45
                ? "You have a foundation to build on. Review the key concepts you missed and practice structuring your answers using the STAR method for behavioral questions."
                : "Keep practicing! Focus on learning the fundamental concepts for this role. Use the Skills Gap page to identify what to study, and enroll in relevant courses."}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-2xl font-extrabold text-green-600">{scores.filter(s => s >= 70).length}</p>
                <p className="text-xs text-slate-500">Strong answers</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-2xl font-extrabold text-yellow-500">{scores.filter(s => s >= 45 && s < 70).length}</p>
                <p className="text-xs text-slate-500">Decent answers</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-2xl font-extrabold text-red-400">{scores.filter(s => s < 45).length}</p>
                <p className="text-xs text-slate-500">Needs work</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setPhase(PHASES.SETUP); setAnswers([]); setScores([]) }} className="btn-secondary flex-1">
              🔄 Try Again
            </button>
            <button onClick={() => { setInterviewType(interviewType === TYPES.TECHNICAL ? TYPES.BEHAVIORAL : TYPES.TECHNICAL); setPhase(PHASES.SETUP) }} className="btn-primary flex-1">
              {interviewType === TYPES.TECHNICAL ? "Try Behavioral →" : "Try Technical →"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
