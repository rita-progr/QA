import { useState } from 'react'
import { Link } from 'react-router-dom'

function Level1() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()])
      setInput('')
    }
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="level-page">
      <header className="level-header">
        <Link to="/" className="back-link" data-testid="back-button">&larr;</Link>
        <div>
          <h1>Level 1: Базовые селекторы</h1>
          <p>Учимся находить элементы, кликать и вводить текст</p>
        </div>
      </header>

      <main className="level-content">
        <div className="hint-box">
          <h4>Подсказка для тестирования</h4>
          <p>Используй <code>data-testid</code> атрибуты для поиска элементов:</p>
          <p><code>page.getByTestId('todo-input')</code></p>
          <p><code>page.getByRole('button', {'{'} name: 'Добавить' {'}'})</code></p>
        </div>

        <div className="form-group">
          <label htmlFor="todo-input">Новая задача</label>
          <input
            type="text"
            id="todo-input"
            data-testid="todo-input"
            placeholder="Введите задачу..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <button
          className="btn btn-primary"
          data-testid="add-button"
          onClick={addTodo}
        >
          Добавить
        </button>

        <ul className="todo-list" data-testid="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item" data-testid={`todo-item-${index}`}>
              <span className="todo-text" data-testid={`todo-text-${index}`}>{todo}</span>
              <button
                className="todo-delete"
                data-testid={`delete-${index}`}
                onClick={() => deleteTodo(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="counter" data-testid="counter">
          Задач: <span>{todos.length}</span>
        </div>
      </main>
    </div>
  )
}

export default Level1
