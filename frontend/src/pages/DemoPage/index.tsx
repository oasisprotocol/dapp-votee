import { FC } from 'react'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { GITHUB_REPOSITORY_URL, POLL_CHOICES } from '../../constants/config'
import { useAppState } from '../../hooks/useAppState'

// TODO: Mark this page for removal
export const DemoPage: FC = () => {
  const {
    state: { isMobileScreen, isDesktopScreen },
  } = useAppState()

  const headerText = (
    <>
      You arrived on our demo Oasis Mascot dApp. You can use it as a ready reference or inspiration for your
      own confidential voting dApp. In case you want to dive deeper and understand our solution more
      thoroughly, you have the option to fork this project on{' '}
      <a
        className={classes.githubPageLink}
        href={GITHUB_REPOSITORY_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
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
      </Card>
    </>
  )
}
