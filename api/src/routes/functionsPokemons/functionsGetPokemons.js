const fetch = require("node-fetch");
const { conn } = require("../../db");
const { Pokemon,Type } = conn.models;
const url = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonBd = async(res)=> {
  try {
  return await Pokemon.findAll({
    include:{//JOIN de Pokemon con Type
      model: Type,
      attributes: ["name"],
      through:{
        attributes: []
      }
    }
  });
} catch (error) {
  console.error(error);
  res.send(error);
}
}




const getPokemonApi = async(res)=> {
  try {
    let urlNext = url;
    let urlPokemons = []; // direcciones de los 40 pokemones
    while (urlPokemons.length < 40) {//limite establecido por el proyecto
      const responseApi = await fetch(urlNext);
      const apiJson = await responseApi.json();
      apiJson.results.map((p) => {
        urlPokemons.push(p.url);
      });
      urlNext = apiJson.next; // se pasa a los siguientes 20 pokemones
    }

    const allPokemons = await Promise.all(
      //Se utiliza Promise all para resolver las promesas que devuelve el map de manera paralela
      urlPokemons.map(async (pokemon) => {
        const responseApi = await fetch(pokemon);
        const pokemonJson = await responseApi.json();
        const { id, name } = pokemonJson;
        const { front_default } = pokemonJson.sprites.other.dream_world;
        const hp = pokemonJson.stats[0].base_stat
        const typeName = [];
        pokemonJson.types.map((t) => {
          typeName.push(t.type.name);
        });

        const pokemonDetails = {
          id,
          name,
          hp,
          img: front_default,
          typeName,
        };
        return pokemonDetails;
      })
    );
    
    //Se envian 40 pokemons
    return allPokemons;
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
}




const getPokemonApiQuery = async(res,namePokemonQuery)=>{
  
try {
  const responseApi = await fetch(`${url}${namePokemonQuery}`);
  const pokemonJson = await responseApi.json();
  const { id, name} = pokemonJson;
  const { front_default: img } = pokemonJson.sprites.other.dream_world;
  const typeName = [];
  pokemonJson.types.map((t) => {
    typeName.push(t.type.name);
  });
  return {id, name,img,typeName}
  
} catch (error) {
  console.log(error)
  res.status(404).json(
    {
     msg: "El pokemon ingresado no existe" ,
     error: 404
    });
}
  
}





const getPokemonBdQuery = (pokemonBd,nameQuery)=>{
  let pokemonFound = pokemonBd.find((p) => p.name === nameQuery);
  if(pokemonFound){
  const { id, name, img, types:typeName } = pokemonFound;
  return ({ id, name, img, typeName });
}
  return undefined;
}




const getPokemonBdId = async(idPokemon)=>{
  try {
    const pokemonBd = await Pokemon.findByPk(idPokemon)
    return pokemonBd
} catch (error) {
    console.log("El pokemon no existe en la base de datos")
}
}





const getPokemonApiId = async(idPokemon,res)=>{
  try {
    const responseApi = await fetch(`${url}${idPokemon}`);
    const pokemonJson = await responseApi.json();
    const { id, height, weight } = pokemonJson;
    const statistics = { id, height, weight };
    pokemonJson.stats.map((s) => {
      if (
        s.stat.name === "hp" ||
        s.stat.name === "attack" ||
        s.stat.name === "defense" ||
        s.stat.name === "speed"
      )
        statistics[s.stat.name] = s.base_stat; //agrega las propiedades traidas de la api en un objeto
    });
    return statistics
  } catch (error) {
    console.log(error);
    return res.status(404).send(
      {
        msg:"El id no existe en la api",
        error: 404
      });
  }
}





const pokemonsApiBd = (pokemonBd,pokemonApi)=>{
  
    //Si hay pokemons creados en la bd se integran con los de la api
    pokemonBd.map((p) => {
      const { id, name, img } = p;
      console.log(p)
      const typeName = p.Types.map((t)=>t.dataValues.name)
      const pokemonOfUser = {
        id,
        name,
        img,
        typeName,
      };
      pokemonApi.unshift(pokemonOfUser);
    });
    return pokemonApi
}



module.exports = {
    getPokemonBd,
    getPokemonApi,
    getPokemonApiQuery,
    getPokemonBdId,
    getPokemonApiId,
    pokemonsApiBd,
    getPokemonBdQuery
}