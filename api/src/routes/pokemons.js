const fetch = require("node-fetch");
const { conn } = require("../db");
const router = require("express").Router();
const { Pokemon } = conn.models; //importar del sequelize.models los modelos a utilizar

const url = "https://pokeapi.co/api/v2/pokemon/";

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;

  try {
    const pokemonsCreatedByUser = await Pokemon.findAll(); //traemos todos los pokemos de la bd

    if (!name) {
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
            const { id, name, img, type } = p;
            const pokemonOfUser = {
              id,
              name,
              img,
              type,
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
        let pokemonFound = pokemonsCreatedByUser.find((p) => p.name === name);
        const { id, name, img, type } = pokemonFound;
        return res.json({ id, name, img, type });
      }
      const responseApi = await fetch(`${url}${name}`);
      const pokemonJson = await responseApi.json();
      const { id, name: namePokemon } = pokemonJson;
      const { front_default: img } = pokemonJson.sprites.other.dream_world;
      const typeName = [];
      pokemonJson.types.map((t) => {
        typeName.push(t.type.name);
      });
      return res.json({ id, namePokemon, img, typeName });
    } catch (error) {
      console.error(error);
      return res.json({ msg: "El pokemon ingresado no existe" });
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  //preguntar a la bd si tiene pokemones
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
        statistics[s.stat.name] = s.base_stat;
    });
    return res.json(statistics);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

router.post("/pokemons", async (req, res) => {
  const { name, height, weight, hp, attack, defense, speed, img } = req.body;

  //Validaciones de tipos de datos:

  if (name && height && weight && hp && attack && defense && speed && img) {
    if (typeof name !== "string") {
      return res.status(400).send({ msg: "El tipo de dato no es valido" });
    }

    if ((typeof height, weight, hp, attack, defense, speed !== "number")) {
      return res.status(400).send({ msg: "El tipo de dato no es valido" });
    }
  }

  //Validacion de imagen ****************************



  //Validaciones de existencia en api y bd:

  // Buscar el nombre ingresado en la api para comprobar que no exista

  try {
    const responseApi = await fetch(`${url}${name}`);
    const pokemonJson = await responseApi.json();
    if (pokemonJson) {
      return res.send({ msg: "El nombre del pokemon ingresado ya existe" });
    }
  } catch (error) {
    res.sendStatus(404);
  }

  //Buscar el nombre ingresado en la bd y si no existe crearlo

  try {
    const [valor, booleano] = await Pokemon.findOrCreate({
      where: {
        name
      },
      defaults: {
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
           valor 
        });
    }
    res.send({
      msg: "El nombre del pokemon ingresado ya existe en la base de datos",
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = router;
