import { useStore } from '@nanostores/react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactElement } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import {
  Alert,
  Button,
  Card,
  CardFooter,
  CardHeader,
  IconButton,
  TextField,
  VisuallyHidden,
} from '@/components/ui'
import { validateEmail, validatePassword } from '@/utils/validation'
import {
  $authError,
  $loginFormValues,
  $isAuthenticating,
  $statusMessage,
  clearAuthError,
  login,
  setFieldValue,
} from '@/features/auth/store'

export function LoginForm(): ReactElement {
  const statusId = useId()

  const values = useStore($loginFormValues)
  const authError = useStore($authError)
  const isLoading = useStore($isAuthenticating)
  const statusMessage = useStore($statusMessage)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (authError) alertRef.current?.focus()
  }, [authError])

  const emailError = validateEmail(values.email)
  const passwordError = validatePassword(values.password)
  const isFormValid = !emailError && !passwordError

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setTouched({ email: true, password: true })

    if (!isFormValid) {
      if (emailError) emailRef.current?.focus()
      else if (passwordError) passwordRef.current?.focus()
      return
    }

    const user = await login()
    if (!user) alertRef.current?.focus()
  }

  return (
    <Card variant="login">
      <CardHeader
        title="Welcome back"
      />

      {authError && (
        <Alert
          ref={alertRef}
          variant="error"
          title="Authentication failed"
          onDismiss={clearAuthError}
        >
          {authError.message}
        </Alert>
      )}

      <form
        onSubmit={(e) => void handleSubmit(e)}
        noValidate
        aria-busy={isLoading}
        aria-describedby={statusMessage ? statusId : undefined}
      >
        <fieldset className="form" disabled={isLoading}>
          <VisuallyHidden as="legend">
            Sign in with email and password
          </VisuallyHidden>

          <TextField
            ref={emailRef}
            type="email"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            value={values.email}
            autoComplete="email"
            inputMode="email"
            required
            error={touched.email ? emailError : undefined}
            onChange={(e) => setFieldValue('email', e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />

          <TextField
            ref={passwordRef}
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={values.password}
            autoComplete="current-password"
            required
            error={touched.password ? passwordError : undefined}
            onChange={(e) => setFieldValue('password', e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            extra={
              <a className="field__link" href="#reset">
                Forgot password?
              </a>
            }
            suffix={
              <IconButton
                label={isPasswordVisible ? 'Hide password' : 'Show password'}
                pressed={isPasswordVisible}
                onClick={() => setIsPasswordVisible((v) => !v)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            }
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={!isFormValid}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </fieldset>
      </form>

      <CardFooter>
        <p>
          Don&apos;t have an account?{' '}
          <a href="#signup" className="link">Create one</a>
        </p>
      </CardFooter>

      <VisuallyHidden
        role="status"
        aria-live="polite"
        aria-atomic="true"
        id={statusId}
      >
        {statusMessage}
      </VisuallyHidden>
    </Card>
  )
}
