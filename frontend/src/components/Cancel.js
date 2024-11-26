import React,{useRef, useState, useEffect} from "react";
import { host } from "../utils/APIRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const Cancel = ()=>{
  const [userName, setUserName] = useState("");
    const selectedTime = useRef("");
    const selectedDate = useRef(undefined);

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
    
      const [minDate, setMinDate] = useState("");
      const [maxDate, setMaxDate] = useState("");

      useEffect(() => {
        const atStart = async () => {
          setUserName(await JSON.parse(localStorage.getItem("user")).username);
          const today = new Date();
          const sevenDaysFromNow = new Date();
          sevenDaysFromNow.setDate(today.getDate() + 6);
      
          // Format dates in YYYY-MM-DD for setting min and max attributes
          const todayFormatted = today.toISOString().split("T")[0];
          const maxDateFormatted = sevenDaysFromNow.toISOString().split("T")[0];
      
          setMinDate(todayFormatted);
          setMaxDate(maxDateFormatted);
        }
        atStart();
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        let name = userName;
        let time = selectedTime?.current.value;
        let date = selectedDate?.current.value;
    
        if (validate()) {
          Swal.fire({
            title: "Are you sure?",
            text: `Cancel the slot at ${time} on ${date}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel the slot!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try{
                const response = await axios.delete(`${host}/bookings/cancel`, {
                  data: {
                      name,
                      time,
                      date,
                    },
                });
                const data = response.data;
                if (data.status === true) {
                  // toast.success("Successfully Booked your slot");
                  Swal.fire({
                    title: "Cancelled !",
                    text: "Successfully Cancelled your slot!",
                    icon: "success",
                  });
                } else {
                  // toast.error(data.message, toastOptions);
                  
                }
              }
              catch(err){
                Swal.fire({
                  title: "Failed !",
                  text: err.response.data.message,
                  icon: "info",
                });
              }
            }
          });
        }
      };

      const validate = () => {
        let time = selectedTime?.current.value;
        let date = selectedDate?.current.value;
    
        if (date === "") {
          toast.error("Please select your date", toastOptions);
          return false;
        }
        if (time === "") {
          toast.error("Please select your time slot", toastOptions);
          return false;
        }
        return true;
      };

    return (
        <div className="flex p-4 bg-white rounded-lg w-full ">
      <div>
        <h1 className="Anton text-2xl font-bold text-center">
          Cancel Your Slot !
        </h1>
        <h1 className="Anton text-4xl font-bold text-center">
          Select the slot to cancel
        </h1>
      </div>
      <div className="mx-5 flex">
        <form className="flex justify-between " onSubmit={handleSubmit}>
          <div className="mb-5 mx-5">
            <label
              htmlFor="slot"
              className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
            >
              Select your Date
            </label>
            <input
              ref={selectedDate}
              type="date"
              name=""
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              min={minDate}
              max={maxDate}
            />
          </div>
          <div className="mb-5 mx-5">
            <label
              htmlFor="slot"
              className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
            >
              Select your Preferred time
            </label>
            <select
              id="slot"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              ref={selectedTime}
              defaultValue=""
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="6 AM - 9 AM">6 AM - 9 AM</option>
              <option value="9 AM - 12 PM">9 AM - 12 PM</option>
              <option value="12 PM - 3 PM">12 PM - 3 PM</option>
              <option value="3 PM - 6 PM">3 PM - 6 PM</option>
              <option value="6 PM - 9 PM">6 PM - 9 PM</option>
            </select>
          </div>

          <div className="mt-6 mx-5">
            {/* <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
            >
              Book Now
            </button> */}
            <button
              type="submit"
              className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-red-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-red-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Cancel Now
              </span>
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex items-center space-x-2">
            <span className="h-4 w-4 bg-red-300 rounded-full"></span>
            <span className="text-gray-700 font-semibold text-lg">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-4 w-4 bg-green-300 rounded-full"></span>
            <span className="text-gray-700 font-semibold text-lg">
              Available
            </span>
          </div>
        </div>
      </div> */}
    </div>
    );

};

export default Cancel;