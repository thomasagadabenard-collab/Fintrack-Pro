import React from 'react'
import SideBar from './Components/SideBar'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'

import DashBoard from './Pages/DashBoard'
import Invoices from './Pages/Invoices'
import Receipts from './Pages/Receipts'
import Clients from './Pages/Clients'
import Payments from './Pages/Payments'
import Reports from './Pages/Reports'
import History from './Pages/History'
import Settings from './Pages/Settings'
import ReceiptComponent from './Components/ReceiptComponent'

const App = () => {
  return (
    <>
      
      <section className='app-flex'>
        <SideBar />

        <div className='nav-body'>
          <NavBar />
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/invoices' element={<Invoices />} />
            <Route path='/receipts' element={<Receipts />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/payments' element={<Payments />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/history' element={<History />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </section>
    </>
  )
}

export default App