import {FaInfo} from "react-icons/fa";
import {User} from "../lib/types";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./Table";
import {Trash2} from "lucide-react";
import {useCallback} from "react";
import UserDialog from "./UserDialog";
import {deleteUserForAdmin} from "../lib/users";
import toast from "react-hot-toast";
import TableEmpty from "./TableEmpty";
import {useDialog} from "../hooks/useDialog";

export default function UsersTable({
                                     users,
                                     setUsers,
                                     tableCaption
                                   }: {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  tableCaption?: string;
}) {

  const removeUserFromUsers = useCallback((selectedUser: User) => {
    if (users) {
      setUsers(users.filter((user) => user._id !== selectedUser?._id));
    }
  }, [users, setUsers]);

  const deleteUser = useCallback(async (user: User | null = null) => {
    if (user?._id) {
      try {
        console.log("runs")
        await deleteUserForAdmin(user?._id);
        removeUserFromUsers(user);
        toast.success("User deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Щось пішло не так");
      }
    }
  }, [users, setUsers]);

  const {openDialog} = useDialog();

  const openUserDialog = useCallback((user: User) => {
    openDialog({
      content: <UserDialog user={user} setUsers={setUsers} users={users}/>,
    });
  }, [openDialog, setUsers, users]);

  const openConfirmDialog = useCallback((user: User) => {
    openDialog({
      title: "Delete user",
      description: "Are you sure you want to delete this user?",
      onConfirm: () => () => deleteUser(user),
      confirmText: "Yes",
      cancelText: "No",
    });
  }, [openDialog, deleteUser]);


  return (
    <>
      <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="ovrflow-hidden">User Id</TableHead>
            <TableHead className="text-center w-full">Name</TableHead>
            <TableHead className="text-center w-full">Email</TableHead>
            <TableHead className="text-center w-full">Role</TableHead>
            <TableHead className="text-center align-center justify-end w-full">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="ovrflow-hidden">{user._id}</TableCell>
              <TableCell className="text-center w-full">{user.name}</TableCell>
              <TableCell className="text-center w-full">{user.email}</TableCell>
              <TableCell className="text-center w-full">{user.role}</TableCell>
              <TableCell className="text-right w-full">
                <div className="flex gap-x-1 justify-center items-center">
                  <div
                    onClick={() => openUserDialog(user)}

                    className="p-2  cursor-pointer group rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    <FaInfo className="group-hover:text-indigo-500 w-3.5 h-3.5 transition-colors"/>
                  </div>

                  <div
                    onClick={() => openConfirmDialog(user)}

                    className="p-2  cursor-pointer group rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5 group-hover:text-red-500 transition-colors"/>
                  </div>

                </div>
                <div
                  className="flex justify-center items-center">
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableEmpty isEmpty={users?.length === 0}/>
    </>
  );
}