import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../src/screens/Login";
import Signup from "../src/screens/Signup";
import Cart from "../src/screens/Cart";
import { ContextReducer } from "./ContextReducer.js";
import Myorders from "./screens/Myorders.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextReducer>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/myorders" element={<Myorders />} />
            </Routes>
        </BrowserRouter>
    </ContextReducer>
);
// root.listen(6000)
reportWebVitals();
