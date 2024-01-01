import React from "react";
import { useCartState, useCartDispatch } from "../ContextReducer";
import { Link } from "react-router-dom";
const url = process.env.REACT_APP_URL
const Cart = () => {
    let state = useCartState();
    let dispatch = useCartDispatch();
    let price = 0;
    let email = localStorage.getItem("email");
    const handleCheckout = async () => {
        const fetchingOrdersApi = await fetch(`${url}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, data: state }),
        });
        // let res = fetchingOrdersApi.json();
        if (fetchingOrdersApi.status === 200) {
            await dispatch({ type: "CHECKOUT" });
        }
    };
    return (
        <>
            <div
                className="bg-primary text-white ps-3 fixed-top "
                style={{
                    alignItems: "center",
                    display: "flex",
                    height: '63px'
                }}
            >
                <Link to={"/"} className="me-5">
                    <h5>
                        <i className="fa fa-arrow-left text-white" aria-hidden="true"></i>
                    </h5>
                </Link>

                <h5 style={{ textAlign: "center" }}>
                    <b>Shopping Cart</b>
                </h5>
            </div>
            <section className="h-100 mt-4">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-10">
                            {state.length === 0 ? (
                                <h1>No Items</h1>
                            ) : (
                                state.map((items, index) => {
                                    {
                                        price = price + items.price;
                                    }
                                    return (
                                        <>
                                            <div className="card rounded-3 mb-2" style={{ textAlign: 'center' }}>
                                                <div className="card-body p-3">
                                                    <div className="row d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={items.img}
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                                style={{ height: "5rem", width: "8rem" }}
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <p className="lead fw-normal mb-2">
                                                                {items.name}
                                                            </p>
                                                            <p>Size :- {items.size}</p>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2">
                                                            Quantity :-{items.quantity}
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h5 className="mb-0">Price :-{items.price}</h5>
                                                        </div>
                                                        {/* remove button */}
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end" style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <button
                                                                className="text-danger border-0 bg-white"
                                                                onClick={async () =>
                                                                    await dispatch({
                                                                        type: "REMOVE",
                                                                        id: items.id,
                                                                        index: index,
                                                                    })
                                                                }
                                                            >
                                                                <i className="fas fa-trash fa-lg"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                            )}

                            {state.length === 0 ? (
                                ""
                            ) : (
                                <div className="card">
                                    <div
                                        className="card-body"
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <div
                                            type="button"
                                            className="btn btn-primary btn-block btn-lg"
                                        >
                                            Total Price : {price}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-block btn-lg"
                                            onClick={handleCheckout}
                                        >
                                            Proceed to Pay
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Cart;
