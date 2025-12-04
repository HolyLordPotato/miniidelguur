import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import GetAllProducts from './pages/GetAllProducts';
import GetSingleProduct from './pages/GetSingleProduct';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetAllProducts />} />
      <Route path="/product/:id" element={<GetSingleProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/product/:id/edit" element={<EditProduct />} />
    </Routes>
  </BrowserRouter>
)