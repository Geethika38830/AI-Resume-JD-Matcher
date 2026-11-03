
import api from './api'

export interface JobDescription {
  id: number
  title: string
  description: string
  created_at?: string
}

export async function createJobDescription(
  title: string,
  description: string,
): Promise<JobDescription> {
  return api.post<JobDescription>('/job-descriptions/', {
    title,
    description,
  })
}

export async function getJobDescriptions(): Promise<JobDescription[]> {
  return api.get<JobDescription[]>('/job-descriptions/')
}
