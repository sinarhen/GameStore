import {createContext, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../components/Dialog";
import Button from "../components/Button";
import Loading from "../components/Loading";
import {DialogContextType} from "../lib/types";


export const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({children}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {
  });
  const [onCancel, setOnCancel] = useState<() => void>(() => {
  });
  const [title, setTitle] = useState<null | string>("");
  const [description, setDescription] = useState<null | string>("");
  const [content, setContent] = useState<React.ReactNode | null>(() => null);
  const [confirmText, setConfirmText] = useState<string | null>("Save");
  const [cancelText, setCancelText] = useState<string | null>("Cancel");

  function resetDialog() {
    setTitle(null);
    setDescription(null);
    setContent(null);
    setOnConfirm(() => {
    });
    setOnCancel(() => {
    });
    setConfirmText(null);
    setCancelText(null);
  }

  const openDialog = ({
  title,
  description,
  content,
  onConfirm,
  onCancel,
  confirmText,
  cancelText
}: {
    title?: string,
    description?: string,
    content?: React.ReactNode | null,
    onConfirm?: () => void,
    onCancel?: () => void,
    confirmText?: string | null,
    cancelText?: string | null

  }) => {
    setTitle(title || null);
    setDescription(description || null);
    setContent(content);
    setOnConfirm(onConfirm || (() => {
    }));
    setOnCancel(onCancel || (() => {
    }));
    setConfirmText(confirmText || null);
    setCancelText(cancelText || null);
    setOpen(true);
  };

  function closeDialog() {
    setOpen(false);
    resetDialog();
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <DialogContext.Provider value={{
      openDialog,
      setOpen,
      open,
      setOnConfirm,
      setOnCancel,
      setCancelText,
      setConfirmText,
      closeDialog
    }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded max-w-[95%] sm:w-auto">
          {title || description ? (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          ) : (<>
          </>)}
          {isLoading && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-70 ">
              <Loading/>

            </div>

          )}
          {content && content}
          {
            confirmText || cancelText ? (
              <DialogFooter>
                <div className="flex gap-x-2">
                  {confirmText && (
                    <Button
                      onClick={() => {
                        if (onConfirm) {
                          setIsLoading(true)
                          onConfirm();
                          setIsLoading(false);
                        } else {
                          setOpen(false);
                        }
                      }}
                      className="bg-green-600 hover:bg-green-500"
                    >
                      {confirmText}
                    </Button>
                  )}
                  {cancelText && (
                    <Button
                      onClick={() => {
                        if (onCancel) {
                          onCancel();
                        } else {
                          setOpen(false);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-500"
                    >
                      {cancelText}
                    </Button>
                  )}
                </div>

              </DialogFooter>
            ) : (<> </>)
          }
        </DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
}