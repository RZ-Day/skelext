'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormValues, AuthProps } from '@/lib/utils';
import CustomField from '../components/CustomField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePopUp } from './contexts/PopUpContext';
//import { signup } from '../userFns'
//import { login } from '../(auth)/sign-in/actions';

const AuthForm = ( { type }: AuthProps ) => {
    const router = useRouter();
    const { pushPopUp } = usePopUp();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AuthFormValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit"
    });

    const { register, handleSubmit, formState, getValues, reset, setError } = form;
    const { errors, isSubmitting } = formState;

    // splitting submission logic depending on form type
    // (e.g. 'sign-up' / 'sign-in')

    const onSignUp = (data: AuthFormValues) => {
        setIsLoading(true);

        //signup(data.email, data.password);

        setIsLoading(false);
    }

    const onSignIn = async (data: AuthFormValues) => {
        setIsLoading(true);

        try {
            //Login request sent to the next API, which handles login logic
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                console.error("Failed to log in", res.statusText);

                //reset password field on failed login attempt
                reset({
                    password: ""
                });
            }

            if (res.status === 400) {
                //TODO: FIGURE OUT WHY ONLY RED-500 WORKS... THEY SHOULD ALL WORK???
                pushPopUp("Bad email or password", "bg-red-400");
            }

            if (res.redirected) {
                pushPopUp("Login successful", "bg-green-400");
                router.push(res.url);
            }

        } catch (error) {
            console.error("Unknown error occurred during login: ", error);
            
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="flex flex-col items-center z-5">

            <h2 className="text-3xl mb-5 text-blue-500">
                {type === "sign-in" 
                    ? "Sign In"
                    : "Sign Up" 
                }
            </h2>

            <form className="flex border p-5 rounded flex-col space-y-3" onSubmit={handleSubmit((type === 'sign-up' ? onSignUp : onSignIn))} noValidate>

                {/* Sign In fields */}

                <CustomField name="email" label="Email" type="text" placeholder="Enter your email" register={register} validation={{
                    required: "You must enter an email",
                    max: 30,
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
                        message: 'Invalid email address' // Error message for invalid email
                    },
                }}/>
                <p className="text-sm text-red-500">{errors.email?.message}</p>

                <CustomField name="password" label="Password" type="password" placeholder="Enter your password" register={register} validation={{
                    required: "You must enter a password",
                    max: 30
                }}/>
                <p className="text-sm text-red-500">{errors.password?.message}</p>

                {/* (extra) Sign Up fields */}

                { type === "sign-up" &&
                    <>
                        <CustomField name="confirmPassword" label="Confirm Password" type="password" placeholder="Re-enter password" register={register} validation={{
                            required: "You must confirm password",
                            max: 30,
                            validate: {
                                passwordsMatch: (confirmPassword) => {
                                    return confirmPassword === getValues("password") || "Passwords must match";
                                }
                            }
                        }}/>
                        <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>
                    </>
                }

                <button type="submit" className="p-3 rounded w-full bg-slate-200" disabled={isLoading}>
                    {isLoading ?
                        <p className="animate-spin text-lg">+</p> :
                        <p>Submit</p>
                    }
                </button>

            </form>

            &nbsp;

            <div className="flex">
                <p>
                    {type === "sign-in" 
                        ? "Don't have an account?"
                        : "Already have an account?"
                    }
                </p>

                &nbsp;

                <Link href={type === "sign-up" ? "/sign-in" : "/sign-up"}>
                    <p className="text-blue-400">
                        {type === "sign-up"
                            ? "Sign in"
                            : "Sign up"
                        }
                    </p>
                </Link>
            </div>
        </section>
    )
}

export default AuthForm