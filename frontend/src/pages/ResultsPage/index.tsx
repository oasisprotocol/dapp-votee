import { FC } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { TrophyIcon } from '../../components/icons/TrophyIcon.tsx'
import { PieChart } from '../../components/PieChart'
import { Table } from '../../components/Table'
import { POLL_CHOICES } from '../../constants/config.ts'

/**
 * TODO: Temp function marked for removal
 * @param min
 * @param max
 */
function getRandomInt(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const tableHeaders = ['Answer', 'Votes', '%']
const data = POLL_CHOICES.map(({ name }) => ({ name, value: getRandomInt(100000, 200000) })).sort(
  ({ value: valueA }, { value: valueB }) => valueB - valueA
)
const dataValueSum = data.reduce((acc, curr) => acc + curr.value, 0)

const dataColorMap: Record<string, string> = {
  [data[0].name]: '#006dd2',
  [data[1].name]: '#45f1f4',
  [data[2].name]: '#bbbbbb',
}

const [winningDataPoint] = data
const winningMascot = POLL_CHOICES.find(({ name }) => name === winningDataPoint.name)!

export const ResultsPage: FC = () => {
  return (
    <div>
      <Card>
        <p className={classes.cardHeaderText}>Below are the final results of the mascot poll.</p>
        <div className={classes.winningMascot}>
          <MascotCard
            selected
            orientation="horizontal"
            title={winningMascot.name}
            description={winningMascot.description}
            image={<img alt={winningMascot.name} src={winningMascot.imagePath} />}
            actions={
              <div className={classes.winningMascotBadge}>
                Winning mascot
                <TrophyIcon />
              </div>
            }
          />
        </div>
        <div className={classes.mascotPollData}>
          <PieChart data={data} colorMap={dataColorMap} />
          <Table className={classes.mascotResultsTable} headers={tableHeaders} data={data}>
            {({ name, value }) => (
              <tr key={name} style={{ color: dataColorMap[name] }}>
                <td>
                  <span className={classes.answerColName}>{name}</span>
                </td>
                <td>{value.toLocaleString()}</td>
                <td>
                  {new Intl.NumberFormat(undefined, {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(value / dataValueSum)}
                </td>
              </tr>
            )}
          </Table>
        </div>
        <p className={classes.cardFooterText}>
          Poll opened from March 31/03/2024 (00:00 CET) until 31/12/2024 (00:00 CET).
        </p>
      </Card>
    </div>
  )
}
