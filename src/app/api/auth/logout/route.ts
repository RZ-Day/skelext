import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/../utils/supabase/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else {
        return NextResponse.json(
            { message: "Logout failed: ", error: error.message},
            { status: 500 }
        );
    }
}