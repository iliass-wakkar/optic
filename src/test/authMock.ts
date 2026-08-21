import { vi } from 'vitest'

export function mockAuth(session: { user?: { id: string; email: string } } | null = { user: { id: 'admin', email: 'admin@example.com' } }) {
  vi.mock('@/lib/auth', () => ({
    auth: vi.fn().mockResolvedValue(session),
    signOut: vi.fn().mockResolvedValue(undefined),
    handlers: {
      GET: vi.fn(),
      POST: vi.fn(),
    },
    signIn: vi.fn(),
  }))
}