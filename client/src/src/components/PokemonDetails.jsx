import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getPokemonById } from "../actions";

export default function PokemonDetails(){

    const {id} = useParams()
    const dispatch = useDispatch()
    const foundPokemonById = useSelector((state) => state.foundPokemonById)
    const location = useLocation();
    const {img,name,type} = location.state;


    useEffect(()=>{
        dispatch(getPokemonById(id))
    },[dispatch,id])

    console.log(foundPokemonById)

    return (
        <React.Fragment>
            <h1>Prueba de Pokemon Detail</h1>
        </React.Fragment>
        
    )
}