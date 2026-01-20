import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Level5() {
  const [items, setItems] = useState([
    { id: 1, text: 'Задача 1' },
    { id: 2, text: 'Задача 2' },
    { id: 3, text: 'Задача 3' },
    { id: 4, text: 'Задача 4' },
  ])
  const [draggedId, setDraggedId] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [itemName, setItemName] = useState('Важный документ')
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteDisabled, setDeleteDisabled] = useState(false)

  const [notes, setNotes] = useState([])
  const [noteInput, setNoteInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('training-notes')
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  const saveNotes = (newNotes) => {
    setNotes(newNotes)
    localStorage.setItem('training-notes', JSON.stringify(newNotes))
  }

  const addNote = () => {
    if (noteInput.trim()) {
      saveNotes([...notes, noteInput.trim()])
      setNoteInput('')
    }
  }

  const deleteNote = (index) => {
    saveNotes(notes.filter((_, i) => i !== index))
  }

  const clearStorage = () => {
    localStorage.removeItem('training-notes')
    setNotes([])
  }

  const handleDragStart = (id) => setDraggedId(id)
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (targetId) => {
    if (draggedId === targetId) return
    const draggedIndex = items.findIndex((i) => i.id === draggedId)
    const targetIndex = items.findIndex((i) => i.id === targetId)
    const newItems = [...items]
    const [removed] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, removed)
    setItems(newItems)
    setDraggedId(null)
  }

  const confirmDelete = () => {
    setShowModal(false)
    setItemName('')
    setDeleteSuccess(true)
    setDeleteDisabled(true)
  }

  return (
    <div className="level-page">
      <header className="level-header">
        <Link to="/" className="back-link" data-testid="back-button">&larr;</Link>
        <div>
          <h1>Level 5: Сложные взаимодействия</h1>
          <p>Drag-and-drop, модальные окна, localStorage</p>
        </div>
      </header>

      <main className="level-content">
        <div className="hint-box">
          <h4>Подсказка для тестирования</h4>
          <p>Drag and drop:</p>
          <p><code>await page.getByTestId('draggable-item-1').dragTo(page.getByTestId('draggable-item-3'))</code></p>
          <p>localStorage:</p>
          <p><code>await page.evaluate(() =&gt; localStorage.getItem('todos'))</code></p>
        </div>

        <h3>1. Drag and Drop сортировка</h3>
        <p>Перетащи элементы чтобы изменить порядок</p>

        <ul className="draggable-list" data-testid="draggable-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`draggable-item ${draggedId === item.id ? 'dragging' : ''}`}
              data-testid={`draggable-item-${item.id}`}
              data-order={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item.id)}
            >
              <span className="drag-handle">⋮⋮</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <div data-testid="order-display" style={{ margin: '10px 0', color: '#666' }}>
          Текущий порядок: {items.map((i) => i.id).join(', ')}
        </div>

        <hr style={{ margin: '30px 0' }} />

        <h3>2. Модальное окно подтверждения</h3>
        <p>Нажми кнопку удаления и подтверди действие</p>

        <div className="form-group">
          <input
            type="text"
            data-testid="item-name"
            value={itemName}
            readOnly
          />
        </div>

        <button
          className="btn btn-danger"
          data-testid="delete-button"
          onClick={() => setShowModal(true)}
          disabled={deleteDisabled}
        >
          Удалить элемент
        </button>

        {deleteSuccess && (
          <div className="success-message" data-testid="delete-success">
            Элемент успешно удалён!
          </div>
        )}

        {showModal && (
          <div
            className="modal-overlay"
            data-testid="modal"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <div className="modal">
              <h3>Подтверждение удаления</h3>
              <p>Вы уверены, что хотите удалить "{itemName}"?</p>
              <div className="modal-buttons">
                <button
                  className="btn btn-secondary"
                  data-testid="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </button>
                <button
                  className="btn btn-danger"
                  data-testid="confirm-button"
                  onClick={confirmDelete}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}

        <hr style={{ margin: '30px 0' }} />

        <h3>3. Сохранение в localStorage</h3>
        <p>Данные сохраняются при добавлении и восстанавливаются при перезагрузке</p>

        <div className="form-group">
          <label>Заметка</label>
          <input
            type="text"
            data-testid="note-input"
            placeholder="Введите заметку..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" data-testid="save-note" onClick={addNote}>
          Сохранить
        </button>
        <button
          className="btn btn-secondary"
          data-testid="clear-storage"
          onClick={clearStorage}
          style={{ marginLeft: 10 }}
        >
          Очистить хранилище
        </button>

        <ul className="todo-list" data-testid="notes-list" style={{ marginTop: 20 }}>
          {notes.map((note, index) => (
            <li key={index} className="todo-item" data-testid={`note-item-${index}`}>
              <span className="todo-text">{note}</span>
              <button
                className="todo-delete"
                data-testid={`delete-note-${index}`}
                onClick={() => deleteNote(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>

        <div className="counter" data-testid="storage-status">
          Сохранено заметок: <span id="notes-count">{notes.length}</span>
        </div>
      </main>
    </div>
  )
}

export default Level5
