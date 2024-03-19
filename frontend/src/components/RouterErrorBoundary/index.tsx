import { LayoutBase } from '../LayoutBase'
import { StringUtils } from '../../utils/string.utils.ts'
import { Alert } from '../Alert'
import classes from './index.module.css'
import { useRouteError } from 'react-router-dom'

export const RouterErrorBoundary = () => {
  const error = useRouteError()

  return (
    <LayoutBase>
      <Alert className={classes.errorAlert} type="error">
        {StringUtils.truncate((error as Error).message ?? JSON.stringify(error))}
      </Alert>
    </LayoutBase>
  )
}
