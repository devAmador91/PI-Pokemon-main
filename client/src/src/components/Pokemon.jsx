import React from "react";
import { NavLink } from "react-router-dom";
import { StylePokemon } from "../style-components/style-Pokemon/pokemon";
import { ImgPokemon } from "../style-components/style-Pokemon/pokemon";
import { P } from "../style-components/style-Pokemon/pokemon";
import { Li } from "../style-components/style-Pokemon/pokemon";


export default function Pokemon({id,name,img,type}){

    return (
        
         <StylePokemon>
            <NavLink to={`/pokemonDetail/${id}`}><ImgPokemon src={img} alt="pokemon"></ImgPokemon></NavLink> 
            <div>
            <P>{name.replace(name.charAt(0),name.charAt(0).toUpperCase())}</P>
             <ul>
                 {
                 type ? type.map((t)=><Li key={t}>{t}</Li>): null
                 }
             </ul>
            </div>
         </StylePokemon>
        
        
    )
}