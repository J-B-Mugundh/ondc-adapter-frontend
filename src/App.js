import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Portal_Stepone from './Components/Portal_Stepone';
import AdminDashboard from './Components/AdminDashboard.js';
import OrdersDashboard from './Components/OrdersDashboard.js';
import SellerDashboard from './Components/SellerDashboard.js';
import EditSeller from './Components/EditSeller.js';
import Home from './pages/Home.js'
import Cart from './Components/Cart.js';
import Navbar from './Components/Navbar.js'
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Portal_Stepone/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/sellers" element={<SellerDashboard/>} />
        <Route path="/sellers/edit/:type/:id" element={<EditSeller />} />
        <Route path="/ondc/search" element={<Home />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/ondc/orders" element={<OrdersDashboard/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;