const express = require('express')
const pokemonRoutes = require('./routes/Pokemon')
const fs = require('fs')
const app = express()
//esto es para usar losmiddleware
app.use(express.urlencoded({extended:true}))

app.use(express.json())

//quiero que esta carpeta public sea estatica, (que carpeta quiero que vea el usuario)
app.use(express.static(__dirname + '/public'))

app.use('/pokemons', pokemonRoutes)


const PORT=8080

const server= app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})

// ((primer parametro es que extencion voy a crear  o utilizar))
// filepáth=> la ruta dodne voy a leer mi archivo
// El app.engine, te va a decir que va a procesar archivos con esta extencion(en ese caso 'cte')
//le vas a pasar la ruta del archivo que quieres leer, el objeto con el q vas a reemplazar el archivo y un callback de resolucion(no nos compete...)
//leo el archivo en la ruta q le haya pasado si no lo leyo error si si hace el reemplazo del stryng pertinente
app.engine('cte',(filepath, objectToReplace, callback)=>{
    fs.readFile(filepath,(err,content)=>{
        if(err) return callback(new Error(err))
        //si si leyo bien mi archivo
        //le digo todo lo que contenfga tu archivo lo vamos a convertir a un stryng (con content lo que contenga)
        const template =  content.toString()
        //aca le voy a decir como quiero que me reemplace las cosas .. si asi {{}}, si asi <! como mas me plazca
        //al fin y al cabo es un motor de plantilla... esta es la parte que le digo que formato quiero
        .replace("^^title$$", '', objectToReplace.title)
        .replace("^^message$$", '', objectToReplace.message)
        return callback(null,template)
    })

})


//va a decirme ne que ruta voy a enocntrar mi carpeta de views
app.set('views','./views')
//este es que extencion o motor estas utilizando, 
app.set('view engine', 'cte')



//ahora vamos a utilizar un neuvo metodo para pintar una vista para el cliente
//1 parametro que vista voy a aplicar, nombre del archivo
//2 argumento, objeto
app.get('/',(req,res)=>{
    res.render('bienvenida',{
        title:'Mi primer plantilla propia',
        message:'Hola mi primer platilla'
    })
})
