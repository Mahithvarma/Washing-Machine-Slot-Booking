import React, {useEffect, useState} from "react";
import Slots from "./Slots";
import { ToastContainer } from "react-toastify";
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const Middle = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if (!Cookies.get("token")) {
    //         navigate("/login");
    //     } else {
    //         setAuthenticated(true);
    //     }
    // }, []);


    useEffect(()=>{
        if (!localStorage.getItem("user")) {
            navigate("/login");
        } else {
            setAuthenticated(true);
        }
    }, []);

    return(
        authenticated && 
        <div className="flex flex-col p-4 h-full bg-white shadow-2xl rounded-lg">
            <div>
                <Outlet />
            </div>
            <div>
                <Slots />
            </div>
            <ToastContainer />
        </div>
    )
};

export default Middle;