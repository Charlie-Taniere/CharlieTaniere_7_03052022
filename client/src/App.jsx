import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import NotFound from './pages/Notfound'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './pages/Post'
import Profile from './pages/Profile'

const App = () => {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false,
  })

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false })
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          })
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authState.status ? <Navigate replace to="/main/:id" /> : <Home />
            }
          />

          <Route
            path="/main/:id"
            element={authState.status ? <Main /> : <Navigate to="/" />}
          />

          <Route
            path="/post/:id"
            element={authState.status ? <Post /> : <Navigate to="/" />}
          />

          <Route
            path="/profile/:id"
            element={authState.status ? <Profile /> : <Navigate to="/" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
