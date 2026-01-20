import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialTodos = [
  { id: 1, text: 'Изучить Playwright', completed: false },
  { id: 2, text: 'Написать первый тест', completed: false },
  { id: 3, text: 'Установить Node.js', completed: true },
]

function Level4() {
  const [todos, setTodos] = useState(initialTodos)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [nextId, setNextId] = useState(4)

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: nextId, text: input.trim(), completed: false }])
      setNextId(nextId + 1)
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed))
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="level-page">
      <header className="level-header">
        <Link to="/" className="back-link" data-testid="back-button">&larr;</Link>
        <div>
          <h1>Level 4: Списки и фильтрация</h1>
          <p>Работа с массивами элементов и фильтрами</p>
        </div>
      </header>

      <main className="level-content">
        <div className="hint-box">
          <h4>Подсказка для тестирования</h4>
          <p>Работа с несколькими элементами:</p>
          <p><code>const items = page.getByTestId('todo-item')</code></p>
          <p><code>await expect(items).toHaveCount(3)</code></p>
          <p><code>await items.nth(0).click()</code></p>
        </div>

        <div className="form-group">
          <label>Новая задача</label>
          <input
            type="text"
            data-testid="todo-input"
            placeholder="Введите задачу..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
        </div>

        <button className="btn btn-primary" data-testid="add-button" onClick={addTodo}>
          Добавить
        </button>

        <div className="filters">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              data-testid={`filter-${f}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
            </button>
          ))}
        </div>

        <ul className="todo-list" data-testid="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid="todo-item"
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                data-testid={`todo-checkbox-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text" data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
              <button
                className="todo-delete"
                data-testid={`todo-delete-${todo.id}`}
                onClick={() => deleteTodo(todo.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="counter" data-testid="counter">
          Всего: {todos.length} | Активных: {activeCount} | Выполненных: {completedCount}
        </div>

        <button
          className="btn btn-danger"
          data-testid="clear-completed"
          onClick={clearCompleted}
          style={{ marginTop: 20 }}
        >
          Удалить выполненные
        </button>
      </main>
    </div>
  )
}

export default Level4
