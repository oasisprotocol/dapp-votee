import { FC } from 'react'
import classes from './index.module.css'
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer } from 'recharts'
import { DataEntry } from '../../types/data-entry.ts'

interface Props {
  data: DataEntry[]
  colorMap: Record<string, string>
}

export const PieChart: FC<Props> = ({ data, colorMap }) => {
  return (
    <div className={classes.pieChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie dataKey="value" data={data} innerRadius={50} outerRadius={100} legendType="none">
            {data.map(({ name }) => (
              <Cell key={name.replace(/ /g, '-')} fill={colorMap[name]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
