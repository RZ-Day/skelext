import { NextResponse } from 'next/server';
import { createClient } from '../../../../../utils/supabase/server';

export async function POST(req: Request) {
    const reqData = await req.json();
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const loginData = {
        email: reqData.email,
        password: reqData.password
    }

    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        console.log("ERROR: supabase auth failed ", error);
        return new NextResponse("LOGIN FAILED", { status: 401 });
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));

}