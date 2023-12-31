
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Inventory from '../../Pages/Inventory';
import Orders from '../../Pages/Orders';
import Customers from '../../Pages/Customers';

function AppRoutes() {
 return (

     <Routes>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/Customers' element={<Customers />}></Route>
        <Route path='/Inventory' element={<Inventory />}></Route>
        <Route path='/Orders' element={<Orders />}></Route>
     </Routes>
  
 );
}

export default AppRoutes;