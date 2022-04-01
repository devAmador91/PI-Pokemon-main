import React from "react";
import { BackGround } from "../style-components/styles-LandingPage/background";
import { Pokeball } from "../style-components/styles-LandingPage/enter-component";
import { StyledEnter } from "../style-components/styles-LandingPage/enter-component";
import pokeballImg from '../img/Landing-Page/pokeImg.gif'
export default function LandingPage(){

    return (
        <React.Fragment>
           
            <BackGround>
            <StyledEnter to="/pokemons"><Pokeball src={pokeballImg}></Pokeball></StyledEnter>
            </BackGround>
           
           
        </React.Fragment>
        
    )
}