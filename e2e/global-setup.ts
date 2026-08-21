import { chromium } from '@playwright/test'
import path from 'path'
import { execSync } from 'child_process'

async function seedDatabase() {
  console.log('Seeding test database...')
  try {
    execSync('npx tsx prisma/seed.test.ts', {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
    })
  } catch (error) {
    console.error('Database seeding failed:', error)
    throw error
  }
}

export default async function globalSetup() {
  await seedDatabase()
}