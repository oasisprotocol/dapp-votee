import { FC } from 'react'
import { Layout } from './components/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EIP1193ContextProvider } from './providers/EIP1193Provider.tsx'
import { Web3ContextProvider } from './providers/Web3Provider.tsx'
import { ResultsPage } from './pages/ResultsPage'
import { ConfigContextProvider } from './providers/ConfigProvider.tsx'
import { AppStateContextProvider } from './providers/AppStateProvider.tsx'

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
    <ConfigContextProvider>
      <EIP1193ContextProvider>
        <Web3ContextProvider>
          <AppStateContextProvider>
            <RouterProvider router={router} />
          </AppStateContextProvider>
        </Web3ContextProvider>
      </EIP1193ContextProvider>
    </ConfigContextProvider>
  )
}
