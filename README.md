# Login Form

A minimal login form with custom components and no UI library.

**Demo:** https://ilya93.github.io/login-spa/

## Test credentials

- `demo@example.com` / `password123` — success
- Any other combination — error

## Stack

- React + TypeScript
- Nanostores for state management
- Vite
- Custom CSS (no UI library)

## Run locally

```bash
pnpm install
pnpm dev
```

**Feature-based structure** — Auth logic lives in `features/auth/`, reusable UI primitives in `components/ui/`.

## License

MIT
