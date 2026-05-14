import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <>
         <aside class="sidebar" id="sidebar">

            <div class="logo">
                <div class="logo-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <h2>FinTrack Pro</h2>
            </div>


            <nav class="nav-links">

                <Link to="/" className="nav-item active"> <i class="fa-solid fa-table-cells-large"></i> Dashboard</Link>
                <Link to="/invoices" className="nav-item"> <i class="fa-regular fa-file-lines"></i> Invoices</Link>
                <Link to="/receipts" className="nav-item"> <i class="fa-regular fa-receipt"></i> Receipts</Link>
                <Link to="/clients" className="nav-item"> <i class="fa-solid fa-users"></i> Clients</Link>
                <Link to="/payments" className="nav-item"> <i class="fa-regular fa-credit-card"></i> Payments</Link>
                <Link to="/reports" className="nav-item"> <i class="fa-solid fa-chart-column"></i> Reports</Link>
                <Link to="/history" className="nav-item">  <i class="fa-solid fa-clock-rotate-left"></i> History</Link>
                <Link to="/settings" className="nav-item"> <i class="fa-solid fa-gear"></i> Settings</Link>

            </nav>


            <div class="divider"></div>

            <h3 class="create-title">Create New</h3>

            <button class="action-btn blue-btn">New Invoice</button>
            <button class="action-btn green-btn">New Receipt</button>
            <button class="action-btn gray-btn">Add Client</button>

        </aside>

      
    </>
  )
}

export default SideBar
