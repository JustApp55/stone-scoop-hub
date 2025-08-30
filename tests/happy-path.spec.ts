import { test, expect } from '@playwright/test'

test('Cold Stone happy path: add item, apply coupon, checkout, join club', async ({ page }) => {
  await page.goto('/')
  
  // Navigate to order page
  await page.click('text=Order')
  
  // Add a seasonal item to cart
  await page.click('text=Caramel Carnival Churro™').locator('..').locator('button:has-text("Add")')
  await page.click('text=Cornbread Is My Jam™').locator('..').locator('button:has-text("Add")')
  
  // Apply LOVEITBOGO coupon
  await page.click('text=LOVEITBOGO')
  
  // Verify discount appears
  await expect(page.locator('text=Discount')).toBeVisible()
  
  // Checkout
  await page.click('text=🚀 Checkout')
  await expect(page.locator('text=Order saved')).toBeVisible()
  
  // Go to home and join club
  await page.click('text=Home')
  await page.fill('input[type="email"]', 'test@coldstone.com')
  await page.click('text=Join Free')
  await expect(page.locator('text=Welcome to the Club')).toBeVisible()
})