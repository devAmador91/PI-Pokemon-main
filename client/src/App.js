import {Route} from "react-router-dom";
import React from 'react';
import NavBar from './src/components/NavBar.jsx';
import LandingPage from './src/components/LandingPage.jsx'
import Pokemons from './src/components/Pokemons.jsx';
import PokemonDetails from './src/components/PokemonDetails';
import CreatePokemon from './src/components/CreatePokemon.jsx';
import NotFound from './src/components/NotFound';
import Footer from './src/components/Footer.jsx'
import About from "./src/components/About.jsx";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" render={()=><LandingPage/>}/>
      <Route path="/" render={()=><NavBar/>}></Route>
      <Route path="/pokemons" render={()=><Pokemons/>}/>
      <Route path="/pokemonDetail/:id" render={()=><PokemonDetails/>}/>
      <Route path="/createPokemon" render={()=><CreatePokemon/>}/>
      <Route path="/notFound" render={()=><NotFound/>}/>
      <Route path="/about" render={()=><About/>}></Route>
      <Route path="/" render={()=><Footer/>}></Route>
    </React.Fragment>
  );
}

export default App;
