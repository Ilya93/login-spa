import type { ReactElement } from 'react'

import { Button, Card, CardFooter, CardHeader } from '@/components/ui'
import { logout, type User } from '@/features/auth'

interface HomePageProps {
  user: User
}

export function HomePage({ user }: HomePageProps): ReactElement {
  return (
    <Card variant="success">
      <div role="status" aria-live="polite">
        <CardHeader
          title={`Welcome, ${user.name}!`}
          subtitle="You're signed in."
        />
      </div>

      <div className="form">
        <Button
          type="button"
          variant="primary"
          fullWidth
          onClick={logout}
        >
          Sign out
        </Button>
      </div>

      <CardFooter>
        <p>
          Signed in as <strong>{user.email}</strong>
        </p>
      </CardFooter>
    </Card>
  )
}
