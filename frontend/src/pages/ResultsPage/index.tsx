import { FC } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { TrophyIcon } from '../../components/icons/TrophyIcon.tsx'
import { PieChart } from '../../components/PieChart'
import { Table } from '../../components/Table'

const data = [
  {
    name: 'Desert Fox',
    value: 1000000,
  },
  {
    name: 'Capybara',
    value: 500000,
  },
  {
    name: 'Camel',
    value: 500000,
  },
]

const dataValueSum = data.reduce((acc, curr) => acc + curr.value, 0)

const dataColorMap: Record<string, string> = {
  'Desert Fox': '#006dd2',
  Capybara: '#45f1f4',
  Camel: '#bbbbbb',
}

const tableHeaders = ['Answer', 'Votes', '%']

export const ResultsPage: FC = () => {
  return (
    <div>
      <Card>
        <p className={classes.cardHeaderText}>Below are the final results of the mascot poll.</p>
        <div className={classes.winningMascot}>
          <MascotCard
            selected
            orientation="horizontal"
            title="Desert Fox"
            description="Winning mascot"
            image={<img alt="Desert Fox" src="https://fakeimg.pl/182x175" />}
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
                <td>{((value / dataValueSum) * 100).toFixed(2).replace('.00', '')}%</td>
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
