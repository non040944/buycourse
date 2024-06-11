import React from "react";
import { useSelector } from "react-redux";
import "./Payment.css"
import Header from "../components/Header";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const ToCourse = () =>{
    window.location='http://localhost:3000/Course';
  }
  return(
    <>
    <Header/>
    <h1 className="paymenttitle">ช่องทางการชำระเงิน</h1>
    <div className="paymentcart-grid">
      <div className="carttitlebox">
        <div><img src="/images/scan.png"/></div>  
      </div>
      <div className="allpayment">
        <div className="inpayment"><h4>ราคารวม {cart.total} บาท</h4></div>
        <div className="inpayment"><img src="/images/QR.jpg"/></div> 
        <div className="inpayment"><button  onClick={ToCourse}>แจ้งชำระเงิน</button></div>
      </div>
    </div> 
    </> 
  )
  ;
};

export default Payment;