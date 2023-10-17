const mongoose = require('mongoose')
const colors = require('colors')
const mongodbconnect = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to Mongodb database: ${conn.connection.host}`.bgMagenta.white)
    }
    catch(err){
        console.log(`Error connecting to Mongodb ${err}`.bgRed.white)
    }
}

module.exports = mongodbconnect;