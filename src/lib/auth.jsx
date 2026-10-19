import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import * as api from './api'
import { supabase, isSupabaseConfigured } from './supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function initSession() {
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data } = await supabase.auth.getSession()
          const session = data?.session
          if (session?.user && active) {
            const student = await api.fetchStudentProfile(session.user.email, session.user.id)
            setUser(api.formatAuthUser(session.user, student))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Session init error:', err)
      }

      // Fallback to local storage session
      if (active) {
        setUser(api.getSessionUser())
        setLoading(false)
      }
    }

    initSession()

    // Listen to real-time auth changes from Supabase
    let subscription = null
    if (isSupabaseConfigured() && supabase) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!active) return
        if (session?.user) {
          const student = await api.fetchStudentProfile(session.user.email, session.user.id)
          setUser(api.formatAuthUser(session.user, student))
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      })
      subscription = data?.subscription
    }

    return () => {
      active = false
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    setUser,
    loading,
    signUp: async (data) => {
      const res = await api.signUp(data)
      if (res && !res.needsEmailVerification) {
        setUser(res)
      }
      return res
    },
    signIn: async (data) => {
      const res = await api.signIn(data)
      setUser(res)
      return res
    },
    signOut: async () => {
      await api.signOut()
      setUser(null)
    },
    resendVerification: api.resendVerificationEmail,
    resetPassword: api.resetPasswordForEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-signal border-t-transparent animate-spin" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}
