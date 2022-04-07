import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTypes } from "../actions";
import { createPokemon } from "../actions";

export default function CreatePokemon() {
    
    const [input, setInput] = useState({
        name: "",
        type: [],
        height: 0,
        weight: 0,
        hp: 0,
        defense: 0,
        attack: 0,
        speed: 0,
        img: ""
    })

    const dispatch = useDispatch()
    const allTypes = useSelector((state)=> state.allTypesOfPokemons)
    const pokemonCreated = useSelector((state)=> state.pokemonsCreatedbyUser)
    const history = useHistory();

    useEffect(()=>{
        dispatch(getAllTypes())
    },[dispatch])
    
    const handleChange = (e) => {
        let event = e.target.value //convierto al tipo requerido por la BD
        if(e.target.name !== "name" && e.target.name !== "type" && e.target.name !== "img"){
            event = parseInt(e.target.value,10);
        }
        setInput({
            ...input,
            [e.target.name]: event
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPokemon(input))
        setInput((i)=>{return{...i,name: "",type:[],height:0,weight:0,hp:0,defense:0,attack:0,speed:0,img:""}})
    }

    const addType = (e)=>{//busco si el tipo ya existe y si no agrego uno
        if(!input.type.includes(e.target.value)){
            setInput((i)=>{return{...i,type:[...i.type,e.target.value]}})
        }
    }

    const deleteType = (e)=>{
       setInput((i)=>{return{...i,type:i.type.filter((nameType)=> nameType !== e.target.innerText)}})
    }
    console.log(pokemonCreated) //se crea al pokemon sin tomar en cuenta el tipo de este
    return (
        <React.Fragment>
            <h1>Crea tu Pokemon</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>

                <label>Name: </label>
                <input type={"text"} name="name" value={input.name} onChange={(e)=>handleChange(e)}></input>

                <br />

                <label>Type: </label>
                <select name="select" onChange={(e)=>addType(e)}>
                    {allTypes.length && allTypes.map((t)=><option key={t.name} value={t.name}>{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</option>)}
                </select>

                <br />

                <label>Height: </label>
                <input type="range" name="height" min="1" max="100" step="1" value={input.height} onChange={(e) => handleChange(e)}></input>
                <label>{input.height}</label>

                <br />

                <label>Weight: </label>
                <input type="range" name="weight" min="1" max="100" step="1" value={input.weight} onChange={(e) => handleChange(e)}></input>
                <label>{input.weight}</label>

                <br />

                <label>Hp: </label>
                <input type="range" name="hp" min="1" max="100" step="1" value={input.hp} onChange={(e) => handleChange(e)}></input>
                <label>{input.hp}</label>

                <br />    

                <label>Defense: </label>
                <input type="range" name="defense" min="1" max="100" step="1" value={input.defense} onChange={(e) => handleChange(e)}></input>
                <label>{input.defense}</label>

                <br />

                <label>Attack: </label>
                <input type="range" name="attack" min="1" max="100" step="1" value={input.attack} onChange={(e) => handleChange(e)}></input>
                <label>{input.attack}</label>

                <br />

                <label>Speed: </label>
                <input type="range" name="speed" min="1" max="100" step="1" value={input.speed} onChange={(e) => handleChange(e)}></input>
                <label>{input.speed}</label>

                <br />

                <label>Picture: </label>
                <input type={"text"} name="img" value={input.img} onChange={(e)=>handleChange(e)}></input>
                <input type={"submit"} value="Crear Pokemón"/>

            </form>
            {input.type.length ? input.type.map((t)=><button key={t} onClick={(e)=>deleteType(e)}>{t}</button>) : null}

            <br />
            <button onClick={()=>history.push("/pokemons")}>Home</button>
        </React.Fragment>

    )
}