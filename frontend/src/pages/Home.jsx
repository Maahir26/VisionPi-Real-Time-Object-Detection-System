/**
 * @file Home.jsx
 * @author Gabriel
 * @brief This file is the home page
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
import React, { useEffect, useState, useRef } from 'react';

const Home = () => {
    return (
        <div>
            <PanelOne/>
        </div>
    );
}

const PanelOne = () => { //panel to display opening message

    return (
        <div>
            HELLO WELCOME TO OUR PROJECT CS3307
        </div>
    );
}

export default Home;
