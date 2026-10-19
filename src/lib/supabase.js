import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || ''
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || ''

/**
 * Returns true if Supabase URL and Anon Key are configured.
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl.trim().length > 0 &&
    supabaseAnonKey &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseUrl.includes('YOUR_SUPABASE_URL')
  )
}

/**
 * Supabase client instance.
 * Safe fallback client if credentials are not yet entered in .env
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

/**
 * Helper to get public URL for a file in a Supabase storage bucket.
 */
export function getStoragePublicUrl(bucketName, filePath) {
  if (!filePath) return ''
  if (!isSupabaseConfigured() || !supabase) {
    return ''
  }
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
  return data?.publicUrl || ''
}

/**
 * Upload a document to a Supabase bucket (e.g. KYC ID document).
 */
export async function uploadDocumentToBucket(bucketName, filePath, file) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error('Supabase is not configured.') }
  }
  return await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
  })
}

