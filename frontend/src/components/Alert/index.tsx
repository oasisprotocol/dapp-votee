import { FC, PropsWithChildren, ReactElement } from 'react'
import classes from './index.module.css'
import { Card } from '../Card'
import { WarningCircleIcon } from '../icons/WarningCircleIcon.tsx'
import { CheckCircleIcon } from '../icons/CheckCircleIcon.tsx'
import { SpinnerIcon } from '../icons/SpinnerIcon.tsx'
import { PiggyBankSvgIcon } from '../icons/PiggyBankIcon.tsx'

type AlertType = 'error' | 'success' | 'loading' | 'insufficient-balance'

interface AlertTypeValues {
  header: string
  icon: ReactElement
}

const alertTypeValuesMap: Record<AlertType, AlertTypeValues> = {
  error: {
    header: 'Something went wrong',
    icon: <WarningCircleIcon />,
  },
  success: {
    header: 'Vote cast',
    icon: <CheckCircleIcon />,
  },
  loading: {
    header: 'Casting your vote',
    icon: <SpinnerIcon />,
  },
  'insufficient-balance': {
    header: 'Insufficient balance',
    icon: <PiggyBankSvgIcon />,
  },
}

const alertTypeClassMap: Record<AlertType, string> = {
  error: classes.alertError,
  success: classes.alertSuccess,
  loading: classes.alertLoading,
  'insufficient-balance': classes.alertInsufficientBalance,
}

interface Props extends PropsWithChildren {
  type: AlertType
  actions?: ReactElement
  headerText?: string
}

export const Alert: FC<Props> = ({ children, type, actions, headerText }) => {
  const { header, icon } = alertTypeValuesMap[type]

  return (
    <Card className={alertTypeClassMap[type]}>
      <div className={classes.alert}>
        <h2>{headerText ?? header}</h2>
        <p>{children}</p>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.actions}>{actions}</div>
      </div>
    </Card>
  )
}
