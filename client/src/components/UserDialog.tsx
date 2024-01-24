import React from "react";
import { User } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import Button from "./Button";
import Clipboard from "./Clipboard";
import { ChevronsDown, ChevronsUp } from "lucide-react";


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
                                <div className="flex gap-x-2">
                                    <Button className="p-1 group bg-green-600 hover:bg-green-500">
                                        <ChevronsUp className={user?.role == 'user' ? "group-hover:animate-pulse" : ""}/>
                                    </Button>
                                    <Button disabled={user?.role != "admin"} className="p-1 group bg-red-600 hover:bg-red-500">
                                        <ChevronsDown className={user?.role == "admin" ?"group-hover:animate-pulse " : ""}/>
                                    </Button>
                                    
                                </div>
                                
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