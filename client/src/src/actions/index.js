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

  /*
  export const getTypes2 = ()=>{
      return  async (dispatch)=>{
          const response = await fetch(urlTypes)
          const typesJson = await response.json()
          return dispatch({type: "GET_ALL_TYPES",payload: typesJson})
      }
  }
  */