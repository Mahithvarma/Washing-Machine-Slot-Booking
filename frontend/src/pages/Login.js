import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Ripple, initTWE } from "tw-elements";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { host, LoginRoute } from "../utils/APIRoutes.js";

initTWE({ Input, Ripple });

const Login = () => {
    const navigate = useNavigate();

    const emailOrMobileRef = useRef("");
    const passwordRef = useRef("");

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailormobile = emailOrMobileRef.current.value;
        const password = passwordRef.current.value;
        if (validate()) {
            try {
                const response = await axios.post(
                    LoginRoute,
                    { emailOrMobile: emailormobile, password: password },
                    { withCredentials: true }
                );
                if (response) {
                    toast.success("Login successful", toastOptions);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/");
                }
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data.message, toastOptions);
                } else {
                    toast.error("Something went wrong!", toastOptions);
                }
            }
        }
    };

    const validate = (e) => {
        let emailormobile = emailOrMobileRef.current.value;
        let password = passwordRef.current.value;
        if (emailormobile === "") {
            alert("Email/Mobile is required");
            return false;
        }
        if (password === "") {
            alert("Password is required");
            return false;
        }
        return true;
    };

    return (
        <section className="h-screen">
            <div className="bg-gray-200 container h-full px-6 py-24">
                <div className="flex h-full flex-wrap items-center justify-center lg:justify-around">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt=""
                        />
                    </div>

                    {/* <div className="md:w-8/12 lg:ms-6 lg:w-5/12" style={{width: "400px", position: "relative", right: "100px"}}>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="relative mb-6" data-twe-input-wrapper-init>
            <input
              type="text"
              ref={emailRef}
              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput3"
              placeholder="Email address" />
            <label
              htmlFor="exampleFormControlInput3"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >Email address
            </label>
          </div>

          <div className="relative mb-6" data-twe-input-wrapper-init>
            <input
              type="password"
              ref={passwordRef}
              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput33"
              placeholder="Password" />
            <label
              htmlFor="exampleFormControlInput33"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >Password
            </label>
          </div>

          <div className="mb-6 flex items-center justify-end">
            

            <a
              href="#!"
              className="text-primary focus:outline-none dark:text-primary-400"
              >Forgot password?</a
            >
          </div>

          <button
            type="submit"
            className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            style={{ backgroundColor: "#55acee", color: "white" }}
            href="#!"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            >
            
            Login
          </button>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
              OR
            </p>
          </div>

          <Link
            className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            style={{ backgroundColor: "#3b5998" }}
            to="/register"
            role="button"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            
            Register?
          </Link>
        </form>
      </div> */}
                    <div className="bg-white text-gray-400 rounded-lg shadow-md p-8">
                        <div className="container mx-auto px-4 py-10">
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="bg-gray-800 rounded-lg shadow-md p-8"
                            >
                                <h2 className="text-2xl font-bold mb-6 text-gray-200">
                                    Sign in
                                </h2>
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-gray-200 text-sm mb-2"
                                    >
                                        Mobile no or email address
                                    </label>
                                    <input
                                        ref={emailOrMobileRef}
                                        type="text"
                                        id="username"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Username or email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block text-gray-200 text-sm mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Password"
                                    />
                                    <Link
                                        to="/forgotPassword"
                                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-3"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-gray-400 text-sm font-bold">
                                    Don't have an Account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-blue-500 hover:text-blue-800"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Login;
