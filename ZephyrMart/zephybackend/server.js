const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const mongodbconnect = require('./config/db');
global.__basedir = __dirname
console.log(__basedir)
//configure
dotenv.config();

//database conection
mongodbconnect();

//PORT
const PORT = process.env.PORT || 8080;

//rest api
const app = express();

//middleware
app.use(cors())
app.use(express.json());

//api router
app.use('/api/v1/auth',require('./routers/authRoute'))
app.use('/api/v1/auth',require('./routers/categoryRoute'))
app.use('/api/v1/auth',require('./routers/productRoute'))
app.use('/api/v1/auth',require('./routers/fileRoute'))
app.use('/api/v1/auth',require('./routers/orderRoute'))
//app listening
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})