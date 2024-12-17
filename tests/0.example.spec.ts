import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://browser-automation-challenges-demo.netlify.app/');

  page.click("[id='start-challenge']");
  await page.locator('#uuid').waitFor();

  const text = await page.locator('#uuid').innerText();

  page.locator('#uuid-input').fill(text);

  await page.locator('#checkboxes').waitFor();

  const elements = await page.locator('input[type="checkbox"]').all();

  for (const element of elements) {
    const id = await element.getAttribute('id');
    await page.click(`[id='${id}']`);
    console.log(`Clicked checkbox with id: ${id}`);
  }

  await page.locator('#click-button').waitFor();

  for (let i = 0; i < 10; i++) {
    page.click("[id='click-button']");
  }

  await page.locator('#challenge-finished').waitFor();

  const h1 = page.locator('#challenge-finished h1');
  await expect(h1).toHaveText('Challenge Completed!');
});
