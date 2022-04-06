import React, {useState} from "react";
import imgPokeball from '../img/NavBar/image-pokeball.png'
import imgPikachuLogo from "../img/NavBar/pikachu-run.jpg"
import { Header } from "../style-components/styles-NavBar/navbar";
import { Pokeball } from "../style-components/styles-NavBar/navbar";
import { PikachuLogo } from "../style-components/styles-NavBar/navbar";
import { Form } from "../style-components/styles-NavBar/navbar";
import { Input } from "../style-components/styles-NavBar/navbar";
import { Button } from "../style-components/styles-NavBar/navbar";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions";


export default function NavBar(){

    const [input, setInput] = useState({name: ""});
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        setInput({name:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getPokemonByName(input.name))
        setInput({name: ""})
    }



    return(
        <Header>
        
           <Pokeball src={imgPokeball} alt="Loge de pokebola"/>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Input type={"text"} name="buscadorPokemon" value={input.name} onChange={(e)=>handleChange(e)}></Input>
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