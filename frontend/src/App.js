import './App.css';
// router 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import MyAccount from './pages/MyAccount';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


function App() {
  return (
    <div className='app'>
      {/* Pages: Products, Categories, My account, favorites, order */}

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
