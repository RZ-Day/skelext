import React from 'react'
import { CustomFieldProps } from '@/lib/utils'

const CustomField = ({name, label, placeholder, type, register, validation }: CustomFieldProps) => {
  return (
    <>
        <label htmlFor={name}>{label}</label>
        <input placeholder={placeholder} type={type} {...register(name, validation)}/>
    </>
  )
}

export default CustomField