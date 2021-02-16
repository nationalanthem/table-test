import React, { useState } from 'react'
import { Columns, Row } from '../../api'
import InputMask from 'react-input-mask'

import './AddRow.scss'

type NewRow = Record<Columns, string>

const initialFormState: NewRow = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

const inputs: Array<keyof Omit<NewRow, 'phone'>> = ['id', 'firstName', 'lastName', 'email']

interface Props {
  addNewRow: (row: Row) => void
  isIdExist: (id: number) => boolean
}

const AddRow = ({ addNewRow, isIdExist }: Props) => {
  const [showForm, setShowForm] = useState(false)

  const [formState, setFormState] = useState({ ...initialFormState })
  const [errors, setErrors] = useState({ ...initialFormState })

  const validateForm = () => {
    const { id, firstName, lastName, email, phone } = formState
    const errorsObj = { ...initialFormState }

    let isValid = true

    if (isNaN(+id)) {
      errorsObj.id = 'id должно быть числом'
    }

    if (isIdExist(+id)) {
      errorsObj.id = 'Строка с таким id уже существует'
    }

    if (!/^[a-zа-я]+$/i.test(firstName)) {
      errorsObj.firstName = 'Поле может содержать только буквы'
    }

    if (!/^[a-zа-я]+$/i.test(lastName)) {
      errorsObj.lastName = 'Поле может содержать только буквы'
    }

    if (!/\S+@\S+\.\S+/i.test(email)) {
      errorsObj.email = 'Некорректный e-mail'
    }

    if (phone.replace(/[()_-]/g, '').length !== 10) {
      errorsObj.phone = 'Некорректный номер телефона'
    }

    if (Object.values(errorsObj).some((errString) => errString)) {
      isValid = false
    }

    if (!isValid) {
      setErrors(errorsObj)
      return false
    }

    setErrors({ ...initialFormState })

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formIsValid = validateForm()

    if (formIsValid) {
      addNewRow({ ...formState, id: +formState.id })
      setFormState({ ...initialFormState })
      setShowForm(false)
    }
  }

  return (
    <div className="add-row-form">
      {showForm && (
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div className="add-row-form__input" key={input}>
              <p>{input}</p>
              <input
                placeholder={input}
                value={formState[input]}
                onChange={(e) => setFormState({ ...formState, [input]: e.target.value })}
              />
              {errors[input] && <p style={{ color: 'red' }}>{errors[input]}</p>}
            </div>
          ))}

          <div className="add-row-form__input">
            <p>phone</p>
            <InputMask
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              placeholder="phone"
              mask="(999)999-9999"
            />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
          </div>

          <button
            className="add-row-form__submit"
            disabled={
              !formState.id ||
              !formState.firstName ||
              !formState.lastName ||
              !formState.email ||
              !formState.phone.replace(/[()_-]/g, '')
            }
            type="submit"
          >
            Добавить в таблицу
          </button>
        </form>
      )}
      <button
        className="add-row-form__toggle"
        onClick={() =>
          setShowForm((prevState) => {
            if (prevState) {
              setFormState({ ...initialFormState })
              setErrors({ ...initialFormState })
              return false
            } else return true
          })
        }
      >
        {showForm ? 'Закрыть' : 'Добавить'}
      </button>
    </div>
  )
}

export default AddRow
