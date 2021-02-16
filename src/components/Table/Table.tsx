import React from 'react'
import { Columns, Row, TABLE_HEADERS } from '../../api'

import './Table.scss'

interface Props {
  rows: Row[]
  sortColumn: (column: Columns) => void
  columnToSort?: Columns
  sortDirection: 'asc' | 'desc'
  selectedRow?: Row
  setSelectedRow: React.Dispatch<React.SetStateAction<Row | undefined>>
}

const Table = ({
  rows,
  sortColumn,
  columnToSort,
  sortDirection,
  selectedRow,
  setSelectedRow,
}: Props) => {
  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADERS.map((header) => (
            <th
              key={header}
              onClick={() => {
                sortColumn(header)
              }}
            >
              {header}

              {columnToSort === header ? (
                <span className="arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr
            className={
              selectedRow && selectedRow.email + selectedRow.id === row.email + row.id
                ? 'selected-row'
                : undefined
            }
            onClick={() => setSelectedRow(row)}
            key={row.email + row.id}
          >
            <td>{row.id}</td>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
