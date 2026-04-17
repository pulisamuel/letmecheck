import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AppContext = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

const EMPTY_PROFILE = { name: '', email: '', college: '', year: '', graduation: '', goal: '', avatar: null }

export const AppProvider = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [profile, setProfileState] = useState(EMPTY_PROFILE)
  const [analysisResult, setAnalysisResultState] = useState(null)
  const [analysisHistory, setAnalysisHistoryState] = useState([])
  const [enrolledCourses, setEnrolledCoursesState] = useState([])
  const [courseProgress, setCourseProgressState] = useState({})

  // ── Listen to Supabase auth state ──────────────────────────────────────────
  useEffect(() => {
    let initialSessionHandled = false

    // Listen for auth changes (login, logout, token refresh)
    // onAuthStateChange fires immediately with the current session, so we use
    // it as the single source of truth and skip the separate getSession call.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        setIsAuthenticated(true)
        // Load user data on initial session check and explicit sign-in, but not on
        // every token refresh (TOKEN_REFRESHED) to avoid redundant DB reads
        if (!initialSessionHandled || event === 'SIGNED_IN') {
          loadUserData(session.user.id)
        }
      } else {
        setSupabaseUser(null)
        setIsAuthenticated(false)
        resetLocalState()
      }
      // Always clear the auth loading state once we have a definitive answer
      if (!initialSessionHandled) {
        initialSessionHandled = true
        setAuthLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserData = async (uid) => {
    setDataLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uid)
        .single()

      if (error) {
        console.error('Error loading user data:', error.message)
        return
      }
      if (data) {
        setProfileState(data.profile || EMPTY_PROFILE)
        setAnalysisResultState(data.analysis_result || null)
        setAnalysisHistoryState(Array.isArray(data.analysis_history) ? data.analysis_history : [])
        setEnrolledCoursesState(Array.isArray(data.enrolled_courses) ? data.enrolled_courses : [])
        setCourseProgressState(data.course_progress || {})
      }
    } catch (err) {
      console.error('Error loading user data:', err)
    } finally {
      setDataLoading(false)
    }
  }

  const resetLocalState = () => {
    setProfileState(EMPTY_PROFILE)
    setAnalysisResultState(null)
    setAnalysisHistoryState([])
    setEnrolledCoursesState([])
    setCourseProgressState({})
  }

  // ── Save a field to Supabase ───────────────────────────────────────────────
  const saveField = async (field, value) => {
    if (!supabaseUser) return
    await supabase.from('users').upsert({
      id: supabaseUser.id,
      [field]: value,
    })
  }

  // ── Auth actions ───────────────────────────────────────────────────────────
  const registerUser = async ({ name, email, password, college, year, graduation, goal }) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    const profileData = { name, email, college, year, graduation, goal, avatar: null }

    // Create user row in public.users table
    const { error: dbError } = await supabase.from('users').insert({
      id: data.user.id,
      profile: profileData,
      analysis_result: null,
      enrolled_courses: [],
      course_progress: {},
    })
    if (dbError) throw dbError

    setProfileState(profileData)
    return data.user
  }

  const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
  }

  const logout = async () => {
    await supabase.auth.signOut()
    resetLocalState()
  }

  // ── Data setters ───────────────────────────────────────────────────────────
  const setProfile = async (data) => {
    setProfileState(data)
    await saveField('profile', data)
  }

  const setAnalysisResult = async (data) => {
    setAnalysisResultState(data)
    await saveField('analysis_result', data)
    // Append to history
    const record = { ...data, analyzedAt: new Date().toISOString() }
    const newHistory = [record, ...analysisHistory].slice(0, 10) // keep last 10
    setAnalysisHistoryState(newHistory)
    await saveField('analysis_history', newHistory)
  }

  const enrollCourse = async (course) => {
    if (enrolledCourses.find(c => c.id === course.id)) return
    const newCourses = [...enrolledCourses, { ...course, enrolledAt: new Date().toISOString() }]
    const newProgress = { ...courseProgress, [course.id]: 0 }
    setEnrolledCoursesState(newCourses)
    setCourseProgressState(newProgress)
    await saveField('enrolled_courses', newCourses)
    await saveField('course_progress', newProgress)
  }

  const updateProgress = async (courseId, progress) => {
    const newProgress = { ...courseProgress, [courseId]: progress }
    setCourseProgressState(newProgress)
    await saveField('course_progress', newProgress)
  }

  return (
    <AppContext.Provider value={{
      supabaseUser, authLoading, dataLoading, isAuthenticated,
      registerUser, loginUser, logout,
      profile, setProfile,
      analysisResult, setAnalysisResult,
      analysisHistory,
      enrolledCourses, courseProgress,
      enrollCourse, updateProgress,
    }}>
      {children}
    </AppContext.Provider>
  )
}
