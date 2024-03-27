import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { TrophyIcon } from '../../components/icons/TrophyIcon'
import { PieChart } from '../../components/PieChart'
import { Table } from '../../components/Table'
import { POLL_CHOICES, VITE_PROPOSAL_START_TIME } from '../../constants/config'
import { Navigate } from 'react-router-dom'
import { useAppState } from '../../hooks/useAppState'
import { DateUtils } from '../../utils/date.utils'
import { useWeb3 } from '../../hooks/useWeb3'
import { PollChoice } from '../../types'
import { toErrorString } from '../../utils/errors'
import { MascotTieCard } from '../../components/MascotTieCard'
import { NumberUtils } from '../../utils/number.utils'
import { MascotTieSplit } from '../../components/MascotTieSplit'

interface PollChoiceWithValue extends PollChoice {
  value: bigint
}

const TABLE_HEADERS = ['Answer', 'Votes', '%']
const DATA_COLORS = ['#006dd2', '#45f1f4', '#bbbbbb']

const HEADER_TEXT = 'Below are the final results of the mascot poll.'

export const ResultsPage: FC = () => {
  const { getVoteCounts } = useWeb3()
  const {
    state: { poll, isDesktopScreen, isMobileScreen },
    setAppError,
  } = useAppState()

  const [voteCount, setVoteCount] = useState<bigint[]>([])

  useEffect(() => {
    if (poll?.active === true) return

    let shouldUpdate = true

    const init = async () => {
      const voteCountsResponse = (await getVoteCounts())!
      if (shouldUpdate) {
        setVoteCount(voteCountsResponse)
      }
    }

    init().catch(ex => {
      setAppError(toErrorString(ex as Error))
    })

    return () => {
      shouldUpdate = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [data, dataValueSum, winningMascots, dataColorMap] = useMemo(() => {
    if (!voteCount.length) {
      return [[], 0n, [], {} as Record<string, string>]
    }

    const _data = POLL_CHOICES.map((pollChoice, i) => ({ ...pollChoice, value: voteCount[i] ?? 0n })).sort(
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
    const _winningMascots = _data.filter(({ value }) => _winningMascot.value === value)
    const _dataColorMap = _data.reduce(
      (acc, { name }, i) => ({ ...acc, [name]: DATA_COLORS[i % DATA_COLORS.length] }),
      {}
    )

    return [
      _data as PollChoiceWithValue[],
      _dataValueSum as bigint,
      _winningMascots as PollChoiceWithValue[],
      _dataColorMap as Record<string, string>,
    ]
  }, [voteCount])

  const winningMascotsEl = useMemo(() => {
    if (winningMascots.length <= 0) {
      return null
    }

    if (winningMascots.length === 1) {
      const [winningMascot] = winningMascots
      const { name, description, imagePath } = winningMascot

      return (
        <div className={classes.winningMascot}>
          <MascotCard
            selected
            orientation={isDesktopScreen ? 'horizontal' : 'vertical'}
            title={name}
            description={description}
            image={<img alt={name} src={imagePath} />}
            actions={
              <div className={classes.winningMascotBadge}>
                <span>Winning mascot</span>
                <TrophyIcon
                  size={isDesktopScreen ? 'small' : undefined}
                  width={isDesktopScreen ? undefined : 18}
                  height={isDesktopScreen ? undefined : 18}
                />
              </div>
            }
          />
        </div>
      )
    }

    return (
      <div className={classes.winningMascots}>
        {winningMascots.map(({ name, imagePath, value }, index) => {
          return (
            <Fragment key={name}>
              {index !== 0 && <MascotTieSplit isLargeIcon={isDesktopScreen && winningMascots.length === 2} />}
              <MascotTieCard
                title={name}
                image={<img alt={name} src={imagePath} />}
                value={NumberUtils.toPercentageString(Number(value) / Number(dataValueSum))}
              />
            </Fragment>
          )
        })}
      </div>
    )
  }, [dataValueSum, isDesktopScreen, winningMascots])

  if (poll?.active === true) {
    return <Navigate to="/" replace={true} />
  }

  const isATieResult = winningMascots.length > 1

  return (
    <div>
      {isMobileScreen && <p className={classes.headerText}>{HEADER_TEXT}</p>}
      <Card>
        {isATieResult && <h2 className={classes.tieHeaderText}>It's a tie!</h2>}
        {isDesktopScreen && <p className={classes.cardHeaderText}>{HEADER_TEXT}</p>}
        {winningMascotsEl}
        <div className={classes.mascotPollData}>
          <PieChart className={classes.mascotPollDataPieChart} data={data} colorMap={dataColorMap} />
          <Table className={classes.mascotResultsTable} headers={TABLE_HEADERS} data={data}>
            {({ name, value }) => (
              <tr key={name} style={{ color: dataColorMap[name] }}>
                <td>
                  <span className={classes.answerColName}>{name}</span>
                </td>
                <td>{value.toLocaleString()}</td>
                <td>{NumberUtils.toPercentageString(Number(value) / Number(dataValueSum))}</td>
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
