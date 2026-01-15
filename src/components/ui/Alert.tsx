import {
  forwardRef,
  useState,
  type AnimationEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { AlertCircle, X } from 'lucide-react'

type AlertVariant = 'error'

interface AlertProps {
  variant: AlertVariant
  title: string
  children: ReactNode
  onDismiss?: () => void
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert({ variant, title, children, onDismiss }, ref): ReactElement {
    const [isExiting, setIsExiting] = useState(false)

    const handleDismiss = (): void => {
      setIsExiting(true)
    }

    const handleAnimationEnd = (e: AnimationEvent): void => {
      if (e.animationName === 'alert-exit') {
        setIsExiting(false)
        onDismiss?.()
      }
    }

    return (
      <div
        ref={ref}
        className={`alert alert--${variant}`}
        role="alert"
        tabIndex={-1}
        data-exiting={isExiting || undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        <span className="alert__icon" aria-hidden="true">
          <AlertCircle size={16} />
        </span>
        <div className="alert__content">
          <p className="alert__title">{title}</p>
          <p className="alert__message">{children}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            className="alert__dismiss"
            aria-label="Dismiss alert"
            onClick={handleDismiss}
          >
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)
