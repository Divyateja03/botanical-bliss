const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./serviceAccountKey3.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
var express = require('express')  
var app = express()  
app.use(express.static('login'));
app.get('/loginpage', function (req, res) {  
    res.sendFile( __dirname + "/login/" + "index.html" );
    })  
 
app.get('/signuppage', function (req, res) {  
      res.sendFile( __dirname + "/login/" + "signup.html" );
    })
app.get('/signupsubmit', function (req, res) {  
  console.log(req);
  db.collection('loginData').add({
    name:req.query.name,
    email:req.query.email,
    password:req.query.password
}).then(() =>{
  res.send("<h1>Signup successfull</h1>")
})
  })
  app.get('/loginsubmit', function (req, res) {  
  console.log(req.query.email)
    db.collection('loginData').where("email","==",req.query.email).where("password","==",req.query.password).get().then((docs) => {
      console.log(docs.size)
      if(docs.size>=1){
        res.sendFile(__dirname + "/login/" + "home.html");
      }
      else{
        res.send("<h1>please signup first</h1>")
      }
    })
    })
app.listen(5000, function () {  
console.log('Server is running on http://localhost:5000');
});
