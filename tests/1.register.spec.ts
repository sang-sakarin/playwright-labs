import { test, expect } from '@playwright/test';

test('register challenges', async ({ page }) => {
  await page.goto('https://lemon-meadow-0c732f100.5.azurestaticapps.net/');

  while (true) {
    let elements = await page.locator('input[type="checkbox"]').all();

    for (const element of elements) {
      const isChecked = await element.isChecked();

      if (isChecked) {
        continue;
      }

      const id = await element.getAttribute('id');
      await page.click(`[id='${id}']`);
      console.log(`Clicked checkbox with id: ${id}`);
    }

    const h1 = page.locator('h1');
    const textContent = await h1.textContent();

    if (textContent === 'You win!') {
      console.log('Text "You win!" found! Breaking the loop.');
      break; // Break the loop if the text matches
    }
  }

  const h1 = page.locator('h1');
  await expect(h1).toHaveText('You win!');
});
