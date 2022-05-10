import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import NotFound from './pages/Notfound'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: { accessToken: localStorage.getItem('accesToken') },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false)
        } else {
          setAuthState(true)
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <Routes>
          {!authState && <Route path="/" element={<Home />} />}
          {authState && <Route path="/auth/main" element={<Main />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
