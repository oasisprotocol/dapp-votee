import { FC } from 'react'
import { Layout } from './components/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { EIP1193ContextProvider } from './providers/EIP1193Provider'
import { Web3ContextProvider } from './providers/Web3Provider'
import { AppStateContextProvider } from './providers/AppStateProvider'
import { ErrorBoundary } from './components/ErrorBoundary'
import { RouterErrorBoundary } from './components/RouterErrorBoundary'

const { HomePage } = await import('./pages/HomePage')
const { ResultsPage } = await import('./pages/ResultsPage')

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      {
        path: 'results',
        element: <ResultsPage />,
      },
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
])

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <EIP1193ContextProvider>
        <Web3ContextProvider>
          <AppStateContextProvider>
            <RouterProvider router={router} />
          </AppStateContextProvider>
        </Web3ContextProvider>
      </EIP1193ContextProvider>
    </ErrorBoundary>
  )
}
