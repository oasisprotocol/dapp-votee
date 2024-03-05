import { FC } from 'react'
import { Layout } from './components/Layout'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

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
  return <RouterProvider router={router} />
}
