import Input from "../components/Input";
import ProductsTable from "../components/ProductsTable";
import React from "react";
import {getAllOrders} from "../lib/order";
import {getAllProducts} from "../lib/products";
import {CategoryType, Order, ProductCardType, User} from "../lib/types";
import Section from "../components/Section";
import Orders from '../components/Orders';
import {useCurrentUser} from "../hooks/useCurrentUser";
import Header from "../components/Header";
import CreateProductDialog from "../components/CreateProductDialog";
import CreateCategoryDialog from "../components/CreateCategoryDialog";
import {getAllUsers} from "../lib/users";
import UsersTable from "../components/UsersTable";
import toast from "react-hot-toast";
import CategoryTable from "../components/CategoryTable";
import {getAllCategories} from "../lib/categories";


export default function Admin() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = React.useState<Order[]>([]);
  const [query, setQuery] = React.useState("");

  const [products, setProducts] = React.useState<ProductCardType[] | null>(null);
  const [filteredProducts, setFilteredProducts] = React.useState<ProductCardType[] | null>([]);
  const [productQuery, setProductQuery] = React.useState("");

  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [userQuery, setUserQuery] = React.useState("");

  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [filteredCategories, setFilteredCategories] = React.useState<CategoryType[]>([]);
  const [categoryQuery, setCategoryQuery] = React.useState("");

  const {isAdmin, user} = useCurrentUser();

  const getAllOrdersAsync = async () => {
    try {
      const orders = (await getAllOrders())?.data;
      setOrders(orders);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 403 && isAdmin) {
        toastRelogin();
      }
    }
  }

  const getAllProductsAsync = async () => {
    try {
      const products = (await getAllProducts())?.data;
      setProducts(products);
    } catch (err: any) {
      console.error(err);
      if (err.response.status === 403 && isAdmin) {
        toastRelogin();
      }
    }
  }

  const getAllUsersAsync = async () => {
    try {
      const users = (await getAllUsers())?.data;
      setUsers(users);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status) {
        if (err.response.status === 403 && isAdmin) {
          toastRelogin();
        }
      }
    }
  }

  const getAllCategoriesAsync = async () => {
    try {
      const categories = (await getAllCategories())?.data;
      setCategories(categories);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status) {
        if (err.response.status === 403 && isAdmin) {
          toastRelogin();
        }
      }
    }
  }

  function toastRelogin() {
    toast.error("Здається, вас було підвищено до адміністратора. Але вам потрібно вийти і увійти знову, щоб побачити зміни.", {id: "relogin"})
  }

  React.useEffect(() => {
    if (isAdmin && user?.loginRequired) {
      toastRelogin();
    } else if (isAdmin && !user?.loginRequired) {
      getAllOrdersAsync();
      getAllProductsAsync();
      getAllUsersAsync();
      getAllCategoriesAsync();
    }
  }, [user]);

  React.useEffect(() => {

    setFilteredOrders(orders.filter((order) => order?._id ? order?._id.includes(query) : false));
  }, [query]);

  React.useEffect(() => {
    if (products) {
      setFilteredProducts(products?.filter((product) => product._id.includes(productQuery) || product.name?.includes(productQuery)));
    }
  }, [productQuery]);

  React.useEffect(() => {
    if (users) {
      setFilteredUsers(users?.filter((user) => user._id.includes(userQuery) || user.name?.includes(userQuery) || user.email?.includes(userQuery)));
    }
  }, [userQuery]);

  React.useEffect(() => {
    if (categories) {
      setFilteredCategories(categories?.filter((category) => category._id.includes(categoryQuery) || category.name?.includes(categoryQuery)));
    }
  }, [categoryQuery]);


  if (!isAdmin) {
    return <Header baseText="You are not an admin"/>
  }

  return (
    <>
      <Section className="pt-20 h-full">
        <h1 className="pb-4">All Orders</h1>
        <Input
          className="mb-4"
          name="orderId"
          type="text"
          placeholder="Order ID"
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
        />
        <Orders tableCaption="Orders" setOrders={setOrders} orders={query ? filteredOrders : orders}/>
      </Section>

      <Section className="pt-20 h-full">
        <div className="flex gap-4 items-center justify-between">
          <h1>All products</h1>
          <CreateProductDialog setProductsInTable={setProducts} products={products}/>
        </div>
        <Input
          className="mt-4"
          name="product"
          type="text"
          placeholder="Product ID or name"
          value={productQuery}
          onChange={(e: any) => setProductQuery(e.target.value)}
        />

        <ProductsTable products={productQuery ? filteredProducts : products} setProducts={setProducts}/>
      </Section>
      <Section className="pt-20 h-full">
        <div className="flex gap-4 items-center justify-between">
          <h1>All categories</h1>
          <CreateCategoryDialog setCategories={setCategories} categories={categories}/>
        </div>
        <Input
          className="mt-4"
          name="category"
          type="text"
          placeholder="Category ID or name"
          value={categoryQuery}
          onChange={(e: any) => setCategoryQuery(e.target.value)}
        />

        <CategoryTable categories={categoryQuery ? filteredCategories : categories} setCategories={setCategories}/>
      </Section>

      <Section className="pt-20 h-full">
        <h1 className="pb-4">All users</h1>
        <Input
          name="user"
          type="text"
          placeholder="User ID or name or email"
          value={userQuery}
          className="mt-4"
          onChange={(e: any) => setUserQuery(e.target.value)}
        />

        <UsersTable users={userQuery ? filteredUsers : users} setUsers={setUsers}/>
      </Section>
    </>
  );
}