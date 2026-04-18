import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Home, FileText, BarChart3, Target, BookOpen,
  GraduationCap, Mic, User, LogOut, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react'

const navItems = [
  { path: '/',           label: 'Home',            Icon: Home },
  { path: '/analyze',    label: 'Resume Analyzer', Icon: FileText },
  { path: '/dashboard',  label: 'My Dashboard',    Icon: BarChart3 },
  { path: '/skills',     label: 'Skills Gap',      Icon: Target },
  { path: '/courses',    label: 'Courses',         Icon: BookOpen },
  { path: '/my-courses', label: 'My Learning',     Icon: GraduationCap },
  { path: '/interview',  label: 'Mock Interview',  Icon: Mic },
  { path: '/profile',    label: 'Profile',         Icon: User },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { profile, analysisResult, logout } = useApp()

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300
        bg-gray-950/95 backdrop-blur-xl border-r border-white/5
        ${collapsed ? 'w-[72px]' : 'w-64'}`}
    >
      {/* ── Logo ──────────────────────────────────────────────────────────── */}
      <div className={`flex items-center border-b border-white/5 h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-extrabold text-white text-sm shadow-lg shadow-blue-500/30">
              L
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">LetMeCheck</p>
              <p className="text-xs text-slate-500">Career AI</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-extrabold text-white text-sm shadow-lg shadow-blue-500/30">
            L
          </div>
        )}
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200 ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Toggle button when collapsed */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mt-2 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* ── User mini profile ──────────────────────────────────────────────── */}
      {!collapsed && profile.name && (
        <div className="mx-3 mt-4 p-3 bg-white/5 rounded-xl border border-white/10 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{profile.name}</p>
              <p className="text-xs text-slate-500 truncate">{profile.goal || 'Set your goal'}</p>
            </div>
          </div>
          {analysisResult && (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>
              <span className="text-xs font-bold text-blue-400">{analysisResult.score}%</span>
            </div>
          )}
        </div>
      )}

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, Icon }, i) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            style={{ animationDelay: `${i * 35}ms` }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm group animate-fade-in
              ${isActive
                ? 'nav-active text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }
              ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${collapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom ────────────────────────────────────────────────────────── */}
      {!collapsed && (
        <div className="p-3 border-t border-white/5 space-y-2">
          {/* Upgrade nudge */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <p className="text-xs font-semibold text-white">Get Started</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Upload your resume to get your ATS score</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 border border-white/5 hover:border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-white/5">
          <button
            onClick={logout}
            title="Sign Out"
            className="w-full flex items-center justify-center p-2.5 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  )
}
