import { FC, useEffect, useMemo, useState } from 'react'
import { CaretRightIcon } from '../../components/icons/CaretRightIcon'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { POLL_CHOICES, VOTING_LANDING_PAGE_URL } from '../../constants/config'
import { useWeb3 } from '../../hooks/useWeb3'
import { Alert } from '../../components/Alert'
import { StringUtils } from '../../utils/string.utils'
import { useAppState } from '../../hooks/useAppState'
import { Navigate, useSearchParams } from 'react-router-dom'
import { DateUtils } from '../../utils/date.utils'
import { MascotChoices } from '../../types'
import { NumberUtils } from '../../utils/number.utils'
import { CheckCircleIcon } from '../../components/icons/CheckCircleIcon'
import { toErrorString } from '../../utils/errors'

export const HomePage: FC = () => {
  const {
    state: { isConnected, account },
    vote,
    getTransaction,
    canVoteOnPoll,
    verifyMinBalanceOfNativeBalanceACL,
  } = useWeb3()
  const {
    state: { poll, previousVote, isMobileScreen, isDesktopScreen },
    setPreviousVoteForCurrentWallet,
  } = useAppState()

  const [searchParams] = useSearchParams()
  const preselectedMascotChoice = searchParams.get('choice') ?? null
  const preselectedMascotChoiceNullableInt = NumberUtils.toNullableInt(preselectedMascotChoice)
  const preselectMascotChoice = NumberUtils.isValidMascotChoiceId(preselectedMascotChoiceNullableInt)
    ? preselectedMascotChoiceNullableInt
    : null

  const [selectedChoice, setSelectedChoice] = useState<MascotChoices | null>(preselectMascotChoice)
  const [pageStatus, setPageStatus] = useState<
    'loading' | 'error' | 'success' | 'insufficient-balance' | 'vote'
  >('vote')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setPageStatus('vote')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (NumberUtils.isValidMascotChoiceId(previousVote)) {
      setSelectedChoice(previousVote)
    }
  }, [previousVote])

  const actionBtnLabelContent = useMemo(() => {
    if ((isConnected || selectedChoice === null) && !NumberUtils.isValidMascotChoiceId(previousVote)) {
      return (
        <>
          <>Continue</>
          {isDesktopScreen && <CaretRightIcon />}
        </>
      )
    } else if (isConnected && NumberUtils.isValidMascotChoiceId(previousVote)) {
      return <>Amend your vote</>
    } else if (!isConnected && selectedChoice !== null) {
      return <>Wallet not connected</>
    }
  }, [isConnected, isDesktopScreen, previousVote, selectedChoice])

  const handleSelectChoice = (choice: MascotChoices) => {
    setSelectedChoice(choice)
  }

  /**
   * Returns null in case user is not eligible to vote
   */
  const handleCanVoteOnPoll = async () => {
    const [hasEnoughBalanceResult, canVoteResult] = await Promise.allSettled([
      // Manually check if the wallet has enough balance left to vote, after paying for transaction fees
      verifyMinBalanceOfNativeBalanceACL(),
      // Double-check on the contract itself, if the wallet is eligible to vote
      canVoteOnPoll(),
    ])

    if (
      hasEnoughBalanceResult.status === 'fulfilled' &&
      hasEnoughBalanceResult.value === true &&
      canVoteResult.status === 'fulfilled' &&
      canVoteResult.value === true
    ) {
      return true
    } else {
      setPageStatus('insufficient-balance')

      return null
    }
  }

  const handleVote = async () => {
    if (selectedChoice === null) return

    setIsLoading(true)

    try {
      const canVote = await handleCanVoteOnPoll()
      if (canVote === null) {
        setIsLoading(false)
        return
      }

      const txResponse = (await vote(selectedChoice))!
      setPageStatus('loading')
      await getTransaction(txResponse.hash)

      setPreviousVoteForCurrentWallet(selectedChoice)

      setPageStatus('success')
    } catch (ex) {
      setError(toErrorString(ex as Error))

      setPageStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPageState = () => {
    setPageStatus('vote')
  }

  if (poll?.active === false) {
    return <Navigate to="/results" replace={true} />
  }

  const actionBtnDisabled =
    isLoading || selectedChoice === null || !isConnected || previousVote === selectedChoice

  const headerText = (
    <>
      Select your preferred mascot option. Once you confirm this vote you will not be able to retract it. Read
      more about the campaign&nbsp;
      <a
        className={classes.landingPageLink}
        href={VOTING_LANDING_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        on our website
      </a>
      .
    </>
  )

  const amendText = (
    <p className={classes.cardInfoText}>You have already cast your vote. It can be amended below.</p>
  )

  return (
    <>
      {pageStatus === 'loading' && (
        <Alert type="loading" actions={<span>Submitting vote...</span>}>
          Your vote is always private, and can be changed until the poll closes.
        </Alert>
      )}
      {pageStatus === 'error' && error && (
        <Alert
          type="error"
          actions={
            <Button disabled={isLoading} onClick={resetPageState}>
              Try again
            </Button>
          }
        >
          {StringUtils.truncate(error)}
        </Alert>
      )}
      {pageStatus === 'success' && (
        <Alert
          type="success"
          actions={
            <span>
              Your vote has been successfully submitted.
              <br />
              Thank you for your participation.
            </span>
          }
        />
      )}
      {pageStatus === 'insufficient-balance' && (
        <Alert
          type="insufficient-balance"
          actions={
            <div className={classes.insufficientBalanceAlertActions}>
              <Button disabled={isLoading} onClick={handleVote}>
                Try again
              </Button>
              <Button variant="text" disabled={isLoading} onClick={resetPageState}>
                &lt; Cancel&nbsp;
              </Button>
            </div>
          }
        >
          Please note there is a 100 ROSE threshold in order to cast your vote. Furthermore, additionally to
          the 100 ROSE, make sure you have enough balance to pay for transaction fee.
        </Alert>
      )}
      {pageStatus === 'vote' && (
        <>
          {isMobileScreen && <p className={classes.headerText}>{headerText}</p>}
          <Card>
            {isDesktopScreen && <p className={classes.cardHeaderText}>{headerText}</p>}
            <div className={classes.mascotCards}>
              {POLL_CHOICES.map(({ name, description, imagePath }, choiceId) => {
                const isSelected = choiceId === selectedChoice

                return (
                  <MascotCard
                    key={name}
                    title={name}
                    description={description}
                    image={<img alt={name} src={imagePath} />}
                    selected={isSelected}
                    actions={
                      <>
                        <div className={classes.mascotCardActions}>
                          <Button
                            className={classes.mascotCardSelectBtn}
                            variant={isSelected ? 'solid' : 'outline'}
                            size={isDesktopScreen ? 'small' : 'medium'}
                            color={isSelected ? 'success' : 'secondary'}
                            disabled={isLoading}
                            onClick={() => handleSelectChoice(choiceId as MascotChoices)}
                            fullWidth={isMobileScreen}
                          >
                            Select{isSelected ? 'ed' : ''}
                          </Button>
                        </div>
                        {isSelected && (
                          <span className={classes.mascotCardSelectedCheckIcon}>
                            <CheckCircleIcon size="medium" />
                          </span>
                        )}
                      </>
                    }
                  />
                )
              })}
            </div>
            <div className={classes.cardAction}>
              {(isConnected || selectedChoice === null) &&
                NumberUtils.isValidMascotChoiceId(previousVote) &&
                amendText}
              <Button disabled={actionBtnDisabled} onClick={handleVote}>
                <label
                  className={StringUtils.clsx(
                    actionBtnDisabled ? classes.voteBtnLabelDisabled : classes.voteBtnLabel
                  )}
                >
                  {actionBtnLabelContent}
                </label>
              </Button>
            </div>
            <p className={classes.cardFooterText}>
              Please note there is a 100 ROSE threshold in order to cast your vote.
              {!!poll?.params.closeTimestamp && (
                <>
                  {isDesktopScreen ? <br /> : <>&nbsp;</>}
                  <span>
                    Poll closes on&nbsp;
                    {DateUtils.intlDateFormat(DateUtils.unixFormatToDate(poll.params.closeTimestamp))}
                  </span>
                </>
              )}
            </p>
          </Card>
        </>
      )}
    </>
  )
}
