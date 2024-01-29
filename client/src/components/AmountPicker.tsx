import {useEffect, useState} from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";

export default function AmountPicker({
                                       onConfirm
                                     }: {
  onConfirm: (amount: number) => void;
}) {
  const [inputValue, setInputValue] = useState<number>(1);

  useEffect(() => {
    if (inputValue < 1) {
      setInputValue(1);
      toast.error("Ви не можете купити менше 1 елементу");
    }
    if (inputValue > 100) {
      setInputValue(100);
      toast.error("Ви не можете купити більше 100 елементів");
    }
  }, [inputValue])
  return (
    <div className="flex pt-2 pb-6 flex-col gap-y-4">
      <div className="flex items-center justify-center">
        <div>
          <Input
            className="text-sm "
            autoComplete="off"
            placeholder={"Amount"}
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.valueAsNumber)}
            name="amount"
            id="amount"/>

        </div>

        <Button onClick={() => setInputValue(inputValue + 1)} className="ml-4 mr-2 px-4 py-2">+</Button>
        <Button onClick={() => setInputValue(inputValue - 1)} className="px-4 py-2">-</Button>

      </div>
      <Button
        onClick={() => onConfirm(inputValue)}
        disabled={inputValue < 1 || inputValue > 100}
      >
        Додати до кошика
      </Button>
    </div>
  )
}