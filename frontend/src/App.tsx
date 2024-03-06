import { FC } from 'react'
import { Layout } from './components/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EIP1193ContextProvider } from './providers/EIP1193Provider.tsx'
import { Web3ContextProvider } from './providers/Web3Provider.tsx'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
])

export const App: FC = () => {
  return (
    <EIP1193ContextProvider>
      <Web3ContextProvider>
        <RouterProvider router={router} />
      </Web3ContextProvider>
    </EIP1193ContextProvider>
  )
}
