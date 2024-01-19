import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import UserLogin from "./components/UserLogin/UserLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminTable from "./components/AdminTable/AdminTable";
import PrivateRoute from "./helper/PrivateRoute";
import Home from './components/Home/Home'


function App() {
  return (
    <div >
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Home/>}></Route>
     <Route path="/admin-login" element={<AdminLogin/>}></Route>
     <Route path="/user-login" element={<UserLogin/>}></Route>
     <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard/></PrivateRoute>}></Route>
     <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard/></PrivateRoute>}></Route>
     <Route path="/user-management" element={<PrivateRoute><AdminTable/></PrivateRoute>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
