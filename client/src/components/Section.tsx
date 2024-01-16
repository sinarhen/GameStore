import { HTMLAttributes } from "react";


const Section: React.FC<HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {


    
    return (
        <section
            className="h-[100vh] pt-20 w-full snap-start">
            {children} 
        </section>
    )
}


export default Section;