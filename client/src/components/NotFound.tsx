
export default function NotFound({
                                   title = "Не знайдено :(",
                                   helperText = "Спробуйте перезавантажити сторінку.",
                                   buttonText,
                                   buttonAction
                                 }: {
  title?: string;
  helperText?: string;
  buttonText?: string;
  buttonAction?: () => void;

}) {
  return (
    <div className="flex justify-center items-center px-4 sm:px-8 md:px-16 xl:px-32 py-4 sm:py-8 md:py-16 xl:py-32 ">
      <div>
        <h1 className="text-6xl text-zinc-600">
          {title}
        </h1>
        <p className="text-zinc-700">
          {helperText}
        </p>
        {buttonText && (

          <button onClick={buttonAction} className="underline ">
            {buttonText}
          </button>
        )}
      </div>

    </div>
  )
}