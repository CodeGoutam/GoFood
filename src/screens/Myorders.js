import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const url = process.env.REACT_APP_URL
const Myorders = () => {
    let res;
    const [data, setData] = useState([])
    const fetchingFunction = async () => {
        const response = await fetch(`${url}/api/myorders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: localStorage.getItem('email') }) })
        res = await response.json()
        // console.log(res)
        setData(res)

        // console.log(res)
    }
    useEffect(() => {
        fetchingFunction()
    }, []);
    return (<>
        <div
            className="bg-primary text-white ps-3 fixed-top "
            style={{
                height: "63px",
                alignItems: "center",
                display: "flex",

            }}
        >
            <Link to={"/"} className="me-5">
                <h5>
                    <i className="fa fa-arrow-left text-white" aria-hidden="true"></i>
                </h5>
            </Link>

            <h5 style={{ textAlign: "center" }}>
                <b>My Orders</b>
            </h5>
        </div>
        <div className="container ps-5 pe-5 mt-5 pt-4 col-sm-10 col-md-12 ">
            {data[0] == null ? <div> <p>No Item</p></div> : data.map((dataObject) => {
                return dataObject.orderData.map((orderDataObject) => {
                    return (orderDataObject.map((items, index) => {
                        return <div key={index}>
                            <div className="card rounded-3 mb-2" style={{ textAlign: 'center' }} >
                                <div className="card-body p-3">
                                    <div className="row d-flex justify-content-around">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src={items.img}
                                                className=" col-sm-5
                                                col-md-10
                                                img-fluid rounded-3"
                                                alt={items.img}
                                            />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <p className="lead fw-normal mb-2">
                                                {items.name}
                                            </p>
                                            <p>Size :- {items.size}</p>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 ">
                                            <p> Quantity :-{items.quantity}</p>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h5 className="mb-0">Price :-{items.price}</h5>
                                        </div>
                                        {/* remove button */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    }))
                })
            })}
        </div></>)
}
export default Myorders

