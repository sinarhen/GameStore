import Button from "./Button"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,} from "./Sheet"
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import {useDialog} from "../hooks/useDialog";
import Loading from "./Loading";
import ConfirmOrderForm from "./ConfirmOrderForm";

export default function Cart() {
  const {open, isLoading,  cart, resetCart, setOpen} = useCart();
  const {openDialog} = useDialog();


  const openConfirmDialog = () => {
    openDialog({
      title: "Підтвердіть замовлення",
      description: "Щоб підтвердити замовлення введіть пошту та пароль від аккаунта Mortal-Kombat",
      content: <ConfirmOrderForm resetCart={resetCart} cart={cart}/>
    })
  }
  if (isLoading) {
    return <Loading/>
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-black text-white">
        {cart?.products?.length ? (
          <>
            <SheetHeader>
              <SheetTitle className="text-white">Корзина</SheetTitle>
              <SheetDescription>Продуктів: {cart?.products?.length}</SheetDescription>
            </SheetHeader>
            <div className="justify-between items-center flex max-h-full flex-col   text-white">
              <div className="w-full overflow-y-scroll flex flex-col pt-4">
                {cart?.products?.map((orderProduct) => (
                  <CartItem key={orderProduct._id} item={orderProduct} />
                ))}
              </div>
              <Button onClick={() => {
                setOpen(false);
                openConfirmDialog();
              }}>Оформити</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full items-center justify-evenly">
            <div>
              <SheetHeader>
                <SheetTitle className="text-white">Корзина порожня</SheetTitle>
              </SheetHeader>
              <p className="text-sm text-gray-400">Додайте продукти в корзину, щоб вони відобразились тут</p>
              <Button className='mt-2' onClick={() => setOpen(false)}>Закрити</Button>
            </div>
            <p></p>
          </div>
        )}

      </SheetContent>
    </Sheet>
  )
};