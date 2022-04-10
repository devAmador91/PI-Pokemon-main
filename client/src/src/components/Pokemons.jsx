import React, { useEffect, useState, useRef } from "react";
import { getAllTypes, getPokemons } from "../actions";
import { connect } from "react-redux";
import Pokemon from "./Pokemon";
import { ContainerImg } from "../style-components/styles-Pokemons/containerImg";
import { Button } from "../style-components/styles-Pokemons/butonNext-Prev";
import { Container } from "../style-components/styles-Pokemons/container";
import { ContainerButton } from "../style-components/styles-Pokemons/containerButton";
import loading from '../img/Pokemons/loading-3.webp'
import { ImgLoading } from "../style-components/styles-Pokemons/imgLoading";
import { useHistory } from "react-router-dom";
import { ContainerOptions } from "../style-components/styles-Pokemons/containerOptions";
import { ContainerInput } from "../style-components/styles-Pokemons/containerOptions";
import { Label } from "../style-components/styles-Pokemons/containerOptions";
import { filterType } from "./FunctionsPokemons/functionsFilters";
import { filterPokemonCreatedByUser } from "./FunctionsPokemons/functionsFilters";
import { orderAlphabetically } from "./FunctionsPokemons/functionsFilters";
import { orderReverse } from "./FunctionsPokemons/functionsFilters";
import { orderByForceAsc } from "./FunctionsPokemons/functionsFilters";
import { orderByForceDes } from "./FunctionsPokemons/functionsFilters";
import { paginationNext } from "./FunctionsPokemons/functionPagination";
import { paginationPrev } from "./FunctionsPokemons/functionPagination";
import { Link } from "../style-components/styles-Pokemons/containerOptions";
import { P } from "../style-components/styles-Pokemons/containerOptions";




