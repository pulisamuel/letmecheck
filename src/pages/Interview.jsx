import React, { useState, useEffect, useRef } from "react"
import { useApp } from "../context/AppContext"
import { getQuestionsForRole, scoreAnswer, INTERVIEW_QUESTIONS } from "../utils/interviewQuestions"
import { JOB_ROLES } from "../utils/resumeAnalyzer"

const PHASES = { SETUP: "setup", BRIEFING: "briefing", INTERVIEW: "interview", RESULT: "result" }
const TYPES = { TECHNICAL: "technical", BEHAVIORAL: "behavioral" }

function TypingText({ text, speed = 18, onDone }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(id); setDone(true); onDoneRef.current && onDoneRef.current() }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return <span>{displayed}{!done && <span className="animate-pulse">|</span>}</span>
}

function ScoreBar({ score, label, color }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(score), 200)
    return () => clearTimeout(t)
  }, [score])
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
  // Use a ref so the timer effect always calls the latest version of handleSubmitAnswer
  // without needing it in the dependency array (avoids stale closure bug)
  const handleSubmitAnswerRef = useRef(null)

  const allRoles = Object.keys(INTERVIEW_QUESTIONS)

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0 && timerActive) {
      handleSubmitAnswerRef.current && handleSubmitAnswerRef.current(true)
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
    // Keep the ref up-to-date so the timer effect always calls the latest version
    handleSubmitAnswerRef.current = handleSubmitAnswer
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
  const grade = avgScore >= 80 ? { label: "Excellent", color: "#22c55e", emoji: "??" }
    : avgScore >= 65 ? { label: "Good", color: "#3b82f6", emoji: "??" }
    : avgScore >= 45 ? { label: "Average", color: "#f59e0b", emoji: "??" }
    : { label: "Needs Work", color: "#ef4444", emoji: "??" }

  // SETUP PHASE
  if (phase === PHASES.SETUP) {
    return (
      <div className="page-wrapper animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-blue-500/30">??</div>
            <h1 className="page-title">Mock Interview</h1>
            <p className="page-subtitle">Practice with AI-powered questions tailored to your target role</p>
          </div>

          <div className="card mb-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
              Enter Your Target Job Role
            </h2>
            <div className="relative">
              <input type="text" value={roleInput} onChange={e => handleRoleInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && roleSuggestions.length === 0 && validateAndStart()}
                placeholder="e.g. Frontend Developer, Data Scientist..." className="input-field pr-10" autoComplete="off" />
              {roleInput && (
                <button onClick={() => { setRoleInput(""); setJobRole(""); setRoleSuggestions([]) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-lg">×</button>
              )}
              {roleSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                  {roleSuggestions.map(r => (
                    <button key={r} onClick={() => selectRole(r)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 font-medium text-slate-300 hover:text-white">
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {roleError && <p className="text-red-400 text-xs mt-2">?? {roleError}</p>}
            {jobRole && !roleError && <p className="text-green-400 text-xs mt-2 font-medium">? Role selected: <span className="font-bold">{jobRole}</span></p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <p className="text-xs text-slate-500 w-full mb-1">Popular roles:</p>
              {["Frontend Developer","Data Scientist","DevOps Engineer","Product Manager","UI/UX Designer"].map(r => (
                <button key={r} onClick={() => selectRole(r)}
                  className="text-xs px-3 py-1.5 bg-white/5 border border-white/8 hover:border-blue-400/40 hover:text-white rounded-lg transition-colors font-medium text-slate-400">
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="card mb-5">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
              <span className="w-6 h-6 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
              Interview Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type:TYPES.TECHNICAL,  icon:"??", title:"Technical",  desc:"Coding, system design, tools & frameworks" },
                { type:TYPES.BEHAVIORAL, icon:"??", title:"Behavioral", desc:"Soft skills, teamwork, problem-solving" },
              ].map(opt => (
                <button key={opt.type} onClick={() => setInterviewType(opt.type)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${interviewType === opt.type ? "border-blue-500/50 bg-blue-500/10" : "border-white/10 hover:border-white/20 bg-white/5"}`}>
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <p className="font-bold text-white text-sm">{opt.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="card mb-5 bg-white/5">
            <h3 className="font-bold text-slate-300 mb-3 text-sm">?? Interview Format</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[{icon:"?",val:"5",label:"Questions"},{icon:"??",val:"2 min",label:"Per Question"},{icon:"??",val:"Scored",label:"With Feedback"}].map(f => (
                <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xl mb-1">{f.icon}</div>
                  <p className="font-extrabold text-white text-sm">{f.val}</p>
                  <p className="text-xs text-slate-500">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={validateAndStart} disabled={!roleInput.trim()}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200
              ${!roleInput.trim() ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]"}`}>
            ?? Start Mock Interview
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
            <div className="text-5xl mb-4">???</div>
            <h2 className="text-2xl font-extrabold text-white mb-2">Ready for Your Interview?</h2>
            <p className="text-slate-400 mb-6 text-sm">You will be asked <strong className="text-white">5 {interviewType}</strong> questions for <strong className="text-blue-400">{jobRole}</strong></p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 text-left space-y-2">
              {["Each question has a 2-minute timer","Type your answer clearly and in detail","Use the hint button if you get stuck","Your answers will be scored and reviewed","Be professional — treat it like a real interview"].map((tip,i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-blue-300/80">
                  <span className="font-bold text-blue-400 flex-shrink-0">{i+1}.</span><span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPhase(PHASES.SETUP)} className="btn-secondary flex-1">? Change Setup</button>
              <button onClick={beginInterview} className="btn-primary flex-1">Begin Interview ?</button>
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
      <div className="page-wrapper animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm">??</div>
              <div>
                <p className="font-bold text-white text-sm">{jobRole} — {interviewType === TYPES.TECHNICAL ? "Technical" : "Behavioral"}</p>
                <p className="text-slate-500 text-xs">Question {currentQ+1} of {questions.length}</p>
              </div>
            </div>
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*20}`} strokeDashoffset={`${2*Math.PI*20*(1-timerPct/100)}`}
                  strokeLinecap="round" style={{ transition:"stroke-dashoffset 1s linear, stroke 0.5s" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-extrabold" style={{ color:timerColor }}>{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="flex gap-1.5 mb-5">
            {questions.map((_,i) => (
              <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300
                ${i < currentQ ? "bg-green-500" : i === currentQ ? "bg-blue-500" : "bg-white/10"}`} />
            ))}
          </div>

          <div className="card mb-4 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">Q{currentQ+1}</div>
              <div className="flex-1">
                <p className="font-bold text-white leading-relaxed">
                  <TypingText text={q.q} speed={15} onDone={() => setQuestionTyped(true)} />
                </p>
                {questionTyped && (
                  <button onClick={() => setShowHint(!showHint)}
                    className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
                    ?? {showHint ? "Hide hint" : "Show hint"}
                  </button>
                )}
                {showHint && (
                  <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-300 animate-fade-in">
                    <span className="font-semibold">Hint: </span>{q.hint}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!showIdeal ? (
            <div className="card">
              <label className="block text-xs font-semibold text-slate-400 mb-2">Your Answer</label>
              <textarea ref={textareaRef} value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here... Be detailed and professional. Use examples where possible."
                rows={7} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40 resize-none text-white placeholder-slate-600 text-sm leading-relaxed transition-all" />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-600">{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <button onClick={() => handleSubmitAnswer(false)} disabled={currentAnswer.trim().length < 5}
                  className={`px-5 py-2 rounded-xl font-bold text-xs transition-all duration-200
                    ${currentAnswer.trim().length < 5 ? "bg-white/5 text-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md active:scale-95"}`}>
                  Submit Answer ?
                </button>
              </div>
            </div>
          ) : (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-extrabold text-white shadow-md
                  ${scores[currentQ] >= 70 ? "bg-green-500" : scores[currentQ] >= 45 ? "bg-yellow-500" : "bg-red-500"}`}>
                  {scores[currentQ]}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{scores[currentQ] >= 70 ? "Great answer! ??" : scores[currentQ] >= 45 ? "Decent answer ??" : "Needs improvement ??"}</p>
                  <p className="text-slate-500 text-xs">Score: {scores[currentQ]}/100</p>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <p className="text-xs font-semibold text-green-400 mb-2">Key points to cover:</p>
                <div className="flex flex-wrap gap-1.5">
                  {q.ideal.map(kw => {
                    const covered = answers[currentQ]?.toLowerCase().includes(kw.toLowerCase())
                    return (
                      <span key={kw} className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${covered ? "bg-green-500/20 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                        {covered ? "?" : "?"} {kw}
                      </span>
                    )
                  })}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 text-center animate-pulse">
                {currentQ+1 < questions.length ? "Next question loading..." : "Calculating your results..."}
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
      <div className="page-wrapper animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{grade.emoji}</div>
            <h1 className="page-title">Interview Complete!</h1>
            <p className="page-subtitle">Performance report for <span className="text-blue-400 font-semibold">{jobRole}</span></p>
          </div>

          <div className="card mb-5 text-center bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-white/10">
            <p className="text-slate-500 text-xs mb-2">Overall Score</p>
            <p className="text-7xl font-extrabold mb-2" style={{ color:grade.color }}>{avgScore}</p>
            <p className="text-xl font-bold" style={{ color:grade.color }}>{grade.label}</p>
            <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width:`${avgScore}%`, backgroundColor:grade.color }} />
            </div>
          </div>

          <div className="card mb-5">
            <h3 className="font-bold text-white mb-4 text-sm">Question-by-Question Breakdown</h3>
            <div className="space-y-3">
              {questions.map((q,i) => (
                <ScoreBar key={i} score={scores[i]||0} label={`Q${i+1}: ${q.q.slice(0,55)}...`}
                  color={scores[i]>=70?"#22c55e":scores[i]>=45?"#f59e0b":"#ef4444"} />
              ))}
            </div>
          </div>

          <div className="card mb-5">
            <h3 className="font-bold text-white mb-4 text-sm">Detailed Review</h3>
            <div className="space-y-4">
              {questions.map((q,i) => (
                <div key={i} className="border border-white/8 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-white text-xs flex-1">{q.q}</p>
                    <span className={`badge flex-shrink-0 border ${scores[i]>=70?"bg-green-500/15 text-green-400 border-green-500/20":scores[i]>=45?"bg-yellow-500/15 text-yellow-400 border-yellow-500/20":"bg-red-500/15 text-red-400 border-red-500/20"}`}>
                      {scores[i]}/100
                    </span>
                  </div>
                  <div className="bg-white/3 rounded-lg p-3 mb-2">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Your answer:</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{answers[i]||"No answer provided"}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {q.ideal.map(kw => {
                      const covered = answers[i]?.toLowerCase().includes(kw.toLowerCase())
                      return (
                        <span key={kw} className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${covered?"bg-green-500/15 text-green-400":"bg-red-500/10 text-red-400"}`}>
                          {covered?"?":"?"} {kw}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/15">
            <h3 className="font-bold text-blue-300 mb-3 text-sm">?? Overall Feedback</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {avgScore>=80?"Outstanding performance! You demonstrated strong knowledge and communicated clearly. You are well-prepared for real interviews."
               :avgScore>=65?"Good job! You showed solid understanding. Focus on adding more specific examples and keywords."
               :avgScore>=45?"You have a foundation to build on. Review key concepts and practice structuring answers using the STAR method."
               :"Keep practicing! Focus on learning fundamental concepts. Use the Skills Gap page to identify what to study."}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { val:scores.filter(s=>s>=70).length,  label:"Strong",  color:"text-green-400" },
                { val:scores.filter(s=>s>=45&&s<70).length, label:"Decent", color:"text-yellow-400" },
                { val:scores.filter(s=>s<45).length,   label:"Needs Work", color:"text-red-400" },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3">
                  <p className={`text-2xl font-extrabold ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setPhase(PHASES.SETUP); setAnswers([]); setScores([]) }} className="btn-secondary flex-1">?? Try Again</button>
            <button onClick={() => { setInterviewType(interviewType===TYPES.TECHNICAL?TYPES.BEHAVIORAL:TYPES.TECHNICAL); setPhase(PHASES.SETUP) }} className="btn-primary flex-1">
              {interviewType===TYPES.TECHNICAL?"Try Behavioral ?":"Try Technical ?"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
