import React from "react"
import { Img } from "../style-components/styles-NotFound/Img"
import imgPokeballVoid from '../img/NotFound/img-pokeball-void.png'
import { Background } from "../style-components/styles-NotFound/Img"
import { H1 } from "../style-components/styles-NotFound/Img"
import { ImgText } from "../style-components/styles-NotFound/Img"
import { Button } from "../style-components/styles-NotFound/Img"
import { useHistory } from "react-router-dom"
import { ContainerButton } from "../style-components/styles-NotFound/Img"

export default function NotFound(){

    const history = useHistory()
console.log("hola")
        return (
            <Background>

                <ImgText>
                    <Img src={imgPokeballVoid}></Img>
                    <H1>Pokemon no encontrado</H1>
                </ImgText>
                <ContainerButton>
                <Button onClick={()=>history.push("/pokemons")}>Home</Button>
                </ContainerButton>
                
            </Background>
        )
    }