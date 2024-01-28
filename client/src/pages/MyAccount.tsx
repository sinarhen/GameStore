
import AnimatedSeparator from "../components/AnimatedSeparator";
import Header from "../components/Header";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaUser } from "react-icons/fa";
import { useFavorites } from "../hooks/useFavorites";
import Section from "../components/Section";
import MyFavorites from "../components/MyFavorites";
import Orders from "../components/Orders";
import { useEffect, useState } from "react";
import { Order } from "../lib/types";
import { getUserOrdersById } from "../lib/order";
import { useDialog } from "../hooks/useDialog";
import EditProfileForm from "../components/EditProfileForm";
import { PencilLine } from "lucide-react";
import Clipboard from "../components/Clipboard";
import { motion } from "framer-motion";

export default function MyAccount() {
    const { user } = useCurrentUser();
    const { favorites } = useFavorites();
    const { openDialog } = useDialog();

    const [orders, setOrders] = useState<Order[] | null>(null);

    const openProfileDialog = () => {
        openDialog({
            title: "Edit profile",
            description: "Make changes to your profile here. Click save when you're done.",
            content: <EditProfileForm initialValues={user}/>,
        })
    }

    useEffect(() => {
        getUserOrdersById().then((data) => {
            setOrders(data.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {

        });
    }, []);
    return (
        <>
        <Section className="pt-24">
            <div className='flex flex-col sm:flex-row gap-x-4 w-full '>
                <div className="h-60 min-w-60 flex items-center justify-center  w-60 rounded-3xl bg-neutral-800">
                    {user?.avatarUrl ? (
                        <img className="w-full h-full object-cover bg-center rounded-3xl" src={user?.avatarUrl} alt={"avatar"}/>
                    ): (
                        <FaUser className="w-3/4 h-3/4"/>
                    
                    )}
                </div>
                <div className="h-full overflow-x-hidden">
                    <p className="text-zinc-600 flex  items-center">
                        {user?.email} 
                        <Clipboard className="h-3 w-3 ml-2 text-zinc-400" text={user?.email}/>
                    </p>
                    <h1 className="text-7xl flex truncate w-full">
                        {user?.name}
                    
                    </h1>
                    <span className="hover:text-indigo-600 flex text-md mt-2 transition-colors cursor-pointer" onClick={openProfileDialog}>Edit <PencilLine /></span>

                </div>
            </div>
            
        </Section>
        <Section className="h-4/5 pt-24">
                <Header animateableText="Favorites." appearDuration={0.2} />
                <AnimatedSeparator appearDuration={0.3}/>
                <MyFavorites/>
        
        </Section>
        <Section className="h-full pt-96 sm:pt-48">
            <Header animateableText="Orders." appearDuration={0.2} />
            <AnimatedSeparator appearDuration={0.3}/>
            {orders?.length ? (
                <Orders setOrders={setOrders} orders={orders}/>
                
            ): (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 3, duration: 1}}
                className="mt-4"
            >
                <p className="text-3xl text-zinc-600">You have no favorites yet.</p>
            </motion.div>
            )}
        </Section>
            </>
    )
}