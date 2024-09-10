import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { redirect } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <div className="bg-slate-900">
        <Navbar />
      </div> */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        {/* <Route path="/" element={redirect to="/Signup"} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/signin" element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default App;
