const router = require('express').Router();


router.get('/pokemons',(req,res)=>{
    res.json({prueba:"Hola"})
})

router.get('/pokemons/:idPokemon',(req,res)=>{
    res.json({prueba:"Hola id"})
})

module.exports = router;

