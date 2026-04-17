import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Dashboard from './pages/Dashboard'
import SkillsGap from './pages/SkillsGap'
import Courses from './pages/Courses'
import MyCourses from './pages/MyCourses'
import Interview from './pages/Interview'
import Profile from './pages/Profile'
import ResumeAnalyzer from './pages/ResumeAnalyzer'

function AppShell() {
  const { isAuthenticated, authLoading } = useApp()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Waiting for Firebase to check session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-primary-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-extrabold mx-auto mb-4 animate-pulse">L</div>
          <p className="text-sm font-semibold text-blue-200">Loading LetMeCheck...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return <Login />

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
      <main className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<SkillsGap />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
