import { createTestEngine } from '@atomic-testing/playwright';
import { expect, test } from '@playwright/test';
import { basicSelectExampleScenePart } from '../src/examples';

test('happy path selection', async ({ page }) => {
  await page.goto('/select');
  const testEngine = createTestEngine(page, basicSelectExampleScenePart);
  const targetValue = '30';
  await testEngine.parts.select.setValue(targetValue);
  const val = await testEngine.parts.select.getValue();
  expect(val).toBe(targetValue);
  await testEngine.cleanUp();
});
