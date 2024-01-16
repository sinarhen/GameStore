import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ wrapperClassName, label, error, ...props }, ref) =>  {
        return (
            <div className={wrapperClassName}>
                <label htmlFor={props.name} className="block text-sm font-medium leading-5 text-white">
                    {label}
                </label>
                <div className="mt-1">
                    <input
                        {...props}
                        ref={ref}
                        className={twMerge("block w-full rounded-md border-0 py-1 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5", error ? "ring-2 ring-red-500" : "", props.className)}
                    />
                    {error && <p className="text-red-600 text-xs ">{error}</p>}
                </div>
            </div>
        );
    }
);

export default Input;