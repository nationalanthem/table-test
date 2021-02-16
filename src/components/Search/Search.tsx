import React, { useState } from 'react'

import './Search.scss'

interface Props {
  onSearch: (value: string) => void
  lastQuery: string
}

const Search = React.memo(({ onSearch, lastQuery }: Props) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) {
      setError('Введите строку для поиска')
      return
    }
    onSearch(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <p className="search__error">{error}</p> : null}

      {lastQuery ? (
        <p className="search__query">
          Вы ищете: <span>{lastQuery}</span>
        </p>
      ) : null}

      <div className="search__box">
        <input
          placeholder="Искать в таблице..."
          value={value}
          onChange={(e) => {
            setError('')
            setValue(e.target.value)
          }}
          type="text"
        />

        <button type="submit">Найти</button>
      </div>

      {lastQuery ? (
        <p>
          <button
            onClick={() => {
              setError('')
              setValue('')
              onSearch('')
            }}
            type="button"
            className="search__cancel"
          >
            Отменить
          </button>
        </p>
      ) : null}
    </form>
  )
})

export default Search
