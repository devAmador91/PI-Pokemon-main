import React from "react";
import { NavLink } from "react-router-dom";
import { StylePokemon } from "../style-components/style-Pokemon/pokemon";
import { ImgPokemon } from "../style-components/style-Pokemon/pokemon";
import { P } from "../style-components/style-Pokemon/pokemon";
import { Pa } from "../style-components/style-Pokemon/pokemon";
import { Ul } from "../style-components/style-Pokemon/pokemon";


export default function Pokemon({id,name,img,type}){
//se esta recibiendo namePokemon y typePokemon

    return (
        
         <StylePokemon>
            <NavLink to={{pathname:`/pokemonDetail/${id}`, state:{name,img,type}}} ><ImgPokemon src={img} alt="pokemon" ></ImgPokemon></NavLink> 
            <div>
            <P>{name.replace(name.charAt(0),name.charAt(0).toUpperCase())}</P>
             <Ul>
                 {
                 type ? type.map((t)=><Pa key={t}>{t}</Pa>): null
                 }
             </Ul>
            </div>
         </StylePokemon>
        
        
    )
}