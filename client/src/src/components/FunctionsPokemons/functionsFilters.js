 export const filterType = (e,setPokemons,allPokemons)=>{
    let pokemonTypes = []
    allPokemons.forEach((p)=>{
    p.typeName.find((t)=>t=== e.target.value) && pokemonTypes.push(p);
    })
    setPokemons([pokemonTypes])
  }

  export const filterPokemonCreatedByUser = (allPokemons,setPokemons)=>{
    let pokemonByUser = []
    allPokemons.forEach((p)=>{
    typeof(p.id) === "string" && pokemonByUser.push(p);
    })
    setPokemons([pokemonByUser])
  }

  export const orderAlphabetically = (allPokemons,setPokemons,copyPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.name < y.name){return -1;}
      if (x.name > y.name){return 1;}
      return 0;
  }
    setPokemons(structure(sortArray,allPokemons,copyPokemons))
  }

  export const orderReverse = (allPokemons,setPokemons,copyPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.name > y.name){
        return -1;
      }
      if (x.name < y.name){
        return 1;
      }
      return 0;
  }
  setPokemons(structure(sortArray,allPokemons,copyPokemons))
  }

  export const orderByForceAsc = (allPokemons,setPokemons,copyPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.hp < y.hp){
        return -1;
      }
      if (x.hp > y.hp){
        return 1;
      }
      return 0;
  }
  setPokemons(structure(sortArray,allPokemons,copyPokemons))
  }
  
  export  const orderByForceDes = (allPokemons,setPokemons,copyPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.hp > y.hp){
        return -1;
      }
      if (x.hp < y.hp){
        return 1;
      }
      return 0;
  }
  setPokemons(structure(sortArray,allPokemons,copyPokemons))
  }


  const structure = (sortArray,allPokemons,copyPokemons)=>{
    copyPokemons.current = allPokemons.map((p)=>p)

    const createPages = (pokemonOrdened)=>{
      let page = [];
      for (let i = 0; i < 12; i++) {// [[],[],[],[]] 
        pokemonOrdened && pokemonOrdened.length && page.push(pokemonOrdened.shift())//error faltan pokemons
      }
      return page
    }

    let pokemonOrdened = []
    let pokemon = []
    pokemonOrdened = copyPokemons.current.sort(sortArray)
    for(let i = 0; i < 4; i++){
      pokemon = [...pokemon,createPages(pokemonOrdened)]
    }
        return pokemon
  }