const mongoose = require('mongoose')
const connectDB= async ()=>{
    try{
        // mongoose.set('strictQuery',false)
     const respuesta=await  mongoose.connect(process.env.MONGO_URL)
    console.log('se conecto la base de datos') 
    }
    catch(error){
        console.log(error)
    }
    

}

module.exports=connectDB
//const ==> constante ==> siempre el mismo valor 
//let ==>

//dentro o que se llama scope