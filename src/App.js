import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Portal_Stepone from './Components/Portal_Stepone';
import AdminDashboard from './Components/AdminDashboard.js';
import SellerDashboard from './Components/SellerDashboard.js';
import EditSeller from './Components/EditSeller.js';
import Home from './pages/Home.js'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal_Stepone/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/sellers" element={<SellerDashboard/>}/>
        <Route path="/sellers/edit/:type/:id" element={<EditSeller />} />
        <Route path="/ondc/search" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;