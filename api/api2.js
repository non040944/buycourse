const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express()
var orderID = 1

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webuythebuaydb',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database = ', err);
  }
  console.log('MySQL successfully connected!');
})

app.post('/createcart', function (req, res) {
  //console.log(req.body);
  var course = req.body;
  var SID = "Stu0000001";
  var CID = course.CourseID;
  var cost = course.Course_price;
  var CNAME = course.Course_name;
  var DETAIL = course.Course_detail;
  var image=course.image;
  //insert ข้อมูลลงในฐานข้อมูล
  var query = "INSERT INTO cart (Student_cartID,Course_cartID,Course_name,Course_detail,Course_price,image) VALUES ?";
  var values = [[SID, CID, CNAME, DETAIL, cost, image]];
  connection.query(query, [values], function (err) {
    if (err) {
      throw err;
    } else {
      let body = {
        status: "success",
      }
      res.send(body)
      res.end()
    }
  })
})

app.post('/delcart', function (req, res) {
  //console.log(req.body)
  var courseID = req.body.CourseID;
  // delete the course from the cart table using the courseID
  var query = "DELETE FROM cart WHERE Course_cartID = ?";
  connection.query(query, [courseID], function (err) {
    if (err) {
      throw err;
    } else {
      let body = {
        status: "success",
      }
      res.send(body)
      res.end()
    }
  })
})
app.post('/Checkout', function(req, res) {
  var query2 ="DELETE FROM cart"
  connection.query(query2,function(err, result){})
  var cart = req.body;
  var SID = "Stu0000001";
  var OrderID = orderID;
  var Status = "waiting";
  var numQueries = cart.length;
  var numCompleted = 0;

  for (let i = 0; i < cart.length; i++) {
    var CID = cart[i].Course_cartID;
    var cost = cart[i].Course_price;
    var DETAIL = SID + " ซื้อ " + cart[i].Course_name;
    var DATE = new Date();
    var query = "INSERT INTO buycourse (Student_buyID, Course_buyID, OrderID, Buy_detail, Total_price, Buy_date, Buy_status, orderqr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [SID, CID, OrderID, DETAIL, cost, DATE, Status, null];
    connection.query(query, values, function(err, result) {
      numCompleted++;
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }

      if (numCompleted === numQueries) {
        res.status(200).send("Success");
      }
    });
  }

});
app.get('/course', (req, res) => {
  connection.query("SELECT * FROM course",
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
})
app.get('/searchcourse', (req, res) => {
  console.log(req.body.Subject)
  connection.query("SELECT *FROM Course WHERE Course_name LIKE ?",['%${req.body.Subject}%'],
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
})

app.get('/cart', function (req, res, next) {
  connection.query("SELECT * FROM cart",
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
})

app.get('/buycourse', function (req, res, next) {
  connection.query("SELECT * FROM buycourse ORDER BY OrderID",
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})
