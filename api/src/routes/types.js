const router = require("express").Router();
const fetch = require("node-fetch");
const { conn } = require("../db");
const {Type} = conn.models;
const url = "https://pokeapi.co/api/v2/type"

router.get("/types",async(req, res) => { 
    //existen types en la bsse de datos?
    const allTypes = await Type.findAll({
        attributes:["name"]
    });
    try {
        if(!allTypes.length){
        //Hace la peticion de tipos a la API
        const response = await fetch(url)
        const json = await response.json()
        const tiposPokemon = json.results.map((t)=>t.name)
        

        //Ingresa los valores de la api a la BD
        for(let i = 0; i < tiposPokemon.length;i++){
            await Type.create({
                name:tiposPokemon[i]
            })
        }
        //Pide a la BD todos los tipos y los envia
        const allTypes = await Type.findAll({
            attributes:["name"]
        })
    }
        return res.send(allTypes)

    } catch (error) {
        res.sendFile(error)
    }

});

module.exports = router;







//Tratar se hacerlo con promesas:

/*
        let typesPokemons = fetch(url)
      .then((response) => response.json())
      .then((data) => {
          console.log("1")
        return data.results.map((t) => {
            console.log(t)
          return t.name;
        });
      });

     typesPokemons.then((t)=>{
        console.log("2")
        console.log(t)
        for(let i = 0; i < t.length;i++){
        console.log(t[i])
                Type.create({
                name:t[i]
            })
        }

        Type.findAll({
            attributes:["name"]
         })
         .then((allTypes)=>{
             console.log("3")
             console.log(allTypes)
            res.send(allTypes)})
     })

     */