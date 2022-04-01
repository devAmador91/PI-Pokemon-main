import './App.css';
import {Route} from "react-router-dom";
import React from 'react';

import NavBar from './src/components/NavBar.jsx';
import LandingPage from './src/components/LandingPage.jsx'
import Pokemons from './src/components/Pokemons.jsx';
import PokemonDetails from './src/components/PokemonDetails';
import CreatePokemon from './src/components/CreatePokemon.jsx';


//<NavBar/> <--- va a renderizarse en todas las paginas menos en la landing page
function App() {
  return (
    <React.Fragment>
      <Route exact path="/" render={()=><LandingPage/>}/>
      <Route path="/pokemons" render={()=><Pokemons/>}/>
      <Route path="/pokemonDetails" render={()=><PokemonDetails/>}/>
      <Route path="/createPokemon" render={()=><CreatePokemon/>}/>
      
    </React.Fragment>
  );
}

export default App;
