const initialState = {
  pokemonsCreatedbyUser: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_All_POKEMONS":
      return {
        ...state,
        pokemonsCreatedbyUser: [...state.pokemonsCreatedbyUser, action.payload],
      };
    case "CREATE_POKEMON":
      return {
        ...state,
        pokemonsCreatedbyUser: [...state.pokemonsCreatedbyUser, action.payload],
      };

    default:
      return { ...state };
  }
}
