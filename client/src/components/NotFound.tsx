import {useNavigate} from "react-router-dom"

export default function NotFound({
                                   title = "Items not found.",
                                   helperText = "Please try again later.",
                                   buttonText,
                                   buttonAction
                                 }: {
  title?: string;
  helperText?: string;
  buttonText?: string;
  buttonAction?: () => void;

}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center px-4 sm:px-8 md:px-16 xl:px-32 py-4 sm:py-8 md:py-16 xl:py-32 ">
      <div>
        <h1 className="text-6xl text-zinc-600">
          Items not found.
        </h1>
        <p className="text-zinc-700">
          {helperText}
        </p>
        {buttonText && (

          <button onClick={buttonAction} className="underline ">
            Refresh
          </button>
        )}
      </div>

    </div>
  )
}