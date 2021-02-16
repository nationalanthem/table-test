import React from 'react'
import { Row } from '../../api'

import './RowInfo.scss'

interface Props {
  row?: Row
}

const RowInfo = React.memo(({ row }: Props) => {
  return row ? (
    <div className="row-info">
      <p>
        Выбран пользователь:{' '}
        <b>
          {row.firstName} {row.lastName}
        </b>
      </p>

      <p>Описание:</p>
      {row.description ? (
        <textarea rows={6} cols={40} readOnly={true} value={row.description} />
      ) : (
        <b>–</b>
      )}

      <p>
        Адрес проживания: <b>{row.address?.streetAddress || '–'}</b>
      </p>

      <p>
        Город: <b>{row.address?.city || '–'}</b>
      </p>

      <p>
        Провинция/штат: <b>{row.address?.state || '–'}</b>
      </p>

      <p>
        Индекс: <b>{row.address?.zip || '–'}</b>
      </p>
    </div>
  ) : null
})

export default RowInfo
