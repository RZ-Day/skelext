'use client'

import React from 'react'

const Home = () => {

  const logoutHandler =  async() => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'}
    })
  }

  return (
    <>
      <div>Home</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default Home
