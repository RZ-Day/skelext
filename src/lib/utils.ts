import { FieldErrors, UseFormRegister, RegisterOptions } from 'react-hook-form'

//AuthForm & CustomInput schema:

export type AuthFormValues = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type AuthProps = {
    type: 'sign-in' | 'sign-up',
}

export type CustomFieldProps = {
    name: keyof AuthFormValues,
    label: string,
    placeholder: string,
    type: string,
    register: UseFormRegister<AuthFormValues>,
    validation: RegisterOptions<AuthFormValues, keyof AuthFormValues>,
}