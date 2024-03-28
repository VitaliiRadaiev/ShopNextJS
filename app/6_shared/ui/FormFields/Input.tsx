import clsx from "clsx";
import React, { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}


export const Input = forwardRef(function Input({ className, ...props }: InputProps, ref: Ref<HTMLInputElement>) {
    return (
        <input
            ref={ref}
            className={clsx(
                'flex items-center h-11 py-2 px-3 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                'focus:border-[#9f9e9e] focus:ring-transparent',
                '-tracking-wide text-[20px] text-[#666666]',
                className
            )}
            {...props}
        />
    );
})