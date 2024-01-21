import { useEffect, useState } from "react";
import { ProductCardType } from "../lib/types";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductById } from "../lib/products";
import Loading from "../components/Loading";
import { formatter } from '../lib/utils';
import Section from "../components/Section";
import Header from "../components/Header";
import { motion } from 'framer-motion';
import AnimatedSeparator from "../components/AnimatedSeparator";
import Input from "../components/Input";
import Button from "../components/Button";
import { addToOrder } from "../lib/order";


export default function ProductDetails(){
    const [product, setProduct] = useState<ProductCardType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<number>(1);

    const appearDuration = 0.7;
    const params = useParams();
    const productId = params.productId;
    useEffect(() => {
        getProductById(productId)
        .then((response) => {
            if (!response.data)
            {
                toast.error("Product not found");
                return;
            }
            setProduct(response.data);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong", {id: "products"});
        }).finally(() => {
            setLoading(false);
        });
    }, [productId])


    
    useEffect(() => {
        if (error){
            toast.error(error);
        }
    }, [error])

    if (loading){
        return Loading();
    }
    if (!product){
        return <div>Product not found</div>
    }

    function setValidatedInputValue(value: number){
        if (value < 1){
            setInputValue(1);
            setError("You must add at least 1 item to your order")
        }else if (value > 5){
            setInputValue(5);
            setError("You can't add more than 5 items to your order")
        }
        else{
            setInputValue(value);
        }
    }

    function onSubmit(){
        if (!inputValue)
        {
            toast.error("You must add at least 1 item to your order");
            return;
        }
        try {
            setLoading(true);
            if (!product?._id)
            {
                throw new Error("Unexpected internal error")
            }
            addToOrder(product?._id, inputValue).then(() => {
                toast.success("Added to cart");
            
            })

        } catch (error)
        {
            toast.error("Something went wrong");
            console.error(error)
        } finally {
            setLoading(false)
        }
        

        console.log("submit");
    }
    return (
        <>
        
            <Section className="pt-24">
                <div className="flex flex-col justify-center items-center">
                        <div>
                            
                            <div className="w-full h-96 justify-center flex">
                                <div className="w-full overflow-hidden">

                                    <img alt="" className="rounded-lg h-full w-full object-cover object-center" 
                                        src={product.imageUrl}>
                                    </img>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
            
            </Section>
            <Section>
                
            <motion.p 
                            className="text-indigo-400 text-xl mt-8"
                            initial={{opacity: 0}}
                            transition={{delay: appearDuration, duration: appearDuration}}
                            animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        >
                            {formatter.format(product.price)}
                        </motion.p>
                        <Header className="text-5xl mt-1" animateableText={product.name} appearDuration={appearDuration} />
                        <AnimatedSeparator appearDuration={appearDuration}/>
                        <motion.p 
                            className="text-gray-400 text-md mt-4"
                            initial={{opacity: 0}}
                            transition={{delay: appearDuration + 1, duration: appearDuration}}
                            animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        >
                            {product.description}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus labore illum atque error placeat, fugit iure laudantium dicta, blanditiis nobis, mollitia odit! Minima iusto exercitationem nesciunt voluptatem aliquam, vitae doloribus?
                            {/* Hic exercitationem accusantium officiis repellendus repellat adipisci magni necessitatibus corrupti aperiam quos, laborum commodi consequatur dolorem vero ducimus earum possimus molestias labore laudantium dolore delectus? Tenetur a corporis in eligendi!
                            Praesentium, in officiis! Exercitationem delectus eos illum voluptatum placeat? Hic dolore fugit, aliquid, reprehenderit inventore dolores totam illo numquam natus corporis iusto odit suscipit perspiciatis eum. Recusandae officiis molestiae consequuntur.
                            Sunt commodi repudiandae cupiditate deleniti quidem quod ab officiis, sit impedit quibusdam omnis aut iure facilis ipsa earum at illo fuga non, tempora delectus ipsum praesentium mollitia? Voluptatem, laboriosam tenetur.
                            Corrupti vero voluptas, minus eligendi a id hic corporis atque quas, laudantium modi neque, ipsa ab incidunt sunt. Recusandae quibusdam corrupti possimus fugit. Esse beatae illum voluptates harum nisi rerum.
                            Temporibus deserunt laudantium officiis praesentium, in quidem laborum tempora minus doloremque. Velit accusantium sint placeat tempore, quibusdam inventore obcaecati quis perferendis, corporis natus temporibus? Odio unde maxime aspernatur rerum quam.
                            Doloribus amet ut beatae quaerat esse, atque laboriosam temporibus consectetur eos quisquam, quas aspernatur! In cumque quam a consequatur architecto amet tenetur odit maiores fugiat dignissimos, vero consectetur enim velit.
                            Sequi enim dolores tempora quam doloremque eaque aut harum, aliquid optio dolore nihil laboriosam fugiat veritatis ipsam minus nulla a, adipisci est vitae id voluptatum? Quis dolorem corporis maiores id?
                            Facere dolorem unde delectus sunt, doloremque id quod vero dicta, magnam quae corrupti qui voluptates. Qui placeat veniam consequatur voluptates est optio exercitationem sunt aperiam voluptatum saepe, ullam eos modi.
                            Ipsum asperiores sit a commodi nihil id rem, ratione aperiam. Incidunt doloribus consequuntur rerum minus provident debitis. Ipsa incidunt commodi fugiat eius repudiandae error natus Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque nulla ducimus blanditiis facere praesentium labore culpa ea distinctio repudiandae ipsum facilis dignissimos voluptatem, quas, quaerat nemo adipisci. Cumque, harum mollitia? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, ab? Fugiat, placeat autem aut nisi commodi reiciendis ut error libero rem voluptatem qui, doloribus perspiciatis ex, voluptatibus quaerat. Sit, pariatur?
                            Provident nisi quaerat sapiente consectetur incidunt ullam itaque totam in deleniti quo quia, voluptatum asperiores ad sit dolor, est non? Iure illo adipisci accusamus praesentium a nobis ea aut laboriosam?
                            Neque alias excepturi soluta ipsam fuga atque dignissimos! Cumque, aut dignissimos asperiores iure iste corporis exercitationem, maxime repudiandae nostrum, ex provident consequuntur. Aliquam magnam sapiente, blanditiis explicabo unde temporibus sint.
                            Culpa eos sunt officia repudiandae hic, molestiae quidem repellendus illo excepturi odio veritatis nesciunt dolor non, deserunt et minima aliquid voluptatem ipsa nemo delectus architecto. Tempora sed est dicta sint.
                            Accusantium, esse. Accusantium quae ea, esse quidem magni quisquam perferendis pariatur ad. Qui error minima libero. Libero, exercitationem placeat dicta, reiciendis nostrum eligendi magni sint autem quaerat repellat ullam vero.
                            Deleniti ea dolores adipisci sint. Atque quisquam odio rem inventore eum, ut hic rerum amet! Molestiae consequatur nam, a cupiditate illo quia quae distinctio eum tempora, dignissimos, qui harum sint?
                            Voluptatibus, eveniet! Saepe, omnis placeat provident nesciunt nobis repellat ad voluptate voluptatum corrupti neque, deserunt enim magnam iusto tempore blanditiis fugit nulla reprehenderit. Ut facere velit deleniti ipsam numquam nihil.
                            Iste aliquam animi earum dolorum placeat praesentium, cupiditate tempore. Quia quidem officiis beatae voluptatem eos corporis voluptate aspernatur et repudiandae aut pariatur hic tempore, nobis quisquam sunt sequi nostrum est?
                            Atque sunt obcaecati ex, aut voluptatem error illo. Reprehenderit eaque consequuntur sapiente at ut, cum a neque. Consequatur tempore quae itaque voluptate at aut distinctio deserunt, eius, corrupti aliquam autem. */}
                            Quia, modi laudantium enim dignissimos, laboriosam asperiores quo repudiandae a hic assumenda architecto unde molestiae odio, tenetur repellat eum. In eaque necessitatibus quaerat commodi aut at natus reprehenderit minus possimus. veritatis accusamus totam, minus et.
                        </motion.p>
            </Section>
            <Section className="pt-4 h-64">
                <motion.div
                    animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                    initial={{opacity: 0}}
                    onSubmit={onSubmit}
                    transition={{delay: appearDuration + 1, duration: appearDuration}}
                >
                    <div className="flex items-center justify-center">
                        <Input className="text-sm" autoComplete="off" type="number" value={inputValue} onChange={(e) => setValidatedInputValue(e.target.valueAsNumber)} name="quantity"   id="quantity" placeholder="number" />
                        <Button onClick={onSubmit} className="ml-4">Add to cart</Button>
                    </div>
                    
                    {inputValue >= 1 ? (
                        <p className="text-gray-400 text-center text-sm mt-4">Total: {formatter.format(inputValue * product.price)}</p>
                    ) : (
                        <p className="text-center text-sm text-red-700 mt-4">Required</p>
                    )}
                </motion.div>
            </Section>
            
        </>
    )
}