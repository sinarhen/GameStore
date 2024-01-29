import toast from "react-hot-toast";
import {LuClipboardSignature} from "react-icons/lu";
import {cn} from "../lib/utils";

export default function Clipboard({text, className}: {
  text: string;
  className?: string;
}) {
  const onClick = () => {
    navigator.clipboard.writeText(text);
    toast.success("Скопіювано в буфер");
  }
  return (

    <LuClipboardSignature onClick={onClick}
    className={cn("w-4 h-4 cursor-pointer text-white hover:text-gray-400 transition-colors", className)}/>
  )
}