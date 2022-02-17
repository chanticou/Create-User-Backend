const fs = require('fs')


const pathPokemons = __dirname + '/../files/pokemons'

class pokemonsManager{

    createPokemon= async (pokemon)=>{
        // if(!pokemon.name | !pokemon.type) return {status:'Missing data'}
        
        try{
            if(fs.existsSync(pathPokemons)){
                let data = await fs.promises.readFile(pathPokemons, 'utf-8' ,null, 3)
                let pokemons = JSON.parse(data)
                let id= pokemons[pokemons.length-1].id +1
                pokemon.id=id
                pokemons.push(pokemon)

         
                await fs.promises.writeFile(pathPokemons, JSON.stringify(pokemons, null, 3))
                return {status:'success', message:'New pokemon created',payload:pokemons}
            }else{
                pokemon.id=1
                await fs.promises.writeFile(pathPokemons, JSON.stringify([pokemon], null, 3))
                return{status:'Succes', message:'First Pokemon created'}
            }

        }catch(error){
            return {status:'error', message:error }
        }
    }

    searchPokemon=async(name)=>{
            try{                
                if(fs.existsSync(pathPokemons)){
                    let data = await fs.promises.readFile(pathPokemons, 'utf-8' ,null, 3)
                    let pokemons = JSON.parse(data)

                    let findPokemon = pokemons.find(el=>(el.name=== name))
                    return {status:'success', message:findPokemon}
                }
            }catch(error){
                return {status:'error', message:error }
            }
    }

    updateUsers=async(name, updatePokemon)=>{
        try{
            if(fs.existsSync(pathPokemons)){
                let data = await fs.promises.readFile(pathPokemons, 'utf-8' ,null, 3)
                let pokemons = JSON.parse(data)

                let newArrayUpdate= pokemons.map((pokemon)=>{
                    if(pokemon.name === name){
                        return updatePokemon
                    }else{
                        return pokemon
                    }
                })

                await fs.promises.writeFile(pathPokemons, JSON.stringify(newArrayUpdate, null, 3))
                return {status:'Succes', message:'update Pokemon' }
            }

        }catch(error){
            return {status:'error', message:error}
        }
    }

    getAllPokemons=async()=>{
        if(fs.existsSync(pathPokemons)){
            try{
                let data = await fs.promises.readFile(pathPokemons, 'utf-8' ,null, 3)
                let pokemons = JSON.parse(data)
                
                return{status:'Succes, get all Pokmemons', payload:pokemons}

            }catch(error){
                return{status:error, message:error}
            }
        }else{
            return{status: 'Theres no pokemons', payload: [] }
        }
    }

  
}


module.exports=pokemonsManager