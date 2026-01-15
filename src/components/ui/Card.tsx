import type { ReactElement, ReactNode } from 'react'

type CardVariant = 'login' | 'success'

interface CardProps {
  variant: CardVariant
  children: ReactNode
}

interface CardHeaderProps {
  title: string
  subtitle?: string
}

interface CardFooterProps {
  children: ReactNode
}

export function Card({ variant, children }: CardProps): ReactElement {
  return (
    <div className="content-wrapper">
      <div className={`card card--${variant}`}>
        {children}
      </div>
    </div>
  )
}

export function CardHeader({
  title,
  subtitle,
}: CardHeaderProps): ReactElement {
  return (
    <header className="card__header">
      <h1 className="card__title">{title}</h1>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
    </header>
  )
}

export function CardFooter({ children }: CardFooterProps): ReactElement {
  return (
    <footer className="card__footer">
      {children}
    </footer>
  )
}
