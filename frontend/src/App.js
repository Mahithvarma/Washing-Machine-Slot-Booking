import React, { useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Middle from './components/Middle';
import Input from './components/Input';
import Change from './components/Change';
import Cancel from './components/Cancel';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Middle />,
        children: [
          { index: true, element: <Input /> },
          { path: '/change', element: <Change /> },
          { path: '/cancel', element: <Cancel /> }
        ]
      },
      {
        path:'/login',
        element: <Login />,
      },
      {
        path:'/register',
        element: <Register />,
      },
      {
        path: '/forgotPassword',
        element: <ForgotPassword />,
      }
    ],
  }
]);

function AppLayout() {

  const navigate = useNavigate();

  useEffect(() => {
      async function fetchData() {
        if (!localStorage.getItem("user")) {
          navigate("/login");
        } else {
          navigate("/");
        }
        
      }
      fetchData();
    }, []);


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
