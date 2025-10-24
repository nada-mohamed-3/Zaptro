import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";
import { useCart } from "./Context/CartContext";
import ProtectedRoute from "./Components/ProtectedRoute";





const App = () => {
  
  const [openDropDown, setOpenDropDown] = useState(false);

  const { cartItem, setCartItem } = useCart();


  //Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);


  return (
    <>
      <BrowserRouter>
        <Navbar
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
                      <ProtectedRoute>
                         <Cart/>
                      </ProtectedRoute>
                  }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
