const fetch = require('node-fetch');
const router = require('express').Router();

const url = 'https://pokeapi.co/api/v2/pokemon/'

router.get('/pokemons',async (req,res)=>{
    const {name} = req.query    
    
    try {
        const responseApi = await fetch(url)
        const apiJson = await responseApi.json()
        const urlPokemons = apiJson.results.map((p)=>p.url)
        const allPokemons = await Promise.all(
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
        res.json(allPokemons)
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/pokemons/:idPokemon',(req,res)=>{
    res.json({prueba:"Hola id"})
})

router.post('/pokemons',(req,res)=>{
    const {datosFormulario} = req.body
})



module.exports = router;

