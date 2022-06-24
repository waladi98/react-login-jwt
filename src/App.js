import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function App() {
  return ( 
  <div>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  </div>
  );
}

export default App;