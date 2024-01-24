import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import MyAccount from "./pages/MyAccount";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { AuthDialogProvider } from "./contexts/AuthDialogContext";

function App() {

  return (
          <div className="w-full 
          mandatory-enabled overflow-y-scroll  
          h-full text-white bg-neutral-900">
            <Router>
              <Navbar />
              <div className="
                container
                overflow-x-visible
                mx-auto 
                h-full
                xl:px-36 px-4 sm:px-6 lg:px-8 pt-24">
                  
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<Products/>} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/me' element={<MyAccount />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/products/:productId' element={<ProductDetails />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<h1>Page does not exist</h1>} />
                  </Routes>
                  
              </div>
            
            </Router>
          </div>

      );
}


export default App;
