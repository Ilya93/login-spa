const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): string | undefined {
  const value = email.trim()

  if (!value) {
    return 'Email is required'
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Please enter a valid email address'
  }

  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required'
  }

  return undefined
}
