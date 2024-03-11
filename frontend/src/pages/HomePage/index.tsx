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

export const HomePage: FC = () => {
  const {
    state: { isConnected },
    vote,
  } = useWeb3()

  const [selectedChoice, setSelectedChoice] = useState<0 | 1 | 2 | null>(null)
  const [pageStatus, setPageStatus] = useState<'loading' | 'error' | 'success' | null>(null)
  const [error, setError] = useState('')

  const handleSelectChoice = (choice: 0 | 1 | 2) => {
    setSelectedChoice(choice)
  }

  const handleVote = async () => {
    if (selectedChoice === null) return

    setPageStatus('loading')

    try {
      await vote(selectedChoice)

      setPageStatus('success')
    } catch (ex) {
      console.error(ex)
      setError((ex as Error).message ?? JSON.stringify(ex))

      setPageStatus('error')
    }
  }

  return (
    <>
      {pageStatus === 'loading' && (
        <Alert type="loading" actions={<span>Submitting vote...</span>}>
          Once you confirm this vote you will not be able to cancel it.
        </Alert>
      )}
      {pageStatus === 'error' && error && <Alert type="error">{error}</Alert>}
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
                      onClick={() => handleSelectChoice(choiceId as 0 | 1 | 2)}
                    >
                      Select
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
          <div className={classes.cardAction}>
            <Button disabled={selectedChoice === null || !isConnected} onClick={handleVote}>
              <label
                className={StringUtils.clsx(
                  selectedChoice === null || !isConnected ? classes.voteBtnDisabled : classes.voteBtnLabel
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
