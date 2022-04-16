const router = require("express").Router();
const {getPokemonBd,getPokemonApi,pokemonsApiBd,getPokemonBdId,getPokemonApiId,getPokemonBdQuery,getPokemonApiQuery} = require("./functionsPokemons/functionsGetPokemons");
const {validationData,validationApi,createPokemon,addTypePokemon} = require("./functionsPokemons/functionPostPokemon");



router.get("/pokemons", async (req, res) => {
  const { name:namePokemonQuery } = req.query;
  
      //if there are pokemons in the database, get all
      const pokemonBd = await getPokemonBd(res);

      //if don't get a name for the body
      if (!namePokemonQuery) {
      
      //get all pokemons of api
      const pokemonApi = await getPokemonApi(res);
      // if there are pokemons in the database, join pokemons in one variable and send
      if(pokemonBd.length){
        const allPokemons = await pokemonsApiBd(pokemonBd,pokemonApi);
        return res.json(allPokemons);
      }
        return res.json(pokemonApi);
    }
      //if get a name for the body
      //search pokemon in the DB and send if exist
      if (pokemonBd.length) {
        foundPokemonBd = getPokemonBdQuery(pokemonBd,namePokemonQuery)
        if(foundPokemonBd){
          return foundPokemonBd
        }
        }
        //set state
      if(namePokemonQuery === "setear"){
        return res.send({data:0})
      }
      //search pokemon in the api and send if exist
      const pokemon = await getPokemonApiQuery(res,namePokemonQuery)
      return res.json(pokemon);

});




router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  //preguntar a la bd si tiene pokemones
  const pokemonBd = await getPokemonBdId(idPokemon);
  if(pokemonBd){
    return res.send(pokemonBd)
  }
  //preguntar en la api si hay pokemones
  const pokemonApi = await getPokemonApiId(idPokemon,res);
  return res.send(pokemonApi)
  
});



router.post("/pokemons", async (req, res) => {
  const { name,type, height, weight, hp, attack, defense, speed, img } = req.body;
  //Validaciones de tipos de datos:
  validationData( name,type, height, weight, hp, attack, defense, speed, img, res); 
  //Validaciones de existencia en api
  validationApi(name,res);
  //Buscar el nombre ingresado en la bd y si no existe crearlo
  const {pokemonCreated,create } = await createPokemon(name, height, weight, hp, attack, defense, speed, img);
   //agrega un tipo de pokemon al pokemon desde la Bd
  await addTypePokemon(pokemonCreated,type);
    
    if (create) {
      return res.send({
        msg: "El pokemon fue creado con exito",
        pokemonCreated,
      });
    }
    res.status(400).send({
      msg: "El nombre del pokemon ingresado ya existe en la base de datos",
      error: 400
    });
 
  
});

module.exports = router;
