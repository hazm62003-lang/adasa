import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import NotFound from './pages/NotFound.jsx'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
