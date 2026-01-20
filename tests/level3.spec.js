// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Level 3 - Динамические элементы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/level3')
  })

  test('кнопка с задержкой скрыта изначально', async ({ page }) => {
    await expect(page.getByTestId('delayed-button')).not.toBeVisible()
  })

  test('кнопка появляется через 2 секунды', async ({ page }) => {
    await page.getByTestId('start-button').click()
    await expect(page.getByTestId('delayed-button')).toBeVisible({ timeout: 3000 })
  })

  test('результат появляется при клике на скрытую кнопку', async ({ page }) => {
    await page.getByTestId('start-button').click()
    await page.getByTestId('delayed-button').click()
    await expect(page.getByTestId('delayed-result')).toBeVisible()
  })

  test('лоадер появляется при загрузке', async ({ page }) => {
    await page.getByTestId('load-button').click()
    await expect(page.getByTestId('loader')).toBeVisible()
  })

  test('лоадер исчезает после загрузки данных', async ({ page }) => {
    await page.getByTestId('load-button').click()
    await expect(page.getByTestId('loader')).toBeHidden({ timeout: 5000 })
    await expect(page.getByTestId('data-container')).toBeVisible()
  })

  test('загруженные данные содержат 3 элемента', async ({ page }) => {
    await page.getByTestId('load-button').click()
    await expect(page.getByTestId('data-container')).toBeVisible({ timeout: 5000 })
    await expect(page.getByTestId('loaded-item-0')).toBeVisible()
    await expect(page.getByTestId('loaded-item-1')).toBeVisible()
    await expect(page.getByTestId('loaded-item-2')).toBeVisible()
  })

  test('уведомление появляется при клике', async ({ page }) => {
    await page.getByTestId('notify-button').click()
    await expect(page.getByTestId('notification')).toHaveClass(/visible/)
  })

  test('уведомление исчезает через 3 секунды', async ({ page }) => {
    await page.getByTestId('notify-button').click()
    await expect(page.getByTestId('notification')).toHaveClass(/visible/)
    await expect(page.getByTestId('notification')).not.toHaveClass(/visible/, { timeout: 4000 })
  })

  test('счётчик начинается с 0', async ({ page }) => {
    await expect(page.getByTestId('auto-counter')).toContainText('0')
  })

  test('счётчик увеличивается после запуска', async ({ page }) => {
    await page.getByTestId('counter-start').click()
    await page.waitForTimeout(2000)
    const text = await page.getByTestId('auto-counter').textContent()
    const count = parseInt(text?.match(/\d+/)?.[0] || '0')
    expect(count).toBeGreaterThan(0)
  })

  test('счётчик останавливается при нажатии стоп', async ({ page }) => {
    await page.getByTestId('counter-start').click()
    await page.waitForTimeout(1500)
    await page.getByTestId('counter-stop').click()
    const text1 = await page.getByTestId('auto-counter').textContent()
    await page.waitForTimeout(1500)
    const text2 = await page.getByTestId('auto-counter').textContent()
    expect(text1).toBe(text2)
  })

  test('кнопка старт отключается после запуска', async ({ page }) => {
    await page.getByTestId('counter-start').click()
    await expect(page.getByTestId('counter-start')).toBeDisabled()
  })

  test('кнопка стоп включается после запуска', async ({ page }) => {
    await expect(page.getByTestId('counter-stop')).toBeDisabled()
    await page.getByTestId('counter-start').click()
    await expect(page.getByTestId('counter-stop')).toBeEnabled()
  })
})
