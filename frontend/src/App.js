import React from 'react';
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import TrafficDataComponent from './components/TrafficDataComponent';
import ScrollToTopButton from './components/ScrollToTopButton';


function App() {

  
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  // Sử dụng useCallback để giữ nguyên hàm giữa các lần render
  const fetchUserDetails = useCallback(async()=> {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  },[dispatch])

  // nút giỏ hàng(Cart)
  const fetchUserAddToCart = useCallback(async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("dataApi", dataApi)
    setCartProductCount(dataApi?.data?.count)
  },[])

  useEffect(() => {
    console.log("Fetching user details and cart count...");
    /** user Details */
    fetchUserDetails()
    /** user Details cart Product */
    fetchUserAddToCart()
  },[fetchUserDetails, fetchUserAddToCart]) 


  return (
    <>
    
      <Context.Provider value={{
          fetchUserDetails, //user detail fetch
          cartProductCount,  // current user add to cart product count 
          fetchUserAddToCart
      }} >
        <ToastContainer 
          position="top-center"
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
        </main>
        <TrafficDataComponent />
        <ScrollToTopButton />
        <Footer />
      </Context.Provider>
    </>
  );
  
}

export default App;
