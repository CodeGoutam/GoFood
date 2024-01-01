import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { useCartState } from "../ContextReducer";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_URL
const Home = () => {
    let state = useCartState()
    console.log("env url", url);
    let navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setsearch] = useState("");
    // localStorage.setItem("state", state);
    const fetching = async () => {
        let response = await fetch(`${url}/api/fooditem`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        let data = await response.json();
        // console.log(data);
        setItems(data[0]);
        setCategory(data[1]);
    };
    useEffect(() => {
        fetching();
    }, []);
    let auth = localStorage.getItem("authToken");
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };
    return (
        <>
            {/* <NavBar /> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top" style={{ height: '63px' }}  >
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">
                        <b>Go-Food</b>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNav"
                        style={{width:'auto', justifyContent: "space-between", }}
                    >
                        <ul className="navbar-nav bg-primary">
                            <li className="nav-item ">
                                <a
                                    className="nav-link active text-white"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            {auth != null ? <li className="nav-item">
                                <Link className="nav-link text-white" aria-current="page" to={"/myorders"}>
                                    My Orders
                                </Link>
                            </li> : ""}
                        </ul>

                        <div className="btns d-flex align-items-center bg-primary" style={{justifyContent:'center'}}>
                            {/* search bar */}
                            <div className="me-3">
                                <input
                                    className="form-control form-control-sm ml-3 w-75 me-2 w-100"
                                    type="text"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => {
                                        setsearch(e.target.value);
                                    }}
                                />
                            </div>
                            {/* search bar */}
                            {!localStorage.getItem("authToken") ? (
                                <div>
                                    <Link
                                        to={"/login"}
                                        className="loginbtn btn btn-primary bg-white text-primary me-2 w-10"
                                        type="submit"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to={"/signup"}
                                        className="signupbtn btn btn-primary bg-white text-primary w-10"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ justifyContent: "space-between" }}>
                                    <Link className="btn btn-primary position-relative bg-white text-primary me-2 mt-1 " to={"/cart"}>
                                        Cart
                                        <span className="position-absolute mt-0 start-100     translate-middle badge rounded-pill bg-danger">{state.length}</span>
                                    </Link>
                                    <Link
                                        className="btn bg-white text-primary ms-2"
                                        to={"/"}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <Carousel />
            <div className="container ">
                {category.map((data) => {
                    return (
                        <div key={data._id}>
                            <h4 style={{ textAlign: "left", margin: "15px" }}>
                                {data.CategoryName}
                            </h4>
                            <hr />
                            <div className="row">
                                {items
                                    .filter(
                                        (values) =>
                                            data.CategoryName === values.CategoryName &&
                                            values.name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((food) => {
                                        return (
                                            <div
                                                className="col-sm-12 col-md-6 col-lg-3 mb-2"
                                                key={food._id}
                                            >
                                                <Card
                                                    foodItem={food}

                                                    options={food.options}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default Home;
