'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import classes from './PopUpContext.module.css';

const PopUpContext = createContext();

export const usePopUp = () => useContext(PopUpContext);


//popUp component that displays when triggered
const PopUp = ({ message, color }: { message: string, color: string }) => {

    return (
        <div className={`fixed z-10 flex justify-center p-5 rounded bg-${color} min-w-80`}>
            <p className={`text-white text-bold`}>
                {message}
            </p>
        </div>
    );
}

//Wraps around app component, making inner methods globally accessible
export const PopUpProvider = ({children}: Readonly<{ children: React.ReactNode }>) => {

    const [popUp, setPopUp] = useState({
        message: "",
        color: "",
        isVisible: false
    });

    // function for pushing a popup to the top of the screen
    const pushPopUp = (message: string, color: string) => {
        setPopUp({isVisible: true, message: message, color: color});

        setTimeout(() => setPopUp({isVisible: false, message: message, color: color}), 3000);
    };

    return (
        <PopUpContext.Provider value={{ pushPopUp }}>
        
            {children}
            <div className={`${classes.fadeIn} ${popUp.isVisible ? classes.visible : ''} absolute -z-10 pt-5 flex justify-center top-0 left-0 w-screen h-screen`}>
                <PopUp message={popUp.message} color={popUp.color} />
            </div>
        
        </PopUpContext.Provider>
    );
}