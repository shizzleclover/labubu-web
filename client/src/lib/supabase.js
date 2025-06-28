import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const authHelpers = {
  // Sign up with email and password
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Reset password
  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    })
    return { data, error }
  },

  // Update password
  async updatePassword(password) {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Database helpers
export const dbHelpers = {
  // User operations
  async createUserProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: userId,
        ...profileData
      }])
      .select()
      .single()
    return { data, error }
  },

  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  async getUserByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()
    return { data, error }
  },

  // Item operations
  async createItem(itemData) {
    const { data, error } = await supabase
      .from('items')
      .insert([itemData])
      .select()
      .single()
    return { data, error }
  },

  async getUserItems(userId, limit = 10) {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  async getPublicItems(limit = 20) {
    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        users!owner_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  async updateItem(itemId, updates) {
    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single()
    return { data, error }
  },

  async deleteItem(itemId) {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId)
    return { error }
  },

  // Social operations
  async likeItem(itemId) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ item_id: itemId }])
      .select()
      .single()
    return { data, error }
  },

  async unlikeItem(itemId) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('item_id', itemId)
    return { error }
  },

  async followUser(userId) {
    const { data, error } = await supabase
      .from('follows')
      .insert([{ following_id: userId }])
      .select()
      .single()
    return { data, error }
  },

  async unfollowUser(userId) {
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('following_id', userId)
    return { error }
  },

  // Analytics
  async getUserStats(userId) {
    const [itemsResult, likesResult, followersResult] = await Promise.all([
      supabase
        .from('items')
        .select('id, views_count')
        .eq('owner_id', userId),
      supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId),
      supabase
        .from('follows')
        .select('id')
        .eq('following_id', userId)
    ])

    const totalViews = itemsResult.data?.reduce((sum, item) => sum + (item.views_count || 0), 0) || 0
    const totalItems = itemsResult.data?.length || 0
    const totalLikes = likesResult.data?.length || 0
    const totalFollowers = followersResult.data?.length || 0

    return {
      totalItems,
      totalViews,
      totalLikes,
      totalFollowers,
      error: itemsResult.error || likesResult.error || followersResult.error
    }
  }
} 