function Pokemons({ getAllPokemons,getTypes, allPokemons, PokemonByName,allTypes}) { //renderizar al pokemon encontrado
  const [pokemons, setPokemons] = useState([]); // primeros 12 pokemons en un arreglo de arreglos
  const [npage, setPage] = useState({ //guarda el numero de las paginas a renderizar
      numPage : 0
  });
  let copiaDePokemons = useRef();//permite hacer una copia de todos los pokemons para utilizarlo con shift
  let homeReturn = useRef();//permite retornar al home seteando el numPage
  let buttonBackFilterType = useRef();//permite aparecer el boton atras cuando se filtran pokemones por tipo
  let buttonBackFilterCreated = useRef();// permite aparecer el boton de atras cuando se filtra por creacion deusuario
  let history = useHistory();
 
  useEffect(()=>{
    console.log("UseEffect Seteo de variables useRef")
    homeReturn.current = false;
    buttonBackFilterType.current = false;
    buttonBackFilterCreated.current = false;
  },[])

  useEffect(() => {
    console.log("UseEffect Obtener Pokemons y Types de la API")
    getAllPokemons();
    getTypes();
  }, [getAllPokemons,getTypes]);

  useEffect(() =>{
    console.log("UseEffect NavBar Busqueda Nombre")
    PokemonByName.data && PokemonByName.data.hasOwnProperty("error") && history.push("/notfound")
    PokemonByName.data && setPokemons((p)=>[[PokemonByName.data]])
  },[PokemonByName,history])

  useEffect(()=>{
    console.log("Carga Pokemons, y el Return al Home")
    if(!pokemons.length){//Para cargar todos los pokemons de vuelta cuando se aprieta el boton atras(se carga el que sigue en la posicion del array)
      copiaDePokemons.current = allPokemons && allPokemons.map((p)=>p)

        if(homeReturn.current){//evita el loop de renderizados cuando se retorna al home
          homeReturn.current = false;
          buttonBackFilterType.current = false;
          setPage({...npage,numPage:0}) //setea el paginado a cero
         }

        if(buttonBackFilterCreated.current){
          buttonBackFilterCreated.current = false;
        }

    }
  },[pokemons,npage,allPokemons])

  useEffect(() => {
    console.log("UseEffect Push de a 12 Pokemons por Pagina")
    console.log(copiaDePokemons)
    let page = [];
    if(pokemons.length < 5){//control de las renderizaciones por dependencias (solo 4 paginas)
     
    for (let i = 0; i < 12; i++) {// [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
        (copiaDePokemons.current && copiaDePokemons.current.length) && page.push(copiaDePokemons.current.shift())
    }
    page.length && setPokemons(p=>[...p,page]);
 console.log(pokemons)
  } 
  }, [allPokemons, pokemons]); 
  
  return (
    <Container>

      {npage.numPage < 1 && <ContainerOptions>{/*solo carga las opciones en el home */}
           <ContainerInput>
                <select name="select" onChange={(e)=>{buttonBackFilterType.current = true; filterType(e,setPokemons,allPokemons)}}>
                    {allTypes.length && allTypes.map((t)=><option key={t.name} value={t.name} >{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</option>)}
                </select>
           </ContainerInput>

           <ContainerInput>
                <input type="radio" name="showPokemons" value={"showAllPokemons"} id="showAll" defaultChecked onClick={()=>{homeReturn.current = true;setPokemons([])}}></input><Label >All Pokemons</Label><br/> 
                <input type="radio" name="showPokemons" value={"showPokemonsCreatedByUser"} onClick={()=>{buttonBackFilterCreated.current = true;filterPokemonCreatedByUser(allPokemons,setPokemons)}}></input><Label >Pokemon by User</Label>
           </ContainerInput>

           <Link to={"/createPokemon"}><P>Create your Pokemon</P></Link>

           <ContainerInput>
                <input type="radio" name="showOrder" value={"showOrderAlfabetic"} onClick={()=>{orderAlphabetically(allPokemons,setPokemons)}}></input><Label >Order A-Z</Label> <br/>
                <input type="radio" name="showOrder" value={"showOrderReverse"} onClick={()=>{orderReverse(allPokemons,setPokemons)}}></input><Label >Order Z-A</Label>
           </ContainerInput>

           <ContainerInput>
           <input type="radio" name="showOrderForce" value={"orderforce"} onClick={()=>{orderByForceAsc(allPokemons,setPokemons)}}></input><Label >Order by force Asc</Label><br/>
           <input type="radio" name="showOrderForce" value={"orderforce"} onClick={()=>{orderByForceDes(allPokemons,setPokemons)}}></input><Label >Order by force Des</Label>
           </ContainerInput>


      </ContainerOptions>}

      <ContainerImg>
          {/*si hay 12 utiliza numPage si hay uno devuelve el cero (busqueda por nombre en otras paginas se resuelve*/}
            {pokemons.length ? pokemons[pokemons[0].length === 1 ? 0 : npage.numPage].map((p) => { 
                  return (
                   
                    <Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />
                    
                  );
                })
              : <ImgLoading src={loading} alt="imagen de loading"></ImgLoading>} 
              
          
       </ContainerImg>

       <ContainerButton>
         {/*cuando se busca por nombre ,aparece el boton atras*/}
      {(pokemons.length && pokemons[0].length === 1) && <Button onClick={()=>{
        //desmarca el boton radio de Pokemon created by user caundo se retorna a la pagina home en caso de ser 1
        document.querySelector('input[type=radio][name=showPokemons]:checked').checked = false;
        document.querySelector('input[id=showAll][type=radio][name=showPokemons]').checked = true;
        homeReturn.current = true;
        setPokemons([])}}>Atras</Button>
        } 
        {/*cuando se busca por createdByUser ,aparece el boton atras*/}
      {/*desmarca el boton radio de Pokemon created by user caundo se retorna a la pagina home en caso de ser > 1*/}
      {(pokemons.length && pokemons[0].length > -1) && buttonBackFilterCreated.current && <Button onClick={()=>{
        document.querySelector('input[type=radio][name=showPokemons]:checked').checked = false;
        document.querySelector('input[id=showAll][type=radio][name=showPokemons]').checked = true;
        homeReturn.current = true;
        setPokemons([])}}>Atras</Button>}
      {/*Cuando se pasa a la paguina siguiente aparece el boton atras */}
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage > 0 && <Button onClick={()=> paginationPrev(npage,setPage)}>Atras</Button>}
      {/*boton siguiente */}    
      {(pokemons.length && pokemons[0].length > 1) && (npage.numPage < 3 && !buttonBackFilterType.current) && !buttonBackFilterCreated.current && <Button onClick={()=> paginationNext(npage,setPage)}>Siguiente</Button>} 
      {/*cuando se busca pot type aparece el boton atras */}
      {(pokemons.length && pokemons[0].length > -1) && buttonBackFilterType.current &&  <Button onClick={()=>{
        homeReturn.current = true;
        setPokemons([])}}>Atras</Button>}
      </ContainerButton>   
      </Container>
  );
}

const mapStateToProps = (state) => ({
  allPokemons: state.allPokemonsApi[0],
  PokemonByName: state.foundPokemonByName,
  allTypes: state.allTypesOfPokemons
});

function mapDispatchToProps(dispatch) {
  return {
    getAllPokemons: () => dispatch(getPokemons()),
    getTypes: () => dispatch(getAllTypes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
