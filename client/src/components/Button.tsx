import {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, children, ...props}, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge("bg-indigo-600 disabled:bg-gray-400 text-sm transition-colors hover:bg-indigo-500 text-white  font-bold py-2 px-4 rounded", className)}>
      {children}
    </button>
  )

});

export default Button;