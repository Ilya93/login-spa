import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  pressed?: boolean
  children: ReactNode
}

export function IconButton({
  label,
  pressed,
  children,
  className,
  ...props
}: IconButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={`input-wrapper__toggle ${className ?? ''}`.trim()}
      aria-label={label}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </button>
  )
}
