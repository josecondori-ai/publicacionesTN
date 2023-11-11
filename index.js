const express = require('express');
const expressLayout = require('express-ejs-layouts');
// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const { default: mongoose } = require('mongoose');
require ('dotenv').config()

const connectDB= require('./server/config/connectDB')

const app= express()

const PORT=process.env.PORT || 5000

connectDB()

//midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//diseño layout
app.use(express.static('public'))

app.use(expressLayout)
app.set('layout','./disenio/main')
// app.set('main')
app.set('view engine','ejs')

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))


app.listen(PORT,()=>{
    console.log('servidor funcionando')
})


//llamada a uan funcion 

//metodo .nombreningles()