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
import { ContainerHeader } from "../style-components/styles-NavBar/navbar";
import { Error } from "../style-components/style-CreatPokemon/container";
import { validate } from "./FunctionNavBar/validateInput";
import { Link, useHistory } from "react-router-dom";

export default function NavBar(){

    const [input, setInput] = useState({name: ""});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e)=>{
        setInput({name:e.target.value})
        setErrors(validate(input))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await dispatch(getPokemonByName(input.name))
        dispatch(getPokemonByName("setear"))
        setInput({name: ""})
        history.push("/pokemons")
    }

    return(
        <ContainerHeader>
            <Header>
        
                <Link to={"/pokemons"}><Pokeball src={imgPokeball} alt="Loge de pokebola"/></Link>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Input type={"search"} name="buscadorPokemon" value={input.name} onChange={(e)=>handleChange(e)}></Input>
                    {Object.keys(errors).length === 0 && <Button type={"submit"} value="Buscar"></Button>}
                    <br/>
                    {errors.name && <Error>{errors.name}</Error>}
                    
                </Form>
            
                <PikachuLogo src={imgPikachuLogo} alt="logo de pikachu" />

            </Header>
           
        </ContainerHeader>
    )
}
