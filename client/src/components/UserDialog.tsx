import React from "react";
import { User } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"

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
                        <DialogTitle>User {user?.name}</DialogTitle>
                        <DialogDescription>
                            <img src={user?.avatarUrl} className="w-full h-full max-h-96 max-w-96" />
                        </DialogDescription>
                    </DialogHeader>
                    <Table>
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
                    </Table>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserDialog;