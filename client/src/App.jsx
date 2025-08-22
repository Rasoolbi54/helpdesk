import { useState } from 'react'
import React from 'react'
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import UserDashboard from './pages/UserDashboard'
import AgentDashboard from './pages/AgentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AgentLoginPage from './pages/AgentLoginPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className='min-h-screen bg-black text-white relative overflow-hidden'>
    {/* <div className="absolute inset-0  ">
        <div className="grid grid-cols-25 h-full w-full opacity-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-800 relative"
              style={{
                animationDelay: `${(i * 0.1) % 3}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent animate-pulse" />
            </div>
          ))}
        </div>
      </div> */}
 
  
    <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/login' element={<LoginPage />}/>
       <Route path='/agent-login' element={<AgentLoginPage />}/>
       <Route path='/register' element={<RegisterPage />}/>
       <Route path='/user-dashboard' element={<PrivateRoute>
        <UserDashboard />
       </PrivateRoute>}/>
       <Route path='/agent-dashboard' element={<PrivateRoute><AgentDashboard /></PrivateRoute>}/>
       <Route path='/admin-dashboard' element={<PrivateRoute><AdminDashboard /></PrivateRoute>}/>
    </Routes>
  </div>
  )
}

export default App
