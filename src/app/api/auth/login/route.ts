import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../utils/supabase/server';

export async function POST(req: NextRequest) {
    const reqData = await req.json();
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const loginData = {
        email: reqData.email,
        password: reqData.password
    }

    console.log(loginData);

    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        return NextResponse.json(
            {message: "Login failed: ", error: error.message},
            {status: 500}
        );
    }

    const { user } = data;
    console.log(user);

    // const url = request.nextUrl.clone()
    // url.pathname = '/sign-in'
    // return NextResponse.redirect(url)

    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);

    // return NextResponse.json(
    //     {message: "Login Successful"},
    //     {status: 200}
    // );

}