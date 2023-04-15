import React, { useEffect } from "react";
import { Outlet } from "react-router-dom/dist";
import Header from "./components/Header/Header";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header/>
      <Outlet />
      <ToastContainer/>
      </>
  );
}

export default App;
