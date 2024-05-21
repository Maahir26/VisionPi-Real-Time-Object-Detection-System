/**
 * @file Navbar.jsx
 * @author Gabriel
 * @brief This file is the navbar section
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = () => { 

    const scrollToTop = () => { //to make it scroll to top after clicking a link
        window.scrollTo({
          top: 0,
          behavior: 'smooth' //smooth scrolling animation
        });
    };


    return(
        <div className='Navbar'>
            <div className='NavbarTitle'>
                <h1>Welcome to Group 14 Project | Object detection</h1>
            </div>
                <div className='NavbarSection'>
                    <NavLink to='/' onClick={scrollToTop}>Home</NavLink>
                    <NavLink to='/picture' onClick={scrollToTop}>Picture</NavLink>
                    <NavLink to='/video' onClick={scrollToTop}>Video</NavLink>
                </div>
        </div>
        
    );
}

export default Navbar;