import React from "react";
import {User} from "../lib/types";
import Button from "./Button";
import Clipboard from "./Clipboard";
import {ChevronsDown, ChevronsUp} from "lucide-react";
import {FaUser} from "react-icons/fa";
import {updateUserRole} from "../lib/users";
import toast from "react-hot-toast";


interface UserDialogProps {
  user: User | null;
  setUsers: (users: User[]) => void;
  users: User[] | null;
}

const UserDialog: React.FC<UserDialogProps> = ({
                                                 user,
                                                 setUsers,
                                                 users,
                                               }) => {

  const [role, setRole] = React.useState<string | null>(user?.role ?? null);

  async function handleUpdateUserRole(role: string) {
    try {
      if (!user) return;
      await updateUserRole(user._id, role);
      toast.success(`User role updated to ${role}`);
      setRole(role);
      if (users) {
        setUsers(users.map((u) => (u._id === user._id ? {...user, role} : u)));
      }
    } catch (error) {
      toast.error("Щось пішло не так");
    }
  }

  return (
    <>
      <div className="flex flex-col md:flew-row gap-x-2">
        {user?.avatarUrl ? (
          <img src={user?.avatarUrl} className="h-full rounded w-1/2 aspect-square object-cover"/>
        ) : (
          <div className="flex justify-center items-center w-1/2 h-full">
            <FaUser className="w-3/4 h-3/4"/>
          </div>
        )}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl text-indigo-600">{user?.name}</h1>
            {user?.email && (
              <p className="text-gray-500 text-lg">{user?.email} <Clipboard text={user?.email}/></p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-lg">Role: <span className="text-indigo-600">{role}</span></p>
            <div className="flex gap-x-2">
              <Button onClick={() => handleUpdateUserRole("admin")} disabled={role !== 'user'}
                      className="p-1 group bg-green-600 hover:bg-green-500">
                <ChevronsUp className={user?.role === 'user' ? "group-hover:animate-pulse" : ""}/>
              </Button>
              <Button onClick={() => handleUpdateUserRole("user")} disabled={role !== "admin"}
                      className="p-1 group bg-red-600 hover:bg-red-500">
                <ChevronsDown className={user?.role === "admin" ? "group-hover:animate-pulse " : ""}/>
              </Button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default UserDialog;