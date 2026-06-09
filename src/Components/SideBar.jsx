import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {    

  return (
    <>

         <aside className="sidebar" id="sidebar">

            <div className="logo">
                <div className="logo-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <h2>FinTrack Pro</h2>
            </div>


            <nav className="nav-links">
            
                <Link to="/dashboard" className="nav-item active" title='Dashboard'> <i className="fa-solid fa-table-cells-large"></i> Dashboard</Link>
                <Link to="/invoices" className="nav-item" title='Invoices'> <i className="fa-regular fa-file-lines"></i> Invoices</Link>
                <Link to="/receipts" className="nav-item" title='Receipts'> <i className="fa-regular fa-receipt"></i> Receipts</Link>
                <Link to="/clients" className="nav-item" title='Clients'> <i className="fa-solid fa-users"></i> Clients</Link>
                <Link to="/payments" className="nav-item" title='payments'> <i className="fa-regular fa-credit-card"></i> Payments</Link>
                <Link to="/reports" className="nav-item" title='Reports'> <i className="fa-solid fa-chart-column"></i> Reports</Link>
                <Link to="/history" className="nav-item" title='History'>  <i className="fa-solid fa-clock-rotate-left"></i> History</Link>
                <Link to="/settings" className="nav-item" title='Settings'> <i className="fa-solid fa-gear"></i> Settings</Link>

            </nav>


            <div className="divider"></div>

            <h3 className="create-title">Create New</h3>

            <button className="action-btn blue-btn">New Invoice</button>
            <button className="action-btn green-btn">New Receipt</button>
            <button className="action-btn gray-btn">Add Client</button>

        </aside>

      
    </>
  )
}

export default SideBar
