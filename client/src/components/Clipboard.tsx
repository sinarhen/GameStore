import toast from "react-hot-toast";
import { LuClipboardSignature } from "react-icons/lu";

export default function Clipboard({text}: {
    text: string;
}){
    const onClick = () => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard")
    }
    return (

        <span>
            <LuClipboardSignature onClick={onClick} className="w-4 h-4 cursor-pointer text-white hover:text-gray-400 transition-colors" />

        </span>

    )
}