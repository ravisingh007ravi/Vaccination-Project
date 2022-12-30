const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const route = require('./route/routes.js');
const app=express();
const port = process.env.PORT || 3000;
const url ="mongodb+srv://Pratham_Panchariya:shree79766@cluster0.yd3rrae.mongodb.net/Project-5";
mongoose.set('strictQuery', true);

app.use(multer().any())
app.use(express.json());

mongoose.connect(url)
.then(() => console.log("Mongoose is Connected"))
.catch((err) => console.log(err));

app.use('/',route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));