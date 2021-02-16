import React from 'react'

import './Pagination.scss'

interface Props {
  pages: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = React.memo(({ pages, currentPage, setCurrentPage }: Props) => {
  const renderButtons = () => {
    const pagesButtons = []

    for (let i = 1; i <= pages; i++) {
      pagesButtons.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`page${i === currentPage ? ' page--current' : ''}`}
        >
          {i}
        </li>
      )
    }

    return pagesButtons
  }

  return <ul className="pagination">{renderButtons()}</ul>
})

export default Pagination
