import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

// protected component, only authenticated user can see this component.
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://auth-app-api-tawny.vercel.app/products";
      const options = {
        method: "GET", // Optional, since GET is the default.
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products.map((cur, ind) => {
            return <ul>{cur.name}</ul>;
          })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
