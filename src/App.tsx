import { useStore } from '@nanostores/react'
import type { ReactElement } from 'react'

import { $user } from '@/features/auth'
import { HomePage, SignInPage } from '@/pages'

export function App(): ReactElement {
  const user = useStore($user)

  return (
    <main className="app">
      {user ? <HomePage user={user} /> : <SignInPage />}
    </main>
  )
}
