// import { supabase } from './client';

import { AuthFormValues } from "./lib/utils"

// export async function login(email, password) {
//     let returnObj = {
//         isSuccessful: true,
//         message: '',
//         user: null
//     }

export const signIn = async (data: AuthFormValues) => {

}

export const signUp = async () => {
    
}

//     try {
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email: email,
//             password: password,
//         });

//         if( error ) {
//             throw new Error(error.message);

//         } else {
//             returnObj.message = "Welcome!";
//             returnObj.user = data.user;
//         }

//     } catch ( err ) {
//         returnObj.isSuccessful = false;
//         returnObj.message = err.message || 'An unexpected error occurred';
//     }

//     return returnObj;

// }

// export async function logout() {

//     try {
//         let { error } = await supabase.auth.signOut();
//         window.location.reload();

//         if ( error ) {
//             throw new Error(error.message);
//         }

//         return { isSuccessful: true, message: 'Successfully logged out' };

//     } catch ( err ) {
//         return { isSuccessful: false, message: err.message || 'An unexpected error occurred' }
//     }
// }

// export async function signup(email, password) {

//     let returnObj = {
//         isSuccessful: true,
//         message: '',
//         user: null
//     }

//     try {
//         const { data, error } = await supabase.auth.signUp(
//             {
//                 email: email,
//                 password: password,
//             }
//         );

//         if ( error ) {
//             throw new Error(error.message);
//         }

//         returnObj.message = 'Successfully signed up';
//         returnObj.user = data.user;

//     } catch ( err ) {
//         returnObj.isSuccessful = false;
//         returnObj.message = err.message || 'An unexpected error occurred';
//     }

//     return returnObj;

// }