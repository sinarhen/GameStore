import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import MyAccount from "./pages/MyAccount";
import Favorites from "./pages/Categories";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  // const [products, setProducts] = React.useState([]);

  // React.useEffect(() => {
  //   axios.get("/products/").then((res) => {
  //     setProducts(res.data);
  //   })
  // }, []);

  return (
    <div className="w-full h-full text-white bg-neutral-900">
      <Router>
        <Navbar />
        {/* container make */}
        <div className="
          container 
          mandatory-enabled
          overflow-x-visible 
          overflow-y-scroll
          h-full 
          mx-auto 
          xl:px-36 px-4 sm:px-6 lg:px-8">
            
        

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/myaccount' element={<MyAccount />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>


    </div>
  );
}

export default App;
