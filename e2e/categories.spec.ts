import { test, expect } from '@playwright/test'

function uniqueName(prefix: string) {
  return `${prefix}-${Date.now()}`
}

test.describe('Categories CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.locator('input[type="email"]').fill('admin@example.com')
    await page.locator('input[type="password"]').fill('admin123')
    await page.getByRole('button', { name: 'Se connecter' }).click()
    await page.waitForURL('/admin')
  })

  test('should create a new category', async ({ page }) => {
    await page.goto('/admin/categories')
    await page.waitForURL('/admin/categories')

    const categoryName = uniqueName('Category')
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')

    await page.fill('input[name="name"]', categoryName)
    await page.fill('input[name="slug"]', categorySlug)
    await page.getByRole('button', { name: 'Créer' }).click()

    await page.waitForTimeout(2000)
    await page.goto('/admin/categories')
    await page.waitForURL('/admin/categories')

    expect(page.locator(`tr:has-text("${categoryName}")`)).toBeVisible()
  })

  test('should delete a category', async ({ page }) => {
    await page.goto('/admin/categories')
    await page.waitForURL('/admin/categories')

    const categoryName = uniqueName('CategoryToDelete')
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')

    await page.fill('input[name="name"]', categoryName)
    await page.fill('input[name="slug"]', categorySlug)
    await page.getByRole('button', { name: 'Créer' }).click()
    await page.waitForTimeout(2000)

    await page.goto('/admin/categories')
    await page.waitForURL('/admin/categories')

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    const row = page.locator(`tr:has-text("${categoryName}")`)
    await row.getByRole('button').click()
    await page.waitForTimeout(1000)

    await page.goto('/admin/categories')
    await page.waitForURL('/admin/categories')

    expect(page.locator(`tr:has-text("${categoryName}")`)).not.toBeVisible()
  })
})