import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_URL
const Login = () => {
  const navigator = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const settingData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const loginFetching = async (e) => {
    e.preventDefault();
    let response = await fetch(`${url}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    let resJson = await response.json();
    if (resJson.success) {
      localStorage.setItem("authToken", resJson.authToken);
      console.log(resJson.authToken);
      navigator("/");
    } else {
      alert("enter valid details");
    }
  };

  return (
    <>
      {/* <div>
        email:{data.email} password:{data.password}
      </div> */}

      <div
        className="bg-primary text-white"
        style={{
          height: "auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          padding: "1%",
        }}
      >
        <Link to={"/"}>
          <h4>
            <i className="fa fa-arrow-left text-white" aria-hidden="true"></i>
          </h4>
        </Link>

        <h3 style={{ textAlign: "center" }}>
          <b>Login Page</b>
        </h3>
      </div>

      <section className="vh-90" style={{ paddingTop: "2%" }}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={loginFetching} method="POST">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Login with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={settingData}
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    name="password"
                    value={data.password}
                    onChange={settingData}
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link className="link-danger" to={"/signup"}>
                      Sign-Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
