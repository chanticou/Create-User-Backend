const express= require('express')
const router = express.Router()
const pokemonsManager = require('../Managers/pokemon')
const uploader = require('../services/upload')


const pokemonObject = new pokemonsManager()

router.post('/',  uploader.single('file') ,(req,res)=>{
    let pokemon = req.body
    //cuando creamos multer nos agrega un campo que es req.file
    let file = req.file
    if(!file) return res.status(500).send({error:"couldn't upload file"})
    //ahora le voy a apregar una propiedad al objeto de mis pokemons
    //le voy a asignar una ruta a mi imagen. 
    pokemon.thumbnail= req.protocol + '://' + req.hostname + ":8080/img/" + file.filename
    pokemonObject.createPokemon(pokemon).then(result=>res.send(result))
})

router.get('/',(req,res)=>{
    pokemonObject.getAllPokemons().then(result=>res.send(result))
})

router.get('/:name',(req,res)=>{
    const reqId= req.params.name
    pokemonObject.searchPokemon(reqId).then(result=>res.send(result))
})


// router.post('/:name',(req,res)=>{
//     let reqName = req.params.name
//     pokemonObject.updateUsers(reqName).then(result=>res.send(result))
// })

module.exports=router;