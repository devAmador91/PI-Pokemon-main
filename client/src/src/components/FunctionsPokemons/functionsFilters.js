 export const filterType = (e,setPokemons,allPokemons)=>{
    let pokemonTypes = []
    allPokemons.forEach((p)=>{
    p.typeName.find((t)=>t=== e.target.value) && pokemonTypes.push(p);
    })
    setPokemons([pokemonTypes]) // crear funcion de estructura [[],[],[],[]]
    
  }

  export const filterPokemonCreatedByUser = (allPokemons,setPokemons)=>{
    let pokemonByUser = []
    allPokemons.forEach((p)=>{
    typeof(p.id) === "string" && pokemonByUser.push(p);
    })
    setPokemons([pokemonByUser])
  }

  export const orderAlphabetically = (allPokemons,setPokemons)=>{
    

    const sortArray = (x, y)=>{
      if (x.name < y.name){
        return -1;
      }
      if (x.name > y.name){
        return 1;
      }
      return 0;
  }
    setPokemons([allPokemons.sort(sortArray)])//error se cargan todos los pokemons, no 12
  }

  export const orderReverse = (allPokemons,setPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.name > y.name){
        return -1;
      }
      if (x.name < y.name){
        return 1;
      }
      return 0;
  }
  setPokemons([allPokemons.sort(sortArray)])//error se cargan todos los pokemons, no 12
  }

  export const orderByForceAsc = (allPokemons,setPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.hp < y.hp){
        return -1;
      }
      if (x.hp > y.hp){
        return 1;
      }
      return 0;
  }
  setPokemons([allPokemons.sort(sortArray)])
  }
  
  export  const orderByForceDes = (allPokemons,setPokemons)=>{
    const sortArray = (x, y)=>{
      if (x.hp > y.hp){
        return -1;
      }
      if (x.hp < y.hp){
        return 1;
      }
      return 0;
  }
  setPokemons([allPokemons.sort(sortArray)])
  }