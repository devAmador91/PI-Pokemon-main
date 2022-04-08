import React from "react";
import { BackGround } from "../style-components/styles-LandingPage/background";
import { Pokeball } from "../style-components/styles-LandingPage/enter-component";
import pokeballImg from '../img/Landing-Page/gpokeImg-3.gif'
import { NavLink } from "react-router-dom";
import { PokemonGlobalCss } from "../style-components/styles-LandingPage/enter-component";
import { StyledText } from "../style-components/styles-LandingPage/enter-component";

export default function LandingPage(){

    return (
        <React.Fragment>
           
            <BackGround>
            <PokemonGlobalCss/>
            <NavLink to="/pokemons"><Pokeball src={pokeballImg}></Pokeball></NavLink>
            <br></br>
            <StyledText to="/pokemons"><h3>Start</h3></StyledText>
            </BackGround>
            
        </React.Fragment>
        
    )
}