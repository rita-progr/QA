// @ts-check
import { test, expect } from '@playwright/test'

test.describe('Level 2 - Формы и валидация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/level2')
  })

  test('форма видна на странице', async ({ page }) => {
    await expect(page.getByTestId('registration-form')).toBeVisible()
  })

  test('ошибка появляется при пустом имени', async ({ page }) => {
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('name-error')).toBeVisible()
    await expect(page.getByTestId('name-error')).toHaveText('Имя обязательно для заполнения')
  })

  test('форма не отправляется с пустым email', async ({ page }) => {
    await page.getByTestId('name-input').fill('Иван')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('success-message')).not.toBeVisible()
  })

  test('ошибка появляется при коротком пароле', async ({ page }) => {
    await page.getByTestId('name-input').fill('Иван')
    await page.getByTestId('email-input').fill('ivan@mail.com')
    await page.getByTestId('password-input').fill('123')
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('password-error')).toBeVisible()
  })

  test('ввод в поле возраста работает', async ({ page }) => {
    const ageInput = page.getByTestId('age-input')
    await ageInput.fill('25')
    await expect(ageInput).toHaveValue('25')
  })

  test('ошибка исчезает при вводе корректных данных', async ({ page }) => {
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('name-error')).toBeVisible()
    await page.getByTestId('name-input').fill('Иван')
    await expect(page.getByTestId('name-error')).not.toBeVisible()
  })

  test('успешная регистрация при корректных данных', async ({ page }) => {
    await page.getByTestId('name-input').fill('Иван Петров')
    await page.getByTestId('email-input').fill('ivan@example.com')
    await page.getByTestId('password-input').fill('mypassword123')
    await page.getByTestId('age-input').fill('25')
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('success-message')).toBeVisible()
    await expect(page.getByTestId('success-message')).toContainText('успешно')
  })

  test('форма очищается после успешной отправки', async ({ page }) => {
    const nameInput = page.getByTestId('name-input')
    await nameInput.fill('Иван')
    await page.getByTestId('email-input').fill('ivan@example.com')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()
    await expect(nameInput).toHaveValue('')
  })

  test('можно отправить форму без возраста', async ({ page }) => {
    await page.getByTestId('name-input').fill('Иван')
    await page.getByTestId('email-input').fill('ivan@example.com')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('success-message')).toBeVisible()
  })
})
