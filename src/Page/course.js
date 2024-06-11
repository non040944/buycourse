import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect} from 'react';
import Header from "../components/Header"
import { useDispatch } from "react-redux"
import styled from 'styled-components';
import Axios from 'axios';
import Popup from 'reactjs-popup';
//import "./popup.css"
import { Link } from 'react-router-dom';
import "./course.css"
const Button = styled.button`
display:flex;
position:absolute;
height:30px;
width: 70px;
border-radius: 20px;
background: #800608;
border:white;
`

function Course() {
// const inputElement = document.querySelector('input[type="text"]');
// const inputValue = inputElement.value;

//   const the_button = document.querySelector(".js-btn")
// const modal = document.querySelector(".modal")
// const closeBtn = document.querySelector(".close")
  const dispatch = useDispatch();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/course").then(res => res.json()).then(
        (result) => {
          setCourse(result);
        } 
      )
  }, [])
  const [incart, setIncart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/cart").then(res => res.json()).then(
        (result) => {
          setIncart(result);
        } 
      )
  }, [])
  function searchcourse(){
    const inputElement = document.querySelector('input[type="text"]');
    const inputValue = inputElement.value;
    //console.log(inputValue);
    const raw = JSON.stringify({
     "Subject":inputValue
      
    })
    const requireOptions ={
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: raw
    }
    console.log(raw)
    fetch("http://localhost:5000/searchcourse",requireOptions)
    .then(response => response)
   }
  function handleClisk(course){
    const dupicate=0
    console.log(incart)
    for(let i=0;i<incart.length;i++){
      if(course.CourseID==incart[i].Course_cartID){
        dupicate+=1;
      }
    }
    if(dupicate!=0){
      console.log("5555555555555555555")
    }
    else{
    // console.log(course)
    // modal.style.display = "block";
    // closeBtn.addEventListener("click", () => {
    //   modal.style.display = "none"
    // })
    const raw = JSON.stringify({
      "CourseID":course.CourseID,
      "Course_price":course.Course_price,
      "Course_detail":course.Course_detail,
      "Course_name":course.Course_name,
      "image":course.image
      
    })
    const requireOptions ={
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: raw
    }
    fetch("http://localhost:5000/createcart",requireOptions)
    .then(response => response)
    }   
  }
  return (
    <div>
      <Header/>
      <form >
      <label className='searchfill'>Enter subject:
        <input type="text" />
      </label>
      <button className='searchbutton' onClick={searchcourse}>ค้นหา
       <Link to ='/SearchedCourse'></Link>
        </button> 
    </form>

      <Container className='courseouttitle'>
      <h1>Course</h1>
      <Row>
      {course.map(course => (
         <Col xs ={12} sm={4} key={course.CourseID}>
          <Card style={{ width: '100%' ,marginBottom:'10%',paddingBottom:'20px'}}>
              <Card.Img variant="top" src={course.image} />
              <Card.Body>
                <Card.Title >รหัสคอร์ส {course.CourseID}</Card.Title>
                <Card.Text>
                  {course.Course_name}
                <Card.Text>
                  ราคา {course.Course_price} บาท
                </Card.Text>
                </Card.Text> 
                <Button  onClick={()=>handleClisk(course)}>
                  <Link style={{textDecoration: 'none',color:'white'}} to ='/Cart'>ซื้อคอร์ส</Link>
                </Button>
              </Card.Body>
            </Card>
            <div>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
              </div>
         </Col>
      ))}
      
      </Row>
    </Container>
    </div>
  );
}


export default Course;
