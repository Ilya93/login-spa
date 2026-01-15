export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export type AuthErrorCode = 'INVALID_CREDENTIALS' | 'NETWORK_ERROR'

export interface AuthError {
  code: AuthErrorCode
  message: string
}

export interface LoginFormValues {
  email: string
  password: string
}

export type AuthState =
  | { status: 'idle' }
  | { status: 'authenticating' }
  | { status: 'authenticated'; user: User }
  | { status: 'error'; error: AuthError }
