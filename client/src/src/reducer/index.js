const initialState = {
  allPokemonsApi: [],
  foundPokemonByName:{data:undefined},
  foundPokemonById: {},
  allTypesOfPokemons: [],
  pokemonsCreatedbyUser: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      return {
        ...state,
        allPokemonsApi: [action.payload]
      };

    case "GET_POKEMON_BY_NAME":
      return {
        ...state,//Setear el estado una vez encontrado un pokemon
        foundPokemonByName:action.payload.hasOwnProperty("data")  ?
        {...state.foundPokemonByName,data:undefined} :
        {...state.foundPokemonByName,data:action.payload}
      };

      case "GET_POKEMON_BY_ID":
        return{
          ...state,
          foundPokemonById: action.payload
        }

    case "GET_ALL_TYPES":
      return {
        ...state,
        allTypesOfPokemons: action.payload,
      };

    case "CREATE_POKEMON":
      return {
        ...state,
        pokemonsCreatedbyUser: [action.payload],
      };

    default:
      return { ...state };
  }
}
