import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/routes/HomePage'
import PostPage from '@/routes/PostPage'
import ArchivesPage from '@/routes/ArchivesPage'
import TagsPage from '@/routes/TagsPage'
import TagPage from '@/routes/TagPage'
import AboutPage from '@/routes/AboutPage'
import NotFoundPage from '@/routes/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'posts/:slug', element: <PostPage /> },
      { path: 'archives', element: <ArchivesPage /> },
      { path: 'tags', element: <TagsPage /> },
      { path: 'tags/:tag', element: <TagPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
