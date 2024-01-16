import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/Dialog";
import Input from "../components/Input";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaUser } from "react-icons/fa";

export default function MyAccount() {
    const { user } = useCurrentUser();
    return (
        <div className='pt-24 flex gap-x-4 w-full h-full '>
            <div className="h-60 min-w-60 flex items-center justify-center  w-60 rounded-3xl bg-neutral-800">
                {user?.avatarUrl ? (
                    <img className="w-full h-full object-cover bg-center rounded-3xl" src={user?.avatarUrl} alt={"avatar"}/>
                ): (
                    <FaUser className="w-3/4 h-3/4"/>
                
                )}
            </div>
            <div className="h-full overflow-clip">
                <p className="text-zinc-600 ">{user?.email}</p>
                <h1 className="text-7xl truncate mt-2 w-full h-auto">{user?.name}</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Edit</button>
                
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-800 text-white sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                            <Input
                            label="Name"
                            id="name"
                            defaultValue="Pedro Duarte"
                            className=""

                            />
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                            label="Username"
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                            />
                        </div>
                        <DialogFooter>
                            <button className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Save</button>


                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
            </div>
        </div>
    )
}