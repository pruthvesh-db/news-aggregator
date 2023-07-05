const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const mongoose = require('mongoose');
// const userRoutes = require('./Routes/user_routes');
const {signUp, signIn} = require('./Controllers/authControllers');
const authTokenVerify = require('./middlewear/JWTauth');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({extended:false}));
routes.use(bodyParser.json());


const PORT = 3000;

routes.post('/register', signUp);
// routes.use('/tasks', userRoutes);

routes.post("/signin", authTokenVerify, signIn, (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
        message: "INVALID JWT TOKEN",
      });
    } else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message,
      });
    }
    res.status(200);
    res.send(user);
  });
 
try{
    mongoose.connect("mongodb://127.0.0.1:27017/userDatabase", {
        // useUnifiedtopology: true,
        // newUrlParser: true
    });
    console.log('Database Connected');
}catch(err) {
    console.log('Error while connecting to database');
}

app.listen(PORT, (err) => {
    if(!err){
        console.log("server is started");
    } else {
        console.log("Error occured");
    }
});