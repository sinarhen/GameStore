import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";


const Section: React.FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {


    
    return (
        <section
            className={twMerge("pt-20 w-full snap-start", props.className)}>
            {children} 
        </section>
    )
}


export default Section;