'use server'

import React from 'react'
//import { supabase } from '@/client';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {

  return (
    <div>
        RootLayout
        {children}
    </div>
  )
}

export default RootLayout