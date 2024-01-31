import { useCallback, useEffect, useMemo, useState } from "react";
import { CategoryType, ProductCardType } from "../lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { motion } from "framer-motion";
import Button from "./Button";
import { getAllCategories } from "../lib/categories";
import toast from "react-hot-toast";
import { appearDuration, delay, delayPerItem } from "../lib/constants";
import { cn } from "../lib/utils";
import { PiBroom } from "react-icons/pi";

const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
];

const sortByPrice = (a: ProductCardType, b: ProductCardType) => a.price - b.price;
const sortByName = (a: ProductCardType, b: ProductCardType) => a.name.localeCompare(b.name);
const sortByDate = (a: ProductCardType, b: ProductCardType) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

enum OrderBy {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  DATE_ASC = 'date_asc',
  DATE_DESC = 'date_desc',
}

const sortByOptions = [
  { label: 'Ціна (спочатку найменша)', value: OrderBy.PRICE_ASC },
  { label: 'Ціна (спочатку найбільша)', value: OrderBy.PRICE_DESC },
  { label: 'A-Z', value: OrderBy.NAME_ASC },
  { label: 'Z-A', value: OrderBy.NAME_DESC },
  { label: 'Нещодавно додано', value: OrderBy.DATE_DESC },
  { label: 'Найстаріша за датою', value: OrderBy.DATE_ASC },
];

const Filters = ({
                   products,
                   pageSize: initialPageSize,
                   onProductsChange,
                   setLoading,
                   setError,
                   setPageSize: setPageSizeState,
                 }: {
  products: ProductCardType[];
  pageSize: number;
  setPageSize: (size: number) => void;
  onProductsChange: (products: ProductCardType[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) => {
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.PRICE_ASC);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortProducts = useCallback(() => {
    let sortedProducts = [...products];
    switch (orderBy) {
      case OrderBy.PRICE_ASC:
        sortedProducts.sort(sortByPrice);
        break;
      case OrderBy.PRICE_DESC:
        sortedProducts.sort(sortByPrice).reverse();
        break;
      case OrderBy.NAME_ASC:
        sortedProducts.sort(sortByName);
        break;
      case OrderBy.NAME_DESC:
        sortedProducts.sort(sortByName).reverse();
        break;
      case OrderBy.DATE_ASC:
        sortedProducts.sort(sortByDate);
        break;
      case OrderBy.DATE_DESC:
        sortedProducts.sort(sortByDate).reverse();
        break;
    }

    return sortedProducts;
  }, [orderBy, products]);

  useEffect(() => {
    onProductsChange(
      products.filter((product) => (selectedCategory ? product?.category?._id === selectedCategory : true))
    );
  }, [selectedCategory, onProductsChange, products]);

  useEffect(() => {
    if (products) {
      const filteredProducts = sortProducts();
      onProductsChange(filteredProducts);
    }
  }, [onProductsChange, products, sortProducts]);

  useEffect(() => {
    async function getAllCategoriesAndSetState() {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error: any) {
        const errorMessage = `Something went wrong while fetching categories: ${error.message}`;
        toast.error(`Щось пішло не так: ${error?.message}`, { id: 'categories' });
        setError(errorMessage);
      }
    }
    getAllCategoriesAndSetState();
  }, [setCategories, setLoading, setError]);

  const clearFilters = () => {
    setOrderBy(OrderBy.PRICE_ASC);
    setPageSizeState(10);
    setSelectedCategory(null);
  };

  const isFilterApplied = !!selectedCategory || initialPageSize !== 10 || orderBy !== OrderBy.PRICE_ASC;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-y-4 justify-between text-sm items-center w-full sm:py-10 py-4">
        <div className="flex items-center gap-x-2">
          <span>Кількість</span>
          <Select defaultValue="10" onValueChange={(val) => setPageSizeState(parseInt(val))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="text-white bg-black">
              {pageSizeOptions.map((option) => (
                <SelectItem key={option.value} value={`${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-x-2">
          <span>Фільтрація</span>
          <Select defaultValue={OrderBy.PRICE_ASC} onValueChange={(value) => setOrderBy(value as OrderBy)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="---------" />
            </SelectTrigger>
            <SelectContent className="text-white bg-black">
              {sortByOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex sm:flex-row mb-5 justify-between items-center">
        <div className="flex gap-4 items-center w-full ">
          {categories?.map((category: any, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: index * delayPerItem + appearDuration + delay, duration: appearDuration }}
              key={category._id}
            >
              <Button
                onClick={() => {
                  setSelectedCategory(category._id);
                }}
                className={cn(
                  "rounded-3xl bg-white text-black hover:bg-gray-300 border border-transparent",
                  selectedCategory === category._id ? "bg-gray-400 border-indigo-600" : ""
                )}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </div>
        {isFilterApplied && (
          <p
            onClick={clearFilters}
            className={
              "text-sm items-center hover:bg-gray-400 sm:hover:bg-transparent rounded-full p-8 sm:bg-transparent sm:rounded-none sm:p-0 bg-gray-300 cursor-pointer text-gray-600 absolute right-2 bottom-4 z-40 hover:underline sm:relative justify-center gap-x-2 w-max"
            }
          >
            <PiBroom className="h-4 w-4" /> <span className="hidden sm:flex">Очистити</span>
          </p>
        )}
      </div>
    </>
  );
};

export default Filters;
