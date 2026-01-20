// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Level 4 - Списки и фильтрация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/level4')
  })

  test('изначально есть 3 задачи', async ({ page }) => {
    const items = page.getByTestId('todo-item')
    await expect(items).toHaveCount(3)
  })

  test('можно добавить новую задачу', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Новая задача')
    await page.getByTestId('add-button').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(4)
  })

  test('можно отметить задачу выполненной', async ({ page }) => {
    const checkbox = page.getByTestId('todo-checkbox-1')
    await checkbox.check()
    await expect(checkbox).toBeChecked()
  })

  test('можно удалить задачу', async ({ page }) => {
    const initialCount = await page.getByTestId('todo-item').count()
    await page.getByTestId('todo-delete-1').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(initialCount - 1)
  })

  test('фильтр Все показывает все задачи', async ({ page }) => {
    await page.getByTestId('filter-all').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(3)
  })

  test('фильтр Активные показывает только незавершённые', async ({ page }) => {
    await page.getByTestId('filter-active').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(2)
  })

  test('фильтр Выполненные показывает только завершённые', async ({ page }) => {
    await page.getByTestId('filter-completed').click()
    await expect(page.getByTestId('todo-item')).toHaveCount(1)
  })

  test('активный фильтр выделен', async ({ page }) => {
    const filterAll = page.getByTestId('filter-all')
    const filterActive = page.getByTestId('filter-active')
    await expect(filterAll).toHaveClass(/active/)
    await filterActive.click()
    await expect(filterActive).toHaveClass(/active/)
    await expect(filterAll).not.toHaveClass(/active/)
  })

  test('счётчики показывают правильные значения', async ({ page }) => {
    const counter = page.getByTestId('counter')
    await expect(counter).toContainText('Всего: 3')
    await expect(counter).toContainText('Активных: 2')
    await expect(counter).toContainText('Выполненных: 1')
  })

  test('счётчики обновляются при добавлении задачи', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Ещё задача')
    await page.getByTestId('add-button').click()
    const counter = page.getByTestId('counter')
    await expect(counter).toContainText('Всего: 4')
    await expect(counter).toContainText('Активных: 3')
  })

  test('счётчики обновляются при выполнении задачи', async ({ page }) => {
    await page.getByTestId('todo-checkbox-1').check()
    const counter = page.getByTestId('counter')
    await expect(counter).toContainText('Активных: 1')
    await expect(counter).toContainText('Выполненных: 2')
  })

  test('кнопка Удалить выполненные работает', async ({ page }) => {
    await page.getByTestId('clear-completed').click()
    const counter = page.getByTestId('counter')
    await expect(counter).toContainText('Выполненных: 0')
    await expect(counter).toContainText('Всего: 2')
  })

  test('можно получить текст всех задач', async ({ page }) => {
    const items = page.getByTestId('todo-item')
    const count = await items.count()
    expect(count).toBe(3)
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent()
      expect(text?.length).toBeGreaterThan(0)
    }
  })

  test('первый элемент в списке', async ({ page }) => {
    const items = page.getByTestId('todo-item')
    await expect(items.first()).toContainText('Изучить Playwright')
  })

  test('последний элемент в списке', async ({ page }) => {
    const items = page.getByTestId('todo-item')
    await expect(items.last()).toContainText('Установить Node.js')
  })
})
