import React, { useState, useRef } from "react";
import {
  OTPSendRoute,
  OTPVerifyRoute,
  ChangePasswordRoute,
} from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SyncLoader from "react-spinners/SyncLoader";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);
  const emailOrMobileRef = useRef(null);
  const otpRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [compareId, setCompareId] = useState(null);

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

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const emailOrMobile = emailOrMobileRef?.current.value;
      setIsLoading(true);
      const response = await axios.post(
        `${OTPSendRoute}`,
        { emailOrMobile: emailOrMobile },
        { withCredentials: true }
      );
      setIsLoading(false);
      if (response.status) {
        toast.success("OTP sent successfully", toastOptions);
        console.log("otp sent: ", response.data);
        setOtpSent(true);
        setCompareId(response.data.id);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, toastOptions);
      } else {
        toast.error("Something went wrong!", toastOptions);
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const otp = otpRef?.current.value;

      const response = await axios.post(
        `${OTPVerifyRoute}`,
        { id: compareId, otp: otp },
        { withCredentials: true }
      );

      if (response.status) {
        toast.success("OTP Verified successfully", toastOptions);
        setOtpVerified(true);
      } else {
        toast.error("OTP is not correct", toastOptions);
      }
    } catch (err) {
      toast.error("Something went wrong!", toastOptions);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef?.current.value;
    const confirmPassword = confirmPasswordRef?.current.value;
    try {
      if (newPassword === confirmPassword) {
        const response = await axios.post(
          `${ChangePasswordRoute}`,
          { id: compareId, password: newPassword },
          { withCredentials: true }
        );
        if (response) {
          toast.success("Password Reset successfully", toastOptions);
          navigate("/login");
        }
      } else {
        toast.error(
          "Password is not Matched with Confirm Password",
          toastOptions
        );
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message, toastOptions);
      } else {
        toast.error("Something went wrong!", toastOptions);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#ffffff85] bg-opacity-50 z-10 flex flex-col justify-center items-center">
          <SyncLoader
        color={'#2b3230'}
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className="text-xl font-semibold mt-6">Loading...</h1>
        </div>
      ) : null}
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <div className="max-w-md mx-auto">
          {otpVerified ? (
            <div id="new-password-container" className="">
              <form
                onSubmit={(e) => {
                  handleChangePassword(e);
                }}
              >
                <h4 className="text-lg font-medium mb-2">Enter New Password</h4>
                <div className="mb-4">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <input
                    ref={newPasswordRef}
                    type="password"
                    id="new-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your new password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    ref={confirmPasswordRef}
                    type="password"
                    id="confirm-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
              <form
                onSubmit={async (e) => {
                  await handleSendOTP(e);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email/Mobile
                  </label>
                  <input
                    ref={emailOrMobileRef}
                    type="text"
                    id="emailorMobile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email or Mobile no"
                    required
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
              {otpSent && (
                <form
                  onSubmit={(e) => {
                    handleVerifyOTP(e);
                  }}
                  id="otp-container"
                  className=""
                >
                  <h4 className="text-lg font-medium mb-2">Enter OTP</h4>
                  <div className="mb-4">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium mb-1"
                    >
                      OTP
                    </label>
                    <input
                      ref={otpRef}
                      type="number"
                      id="otp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the OTP sent to your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              )}{" "}
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
