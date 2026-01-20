// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Level 1 - Базовые селекторы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/level1')
  })

  test('страница загружается', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Level 1')
  })

  test('можно найти поле ввода по data-testid', async ({ page }) => {
    const input = page.getByTestId('todo-input')
    await expect(input).toBeVisible()
    await expect(input).toHaveAttribute('placeholder', 'Введите задачу...')
  })

  test('можно найти кнопку по роли', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Добавить' })
    await expect(button).toBeVisible()
  })

  test('можно ввести текст в поле ввода', async ({ page }) => {
    const input = page.getByTestId('todo-input')
    await input.fill('Моя первая задача')
    await expect(input).toHaveValue('Моя первая задача')
  })

  test('можно добавить задачу', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Купить молоко')
    await page.getByTestId('add-button').click()
    await expect(page.getByTestId('todo-text-0')).toHaveText('Купить молоко')
  })

  test('счётчик увеличивается при добавлении задачи', async ({ page }) => {
    const counter = page.getByTestId('counter')
    await expect(counter).toContainText('0')
    await page.getByTestId('todo-input').fill('Задача 1')
    await page.getByTestId('add-button').click()
    await expect(counter).toContainText('1')
  })

  test('можно добавить несколько задач', async ({ page }) => {
    const tasks = ['Задача 1', 'Задача 2', 'Задача 3']
    for (const task of tasks) {
      await page.getByTestId('todo-input').fill(task)
      await page.getByTestId('add-button').click()
    }
    await expect(page.getByTestId('todo-text-0')).toHaveText('Задача 1')
    await expect(page.getByTestId('todo-text-1')).toHaveText('Задача 2')
    await expect(page.getByTestId('todo-text-2')).toHaveText('Задача 3')
  })

  test('можно удалить задачу', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Удалить меня')
    await page.getByTestId('add-button').click()
    await expect(page.getByTestId('todo-text-0')).toBeVisible()
    await page.getByTestId('delete-0').click()
    await expect(page.getByTestId('todo-text-0')).not.toBeVisible()
  })

  test('можно добавить задачу нажав Enter', async ({ page }) => {
    const input = page.getByTestId('todo-input')
    await input.fill('Задача через Enter')
    await input.press('Enter')
    await expect(page.getByTestId('todo-text-0')).toHaveText('Задача через Enter')
  })

  test('кнопка назад работает', async ({ page }) => {
    await page.getByTestId('back-button').click()
    await expect(page).toHaveURL('/')
  })
})
