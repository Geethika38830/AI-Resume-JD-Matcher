import api from './api'

export interface AuthResponse {
  access_token: string
  token_type?: string
}

export interface RegisterResponse {
  id: number
  full_name: string
  email: string
  is_active: boolean
}

export async function login(email: string, password: string) {
  return api.post<AuthResponse>('/auth/login', { email, password })
}

export async function register(
  fullName: string,
  email: string,
  password: string,
) {
  return api.post<RegisterResponse>('/auth/register', {
    full_name: fullName,
    email,
    password,
  })
}

export function logout() {
  localStorage.removeItem('access_token')
}

export interface UserProfile {
  id: number
  full_name: string
  email: string
  is_active: boolean
}

export async function getMyProfile() {
  return api.get<UserProfile>('/auth/me')
}
