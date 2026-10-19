/**
 * Course Fees & DB Pricing Integration
 * 
 * Table Name in Database: `course_fees`
 * 
 * Expected schema in `course_fees` table:
 * - program_id: string (e.g. 'forex-basic', 'crypto-intermediate', 'equity-advanced')
 * - price_inr: number (Fee in Indian Rupees)
 * - price_aed: number (Fee in UAE Dirhams)
 * - show_price: boolean (Price flag: true = display price; false = hide price)
 * - is_active: boolean
 * - updated_at: timestamp
 * 
 * LOGIC:
 * If prices are not coming from DB (null/empty) OR if the price flag (show_price) is false,
 * DO NOT show prices on the cards or checkout flow. Instead display admissions contact options.
 */

import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './supabase'

export const COURSE_FEES_TABLE = 'course_fees'

// Master toggle for pricing visibility. Set to true when DB pricing is live.
// Currently false so no prices are displayed unless explicitly returned as active from DB.
export const DEFAULT_SHOW_PRICES = false

/**
 * Checks whether the price for a program should be displayed.
 * Returns true ONLY if price is present AND price flag is explicitly true.
 */
export function shouldShowPrice(program, feeData = null) {
  if (!program) return false

  // If a DB record from `course_fees` is provided:
  if (feeData) {
    const isFlagTrue = feeData.show_price === true || feeData.price_flag === true
    const hasValidPrice = Boolean(feeData.price_inr || feeData.price)
    return isFlagTrue && hasValidPrice
  }

  // Program-level override flag
  if (program.showPrice === false || program.comingSoon) {
    return false
  }

  // Master flag check
  if (!DEFAULT_SHOW_PRICES) {
    return false
  }

  return Boolean(program.price && program.price > 0)
}

/**
 * Loads course fees from DB or local cache for the `course_fees` table.
 */
export async function fetchCourseFeesFromDb() {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from(COURSE_FEES_TABLE)
        .select('*')
      
      if (!error && data && data.length > 0) {
        const feesMap = {}
        data.forEach((row) => {
          const key = row.program_id || row.id
          feesMap[key] = {
            ...row,
            price_inr: Number(row.fee_india ?? row.price_inr ?? 0),
            price_aed: Number(row.fee_dubai ?? row.price_aed ?? 0),
            price_online: Number(row.fee_online ?? row.price_usd ?? 0),
          }
        })
        return feesMap
      }
    }

    // Fallback: check if localStorage has mock DB records for course_fees
    const raw = localStorage.getItem('academy-course-fees')
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (err) {
    console.warn('Error fetching course fees:', err)
  }
  return null
}

/**
 * Hook to get pricing and showPrice flag for a program from the `course_fees` table.
 */
export function useProgramFee(program) {
  const [feeData, setFeeData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    if (!program?.id) return

    setLoading(true)
    fetchCourseFeesFromDb().then((allFees) => {
      if (!active) return
      if (allFees && allFees[program.id]) {
        setFeeData(allFees[program.id])
      } else {
        setFeeData(null)
      }
      setLoading(false)
    }).catch(() => {
      if (active) setLoading(false)
    })

    return () => { active = false }
  }, [program?.id])

  const showPrice = shouldShowPrice(program, feeData)
  const priceInr = feeData?.price_inr || (showPrice ? program?.price : null)
  const priceAed = feeData?.price_aed || (showPrice ? program?.priceAed : null)

  return {
    feeData,
    loading,
    showPrice,
    priceInr,
    priceAed,
  }
}

