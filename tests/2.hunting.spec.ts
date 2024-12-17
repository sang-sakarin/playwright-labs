import { test, expect } from '@playwright/test';

test('hunting challenges', async ({ page }) => {
  await page.goto('https://showdownspace-rpa-challenge.vercel.app/challenge-hunting-fed83d58/');

  page.click("button[type='button']");
  await page.locator('.chakra-card').waitFor();

  const targets: string[] = [];

  await page.waitForSelector('span[class*="chakra-badge"]'); // Wait for elements to appear
  const elements = await page.locator('span[class*="chakra-badge"]').all();
  elements.shift();

  for (const element of elements) {
    const text = await element.innerText();
    console.log(`text is: ${text}`);
    targets.push(text);
  }

  let countTarget = targets.length;

  const items = await page.locator('img').all();

  for (const item of items) {
    await item.hover();

    const lastDiv = page.locator('body > div:last-of-type');

    await lastDiv.waitFor();

    const textValue = (await lastDiv.textContent()) ?? '';

    if (targets.includes(textValue)) {
      await item.click();
      countTarget--;
    }

    if (!countTarget) {
      break;
    }
  }
});
