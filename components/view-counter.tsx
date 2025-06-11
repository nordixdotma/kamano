"use client"

import { useEffect, useState } from "react"
import { incrementViewCount } from "@/lib/view-counter"

export default function ViewCounter() {
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    const checkAndIncrementView = async () => {
      // Check if this view has been counted in this session
      const hasViewedKey = "tierrablanca_has_viewed"
      const hasViewed = localStorage.getItem(hasViewedKey)

      if (!hasViewed) {
        // If not counted yet, increment the view count
        await incrementViewCount()

        // Mark as viewed in this session
        localStorage.setItem(hasViewedKey, "true")
        setHasIncremented(true)
      }
    }

    checkAndIncrementView()
  }, [hasIncremented])

  // Return null so nothing is rendered
  return null
}
