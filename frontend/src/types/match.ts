
export interface Match {
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
