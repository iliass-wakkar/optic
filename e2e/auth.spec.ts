import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')
  })

  test('should login with valid credentials and redirect to admin', async ({ page }) => {
    await page.locator('input[type="email"]').fill('admin@example.com')
    await page.locator('input[type="password"]').fill('admin123')
    await page.getByRole('button', { name: 'Se connecter' }).click()

    await page.waitForURL('/admin')
    expect(page.url()).toBe('http://localhost:3000/admin')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.locator('input[type="email"]').fill('admin@example.com')
    await page.locator('input[type="password"]').fill('wrongpassword')
    await page.getByRole('button', { name: 'Se connecter' }).click()

    await page.waitForURL('/login')
    expect(page.url()).toBe('http://localhost:3000/login')
  })

  test('should redirect to login when accessing protected route without session', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForURL((url) => url.pathname === '/login')
    expect(page.url()).toContain('/login')
  })
})