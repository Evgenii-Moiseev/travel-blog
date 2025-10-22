import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PostsListPage from './pages/PostsListPage/PostsListPage'
import './styles/style.scss'
import PostDetailPage from './pages/PostDetailPage/PostDetailPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import CreatePostPage from './pages/CreatePostPage/CreatePostPage'
import CreateCommentPage from './pages/CreateCommentPage/CreateCommentPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/api/posts/:id" element={<PostDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route
          path="/api/posts/:id/create-comment"
          element={<CreateCommentPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
