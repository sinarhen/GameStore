import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) =>  {
        return (
            <div>
                <label htmlFor={props.name} className="block text-sm font-medium leading-5 text-white">
                    {label}
                </label>
                <div className="mt-1">
                    <input
                        ref={ref}
                        className="block w-full rounded-md border-0 py-1 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
                        {...props}
                    />
                    {error && <p className="text-red-600 text-xs ">{error}</p>}
                </div>
            </div>
        );
    }
);

export default Input;