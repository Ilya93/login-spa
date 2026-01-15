import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

type ButtonVariant = 'primary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps): ReactElement {
  const classes = [
    'button',
    `button--${variant}`,
    fullWidth && 'button--full',
    loading && 'button--loading',
    className,
  ].filter(Boolean).join(' ')

  const isDisabled = disabled === true || loading

  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  )
}
