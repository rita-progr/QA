// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Level 5 - Сложные взаимодействия', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/level5')
    await page.evaluate(() => localStorage.clear())
  })

  test('изначальный порядок элементов 1, 2, 3, 4', async ({ page }) => {
    await expect(page.getByTestId('order-display')).toContainText('1, 2, 3, 4')
  })

  test('можно перетащить элемент', async ({ page }) => {
    const item1 = page.getByTestId('draggable-item-1')
    const item3 = page.getByTestId('draggable-item-3')
    await item1.dragTo(item3)
    const orderText = await page.getByTestId('order-display').textContent()
    expect(orderText).not.toBe('Текущий порядок: 1, 2, 3, 4')
  })

  test('модальное окно скрыто изначально', async ({ page }) => {
    await expect(page.getByTestId('modal')).not.toBeVisible()
  })

  test('модальное окно открывается при клике на удаление', async ({ page }) => {
    await page.getByTestId('delete-button').click()
    await expect(page.getByTestId('modal')).toBeVisible()
  })

  test('модальное окно показывает название элемента', async ({ page }) => {
    await page.getByTestId('delete-button').click()
    await expect(page.getByTestId('modal')).toContainText('Важный документ')
  })

  test('кнопка Отмена закрывает модальное окно', async ({ page }) => {
    await page.getByTestId('delete-button').click()
    await page.getByTestId('cancel-button').click()
    await expect(page.getByTestId('modal')).not.toBeVisible()
  })

  test('кнопка Удалить подтверждает удаление', async ({ page }) => {
    await page.getByTestId('delete-button').click()
    await page.getByTestId('confirm-button').click()
    await expect(page.getByTestId('modal')).not.toBeVisible()
    await expect(page.getByTestId('delete-success')).toBeVisible()
    await expect(page.getByTestId('delete-button')).toBeDisabled()
  })

  test('клик вне модалки закрывает её', async ({ page }) => {
    await page.getByTestId('delete-button').click()
    await page.getByTestId('modal').click({ position: { x: 10, y: 10 } })
    await expect(page.getByTestId('modal')).not.toBeVisible()
  })

  test('изначально localStorage пуст', async ({ page }) => {
    await page.reload()
    await expect(page.locator('#notes-count')).toHaveText('0')
  })

  test('заметка сохраняется в localStorage', async ({ page }) => {
    await page.getByTestId('note-input').fill('Моя заметка')
    await page.getByTestId('save-note').click()
    await expect(page.getByTestId('note-item-0')).toContainText('Моя заметка')
    await expect(page.locator('#notes-count')).toHaveText('1')
  })

  test('заметки сохраняются после перезагрузки', async ({ page }) => {
    await page.getByTestId('note-input').fill('Сохранённая заметка')
    await page.getByTestId('save-note').click()
    await page.reload()
    await expect(page.getByTestId('note-item-0')).toContainText('Сохранённая заметка')
  })

  test('можно добавить несколько заметок', async ({ page }) => {
    await page.getByTestId('note-input').fill('Заметка 1')
    await page.getByTestId('save-note').click()
    await page.getByTestId('note-input').fill('Заметка 2')
    await page.getByTestId('save-note').click()
    await expect(page.locator('#notes-count')).toHaveText('2')
  })

  test('можно удалить заметку', async ({ page }) => {
    await page.getByTestId('note-input').fill('Удалить меня')
    await page.getByTestId('save-note').click()
    await page.getByTestId('delete-note-0').click()
    await expect(page.locator('#notes-count')).toHaveText('0')
  })

  test('кнопка очистки удаляет все заметки', async ({ page }) => {
    await page.getByTestId('note-input').fill('Заметка 1')
    await page.getByTestId('save-note').click()
    await page.getByTestId('note-input').fill('Заметка 2')
    await page.getByTestId('save-note').click()
    await page.getByTestId('clear-storage').click()
    await expect(page.locator('#notes-count')).toHaveText('0')
  })

  test('localStorage содержит правильные данные', async ({ page }) => {
    await page.getByTestId('note-input').fill('Тестовая заметка')
    await page.getByTestId('save-note').click()
    const storageData = await page.evaluate(() => localStorage.getItem('training-notes'))
    expect(storageData).toBe('["Тестовая заметка"]')
  })

  test('можно установить данные в localStorage через evaluate', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('training-notes', '["Предустановленная заметка"]')
    })
    await page.reload()
    await expect(page.getByTestId('note-item-0')).toContainText('Предустановленная заметка')
  })
})
