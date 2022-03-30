const fetch = require('node-fetch');
const router = require('express').Router();
const Pokemon = require('../models/Pokemon.js')

const url = 'https://pokeapi.co/api/v2/pokemon/'

router.get('/pokemons',async (req,res)=>{
    const {name} = req.query    
    if(!name){
    
    try {
        let urlNext = url
        let urlPokemons = [] // direcciones de los 40 pokemones
        while(urlPokemons.length < 40){
        const responseApi = await fetch(urlNext)
        const apiJson = await responseApi.json()
        apiJson.results.map((p)=>{
            urlPokemons.push(p.url)
        })
        urlNext = apiJson.next // se pasa a los siguientes 20 pokemones
        }

        const allPokemons = await Promise.all(//Se utiliza Promise all para resolver las promesas que devuelve el map de manera paralela
            urlPokemons.map(async(pokemon)=>{
                const response2Api = await fetch(pokemon)
                const pokemonJson = await response2Api.json()
                const {id,name} = pokemonJson
                const {front_default} = pokemonJson.sprites.other.dream_world
                const typeName = []
                pokemonJson.types.map((t)=>{
                    typeName.push(t.type.name)
                })

                const pokemonDetails = {
                    id,
                    name,
                    img: front_default,
                    typeName
                }
                return pokemonDetails
            })
        )
        return res.json(allPokemons)
        
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
    try {
        const responseApi = await fetch(`${url}${name}`)
        const pokemonJson = await responseApi.json()
        const {id,name:namePokemon} = pokemonJson
        const {front_default:img} = pokemonJson.sprites.other.dream_world
        const typeName = []
                pokemonJson.types.map((t)=>{
                    typeName.push(t.type.name)
                })
        return res.json({id,namePokemon,img,typeName})        

    } catch (error) {
        console.log(error)
        return res.json({msg:"El pokemon ingresado no existe"})
    }
})

router.get('/pokemons/:idPokemon',async (req,res)=>{
   const {idPokemon} = req.params
   //preguntar a la bd si tiene pokemones
   try {
       const responseApi = await fetch(`${url}${idPokemon}`)
       const pokemonJson = await responseApi.json()
       const {id,height,weight} = pokemonJson 
       const statistics = {id,height,weight}
       pokemonJson.stats.map((s)=>{
           if(s.stat.name === 'hp' ||s.stat.name === 'attack' || s.stat.name === 'defense' || s.stat.name === 'speed' )
           statistics[s.stat.name] = s.base_stat
       })
       return res.json(statistics)

   } catch (error) {
       console.log(error)
       return res.send(error)
   }
})

router.post('/pokemons',(req,res)=>{
    const {datosFormulario} = req.body
})



module.exports = router;

