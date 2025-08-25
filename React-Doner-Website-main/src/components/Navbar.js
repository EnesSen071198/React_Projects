import '../styles/Navbar.css'
import React from 'react'
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className='navbar'>
         <div className='main'>
            <img src={Logo} alt=''/>
            <div>
                <Link to="/"> Ana Sayfa </Link>
                <Link to="/Menü"> Menü </Link>
                <Link to="/About"> Hakkımızda </Link>
                <Link to="/Contact"> İletişim </Link>
            </div>
        </div>

    </div>
  )
}

export default Navbar