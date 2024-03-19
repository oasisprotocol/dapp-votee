import { Component, PropsWithChildren } from 'react'
import { LayoutBase } from '../LayoutBase'
import { StringUtils } from '../../utils/string.utils.ts'
import { Alert } from '../Alert'
import classes from './index.module.css'

interface Props {
  hasError: boolean
  error?: unknown
}

export class ErrorBoundary extends Component<PropsWithChildren, Props> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown) {
    console.error(error)
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <LayoutBase>
          <Alert className={classes.errorAlert} type="error">
            {StringUtils.truncate((this.state.error as Error).message ?? JSON.stringify(this.state.error))}
          </Alert>
        </LayoutBase>
      )
    }

    return this.props.children
  }
}
