import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTypes } from "../actions";
import { createPokemon } from "../actions";
import { Container } from "../style-components/style-CreatPokemon/container";
import { Border } from "../style-components/style-CreatPokemon/container";
import { H1 } from "../style-components/style-CreatPokemon/container";
import { ContainerButton } from "../style-components/style-CreatPokemon/container";
import { Button } from "../style-components/style-CreatPokemon/container";
import { DeleteButton } from "../style-components/style-CreatPokemon/container";
import { Label } from "../style-components/style-CreatPokemon/container";
import { LabelNum } from "../style-components/style-CreatPokemon/container";
import { ContainerInput } from "../style-components/style-CreatPokemon/container";
import { Hp } from "../style-components/style-CreatPokemon/container";
import { ButtonCreate } from "../style-components/style-CreatPokemon/container";
import { P } from "../style-components/style-CreatPokemon/container";
import { validate } from "./FunctionCreatePokemon/ValidationForm";
import { Error } from "../style-components/style-CreatPokemon/container";

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
    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch()
    const allTypes = useSelector((state)=> state.allTypesOfPokemons)
    const pokemonCreated = useSelector((state)=> state.pokemonsCreatedbyUser)
    const history = useHistory();
    //const copyPokemonCreated = useRef();

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
        setErrors(validate({...input,[e.target.name]: event}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPokemon(input))
        setInput((i)=>{return{...i,name: "",type:[],height:0,weight:0,hp:0,defense:0,attack:0,speed:0,img:""}})
    }

    const addType = (e)=>{//busco si el tipo ya existe y si no agrego uno
        if(!input.type.includes(e.target.value)){
            setInput((i)=>{return{...i,type:[...i.type,e.target.value]}})
            setErrors(validate({...input,type: e.target.value}))
        }
    }

    const deleteType = (e)=>{
       setInput((i)=>{return{...i,type:i.type.filter((nameType)=> nameType !== e.target.innerText)}})
       setErrors(validate({...input,type: e.target.value}))
    }

    return (
        <Container>
            <Border>
            <H1>Create your Pokemon</H1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <ContainerInput>
                <Label>Name: </Label>
                <input type={"text"} name="name" value={input.name} onChange={(e)=>handleChange(e)}></input><br/>
                {errors.name && <Error>{errors.name}</Error>}
                </ContainerInput>

                <br />

                <ContainerInput>
                <Label>Type: </Label>
                <select name="select" onChange={(e)=>addType(e)}>
                    {allTypes.length && allTypes.map((t)=><option key={t.name} value={t.name}>{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</option>)}
                </select>
                <br/>
                {!input.type.length && errors.type && <Error>{errors.type}</Error>}
                </ContainerInput>
                {input.type.length ? input.type.map((t)=><DeleteButton key={t} onClick={(e)=>deleteType(e)}>{t}</DeleteButton>) : null}
                <br />

                <ContainerInput>
                <Label>Height: </Label>
                <input type="range" name="height" min="1" max="200" step="1" value={input.height} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.height}</LabelNum><br/>
                {errors && <Error>{errors.height}</Error>}
                </ContainerInput>

                <br />

                <ContainerInput>
                <Label>Weight: </Label>
                <input type="range" name="weight" min="1" max="200" step="1" value={input.weight} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.weight}</LabelNum><br/>
                {errors && <Error>{errors.weight}</Error>}
                </ContainerInput>    

                <br />

                <ContainerInput>
                <Hp>Hp: </Hp>
                <input type="range" name="hp" min="1" max="200" step="1" value={input.hp} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.hp}</LabelNum><br/>
                {errors && <Error>{errors.hp}</Error>}
                </ContainerInput>

                <br />    
                <ContainerInput>
                <Label>Defense: </Label>
                <input type="range" name="defense" min="1" max="200" step="1" value={input.defense} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.defense}</LabelNum><br/>
                {errors && <Error>{errors.defense}</Error>}
                </ContainerInput>

                <br />

                <ContainerInput>
                <Label>Attack: </Label>
                <input type="range" name="attack" min="1" max="200" step="1" value={input.attack} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.attack}</LabelNum><br/>
                {errors && <Error>{errors.attack}</Error>}
                </ContainerInput>

                <br />

                <ContainerInput>
                <Label>Speed: </Label>
                <input type="range" name="speed" min="1" max="200" step="1" value={input.speed} onChange={(e) => handleChange(e)}></input>
                <LabelNum>{input.speed}</LabelNum><br/>
                {errors && <Error>{errors.speed}</Error>}
                </ContainerInput>

                <br />
                <ContainerInput>    
                <Label>Picture: </Label>
                <input type={"text"} name="img" value={input.img} onChange={(e)=>handleChange(e)}></input>
                <br/>
                {errors.img && <Error>{errors.img}</Error>}

                {Object.keys(errors).length === 0 && <ButtonCreate id="buttonCreatePokemon" type={"submit"} value="Crear Pokemón"/>}
                {pokemonCreated.length && <P>{pokemonCreated[0].msg}</P>}
                </ContainerInput>
               

            </form>
           
            </Border>
            <ContainerButton>
            <Button onClick={()=>{history.push("/pokemons")}}>Home</Button>{/*No recarga al regresar al home, el pokemon creado */}
            </ContainerButton>
          
            
        </Container>

    )
}