'use server'

import React from 'react'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/client';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  // const {data, error} = await supabase.auth.getSession();

  // if (data.session?.user.aud != "authenticated") {
  //   console.log("Not authenticated");
  //   redirect('/');
  //   return null;
  // }
  

  return (
    <div>
        RootLayout
        {children}
    </div>
  )
}

export default RootLayout