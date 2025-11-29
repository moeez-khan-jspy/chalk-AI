/**
 * API Configuration
 * 
 * Base URL and endpoints for the backend API
 */

// API Base URL - Backend running on localhost:8000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tech-teach-production.up.railway.app';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Content Generation endpoints
  generate: {
    // Generate content with JSON body
    create: '/api/v1/generate/',
    // Generate content with file upload (multipart/form-data)
    upload: '/api/v1/generate/upload',
    // Download generated file
    download: (filename: string) => `/api/v1/generate/download/${filename}`,
    // Stream video file
    stream: (filename: string) => `/api/v1/generate/stream/${filename}`,
  },
  // Video Generation endpoints (background task with polling)
  video: {
    // Start video generation as background task
    start: '/api/v1/generate/video/start',
    // Get video generation status
    status: (taskId: string) => `/api/v1/generate/video/status/${taskId}`,
  },
} as const;

/**
 * Helper function to build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

/**
 * Get full URL for an endpoint
 */
export const getApiUrl = (
  endpoint: string | ((...args: any[]) => string),
  ...params: any[]
): string => {
  const endpointPath = typeof endpoint === 'function' ? endpoint(...params) : endpoint;
  return buildApiUrl(endpointPath);
};


