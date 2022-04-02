import React from "react";
import imgPokeball from '../img/NavBar/image-pokeball.png'
import imgPikachuLogo from "../img/NavBar/pikachu-run.jpg"
import { Header } from "../style-components/styles-NavBar/navbar";
import { Pokeball } from "../style-components/styles-NavBar/navbar";
import { PikachuLogo } from "../style-components/styles-NavBar/navbar";
import { Form } from "../style-components/styles-NavBar/navbar";
import { Input } from "../style-components/styles-NavBar/navbar";
import { Button } from "../style-components/styles-NavBar/navbar";
//Aqui pueden ir los enlaces con NavLink

export default function NavBar(){

    return(
        <Header>
        
            <Pokeball src={imgPokeball} alt="Loge de pokebola"/>
            <Form>
                <Input type={"text"} name="buscadorPokemon"></Input>
                <Button type={"submit"} value="Buscar"></Button>
            </Form>
            
            <PikachuLogo src={imgPikachuLogo} alt="logo de pikachu" />
        
        </Header>
        
    )
}


/*
<nav>
                <NavLink>Home</NavLink>
                <NavLink>Crear Pokemon</NavLink>
            </nav>
*/