import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/analyze', label: 'Resume Analyzer', icon: '📄' },
  { path: '/dashboard', label: 'My Dashboard', icon: '📊' },
  { path: '/skills', label: 'Skills Gap', icon: '🎯' },
  { path: '/courses', label: 'Courses', icon: '📚' },
  { path: '/my-courses', label: 'My Learning', icon: '🎓' },
  { path: '/interview', label: 'Mock Interview', icon: '🎤' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { profile, analysisResult, logout } = useApp()

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-slate-100 shadow-lg z-50 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-100">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              L
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">LetMeCheck</p>
              <p className="text-xs text-slate-400">Guidance System</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md mx-auto">
            L
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors ml-auto"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* User mini profile */}
      {!collapsed && profile.name && (
        <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-700 truncate">{profile.name}</p>
              <p className="text-xs text-slate-400 truncate">{profile.goal || 'Set your goal'}</p>
            </div>
          </div>
          {analysisResult && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary-600">{analysisResult.score}%</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={{ animationDelay: `${i * 40}ms` }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm group animate-fade-in ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-200 scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-primary-700 hover:translate-x-1'
              }`
            }
          >
            <span className="text-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom — logout */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-100 space-y-2">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-3 text-white text-xs">
            <p className="font-semibold mb-0.5">🚀 Get Started</p>
            <p className="opacity-80">Upload your resume to get your ATS score</p>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-100">
            <span>🚪</span> Sign Out
          </button>
        </div>
      )}
      {collapsed && (
        <div className="p-2 border-t border-slate-100">
          <button onClick={logout} title="Sign Out"
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            🚪
          </button>
        </div>
      )}
    </aside>
  )
}
