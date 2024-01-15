import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import MyAccount from "./pages/MyAccount";
import Favorites from "./pages/Categories";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-full w-full text-white bg-neutral-900">
      <Router>
        <Navbar />
        {/* container make */}
        <div className="container h-full mx-auto xl:px-36 px-4 sm:px-6 lg:px-8">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>

        </div>
      </Router>


    </div>
  );
}

export default App;
