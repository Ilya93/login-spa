import type { AuthError, User } from '@/features/auth/types'

export interface LoginCredentials {
  email: string
  password: string
}

export type LoginResponse =
  | { success: true; user: User }
  | { success: false; error: AuthError }

const TEST_ACCOUNT = {
  email: 'demo@example.com',
  password: 'password123',
  user: {
    id: 'usr_1a2b3c4d5e',
    email: 'demo@example.com',
    name: 'Demo User',
    avatarUrl: undefined,
  },
} as const

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
  const email = credentials.email.trim().toLowerCase()
  const password = credentials.password

  await delay(250 + Math.random() * 450)

  if (email !== TEST_ACCOUNT.email || password !== TEST_ACCOUNT.password) {
    return {
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password. Please check your credentials.',
      },
    }
  }

  return {
    success: true,
    user: TEST_ACCOUNT.user,
  }
}
