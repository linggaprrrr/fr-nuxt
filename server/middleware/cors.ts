// server/middleware/cors.ts
export default defineEventHandler((event) => {
  // Set appropriate CORS headers for all routes
  setResponseHeaders(event, {
    'Cross-Origin-Opener-Policy': '',
    'Cross-Origin-Embedder-Policy': '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })
})