const express=require('express')
const router=express.Router()
const Publicaciones=require('../models/publicaciones')
const User=require('../models/usuario')
const jwt =require ('jsonwebtoken')
const bcrypt= require('bcrypt')
require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET

//chequear
//middleware


function autorizoMiddle(req,res,next){
    
    console.log(req.cookie)
    const token=req.cookies.token;
console.log(token)
    if(!token){
        return res.status(401).json({message:'no esta autorizado'})
    }

    try{
        const decodificar=jwt.verify(token,jwtSecret)
        req.userId=decodificar.userId
        next()
        
    }catch(error){
        console.log(error)
        return res.status(401).json({message:'no esta autorizado'})

    }
}



//los metodos GET
router.get('/editar-publi/:id',async(req,res)=>{

    try{
        const data=await Publicaciones.findOne({_id:req.params.id})// buscame en nombre donde este pedro
        res.render('admin/editar-publi',{data})
    }catch(error){

    }



})

// router.get('/editar-publi',(req,res)=>{
//     res.render('admin/agregarPublicacion')
// })

router.get('/login',(req,res)=>{
res.render('admin/index')
})


router.get('/dashboard',async(req,res)=>{

try{
    const data=await Publicaciones.find({})
    res.render('admin/dashboard',{data})
}catch(error){
    console.log(error)
}

    })
//los metodos POST
router.post('/agregar-publi',async(req,res)=>{
    const {titulo,texto}= req.body
    try{
        console.log(titulo,texto)
        const resultado=await Publicaciones.create({titulo,texto}) 
        console.log('se envio los datos')
    }catch(error){
        console.log(error)
    }
    

})

router.post('/registrar',async(req,res)=>{
//   const usuario=req.body.usuario
//   const password=req.body.password

const {usuario,password}=req.body
console.log(usuario)
const contraseñaCifrada=await bcrypt.hash(password,10)

try{
     const datos=await User.create({usuario:usuario, password:contraseñaCifrada })
        res.status(201).json({mensaje:'usuario registrado',datos})
}catch(error){
    if(error.code===11000){
        res.status(409).json({mensaje:'usuario YA ESTA registrado',})

    }
    res.status(500).json({mensaje:'error interno del servidor',})


}
   
})

router.post('/login',async(req,res)=>{
    //   const usuario=req.body.usuario
    //   const password=req.body.password
    
    const {usuario,password}=req.body
    console.log(usuario)
    // const contraseñaCifrada=await bcrypt.hash(password,10)
    
    try{
         const datos=await User.findOne({usuario })
        console.log(datos)
        
        if(!datos){
            return res.status(401).json({mensaje:'credenciales invalidas'})
         }
           const passwordValido=await bcrypt.compare(password,datos.password)

           if(!passwordValido){
            return res.status(401).json({mensaje:'credenciales invalidas'})

           }
           console.log('hola')

           const token=jwt.sign({userId:datos._id},jwtSecret)
           console.log(token)
           res.cookie('token',token,{httpOnly:true})
           //validaciones
           res.redirect('/dashboard')

            // res.status(201).json({mensaje:'usuario registrado',datos})
    }catch(error){
        if(error.code===11000){
            res.status(409).json({mensaje:'usuario YA ESTA registrado',})
    
        }
        res.status(500).json({mensaje:'error interno del servidor',})
    
    
    }
       
    })


    router.put('/editar-publi/:pepe',async(req,res)=>{
        const id=req.params.pepe
        console.log('funciono')
        try{
                await Publicaciones.findOneAndUpdate(id,{
                    titulo:req.body.titulo,
                    texto:req.body.texto,
                    fechaActualizacion:Date.now()
                })
                res.redirect(`/editar-post/${req.params.id}`)
        }
        catch(error){

        }
    })

module.exports=router