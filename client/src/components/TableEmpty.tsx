export default function ({isEmpty}: {
  isEmpty: boolean;
}) {
  if (!isEmpty) {
    return null;
  }
  return (
    <h1 className="text-zinc-600 mt-10 text-center">
      Items not found.
    </h1>


  )
}