import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  extra?: ReactNode
  suffix?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, error, extra, suffix, className, ...props },
    ref
  ): ReactElement {
    const id = useId()
    const errorId = `${id}-error`
    const hasError = Boolean(error)

    const labelClass = props.required
      ? 'field__label field__label--required'
      : 'field__label'

    const labelContent = (
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    )

    const input = (
      <input
        ref={ref}
        id={id}
        className={`input ${className ?? ''}`.trim()}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...props}
      />
    )

    return (
      <div className="field">
        {extra ? (
          <div className="field__label-row">
            {labelContent}
            {extra}
          </div>
        ) : (
          labelContent
        )}

        {suffix ? (
          <div className="input-wrapper">
            {input}
            {suffix}
          </div>
        ) : (
          input
        )}

        {hasError && (
          <p id={errorId} className="field__error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
