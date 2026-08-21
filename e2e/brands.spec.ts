import { test, expect } from '@playwright/test'

function uniqueName(prefix: string) {
  return `${prefix}-${Date.now()}`
}

test.describe('Brands CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.locator('input[type="email"]').fill('admin@example.com')
    await page.locator('input[type="password"]').fill('admin123')
    await page.getByRole('button', { name: 'Se connecter' }).click()
    await page.waitForURL('/admin')
  })

  test('should create a new brand', async ({ page }) => {
    await page.goto('/admin/brands')
    await page.waitForURL('/admin/brands')

    const brandName = uniqueName('Brand')
    const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-')

    await page.fill('input[name="name"]', brandName)
    await page.fill('input[name="slug"]', brandSlug)
    await page.getByRole('button', { name: 'Créer' }).click()

    await page.waitForTimeout(2000)
    await page.goto('/admin/brands')
    await page.waitForURL('/admin/brands')

    expect(page.locator(`tr:has-text("${brandName}")`)).toBeVisible()
  })

  test('should delete a brand', async ({ page }) => {
    await page.goto('/admin/brands')
    await page.waitForURL('/admin/brands')

    const brandName = uniqueName('BrandToDelete')
    const brandSlug = brandName.toLowerCase().replace(/\s+/g, '-')

    await page.fill('input[name="name"]', brandName)
    await page.fill('input[name="slug"]', brandSlug)
    await page.getByRole('button', { name: 'Créer' }).click()
    await page.waitForTimeout(2000)

    await page.goto('/admin/brands')
    await page.waitForURL('/admin/brands')

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    const row = page.locator(`tr:has-text("${brandName}")`)
    await row.getByRole('button').click()
    await page.waitForTimeout(1000)

    await page.goto('/admin/brands')
    await page.waitForURL('/admin/brands')

    expect(page.locator(`tr:has-text("${brandName}")`)).not.toBeVisible()
  })
})