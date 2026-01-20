import { useState } from 'react'
import { Link } from 'react-router-dom'

function Level2() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
    setSuccess(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    }
    const age = parseInt(formData.age, 10)
    if (formData.age && (age < 1 || age > 120)) {
      newErrors.age = 'Возраст должен быть от 1 до 120'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
      setFormData({ name: '', email: '', password: '', age: '' })
    }
  }

  return (
    <div className="level-page">
      <header className="level-header">
        <Link to="/" className="back-link" data-testid="back-button">&larr;</Link>
        <div>
          <h1>Level 2: Формы и валидация</h1>
          <p>Работа с формами, проверка валидации и ошибок</p>
        </div>
      </header>

      <main className="level-content">
        <div className="hint-box">
          <h4>Подсказка для тестирования</h4>
          <p>Проверяй сообщения об ошибках:</p>
          <p><code>await expect(page.getByTestId('email-error')).toBeVisible()</code></p>
          <p><code>await expect(page.getByTestId('success-message')).toContainText('успешно')</code></p>
        </div>

        <form onSubmit={handleSubmit} data-testid="registration-form">
          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              name="name"
              data-testid="name-input"
              placeholder="Введите имя"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message" data-testid="name-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="text"
              name="email"
              data-testid="email-input"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message" data-testid="email-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Пароль *</label>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Минимум 6 символов"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message" data-testid="password-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label>Возраст</label>
            <input
              type="number"
              name="age"
              data-testid="age-input"
              placeholder="18"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <div className="error-message" data-testid="age-error">{errors.age}</div>}
          </div>

          <button type="submit" className="btn btn-primary" data-testid="submit-button">
            Зарегистрироваться
          </button>
        </form>

        {success && (
          <div className="success-message" data-testid="success-message">
            Регистрация прошла успешно!
          </div>
        )}
      </main>
    </div>
  )
}

export default Level2
