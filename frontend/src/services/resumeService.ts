import api from './api'

export interface Resume {
  id: number
  filename?: string
  file_name?: string
  extracted_text?: string
  created_at?: string
}

interface ResumeUploadResponse {
  message: string
  resume: Resume
}

export async function uploadResume(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  return api.post<ResumeUploadResponse>('/resumes/upload', formData)
}

export async function getResumes() {
  return api.get<Resume[]>('/resumes/')
}