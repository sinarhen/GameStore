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
                        className={twMerge("w-20 py-2 rounded px-2 bg-neutral-800 text-white", error ? "ring-2 ring-red-500" : "", props.className)}
                    />
                    {error && <p className="text-red-600 text-xs ">{error}</p>}
                </div>
            </div>
        );
    }
);

export default Input;