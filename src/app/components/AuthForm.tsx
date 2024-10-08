'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormValues, AuthProps } from '@/lib/utils';
import CustomField from '../components/CustomField';
import Link from 'next/link';
import { signup } from '@/userFns'

const AuthForm = ( { type }: AuthProps ) => {

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

    const { register, handleSubmit, formState, getValues } = form;
    const { errors, isSubmitting } = formState;

    // splitting submission logic depending on form type
    // (e.g. 'sign-up' / 'sign-in')

    const onSignUp = (data: AuthFormValues) => {
        setIsLoading(true);

        signup(data.email, data.password);

        setIsLoading(false);
    }

    const onSignIn = (data: AuthFormValues) => {
        setIsLoading(true);

        console.log('sign in', data);

        setIsLoading(false);
    }

    return (
        <section className="flex flex-col items-center">

            <h2>
                {type === "sign-in" 
                    ? "Sign In"
                    : "Sign Up" 
                }
            </h2>

            <form className="flex flex-col" onSubmit={handleSubmit((type === 'sign-up' ? onSignUp : onSignIn))} noValidate>

                {/* Sign In fields */}

                <CustomField name="email" label="Email" type="text" placeholder="Enter your email" register={register} validation={{
                    required: "You must enter an email",
                    max: 30,
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
                        message: 'Invalid email address' // Error message for invalid email
                    },
                }}/>
                <p>{errors.email?.message}</p>

                <CustomField name="password" label="Password" type="password" placeholder="Enter your password" register={register} validation={{
                    required: "You must enter a password",
                    max: 30
                }}/>
                <p>{errors.password?.message}</p>

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
                        <p>{errors.confirmPassword?.message}</p>
                    </>
                }

                <button type="submit" className="p-3 w-full bg-slate-200" disabled={isLoading}>
                    Submit
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
                    {type === "sign-up"
                        ? "Sign in"
                        : "Sign up"
                    }
                </Link>
            </div>
        </section>
    )
}

export default AuthForm