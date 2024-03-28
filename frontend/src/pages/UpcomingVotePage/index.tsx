import { FC } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { POLL_CHOICES, VOTING_LANDING_PAGE_URL } from '../../constants/config'
import { useAppState } from '../../hooks/useAppState'

// TODO: Mark this page for removal
export const UpcomingVotePage: FC = () => {
  const {
    state: { isMobileScreen, isDesktopScreen },
  } = useAppState()

  const headerText = (
    <>
      Read more about the campaign&nbsp;
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

  return (
    <>
      {isMobileScreen && <p className={classes.headerText}>{headerText}</p>}
      <Card className={classes.upcomingVotePageCard}>
        {isDesktopScreen && <p className={classes.cardHeaderText}>{headerText}</p>}
        <div className={classes.mascotCards}>
          {POLL_CHOICES.map(({ name, description, imagePath }) => (
            <MascotCard
              key={name}
              title={name}
              description={description}
              image={<img alt={name} src={imagePath} />}
              className={classes.mascotCard}
            />
          ))}
        </div>
        <p className={classes.cardFooterText}>
          Thank you for your vote! We’re running a second ballot in April. Please stay tuned as we announce
          the new voting period.
        </p>
      </Card>
    </>
  )
}
