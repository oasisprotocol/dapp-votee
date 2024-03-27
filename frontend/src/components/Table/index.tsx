import { ReactElement } from 'react'
import classes from './index.module.css'
import { DataEntry } from '../../types'
import { StringUtils } from '../../utils/string.utils'

interface Props<T extends DataEntry> {
  headers: string[]
  data: T[]
  className?: string
  children: (entry: T) => ReactElement
}

export const Table = <T extends DataEntry>({
  headers,
  data,
  className,
  children,
}: Props<T>): ReactElement => {
  return (
    <table className={StringUtils.clsx(classes.table, className)}>
      <thead>
        <tr>
          {headers.map(headerName => (
            <th key={headerName}>{headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(children)}</tbody>
    </table>
  )
}
