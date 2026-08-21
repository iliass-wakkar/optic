import { test, expect } from '@playwright/test'

test.describe('Public Catalogue', () => {
  test('should display catalogue page', async ({ page }) => {
    await page.goto('/catalogue')
    await page.waitForURL('/catalogue')

    expect(page.locator('h1')).toContainText('Catalogue')
  })

  test('should display product detail page', async ({ page }) => {
    await page.goto('/catalogue/test-product')
    await page.waitForURL('/catalogue/test-product')

    expect(page.locator('h1')).toContainText('Test Product')
  })

  test('should navigate back to catalogue from product detail', async ({ page }) => {
    await page.goto('/catalogue/test-product')
    await page.click('a[href="/catalogue"]')
    await page.waitForURL('/catalogue')

    expect(page.locator('h1')).toContainText('Catalogue')
  })
})