const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const MG_DB = 'mongodb://0.0.0.0/Quation?readPreference=primaryPreferred'
const cors = require('cors')
const port = 5000
const routes = require('./routes')
const URL = 'http://localhost:3000'

app.use(cors({
    origin : URL,
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(MG_DB)
const db = mongoose.connection
 db.once('open' , ()=>{
     console.log('connect mongoDB')
 })
 
 db.on('error',(error)=>{
     console.log(error)
 })

app.use('/api',routes)
app.listen(port, ()=>{
    console.log(`connect to http://localhost:${port}`)
})
