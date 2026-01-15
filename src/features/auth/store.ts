import { atom, computed } from 'nanostores'

import { mockLogin } from '@/services/api'
import type { AuthError, AuthState, LoginFormValues, User } from './types'

export const $authState = atom<AuthState>({ status: 'idle' })

export const $user = computed($authState, (state) =>
  state.status === 'authenticated' ? state.user : null
)

export const $isAuthenticating = computed(
  $authState,
  (state) => state.status === 'authenticating'
)

export const $authError = computed($authState, (state) =>
  state.status === 'error' ? state.error : null
)

export const $loginFormValues = atom<LoginFormValues>({ email: '', password: '' })

export const $statusMessage = atom('')

export function setFieldValue(field: keyof LoginFormValues, value: string): void {
  $loginFormValues.set({ ...$loginFormValues.get(), [field]: value })
}

export async function login(): Promise<User | null> {
  const { email, password } = $loginFormValues.get()

  $authState.set({ status: 'authenticating' })
  $statusMessage.set('Signing in, please wait')

  try {
    const result = await mockLogin({ email: email.trim(), password })

    if (!result.success) {
      $authState.set({ status: 'error', error: result.error })
      $statusMessage.set(`Error: ${result.error.message}`)
      return null
    }

    $authState.set({ status: 'authenticated', user: result.user })
    $statusMessage.set(`Welcome back, ${result.user.name}`)
    return result.user
  } catch {
    const error: AuthError = {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect. Please check your internet connection.',
    }
    $authState.set({ status: 'error', error })
    $statusMessage.set('Network error. Please try again.')
    return null
  }
}

export function logout(): void {
  $authState.set({ status: 'idle' })
  $loginFormValues.set({ email: '', password: '' })
  $statusMessage.set('')
}

export function clearAuthError(): void {
  if ($authState.get().status === 'error') {
    $authState.set({ status: 'idle' })
    $statusMessage.set('')
  }
}
