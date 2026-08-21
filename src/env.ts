import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required').optional().default('default-secret-change-in-prod'),
  AUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Invalid environment variables')
  }
}

export const env = _env.success ? _env.data : (process.env as unknown as z.infer<typeof envSchema>)
