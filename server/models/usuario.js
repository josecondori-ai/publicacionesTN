const  mongoose  = require('mongoose');

const Schema= mongoose.Schema
const UsuarioSchema=new Schema({
    usuario:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Usuario',UsuarioSchema)