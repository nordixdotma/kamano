"use server"

// In a real application, this would be stored in a database
// For this example, we'll use a simple in-memory counter that resets when the server restarts
let viewCount = 0

export async function incrementViewCount() {
  viewCount += 1
  return viewCount
}

export async function getViewCount() {
  return viewCount
}
