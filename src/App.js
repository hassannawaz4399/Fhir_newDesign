import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingpPage/Home";
import Login from "./Pages/Login/Login";
import Navbar from "./Pages/Navbar/Navbar";
import Layout from "./Pages/LandingpPage/Layout";
import Queries from "./Pages/LandingpPage/Queries";
import Crud from "./Pages/LandingpPage/Crud";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";

function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/resetpassword" element={<ForgetPassword />}></Route>
        <Route path="/home" element={<Layout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="search" element={<Home />}></Route>
          <Route path="queries" element={<Queries />}></Route>
          <Route path="crud" element={<Crud />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
