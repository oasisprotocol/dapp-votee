import { FC } from 'react'
import { Layout } from './components/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EIP1193ContextProvider } from './providers/EIP1193Provider.tsx'
import { Web3ContextProvider } from './providers/Web3Provider.tsx'
import { ResultsPage } from './pages/ResultsPage'
import { AppStateContextProvider } from './providers/AppStateProvider.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
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
