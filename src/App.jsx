import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import SideBar from './Components/SideBar'
import NavBar from './Components/NavBar'
import ProtectedRoute from './Components/ProtectedRoute'

import DashBoard from './Pages/DashBoard'
import Invoices from './Pages/Invoices'
import Receipts from './Pages/Receipts'
import Clients from './Pages/Clients'
import Payments from './Pages/Payments'
import Reports from './Pages/Reports'
import History from './Pages/History'
import Settings from './Pages/Settings'
import LogIn from './Pages/LogIn'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth") === "true"
  )

  localStorage.setItem("auth", "true")

  const ProtectedLayout = ({ children }) => {
    return (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <section className='app-flex'>

          <SideBar />

          <div className='nav-body'>
            <NavBar setIsLoggedIn={setIsLoggedIn}/>
            {children}
          </div>

        </section>
      </ProtectedRoute>
    )
  }

  return (
    <Routes>

      {/* Login Page */}
      <Route
        path="/"
        element={<LogIn setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <DashBoard />
          </ProtectedLayout>
        }
      />

      {/* Invoices */}
      <Route
        path="/invoices"
        element={
          <ProtectedLayout>
            <Invoices />
          </ProtectedLayout>
        }
      />

      {/* Receipts */}
      <Route
        path="/receipts"
        element={
          <ProtectedLayout>
            <Receipts />
          </ProtectedLayout>
        }
      />

      {/* Clients */}
      <Route
        path="/clients"
        element={
          <ProtectedLayout>
            <Clients />
          </ProtectedLayout>
        }
      />

      {/* Payments */}
      <Route
        path="/payments"
        element={
          <ProtectedLayout>
            <Payments />
          </ProtectedLayout>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedLayout>
            <Reports />
          </ProtectedLayout>
        }
      />

      {/* History */}
      <Route
        path="/history"
        element={
          <ProtectedLayout>
            <History />
          </ProtectedLayout>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedLayout>
            <Settings />
          </ProtectedLayout>
        }
      />

    </Routes>
  )
}

export default App