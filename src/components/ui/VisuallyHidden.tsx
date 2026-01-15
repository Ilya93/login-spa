import type { ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react'

interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children: ReactNode
}

export function VisuallyHidden({
  as: Component = 'span',
  children,
  className,
  ...props
}: VisuallyHiddenProps): ReactElement {
  return (
    <Component className={`visually-hidden ${className ?? ''}`.trim()} {...props}>
      {children}
    </Component>
  )
}
