import { FC, ReactElement } from 'react'
import classes from './index.module.css'
import { DataEntry } from '../../types/data-entry.ts'
import { StringUtils } from '../../utils/string.utils.ts'

interface Props {
  headers: string[]
  data: DataEntry[]
  className?: string
  children: (entry: DataEntry) => ReactElement
}

export const Table: FC<Props> = ({ headers, data, className, children }) => {
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
