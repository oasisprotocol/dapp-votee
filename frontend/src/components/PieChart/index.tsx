import { ReactElement, useMemo } from 'react'
import classes from './index.module.css'
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from 'recharts'
import { DataEntry } from '../../types/data-entry.ts'

interface Props<T extends DataEntry> {
  data: T[]
  colorMap: Record<string, string>
}

export const PieChart = <T extends DataEntry>({ data, colorMap }: Props<T>): ReactElement => {
  const dataNumeric = useMemo(
    () => data.map(({ value, ...rest }) => ({ ...rest, value: Number(value) })),
    [data]
  )

  return (
    <div className={classes.pieChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie dataKey="value" data={dataNumeric} innerRadius={50} outerRadius={100} legendType="none">
            {dataNumeric.map(({ name }) => (
              <Cell
                key={name}
                className={classes.pieChartCell}
                fill={colorMap[name]}
                stroke={colorMap[name]}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
