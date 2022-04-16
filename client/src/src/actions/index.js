import dotenv from 'dotenv';
dotenv.config();

const urlBack = process.env.REACT_APP_API;
const urlLocal = "http://localhost:3001/"

export function getPokemons() {
    return function(dispatch) {
      return fetch(`${urlBack || urlLocal}pokemons/`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_ALL_POKEMONS", payload: json });
        });
    };
  }

  export const  getPokemonByName =(name)=>{
    return async(dispatch)=>{
      const response = await fetch(`${urlBack || urlLocal}pokemons?name=${name}`);
      const pokemonJson = await response.json();
      return dispatch({type: "GET_POKEMON_BY_NAME", payload: pokemonJson})
    }
  }

  export const  getPokemonById =(id)=>{
    return async(dispatch)=>{
      const response = await fetch(`${urlBack || urlLocal}pokemons/${id}`);
      const pokemonJson = await response.json();
      return dispatch({type: "GET_POKEMON_BY_ID", payload: pokemonJson})
    }
  }

  export function getAllTypes() {
    return function(dispatch) {
      return fetch(`${urlBack || urlLocal}types`)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "GET_ALL_TYPES", payload: json });
        });
    };
  }

  
  export const createPokemon = (input)=>{
    return async(dispatch)=>{
        const response = await fetch(`${urlBack || urlLocal}pokemons`,
        {method: 'POST',body:JSON.stringify(input),headers: { 'Content-Type': 'application/json' }})
      const pokemonCreatedJson = await response.json();
      return dispatch({type: "CREATE_POKEMON", payload: pokemonCreatedJson})
    }
  }

