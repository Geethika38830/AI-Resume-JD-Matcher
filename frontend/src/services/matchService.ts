
import api from './api'

export interface MatchResult {
  id?: number
  resume_id?: number
  job_description_id?: number
  match_score: number
  matched_skills?: string
  missing_skills?: string
  experience_match?: string
  education_match?: string
  ai_explanation?: string
  recommendations?: string
  created_at?: string
}

export async function createMatch(
  resumeId: number,
  jobDescriptionId: number,
) {
  return api.post<MatchResult>(
    `/matching/${resumeId}/${jobDescriptionId}`,
  )
}

export async function getMatches() {
  return api.get<MatchResult[]>('/matching/')
}

export async function getMatch(matchId: number) {
  return api.get<MatchResult>(`/matching/${matchId}`)
}
