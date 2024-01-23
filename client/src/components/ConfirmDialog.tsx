import Button from "./Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";

export default function ConfirmDialog({confirmOpen, setConfirmOpen, onConfirm}: {
    confirmOpen: boolean;
    setConfirmOpen: (open: boolean) => void;
    onConfirm: () => void;
}){
    return (
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen} >
            <DialogContent>
                <DialogHeader>
          <DialogTitle>Are you sure you want to delete this order?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <div className="mt-4 flex justify-end gap-4">
            <Button onClick={() => {setConfirmOpen(false); onConfirm()}}>Yes</Button>
            <Button onClick={() => setConfirmOpen(false)}>No</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        )
}