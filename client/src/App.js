import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
