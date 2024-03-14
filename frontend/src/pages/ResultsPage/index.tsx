import { FC, useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { TrophyIcon } from '../../components/icons/TrophyIcon.tsx'
import { PieChart } from '../../components/PieChart'
import { Table } from '../../components/Table'
import { POLL_CHOICES, VITE_PROPOSAL_START_TIME } from '../../constants/config.ts'
import { Navigate } from 'react-router-dom'
import { useAppState } from '../../hooks/useAppState.ts'
import { DateUtils } from '../../utils/date.utils.ts'
import { useWeb3 } from '../../hooks/useWeb3.ts'
import { PollChoice } from '../../types'

interface PollChoiceWithValue extends PollChoice {
  value: bigint
}

const TABLE_HEADERS = ['Answer', 'Votes', '%']
const DATA_COLORS = ['#006dd2', '#45f1f4', '#bbbbbb']

export const ResultsPage: FC = () => {
  const { getVoteCounts } = useWeb3()
  const {
    state: { poll },
  } = useAppState()

  const [voteCount, setVoteCount] = useState<bigint[]>([])

  useEffect(() => {
    if (poll?.active === true) return

    let shouldUpdate = true

    const init = async () => {
      const voteCountsResponse = await getVoteCounts()
      if (shouldUpdate) {
        setVoteCount(voteCountsResponse)
      }
    }

    init()

    return () => {
      shouldUpdate = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [data, dataValueSum, winningMascot, dataColorMap] = useMemo(() => {
    if (!voteCount.length) {
      return [[], 0n, undefined, {} as Record<string, string>]
    }

    const _data = POLL_CHOICES.map((pollChoice, i) => ({ ...pollChoice, value: voteCount[i] })).sort(
      ({ value: a }, { value: b }) => {
        if (a > b) {
          return -1
        } else if (a < b) {
          return 1
        } else {
          return 0
        }
      }
    )

    const _dataValueSum = voteCount.reduce((acc, curr) => acc + curr, 0n)
    const [_winningMascot] = _data
    const _dataColorMap = _data.reduce(
      (acc, { name }, i) => ({ ...acc, [name]: DATA_COLORS[i % DATA_COLORS.length] }),
      {}
    )

    return [
      _data as PollChoiceWithValue[],
      _dataValueSum as bigint,
      _winningMascot as PollChoiceWithValue,
      _dataColorMap as Record<string, string>,
    ]
  }, [voteCount])

  if (poll?.active === true) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div>
      <Card>
        <p className={classes.cardHeaderText}>Below are the final results of the mascot poll.</p>
        {winningMascot && (
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
        )}
        <div className={classes.mascotPollData}>
          <PieChart data={data} colorMap={dataColorMap} />
          <Table className={classes.mascotResultsTable} headers={TABLE_HEADERS} data={data}>
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
        {(!!VITE_PROPOSAL_START_TIME || !!poll?.params.closeTimestamp) && (
          <p className={classes.cardFooterText}>
            Poll opened
            {!!VITE_PROPOSAL_START_TIME && (
              <>&nbsp;from {DateUtils.intlDateFormat(DateUtils.unixFormatToDate(VITE_PROPOSAL_START_TIME))}</>
            )}
            {!!poll?.params.closeTimestamp && (
              <>
                &nbsp;until {DateUtils.intlDateFormat(DateUtils.unixFormatToDate(poll.params.closeTimestamp))}
              </>
            )}
            .
          </p>
        )}
      </Card>
    </div>
  )
}
