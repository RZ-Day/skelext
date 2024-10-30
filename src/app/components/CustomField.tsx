import React from 'react'
import { CustomFieldProps } from '@/lib/utils'

const CustomField = ({name, label, placeholder, type, register, validation }: CustomFieldProps) => {
  return (
    <>
        <label className="text-slate-500" htmlFor={name}>{label}</label>
        <input className="bg-slate-100 rounded-md p-3 min-w-64" placeholder={placeholder} type={type} {...register(name, validation)}/>
    </>
  )
}

export default CustomField