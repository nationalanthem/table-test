import React, { useState, useEffect, useCallback } from 'react'

import Modal from './components/Modal/Modal'
import Table from './components/Table/Table'
import Pagination from './components/Pagination/Pagination'
import Search from './components/Search/Search'
import RowInfo from './components/RowInfo/RowInfo'
import AddRow from './components/AddRow/AddRow'

import { Columns, getLargeTable, getSmallTable, Row, TableSizes, TABLE_HEADERS } from './api'

import './App.scss'

const App = () => {
  const [tableSize, setTableSize] = useState<TableSizes>()

  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [partialRows, setPartialRows] = useState<Row[]>([])

  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc')
  const [columnToSort, setColumnToSort] = useState<Columns>()

  const [searchQuery, setSearchQuery] = useState('')

  const [selectedRow, setSelectedRow] = useState<Row>()

  // Пагинация, фильтрация

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  useEffect(() => {
    setColumnToSort(undefined)

    if (!searchQuery) {
      setPages(Math.ceil(rows.length / 50))
      setPartialRows(rows.slice((currentPage - 1) * 50, currentPage * 50))
    } else {
      const filteredRows = rows.filter((row) =>
        TABLE_HEADERS.some((header) =>
          row[header].toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )

      const pagesCount = Math.ceil(filteredRows.length / 50)

      if (currentPage > pagesCount && pagesCount !== 0) setCurrentPage(pagesCount)

      setPages(pagesCount)

      setPartialRows(filteredRows.slice((currentPage - 1) * 50, currentPage * 50))
    }
  }, [searchQuery, rows, currentPage])

  // Обработка нажатия на название столбца

  const sortColumn = useCallback(
    (column: Columns) => {
      if (column === columnToSort) {
        if (sortDirection === 'asc') {
          setSortDirection('desc')
        } else {
          setSortDirection('asc')
        }
      } else {
        setColumnToSort(column)
      }
    },
    [columnToSort, sortDirection]
  )

  // Сортировка таблицы

  useEffect(() => {
    if (columnToSort) {
      const rowsCopy = partialRows.slice()

      setPartialRows(
        rowsCopy.sort((a, b) => {
          switch (sortDirection) {
            case 'asc':
              return columnToSort === 'id'
                ? a.id - b.id
                : a[columnToSort].localeCompare(b[columnToSort])
            case 'desc':
              return columnToSort === 'id'
                ? b.id - a.id
                : b[columnToSort].localeCompare(a[columnToSort])
          }
        })
      )
    }
  }, [columnToSort, sortDirection])

  // Добавление новой строки

  const addNewRow = useCallback(
    (row: Row) => {
      setRows([row, ...rows])
    },
    [rows]
  )

  // Проверка, существует ли строка с таким id

  const isIdExist = useCallback((id: number) => rows.some((row) => row.id === id), [rows])

  // Fetch

  useEffect(() => {
    let getTable

    switch (tableSize) {
      case TableSizes.LARGE:
        getTable = getLargeTable
        break
      case TableSizes.SMALL:
        getTable = getSmallTable
        break
    }

    if (getTable) {
      setLoading(true)

      getTable()
        .then(({ data }) => {
          setRows(data)
        })
        .catch((e) => setError(`Ошибка при загрузке данных: ${e.message}`))
        .finally(() => setLoading(false))
    }
  }, [tableSize])

  useEffect(() => {
    if (error) alert(error)
  }, [error])

  return (
    <>
      <Modal setTableSize={setTableSize} />

      {loading && <div className="loading">Подождите...</div>}
      {error && <div className="loading-error">Ошибка загрузки</div>}

      {!loading && !error && rows.length ? (
        <>
          <AddRow isIdExist={isIdExist} addNewRow={addNewRow} />

          <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

          {partialRows.length ? (
            <Table
              rows={partialRows}
              columnToSort={columnToSort}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          ) : null}

          <div className="search">
            {!partialRows.length ? <p className="not-found">Не найдено</p> : null}
            <Search lastQuery={searchQuery} onSearch={handleSearch} />
          </div>

          <RowInfo row={selectedRow} />
        </>
      ) : null}
    </>
  )
}

export default App
