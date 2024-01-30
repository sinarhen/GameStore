import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import MyAccount from "./pages/MyAccount";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import {CartProvider} from "./contexts/CartContext";

function App() {

  return (
    <div className="w-full
          mandatory-enabled overflow-y-scroll  
          h-full text-white bg-neutral-900">
      <Router>
        <CartProvider>
          <Navbar/>
          <div className="
                  container
                  overflow-x-visible
                  mx-auto 
                  h-full
                  xl:px-36 px-4 sm:px-6 lg:px-8 pt-24">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/me' element={<MyAccount/>}/>
              <Route path='/products/:productId' element={<ProductDetails/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='*' element={<h1>Такої сторінки не існує</h1>}/>
            </Routes>
          </div>
        </CartProvider>

      </Router>
    </div>

  );
}


export default App;
