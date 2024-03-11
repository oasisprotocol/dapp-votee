import { FC, useState } from 'react'
import { CaretRightIcon } from '../../components/icons/CaretRightIcon.tsx'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { POLL_CHOICES } from '../../constants/config.ts'
import { useWeb3 } from '../../hooks/useWeb3.ts'
import { Alert } from '../../components/Alert'
import { StringUtils } from '../../utils/string.utils.ts'

type MascotChoices = 0 | 1 | 2

export const HomePage: FC = () => {
  const {
    state: { isConnected },
    vote,
    canVoteOnPoll,
  } = useWeb3()

  const [selectedChoice, setSelectedChoice] = useState<MascotChoices | null>(null)
  const [pageStatus, setPageStatus] = useState<
    'loading' | 'error' | 'success' | 'insufficient-balance' | 'vote'
  >('vote')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSelectChoice = (choice: MascotChoices) => {
    setSelectedChoice(choice)
  }

  const handleVote = async () => {
    if (selectedChoice === null) return

    setIsLoading(true)

    try {
      const canVote = await canVoteOnPoll()

      if (!canVote) {
        setPageStatus('insufficient-balance')
        return
      }

      setPageStatus('loading')

      await vote(selectedChoice)

      setPageStatus('success')
    } catch (ex) {
      console.error(ex)
      setError((ex as Error).message ?? JSON.stringify(ex))

      setPageStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPageState = () => {
    setPageStatus('vote')
  }

  return (
    <>
      {pageStatus === 'loading' && (
        <Alert type="loading" actions={<span>Submitting vote...</span>}>
          Once you confirm this vote you will not be able to cancel it.
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
          {error}
        </Alert>
      )}
      {pageStatus === 'success' && (
        <Alert
          type="success"
          actions={
            <span>
              Your vote has successfully submitted.
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
          Please note there is a 100 ROSE threshold in order to cast your vote.
        </Alert>
      )}
      {pageStatus === null && (
        <Card>
          <p className={classes.cardHeaderText}>
            Select your preferred mascot option. Once you confirm this vote you will not be able to cancel it.
            Read more about the campaign on our website.
          </p>
          <div className={classes.mascotCards}>
            {POLL_CHOICES.map(({ name, description, imagePath }, choiceId) => (
              <MascotCard
                key={name}
                title={name}
                description={description}
                image={<img alt={name} src={imagePath} />}
                selected={choiceId === selectedChoice}
                actions={
                  <div className={classes.mascotCardActions}>
                    <Button
                      variant="outline"
                      size="small"
                      color="secondary"
                      disabled={isLoading}
                      onClick={() => handleSelectChoice(choiceId as MascotChoices)}
                    >
                      Select
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
          <div className={classes.cardAction}>
            <Button disabled={isLoading || selectedChoice === null || !isConnected} onClick={handleVote}>
              <label
                className={StringUtils.clsx(
                  selectedChoice === null || !isConnected
                    ? classes.voteBtnLabelDisabled
                    : classes.voteBtnLabel
                )}
              >
                {(isConnected || selectedChoice === null) && <>Continue</>}
                {!isConnected && selectedChoice !== null && <>Wallet not connected</>}
                <CaretRightIcon />
              </label>
            </Button>
          </div>
          <p className={classes.cardFooterText}>
            Please note there is a 100 ROSE threshold in order to cast your vote.
            <br />
            Poll closes on March 31st, 2024 at 00:00 CET.
          </p>
        </Card>
      )}
    </>
  )
}
