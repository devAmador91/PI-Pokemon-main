import React from "react";
import { NavLink } from "react-router-dom";


export default function Pokemon({id,name,img,type}){
    console.log(id,name,img,type)

    return (
        <React.Fragment>
         <div>
            <NavLink to={`/pokemonDetail/${id}`}><img src={img} alt="pokemon"></img></NavLink> 
             <p>{name}</p>
             <ul>
                 <li>{type}</li>
             </ul>
         </div>
        </React.Fragment>
        
    )
}