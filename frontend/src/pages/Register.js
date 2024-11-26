import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Ripple, initTWE } from "tw-elements";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { RegisterRoute } from "../utils/APIRoutes";
import axios from "axios";

initTWE({ Input, Ripple });

const Register = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
    const nameRef = useRef();
    const confirmpasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = nameRef.current.value;


    if (validate()) {

        const response = await axios.post(RegisterRoute,{username, email, password});
        if(response.status === 200) {
            toast.success("Account created successfully!", toastOptions);
            navigate("/");
        }
        else{
            toast.error(`${response.data.message}`, toastOptions);
        }

    }
  };

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

  const validate = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;
    const username = nameRef.current.value;

        if(!email){
            toast.error("Please Enter Your Email!", toastOptions);
            return false;
        }
        else if (username.length < 6) {
            toast.error("Username must be of atleast 6 characters.", toastOptions);
            return false;
          } else if (password.length < 8) {
            toast.error("Password must be of atleast 8 characters.", toastOptions);
            return false;
          } else if (password !== confirmpassword) {
            toast.error("Password must be same with Confirm password.", toastOptions);
            return false;
          } 
        return true;
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt=""
            />
          </div>

          <div className="md:w-8/12 lg:ms-6 lg:w-5/12" style={{width: "400px", position: "relative", right: "100px"}}>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  type="text"
                  ref={nameRef}
                  className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3"
                  placeholder="Username"
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Username
                </label>
              </div>
              <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  type="email"
                  ref={emailRef}
                  className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3"
                  placeholder="Email address"
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>

              <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  type="password"
                  ref={passwordRef}
                  className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Password
                </label>
              </div>

              <div className="relative mb-6" data-twe-input-wrapper-init>
                <input
                  type="password"
                  ref={confirmpasswordRef}
                  className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput33"
                  placeholder="Password"
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                >
                  Confirm Password
                </label>
              </div>



              <div className="mb-6 flex items-center justify-end">
                <a
                  href="#!"
                  className="text-primary focus:outline-none dark:text-primary-400"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{ backgroundColor: "#55acee", color: "white" }}
                href="#!"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Create Account
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              <Link
                className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{ backgroundColor: "#3b5998" }}
                to="/login"
                role="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
