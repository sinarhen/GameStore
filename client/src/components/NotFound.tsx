import { useNavigate } from "react-router-dom"

export default function NotFound({
    helperText = "Please try again later.",
    withRefresh
}: {
    helperText?: string;
    withRefresh?: boolean;
})
{
    const navigate = useNavigate();
    return (
            <div className="w-full h-full  flex justify-center items-center ">
                <div>
                <h1 className="text-6xl text-zinc-600">
                    Items not found.
                </h1>
                <p className="text-zinc-700">
                    {helperText}
                </p>
                {withRefresh && (

                    <button onClick={() => {navigate(0)}} className="underline ">
                    Refresh
                    </button>
                )}
                </div>
                
            </div>
    )
}