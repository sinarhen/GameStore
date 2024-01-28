export default function InputError({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-red-500 text-sm">{children}</p>
    </div>
  )
}