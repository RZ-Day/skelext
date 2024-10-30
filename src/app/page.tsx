'use client'

import React from 'react';
import { usePopUp } from './components/contexts/PopUpContext';

const Home = () => {

  const { pushPopUp } = usePopUp();

  const popUpHandler = () => {
    pushPopUp("Login successful", "bg-green-400");
  }

  const logoutHandler =  async() => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'}
    })
  }

  return (
    <div className="w-full h-screen">
      <div>Home</div>
      <button onClick={logoutHandler}>Logout</button>
      <button className="bg-green-400 text-white p-3" onClick={popUpHandler}>PopUp</button>
    </div>
  )
}

export default Home
