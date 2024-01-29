import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import {useEffect, useState} from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import {motion} from "framer-motion";
import {ProductCardType} from "../lib/types";
import Filters from "../components/Filters";
import AnimatedSeparator from "../components/AnimatedSeparator";
import Pagination from "../components/Pagination";
import {getAllProducts} from "../lib/products";
import Loading from "../components/Loading";

import {appearDuration, delay, delayPerItem} from "../lib/constants";


export default function Products() {
  const [products, setProducts] = useState<ProductCardType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardType[] | null>(null);


  useEffect(() => {
    getAllProducts()
      .then((response) => {
        if (!response.data.length) {
          setError("Не знайдено продуктів.");
          return;
        }
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Щось пішло не так: ${error.message}`, {id: "products"});
        setError(`Щось пішло не так while fetching products: ${error.message}`);
      });
  }, []);

  if (error) {
    return <NotFound helperText={error} buttonText="Перезавантажити" buttonAction={() => window.location.reload()}/>;
  }

  if (loading) {
    return <Loading/>;
  }

  if (!products?.length) {
    return <NotFound helperText={error ?? "No products now"} buttonText="Refresh"
                     buttonAction={() => window.location.reload()}/>;
  }

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="w-full h-full">
        <Header animateableText="Продукти." appearDuration={appearDuration}/>
        <AnimatedSeparator delay={appearDuration + delay}/>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{delay: appearDuration + delay, duration: appearDuration}}
        >
          <Filters products={products} pageSize={pageSize} setPageSize={setPageSize} setLoading={setLoading}
                   setError={setError} onProductsChange={setFilteredProducts}/>

        </motion.div>


        {currentItems?.length ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-4 w-full">
            {currentItems.map((product: ProductCardType, index: number) => (
                <motion.div
                  key={product?._id + index}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="w-full h-full"
                  exit={{opacity: 0}}
                  transition={{delay: delay + index * delayPerItem + appearDuration, duration: appearDuration}}
                >
                  <ProductCard product={product}/>

                </motion.div>

              )
            )}
          </div>

        ) : <NotFound helperText="No products found"/>}
        <Pagination
          pageSize={pageSize}
          totalItems={filteredProducts?.length ?? products.length}
          paginate={paginate}
          currentPage={currentPage}
        />

      </div>

    </>

  );
}