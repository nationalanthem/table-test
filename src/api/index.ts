import axios from 'axios'

export interface Row {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: {
    city: string
    state: string
    streetAddress: string
    zip: string
  }
  description?: string
}

export type Columns = keyof Omit<Row, 'address' | 'description'>
export enum TableSizes {
  LARGE = 'LARGE',
  SMALL = 'SMALL',
}

const SMALL_TABLE_URL =
  'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

const LARGE_TABLE_URL =
  'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

export const getSmallTable = () => axios.get<Row[]>(SMALL_TABLE_URL)
export const getLargeTable = () => axios.get<Row[]>(LARGE_TABLE_URL)

export const TABLE_HEADERS: Columns[] = ['id', 'firstName', 'lastName', 'email', 'phone']
