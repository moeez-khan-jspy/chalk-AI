import { API_ENDPOINTS, getApiUrl } from './config';

/**
 * API Response Types
 */
export interface GenerateContentRequest {
  task_name: 'lesson_plan' | 'assessment_generation' | 'homework_generation';
  tool_name: 'pdf' | 'presentation' | 'mind_map' | 'ppt_video' | 'flashcards';
  instructions: string;
  pdf_data?: string; // base64-encoded PDF
  additional_params?: Record<string, any>;
}

export interface GenerateContentResponse {
  status: string;
  task_name: string;
  tool_name: string;
  message: string;
  data: Record<string, any>;
  file_url?: string;
}

export interface GenerateUploadRequest {
  task_name: 'lesson_plan' | 'assessment_generation' | 'homework_generation';
  tool_name: 'pdf' | 'presentation' | 'mind_map' | 'ppt_video' | 'flashcards';
  instructions: string;
  pdf_file?: File;
}

/**
 * Video Generation Types
 */
export interface VideoStartRequest {
  instructions: string;
  source_content?: string;
}

export interface VideoStartResponse {
  task_id: string;
  status: 'started';
}

export interface VideoStatusResponse {
  task_id: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
  stage: string;
  message: string;
  result?: {
    status: string;
    tool: string;
    file_path: string;
    file_name: string;
    total_slides: number;
    duration_seconds: number;
    message: string;
  };
  file_url?: string;
  error?: string;
}

export type VideoProgressCallback = (
  progress: number,
  stage: string,
  message: string
) => void;

/**
 * API Client
 * Handles all API calls to the backend
 */
class ApiClient {
  /**
   * Generate content using JSON body
   */
  async generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse> {
    const url = getApiUrl(API_ENDPOINTS.generate.create);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Generate content with file upload (multipart/form-data)
   */
  async generateWithUpload(request: GenerateUploadRequest): Promise<GenerateContentResponse> {
    const url = getApiUrl(API_ENDPOINTS.generate.upload);
    
    const formData = new FormData();
    formData.append('task_name', request.task_name);
    formData.append('tool_name', request.tool_name);
    formData.append('instructions', request.instructions);
    
    if (request.pdf_file) {
      formData.append('pdf_file', request.pdf_file);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Download generated file
   */
  async downloadFile(filename: string): Promise<Blob> {
    const url = getApiUrl(API_ENDPOINTS.generate.download, filename);
    
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    return await response.blob();
  }

  /**
   * Get download URL for a file
   */
  getDownloadUrl(filename: string): string {
    return getApiUrl(API_ENDPOINTS.generate.download, filename);
  }

  /**
   * Get stream URL for a video file
   */
  getStreamUrl(filename: string): string {
    return getApiUrl(API_ENDPOINTS.generate.stream, filename);
  }

  /**
   * Start video generation as a background task
   */
  async startVideoGeneration(request: VideoStartRequest): Promise<VideoStartResponse> {
    const url = getApiUrl(API_ENDPOINTS.video.start);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Get video generation status
   */
  async getVideoStatus(taskId: string): Promise<VideoStatusResponse> {
    const url = getApiUrl(API_ENDPOINTS.video.status, taskId);
    
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Generate video with progress polling
   * Returns a promise that resolves when video is complete
   */
  async generateVideoWithProgress(
    request: VideoStartRequest,
    onProgress?: VideoProgressCallback,
    pollInterval: number = 2000
  ): Promise<VideoStatusResponse> {
    // Start video generation
    const startResponse = await this.startVideoGeneration(request);
    const taskId = startResponse.task_id;

    // Poll for status
    return new Promise((resolve, reject) => {
      const pollStatus = async () => {
        try {
          const status = await this.getVideoStatus(taskId);
          
          // Call progress callback
          if (onProgress) {
            onProgress(status.progress, status.stage, status.message);
          }

          // Check if complete or error
          if (status.status === 'complete') {
            resolve(status);
            return;
          }
          
          if (status.status === 'error') {
            reject(new Error(status.error || status.message || 'Video generation failed'));
            return;
          }

          // Continue polling
          setTimeout(pollStatus, pollInterval);
        } catch (error) {
          reject(error);
        }
      };

      // Start polling
      pollStatus();
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();


