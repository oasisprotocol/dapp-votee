import { FC } from 'react'
import { CaretRightIcon } from '../../components/icons/CaretRightIcon.tsx'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import classes from './index.module.css'
import { MascotCard } from '../../components/MascotCard'
import { Alert } from '../../components/Alert'

export const HomePage: FC = () => {
  return (
    <div>
      <Alert type="insufficient-balance">
        Please note there is a 100 ROSE threshold in order to cast your vote.
      </Alert>
      <br />
      <br />
      <Alert type="loading" actions={<span>Submitting vote...</span>}>
        Once you confirm this vote you will not be able to cancel it.
      </Alert>
      <br />
      <br />
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
      <br />
      <br />
      <Alert type="error">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Ipsum
      </Alert>
      <br />
      <br />
      <Card>
        <p className={classes.cardHeaderText}>
          Select your preferred mascot option. Once you confirm this vote you will not be able to cancel it.
          Read more about the campaign on our website.
        </p>
        <div className={classes.mascotCards}>
          <MascotCard
            title="Desert Fox"
            description="Lorem ipsum dolor sit amet. A repellendus illo."
            image={<img alt="Desert Fox" src="https://fakeimg.pl/182x175" />}
            actions={
              <div className={classes.mascotCardActions}>
                <Button variant="outline" size="small" color="secondary">
                  Select
                </Button>
              </div>
            }
          />
          <MascotCard
            title="Capybara"
            description="Lorem ipsum dolor sit amet. A repellendus illo."
            image={<img alt="Capybara" src="https://fakeimg.pl/182x175" />}
            actions={
              <div className={classes.mascotCardActions}>
                <Button variant="outline" size="small" color="secondary">
                  Select
                </Button>
              </div>
            }
          />
          <MascotCard
            title="Camel"
            description="Lorem ipsum dolor sit amet. A repellendus illo."
            image={<img alt="Camel" src="https://fakeimg.pl/182x175" />}
            actions={
              <div className={classes.mascotCardActions}>
                <Button variant="outline" size="small" color="secondary">
                  Select
                </Button>
              </div>
            }
          />
        </div>
        <div className={classes.cardAction}>
          <Button>
            <label>
              Continue
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
    </div>
  )
}
