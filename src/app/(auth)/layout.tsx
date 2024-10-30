import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <div className="lg:grid lg:grid-cols-2 w-screen h-screen justify-center items-center">
        <section className="invisible h-0 lg:visible w-full lg:h-full bg-blue-300">
        
        </section>
        <section className="flex justify-center items-center w-full h-full">
          { children }  
        </section>
    </div>
  )
}

export default AuthLayout