import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Middle from './components/Middle';
import Input from './components/Input';
import Change from './components/Change';
import Cancel from './components/Cancel';

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
      }
    ],
  },
]);

function AppLayout() {
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
