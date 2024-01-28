export default function Banner({imageUrl}: {
  imageUrl: string;
}) {

  return (
    <div className="w-full h-48 my-10 justify-center flex">
      <div className="w-full overflow-hidden">

        <img alt="" className="rounded-lg h-full w-full object-cover object-center"
             src={imageUrl}>
        </img>
      </div>

    </div>
  )
}