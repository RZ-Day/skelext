import { NextResponse } from 'next/server';
import { login } from '@/app/(auth)/sign-in/actions';
import { createClient } from '../../../../../utils/supabase/server';

export async function POST(req: Request) {
    const data = await req.json();
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs


    const loginData = {
        email: data.email,
        password: data.password
    }

    const { error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        console.log("ERROR: supabase auth failed ", error);
        return new NextResponse("LOGIN FAILED", { status: 401 });
    }

    return new NextResponse("SUCCESS");

}