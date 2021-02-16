import React, { useState } from 'react'
import { TableSizes } from '../../api'

import './Modal.scss'

interface Props {
  setTableSize: React.Dispatch<React.SetStateAction<TableSizes | undefined>>
}

const Modal = React.memo(({ setTableSize }: Props) => {
  const [showModal, setShowModal] = useState(true)

  const chooseTableSize = (size: TableSizes) => () => {
    setShowModal(false)
    setTableSize(size)
  }

  return showModal ? (
    <div className="modal-bg">
      <div className="modal">
        <h1>Выберите набор данных</h1>
        <div className="modal__buttons">
          <button onClick={chooseTableSize(TableSizes.SMALL)}>Маленький</button>
          <button onClick={chooseTableSize(TableSizes.LARGE)}>Большой</button>
        </div>
      </div>
    </div>
  ) : null
})

export default Modal
