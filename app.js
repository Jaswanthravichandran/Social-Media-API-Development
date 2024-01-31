const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const url = 'mongodb://localhost/SocialDb'

mongoose.connect(url,{useNewUrlParser:true});

const con = mongoose.connection;

con.on('open', (req,res) => {
    console.log("Database is Connected...");
});

app.use(express.json());

const User_Reg_route = require('./Routes/Users_Reg');
app.use('/user',User_Reg_route);


app.listen(9000, () => {
    console.log("Server is Running...");
});