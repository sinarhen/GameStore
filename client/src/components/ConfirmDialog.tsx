import Button from "./Button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "./Dialog";

export default function ConfirmDialog({
  onConfirm,
  open,
  setOpen,
  title,
  description
}: {
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
}) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Are you sure?"}</DialogTitle>
          <DialogDescription>{description ?? "This action cannot be undone"}</DialogDescription>
          <div className="mt-4 flex justify-end gap-4">
            <Button onClick={() => {
              setOpen(false);
              onConfirm()
            }}>Yes</Button>
            <Button className="bg-red-500 hover:bg-red-400" onClick={() => setOpen(false)}>No</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}