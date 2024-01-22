
import AnimatedSeparator from "../components/AnimatedSeparator";
import EditProfileDialog from "../components/EditProfileDialog";
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

export default function MyAccount() {
    const { user } = useCurrentUser();
    const { favorites } = useFavorites();

    const [orders, setOrders] = useState<Order[] | null>(null);

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
            <div className='flex gap-x-4 w-full '>
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
                    <EditProfileDialog initialValues={{
                        name: user?.name,
                        email: user?.email,
                        avatarUrl: user?.avatarUrl
                    }}/>
                </div>
            </div>
            
        </Section>
        <Section className="h-4/5 pt-24">
                <Header animateableText="Favorites." appearDuration={0.2} />
                <AnimatedSeparator appearDuration={0.3}/>
                <MyFavorites favorites={favorites}/>
        
        </Section>
        <Section className="h-full pt-96 sm:pt-48">
            <Header animateableText="Orders." appearDuration={0.2} />
            <AnimatedSeparator appearDuration={0.3}/>

            <Orders orders={orders}/>
        </Section>
            </>
    )
}