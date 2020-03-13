const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
var mysql = require('mysql');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});

app.get('/', function (req, res) {
  return res.send({ error: true, message: 'hello' })
});
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'Business'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Defined add data
app.post('/addbusiness', function (req, res) {
  let person_name = req.body.person_name;
  let business_name = req.body.business_name;
  let business_gst_number = req.body.business_gst_number;

  con.query("INSERT INTO business SET ? ", { person_name: person_name, business_name: business_name, business_gst_number: business_gst_number }, function (error, results, fields) {
    
    
    
    setTimeout(() => {
      if (error) {
        return res.send({ error: true, data: results, message: 'Business added failed' });
  
  
      } else {
        return res.send({ error: false, data: results, message: 'Business in added successfully' });
  
      }
    }, 2000);
    
    
  });
});

// Defined get data(index or listing) 
app.get('/listbusiness', function (req, res) {
  con.query('SELECT * FROM business', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'List of all Business.' });
  });
});

//Defined get data by id
app.get('/edit/:id', function (req, res) {
  let id = req.params.id;
  con.query('SELECT * FROM business where id = ?',[id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Get data Successfully' });
  });
});
//  Defined update

app.put('/updatebusiness/:id', function (req, res) {

  let id = req.params.id;
  let person_name = req.body.person_name;
  let business_name = req.body.business_name;
  let business_gst_number = req.body.business_gst_number;
  con.query('UPDATE business SET person_name = ?,business_name = ?,business_gst_number = ? WHERE id = ?', [person_name, business_name, business_gst_number, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Update Complete' });
  });
});

//  Delete user
app.delete('/deletebusiness/:id', function (req, res) {
  debugger;
  let id = req.params.id;
  console.log(req.params);
  con.query('DELETE FROM business WHERE id = ?', [id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Successfully removed.' });
  });
});


