import { Link } from 'react-router-dom'

const levels = [
  { id: 1, title: 'Базовые селекторы', desc: 'Учимся находить элементы, кликать и вводить текст', difficulty: 'easy' },
  { id: 2, title: 'Формы и валидация', desc: 'Работа с формами, проверка валидации и ошибок', difficulty: 'easy' },
  { id: 3, title: 'Динамические элементы', desc: 'Ожидание элементов, таймеры и лоадеры', difficulty: 'medium' },
  { id: 4, title: 'Списки и фильтрация', desc: 'Работа с массивами элементов и фильтрами', difficulty: 'medium' },
  { id: 5, title: 'Сложные взаимодействия', desc: 'Drag-and-drop, модальные окна, localStorage', difficulty: 'hard' },
]

function Home() {
  return (
    <div className="container">
      <header>
        <h1>Playwright Training</h1>
        <p className="subtitle">Тренажёр для изучения автотестирования</p>
      </header>

      <main>
        <div className="levels-grid">
          {levels.map((level) => (
            <Link
              key={level.id}
              to={`/level${level.id}`}
              className="level-card"
              data-testid={`level-${level.id}`}
            >
              <div className="level-number">{level.id}</div>
              <h2>{level.title}</h2>
              <p>{level.desc}</p>
              <span className={`difficulty ${level.difficulty}`}>
                {level.difficulty === 'easy' ? 'Easy' : level.difficulty === 'medium' ? 'Medium' : 'Hard'}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer>
        <p>Для запуска тестов: <code>npm test</code></p>
      </footer>
    </div>
  )
}

export default Home
