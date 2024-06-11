import React from "react";
import styled from "styled-components";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import Header from "../components/Header";
import "./Cart.css"

//import request from "request";
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 50px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductCart = styled.div`
color:black`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 100;
`;
const Container = styled.div`
  background-color: white;
`;
const Wrapper = styled.div`
  position: relative;
  padding: 10px 0px;
  background-color: white;
  width: 70vw;
  height: 10vh;
  margin: auto;
  margin-top:20px;
`;

const Title = styled.div`
    position:absolute;
    height: 50px;
    width:200px;
    text-align: center;
    font-size:30px;
    background : #800606;
    font-weight:bold;
    border-radius:15px;
`;
const BackCourse = styled.button`
    position:absolute;
    width: 150px;
    height: 50px;
    background-color:#cd0d0d ;
    font-size:20px;
    margin-left:85%;
    font-weight:lighter;
    border-radius:15px;
    border: white;
    `;

const Checkout = styled.button`
    position:absolute;
    width: 150px;
    height: 50px;
    font-size:30px;
    background:#800606;
    right: 10px;
    font-weight: lighter;
    color:white;
    margin-top:10px;
    border: white;
    border-radius: 10px;

`;
const Button = styled.button`
display:flex;
position:absolute;
right: 32px;
width: 32px;
height: 32px;
border-radius: 20px;
background: #ff0000;
border:white;
`

const Cart = () => {
  //const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cart").then(res => res.json()).then(
        (result) => {
          setCart(result);
        } 
      )
  }, [])
  const total = cart.reduce((acc, item) => acc + item.Course_price, 0);
  function handleClisk(course){
    //console.log(course)
    const raw = JSON.stringify({
      "CourseID":course.Course_cartID,
    })
    const requireOptions ={
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: raw
    }
    fetch("http://localhost:5000/delcart",requireOptions)
    .then(response => response)
    .then(data =>{
      window.location.reload(false)
    })
  }
  function ToPayment(cart){
    //console.log(course)
    //console.log(cart)
    // const raw = JSON.stringify(cart);
    // const requireOptions ={
    //   method:'POST',
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: raw
    // }
    // console.log(raw)
    // fetch("http://localhost:5000/Checkout",requireOptions)
    // .then(response => response)
    // .then(data =>{})
  
    axios.post("http://localhost:5000/Checkout", cart)
  }
  //console.log(cart)
  return (
    
    <>
    <Header/>
    <div >
      <img style={{width:'500px', marginTop:'30px',marginBottom:'30px',marginLeft: '500px'}} src="https://i.ibb.co/vP1dNKh/308711052-643704037474887-3470553486386520573-n.jpg" alt="carttitlebox"/>
    </div>
    <Container className="Cartbigbox">
      <Wrapper className="cartbox">
        <Title style={{color:'white'}}>ตะกร้าของฉัน</Title>
        <BackCourse>
            <Link style={{textDecoration: 'none',color:'white'}} to="/course">ซื้อคอร์สเพิ่ม</Link>
        </BackCourse>
      </Wrapper>
      <Wrapper className="paymentbox">
        <div className="totalsold">
          สรุปยอดชำระ {total} บาท
        </div>
        <Checkout onClick={()=>ToPayment(cart)}>
          <Link style={{textDecoration: 'none',color:'white'}} to="/Payment">ชำระเงิน</Link>
        </Checkout>
      </Wrapper>
      <Wrapper>
      {
        cart.map((cart) => (
          <Product className="buybox">
            <Image src={cart.image} />
            <ProductDetail>
              <Details>
                <ProductCart>
                  <b>Course ID:</b> {cart.Course_cartID}
                  <p></p>
                  <b>Course Name:</b> {cart.Course_name}
                  <p></p>
                  <b>Course Detail</b> {cart.Course_detail}
                  <Button onClick={()=>handleClisk(cart)} >
                   <a class="close"></a> 
                </Button>
                </ProductCart>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductPrice> {cart.Course_price} บาท</ProductPrice>
            </PriceDetail>
          </Product> 
        ))}
        </Wrapper>
        
    </Container>
        
    </>
  );
};

export default Cart;
