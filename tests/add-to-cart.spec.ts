import { test, expect } from '@playwright/test';

test.describe('Add to cart', () => {
  test('can add items to cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    await page.locator('button.fc-button.fc-cta-consent.fc-primary-button').click();

    

    const productLink = page
      .locator('.product-image-wrapper')
      .filter({ hasText: 'Stylish Dress' })
      .getByRole('link', { name: 'View Product' });
    productLink.click();
    // await page.locator('a[href="/product_details/4"]').click(); Es otra froma de hacerlo pero la anterior es mas desde el punto de vista del usuario


    const titleOfProduct = page.getByRole('heading', { name: 'Stylish Dress' });
    await expect(titleOfProduct).toBeVisible();

    await page.fill('input[name="quantity"]', '3');

    await page.getByRole('button', { name: 'Add to cart' }).click();
    //await page.locator('button.btn.btn-default.cart').click(); Es otra froma de hacerlo

    const message = page.getByText('Your product has been added to cart.');
    await expect (message).toBeVisible();    
  });
});
