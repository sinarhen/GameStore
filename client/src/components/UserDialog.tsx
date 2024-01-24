import React from "react";
import { User } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import Button from "./Button";
import Clipboard from "./Clipboard";


interface UserDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: User | null;
}

const UserDialog: React.FC<UserDialogProps> = ({
    open,
    setOpen,
    user
}) => {

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="min-w-[95%] md:min-w-[75%]">
                    <DialogHeader>
                        <DialogTitle className="">User <span className="animate-pulse text-indigo-600">{user?.name}</span> information</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-x-2">
                        <img src={user?.avatarUrl} className="h-full rounded w-1/2 aspect-square object-cover" />
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl text-indigo-600">{user?.name}</h1>
                                {user?.email && (
                                    <p className="text-gray-500 text-lg">{user?.email} <Clipboard text={user?.email} /></p>
                                )}
                                
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg">Role: <span className="text-indigo-600">{user?.role}</span></p>
                                <Button className="px-2 py-1 bg-indigo-600">
                                    ^
                                </Button>
                            </div>
                            
                        </div>

                    </div>

                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.role}</TableCell>
                        </TableBody>
                    </Table> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserDialog;