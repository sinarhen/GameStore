import React from "react";
import { User } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import Button from "./Button";
import Clipboard from "./Clipboard";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { updateUserRole } from "../lib/users";
import toast from "react-hot-toast";


interface UserDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    user: User | null;
    setUsers: (users: User[]) => void;
    users: User[] | null;
    setSelectedUser: (user: User | null) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
    open,
    setOpen,
    user,
    setUsers,
    users,
    setSelectedUser
}) => {
    async function handleUpdateUserRole(role: string) {
        try {
            if (!user) return;
            await updateUserRole(user._id, role);
            toast.success(`User role updated to ${role}`);
            setSelectedUser({...user, role});
            if (users) {
                setUsers(users.map((u) => (u._id === user._id ? { ...user, role } : u)));
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="min-w-[95%] md:min-w-[75%]">
                    <DialogHeader>
                        <DialogTitle className="">User <span className="animate-pulse text-indigo-600">{user?.name}</span> information</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-x-2">
                    {user?.avatarUrl ? (
                        <img src={user?.avatarUrl} className="h-full rounded w-1/2 aspect-square object-cover" />
                    ): (
                        <div className="flex justify-center items-center w-1/2 h-full">
                            <FaUser className="w-3/4 h-3/4"/>
                        </div>
                    )}
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
                                    <Button onClick={() => handleUpdateUserRole("admin")} disabled={user?.role != 'user'} className="p-1 group bg-green-600 hover:bg-green-500">
                                        <ChevronsUp className={user?.role == 'user' ? "group-hover:animate-pulse" : ""}/>
                                    </Button>
                                    <Button onClick={() => handleUpdateUserRole("user")} disabled={user?.role != "admin"} className="p-1 group bg-red-600 hover:bg-red-500">
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