const fetch = require("node-fetch");
const { conn } = require("../../db");
const { Pokemon,Type } = conn.models;
const url = "https://pokeapi.co/api/v2/pokemon/";

const validationData = (name,type, height, weight, hp, attack, defense, speed, img, res)=>{
    if (name && type && height && weight && hp && attack && defense && speed && img) {
      if (typeof(name,img) !== "string") {
        return res
          .status(400)
          .send(
            {
               msg: "El tipo de dato de name o de img no es valido!!!" ,
               error: 400
              });
      }
  
      if(!Array.isArray(type)){
        return res
          .status(400)
          .send(
            {
               msg: "El tipo de dato de name no es valido!!!" ,
               error: 400
              });
      }
  
      if (typeof(height, weight, hp, attack, defense, speed) !== "number") {
        return res.status(400).send(
          {
          msg: "El tipo de dato de alguno de estos valores (height, weight, hp, attack, defense, speed) no es valido!!!",
          error: 400
          }
        );
      }
    } else {
      return res
        .status(400)
        .send(
          {
             msg: "Alguno de los datos enviados es nulo",
             error:400
          }
             );
    }
  }
  
  const validationApi = async(name,res)=>{
    try {
      const responseApi = await fetch(`${url}${name}`);
      const pokemonJson = await responseApi.json();
      if (pokemonJson) {
        return res.status(400).send(
          { 
            msg: "El nombre del pokemon ingresado ya existe" ,
            error:400
          });
      }
    } catch (error) {
      console.log("El nombre del pokemon no existe en la api");
    }
  }
  
  const createPokemon = async(name, height, weight, hp, attack, defense, speed, img)=>{
    try {
      const [pokemonCreated, create] = await Pokemon.findOrCreate({
        where: {
          name
        },
        defaults: {
          //id,
          name,
          hp,
          attack,
          defense,
          speed,
          weight,
          height,
          img
        },
      });
      return {pokemonCreated,create}
  } catch (error) {
    console.error(error);
    res.send(error);
  }
  }
  
  const addTypePokemon = async(pokemon,type)=>{
    let typePokemons = await Type.findAll({//Busca el tipo traido por query en la tabla de tipos
      where:{
        name:type
      }
    })
    pokemon.addType(typePokemons)//agrega el tipo al pokemon
  }

  module.exports = {
    validationData,
    validationApi,
    createPokemon,
    addTypePokemon
  }