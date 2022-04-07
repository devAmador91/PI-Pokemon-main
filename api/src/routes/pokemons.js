const fetch = require("node-fetch");
const { conn } = require("../db");
const router = require("express").Router();
const { Pokemon } = conn.models; //importar del sequelize.models los modelos a utilizar

const url = "https://pokeapi.co/api/v2/pokemon/";

router.get("/pokemons", async (req, res) => {
  const { name:namePokemonQuery } = req.query;//no crear conflicto con el name

  try {
    const pokemonsCreatedByUser = await Pokemon.findAll(); //traemos todos los pokemos de la bd

    if (!namePokemonQuery) {
      //Enviamos todos los pokemones

      try {
        let urlNext = url;
        let urlPokemons = []; // direcciones de los 40 pokemones
        while (urlPokemons.length < 40) {
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
            const response2Api = await fetch(pokemon);
            const pokemonJson = await response2Api.json();
            const { id, name } = pokemonJson;
            const { front_default } = pokemonJson.sprites.other.dream_world;
            const typeName = [];
            pokemonJson.types.map((t) => {
              typeName.push(t.type.name);
            });

            const pokemonDetails = {
              id,
              name,
              img: front_default,
              typeName,
            };
            return pokemonDetails;
          })
        );
        if (pokemonsCreatedByUser.length) {
          //Si hay pokemons creados en la bd se envian tambien
          pokemonsCreatedByUser.map((p) => {
            const { id, name, img, type:typeName } = p;
            const pokemonOfUser = {
              id,
              name,
              img,
              typeName,
            };
            allPokemons.unshift(pokemonOfUser);
          });
        }

        return res.json(allPokemons);
      } catch (error) {
        console.error(error);
        return res.send(error);
      }
    }
    try {
      //si llega por query un nombre buscamos en la bd y en la api

      if (pokemonsCreatedByUser.length) {
        let pokemonFound = pokemonsCreatedByUser.find((p) => p.name === namePokemonQuery);
        if(pokemonFound){
        const { id, name, img, type:typeName } = pokemonFound;
        return res.json({ id, name, img, typeName });
        }
      }

      const responseApi = await fetch(`${url}${namePokemonQuery}`);
      const pokemonJson = await responseApi.json();
      const { id, name} = pokemonJson;
      const { front_default: img } = pokemonJson.sprites.other.dream_world;
      const typeName = [];
      pokemonJson.types.map((t) => {
        typeName.push(t.type.name);
      });
      return res.json({ id, name, img, typeName });
    } catch (error) {
      console.error(error);
      return res.status(404).json(
        {
         msg: "El pokemon ingresado no existe" ,
         error: 404
        });
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  //preguntar a la bd si tiene pokemones
  console.log(idPokemon)

  try {
      const pokemonsCreatedByUser = await Pokemon.findByPk(idPokemon)
      if(pokemonsCreatedByUser){
      return res.send(pokemonsCreatedByUser)
      }
  } catch (error) {
      console.log("El pokemon no existe en la base de datos")
  }

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
    return res.json(statistics);
  } catch (error) {
    console.log(error);
    return res.status(404).send(
      {
        msg:"El id no existe en la api",
        error: 404
      });
  }
});

router.post("/pokemons", async (req, res) => {
  const { name,type, height, weight, hp, attack, defense, speed, img } = req.body;
  //Validaciones de tipos de datos:

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

  //Validaciones de existencia en api y bd:

  // Buscar el nombre ingresado en la api para comprobar que no exista

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

  //Buscar el nombre ingresado en la bd y si no existe crearlo

  //Crear un id unico a partir del nombre

  id = new Buffer.from(name).toString("base64")
  

  try {
    const [valor, booleano] = await Pokemon.findOrCreate({
      where: {
        name
      },
      defaults: {
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        weight,
        height,
        img,
      },
    });

    if (booleano) {
      return res.send({
        msg: "El pokemon fue creado con exito",
        valor,
      });
    }
    res.status(400).send({
      msg: "El nombre del pokemon ingresado ya existe en la base de datos",
      error: 400
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
  
});

module.exports = router;
