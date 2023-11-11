const express=require('express')
const router=express.Router()
const Publicaciones=require('../models/publicaciones')



router.get('',async (req,res)=>{
   
try{

    const data= await Publicaciones.find({})
    res.render('index',{data})
}catch(error){

}


})


router.get('/acercade', (req,res)=>{
    res.render('about')
})






router.post('/buscar',async (req,res)=>{
    // let palabraBuscada=req.body.search
    //SETEAR
    let palabraBuscada="-    nueva noticia"
    let nadaRaro=palabraBuscada.replace(/[^a-zA-Z0-9]/, "")//{0,}
    console.log(nadaRaro)


    try{
        const respuesta= await Publicaciones.find({
           $or:[{titulo:{$regex:new RegExp(nadaRaro,'i')}},
                {texto:{$regex:new RegExp(nadaRaro,'i')}}
            ]
        })
        console.log(respuesta)
        res.render("partials/buscador",respuesta)
    }catch(error){
        console.log(error)
    }


})



// function agregarDatos(){
//     Publicaciones.insertMany([
//         {
//             titulo:'titulo 1',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 2',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 3',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 4',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 5',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 6',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 7',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
//         {
//             titulo:'titulo 8',
//             texto:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni nam ducimus amet ex cum? Et quasiat neque minima sunt libero beatae voluptas aperiam laudantium! Ab dolores beatae illum deleniti Reprehenderit, eum. Corporis, delectus id, voluptatibus, voluptatum iste cum veniam ipsum at quidem sit obcaecati doloremque dolorum assumenda rerum a iusto tenetur accusantium explicabo? Unde est commodi reiciendis voluptas eos.'
//         },
    
    
//     ])
// }

// agregarDatos()

module.exports=router