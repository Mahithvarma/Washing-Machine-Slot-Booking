import React from "react";
import Slots from "./Slots";
import { ToastContainer } from "react-toastify";
import { Outlet } from 'react-router-dom';


const Middle = () => {
    return(
        <div className="flex flex-col p-4 h-full bg-white shadow-2xl rounded-lg">
            <div>
                <Outlet />
            </div>
            <div>
                <Slots />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Middle;