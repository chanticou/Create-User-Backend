
let pokemons;

fetch('/pokemons').then(result=>result.json()).then(json=>{
    pokemons = json.payload;
    let container = document.getElementById('pokemons-container')
    pokemons.forEach(pokemon=>{
        let card= document.createElement('div')
        card.setAttribute('class', 'pokemon-card')
        let name= document.createElement('p')
        name.setAttribute('class', 'pokemon-text')
        name.innerHTML = pokemon.name
        let type = document.createElement('p')
        type.setAttribute('class', 'type-text')
        type.innnerHTML = pokemon.type
        let power = document.createElement('p')
        power.setAttribute('class','power-text')
        power.innerHTML = pokemon.power
        let img = document.createElement('img')
        img.src = pokemon.thumbnail
        card.append(name)
        card.append(type)
        card.append(power)
        card.append(img)
        container.append(card)
    })
})


    
let form =document.getElementById('pokemonForm')

const handleSubmit=(evt, form, route)=>{
    evt.preventDefault()
    let formData = new FormData(form)

    fetch(route,{
        method:"POST",
        body:formData,
        "Accept": "application/json"
    }).then(res=>res.json()).then(json=>console.log(json))
    form.reset()
}

form.addEventListener('submit',(e)=>handleSubmit(e, e.target, '/pokemons'))



// //HANDLEBARS
//   //vamos a compilar un codigo html=> el codigo que le pases.
// const template=Handlebars.compile(`<ul>
// <li>{{nombre}}</li>
// <li>{{apellido}}</li>
// <li>{{email}}</li>
// <li>{{telefono}}</li>
// </ul>`)


// const html = template({
//     nombre:"Chantal",
//     apellido:"Coutenceau",
//     edad:30,
//     email:"chanticou@gmail.com",
//     telefono:"1545672645"
// })


// document.getElementById('data').innerHTML=html