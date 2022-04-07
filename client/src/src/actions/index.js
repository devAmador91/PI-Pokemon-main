//Aqui es donde se hace la conexion del front con el backend

/*
export function createPokemon(payload){
    return {type: "GET_POKEMONS", payload: info}
}
*/

const urlPokemons = "http://localhost:3001/pokemons/"

export function getPokemons() {
    return function(dispatch) {
      return fetch(urlPokemons)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_ALL_POKEMONS", payload: json });
        });
    };
  }

  export const  getPokemonByName =(name)=>{
    return async(dispatch)=>{
      const response = await fetch(`http://localhost:3001/pokemons?name=${name}`);
      const pokemonJson = await response.json();
      return dispatch({type: "GET_POKEMON_BY_NAME", payload: pokemonJson})
    }
  }

  export const  getPokemonById =(id)=>{
    return async(dispatch)=>{
      const response = await fetch(`${urlPokemons}${id}`);
      const pokemonJson = await response.json();
      return dispatch({type: "GET_POKEMON_BY_ID", payload: pokemonJson})
    }
  }

  const urlTypes = "http://localhost:3001/types"

  export function getAllTypes() {
    return function(dispatch) {
      return fetch(urlTypes)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_ALL_TYPES", payload: json });
        });
    };
  }

  
  export const createPokemon = (input)=>{
    return async(dispatch)=>{
      const response = await fetch(urlPokemons,
        {method: 'POST',body:JSON.stringify(input),headers: { 'Content-Type': 'application/json' }})
      const pokemonCreatedJson = await response.json();
      return dispatch({type: "CREATE_POKEMON", payload: pokemonCreatedJson})
    }
  }

  /*
  export const getTypes2 = ()=>{
      return  async (dispatch)=>{
          const response = await fetch(urlTypes)
          const typesJson = await response.json()
          return dispatch({type: "GET_ALL_TYPES",payload: typesJson})
      }
  }
  */