import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, authHelpers, dbHelpers } from '@/lib/supabase'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,

      // Initialize auth state
      initialize: async () => {
        set({ isLoading: true })
        
        try {
          // Get initial session
          const { session, error: sessionError } = await authHelpers.getSession()
          
          if (sessionError) {
            console.error('Session error:', sessionError)
            set({ isLoading: false, isInitialized: true })
            return
          }

          if (session?.user) {
            // Get user profile from database
            const { data: profile, error: profileError } = await dbHelpers.getUserProfile(session.user.id)
            
            if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = no rows returned
              console.error('Profile error:', profileError)
            }

            set({
              session,
              user: profile ? {
                id: session.user.id,
                email: session.user.email,
                ...profile
              } : {
                id: session.user.id,
                email: session.user.email,
                profileCompleted: false
              },
              isLoading: false,
              isInitialized: true
            })
          } else {
            set({ session: null, user: null, isLoading: false, isInitialized: true })
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email)
            
            if (event === 'SIGNED_IN' && session?.user) {
              // Get user profile
              const { data: profile, error: profileError } = await dbHelpers.getUserProfile(session.user.id)
              
              set({
                session,
                user: profile ? {
                  id: session.user.id,
                  email: session.user.email,
                  ...profile
                } : {
                  id: session.user.id,
                  email: session.user.email,
                  profileCompleted: false
                },
                isLoading: false
              })
            } else if (event === 'SIGNED_OUT') {
              set({ session: null, user: null, isLoading: false })
            }
          })

        } catch (error) {
          console.error('Auth initialization error:', error)
          set({ isLoading: false, isInitialized: true })
        }
      },

      // Sign up
      signUp: async (email, password, username) => {
        set({ isLoading: true })
        
        try {
          // Check if username is available
          const { data: existingUser } = await dbHelpers.getUserByUsername(username)
          if (existingUser) {
            throw new Error('Username already taken')
          }

          // Sign up with Supabase Auth
          const { data, error } = await authHelpers.signUp(email, password, {
            username,
            display_name: username
          })

          if (error) throw error

          if (data.user) {
            // Create user profile in database
            const profileData = {
              username,
              display_name: username,
              profile_completed: false
            }
            
            const { data: profile, error: profileError } = await dbHelpers.createUserProfile(
              data.user.id,
              profileData
            )

            if (profileError) {
              console.error('Profile creation error:', profileError)
              // Don't throw here, user can complete profile later
            }

            set({
              session: data.session,
              user: {
                id: data.user.id,
                email: data.user.email,
                ...profileData
              },
              isLoading: false
            })

            return { success: true, needsVerification: !data.session }
          }

          return { success: true, needsVerification: true }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      // Sign in
      signIn: async (email, password) => {
        set({ isLoading: true })
        
        try {
          const { data, error } = await authHelpers.signIn(email, password)
          
          if (error) throw error

          if (data.session?.user) {
            // Get user profile
            const { data: profile, error: profileError } = await dbHelpers.getUserProfile(data.session.user.id)
            
            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Profile error:', profileError)
            }

            set({
              session: data.session,
              user: profile ? {
                id: data.session.user.id,
                email: data.session.user.email,
                ...profile
              } : {
                id: data.session.user.id,
                email: data.session.user.email,
                profileCompleted: false
              },
              isLoading: false
            })

            return { success: true }
          }

          throw new Error('Login failed')
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      // Sign out
      signOut: async () => {
        // Immediate state clear - don't show loading
        set({ session: null, user: null, isLoading: false, isInitialized: true })
        
        // Force clear localStorage immediately
        localStorage.removeItem('auth-storage')
        
        // Call Supabase signOut in background (don't await)
        authHelpers.signOut().catch(error => {
          console.error('Background Supabase signOut error:', error)
        })
        
        return { success: true }
      },

      // Reset password
      resetPassword: async (email) => {
        set({ isLoading: true })
        
        try {
          const { error } = await authHelpers.resetPassword(email)
          if (error) throw error
          
          set({ isLoading: false })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      // Update password
      updatePassword: async (password) => {
        set({ isLoading: true })
        
        try {
          const { error } = await authHelpers.updatePassword(password)
          if (error) throw error
          
          set({ isLoading: false })
          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        const { user } = get()
        if (!user?.id) throw new Error('No user logged in')

        set({ isLoading: true })
        
        try {
          const updates = {
            ...profileData,
            profile_completed: true
          }

          const { data, error } = await dbHelpers.updateUserProfile(user.id, updates)
          if (error) throw error

          set({
            user: {
              ...user,
              ...data
            },
            isLoading: false
          })

          return { success: true }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      // Get user stats for dashboard
      getUserStats: async () => {
        const { user } = get()
        if (!user?.id) return null

        try {
          const stats = await dbHelpers.getUserStats(user.id)
          return stats
        } catch (error) {
          console.error('Error fetching user stats:', error)
          return null
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session
      })
    }
  )
)

export { useAuthStore } 