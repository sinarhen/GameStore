
import EditProfileForm from "../components/EditProfileDialog";
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
                <EditProfileForm initialValues={{
                    name: user?.name,
                    email: user?.email,
                    avatarUrl: user?.avatarUrl
                }}/>
            </div>
        </div>
    )
}