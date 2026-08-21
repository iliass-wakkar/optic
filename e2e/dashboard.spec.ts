import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.locator('input[type="email"]').fill('admin@example.com')
    await page.locator('input[type="password"]').fill('admin123')
    await page.getByRole('button', { name: 'Se connecter' }).click()
    await page.waitForURL('/admin')
  })

  test('should display dashboard with stats', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForURL('/admin')

    expect(page.locator('h1')).toContainText('Tableau de bord')
    expect(page.getByRole('link', { name: 'Produits' })).toBeVisible()
    expect(page.getByRole('link', { name: 'Marques' })).toBeVisible()
    expect(page.getByRole('link', { name: 'Catégories' })).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/admin')
    await page.getByRole('link', { name: 'Produits' }).click()
    await page.waitForURL('/admin/products')

    expect(page.locator('h1')).toContainText('Produits')
  })

  test('should navigate to brands page', async ({ page }) => {
    await page.goto('/admin')
    await page.getByRole('link', { name: 'Marques' }).click()
    await page.waitForURL('/admin/brands')

    expect(page.locator('h1')).toContainText('Marques')
  })

  test('should navigate to categories page', async ({ page }) => {
    await page.goto('/admin')
    await page.getByRole('link', { name: 'Catégories' }).click()
    await page.waitForURL('/admin/categories')

    expect(page.locator('h1')).toContainText('Catégories')
  })
})