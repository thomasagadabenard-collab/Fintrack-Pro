import React from 'react'

const NavBar = () => {
  return (
    <>
        <header className="topbar">

            <div className="left-section">

                <div className="menu-toggle" id="menuBtn">
                    <i className="fa-solid fa-bars"></i>
                </div>

                <h1 className="welcome">Welcome back, Alex Ryder</h1>

            </div>


            <div className="top-actions">

                <div className="profile">
                    <img src={`https://i.pravatar.cc/100`} alt="profile"/>
                </div>

                <div className="vertical-line"></div>

                <div className="icon-group">

                    <div className="notification">
                    <i class="fa-regular fa-bell"></i>
                    </div>

                    <i class="fa-solid fa-bolt"></i>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>

                </div>

            </div>

        </header>      
    </>
  )
}

export default NavBar
