import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Level3() {
  const [showDelayed, setShowDelayed] = useState(false)
  const [delayedResult, setDelayedResult] = useState(false)
  const [startDisabled, setStartDisabled] = useState(false)

  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  const [showNotification, setShowNotification] = useState(false)

  const [count, setCount] = useState(0)
  const [counting, setCounting] = useState(false)
  const intervalRef = useRef(null)

  const handleStart = () => {
    setStartDisabled(true)
    setTimeout(() => setShowDelayed(true), 2000)
  }

  const handleDelayedClick = () => {
    setDelayedResult(true)
  }

  const handleLoad = () => {
    setLoading(true)
    setDataLoaded(false)
    setTimeout(() => {
      setLoading(false)
      setDataLoaded(true)
    }, 3000)
  }

  const handleNotify = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const startCounter = () => {
    setCounting(true)
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
  }

  const stopCounter = () => {
    setCounting(false)
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="level-page">
      <header className="level-header">
        <Link to="/" className="back-link" data-testid="back-button">&larr;</Link>
        <div>
          <h1>Level 3: Динамические элементы</h1>
          <p>Ожидание элементов, таймеры и лоадеры</p>
        </div>
      </header>

      <main className="level-content">
        <div className="hint-box">
          <h4>Подсказка для тестирования</h4>
          <p>Используй ожидание элементов:</p>
          <p><code>await page.getByTestId('delayed-button').click()</code></p>
          <p><code>await expect(page.getByTestId('loader')).toBeHidden()</code></p>
        </div>

        <h3>1. Кнопка с задержкой</h3>
        <p>Кнопка появится через 2 секунды после нажатия "Старт"</p>

        <button
          className="btn btn-primary"
          data-testid="start-button"
          onClick={handleStart}
          disabled={startDisabled}
        >
          Старт
        </button>

        {showDelayed && (
          <button
            className="btn btn-secondary"
            data-testid="delayed-button"
            onClick={handleDelayedClick}
            style={{ marginLeft: 10 }}
          >
            Нажми меня!
          </button>
        )}

        {delayedResult && (
          <div data-testid="delayed-result" style={{ marginTop: 10, color: 'green' }}>
            Отлично! Ты нашёл скрытую кнопку!
          </div>
        )}

        <hr style={{ margin: '30px 0' }} />

        <h3>2. Загрузка данных</h3>
        <p>Данные загрузятся через 3 секунды</p>

        <button
          className="btn btn-primary"
          data-testid="load-button"
          onClick={handleLoad}
          disabled={loading}
        >
          Загрузить данные
        </button>

        {loading && <div className="loader" data-testid="loader"></div>}

        {dataLoaded && (
          <div data-testid="data-container">
            <ul className="todo-list">
              <li className="todo-item" data-testid="loaded-item-0">Загруженная задача 1</li>
              <li className="todo-item" data-testid="loaded-item-1">Загруженная задача 2</li>
              <li className="todo-item" data-testid="loaded-item-2">Загруженная задача 3</li>
            </ul>
          </div>
        )}

        <hr style={{ margin: '30px 0' }} />

        <h3>3. Уведомления</h3>
        <p>Уведомление появится и исчезнет через 3 секунды</p>

        <button
          className="btn btn-primary"
          data-testid="notify-button"
          onClick={handleNotify}
        >
          Показать уведомление
        </button>

        <div className={`notification ${showNotification ? 'visible' : ''}`} data-testid="notification">
          Это временное уведомление!
        </div>

        <hr style={{ margin: '30px 0' }} />

        <h3>4. Счётчик с автообновлением</h3>
        <p>Счётчик увеличивается каждую секунду</p>

        <button
          className="btn btn-primary"
          data-testid="counter-start"
          onClick={startCounter}
          disabled={counting}
        >
          Запустить счётчик
        </button>
        <button
          className="btn btn-secondary"
          data-testid="counter-stop"
          onClick={stopCounter}
          disabled={!counting}
          style={{ marginLeft: 10 }}
        >
          Остановить
        </button>

        <div style={{ fontSize: '2rem', marginTop: 20 }} data-testid="auto-counter">
          Счёт: <span>{count}</span>
        </div>
      </main>
    </div>
  )
}

export default Level3
