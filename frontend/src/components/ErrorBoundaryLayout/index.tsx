import { FC } from 'react'
import { LayoutBase } from '../LayoutBase'
import { StringUtils } from '../../utils/string.utils.ts'
import { Alert } from '../Alert'
import classes from './index.module.css'
import { toErrorString } from '../../utils/errors.ts'

interface Props {
  error: unknown
}

export const ErrorBoundaryLayout: FC<Props> = ({ error }) => (
  <LayoutBase>
    <Alert className={classes.errorAlert} type="error">
      {StringUtils.truncate(toErrorString(error as Error))}
    </Alert>
  </LayoutBase>
)
