import React, { useEffect, useState, useRef } from "react";
import { getPokemons } from "../actions";
import { connect } from "react-redux";
import Pokemon from "./Pokemon";
import { ContainerImg } from "../style-components/styles-Pokemons/containerImg";
import { Button } from "../style-components/styles-Pokemons/butonNext-Prev";
import { Container } from "../style-components/styles-Pokemons/container";
import { ContainerButton } from "../style-components/styles-Pokemons/containerButton";
import loading from '../img/Pokemons/loading.gif'
import { ImgLoading } from "../style-components/styles-Pokemons/imgLoading";
import { useHistory } from "react-router-dom";

function Pokemons({ getAllPokemons, allPokemons, PokemonByName }) { //renderizar al pokemon encontrado
  const [pokemons, setPokemons] = useState([]); // primeros 12 pokemons en un arreglo de arreglos
  const [npage, setPage] = useState({ //guarda el numero de las paginas a renderizar
      numPage : 0,
      nextPage: 0
  });
  let copiaDePokemons = useRef();
  let history = useHistory();
  
  useEffect(() => {
    console.log("UseEffect Obtener Pokemons de la BD")
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(()=>{
    copiaDePokemons.current = allPokemons && allPokemons.map((p)=>p)
  },[allPokemons])

  useEffect(() =>{
    console.log("UseEffect NavBar Busqueda Nombre")

    PokemonByName.length && !PokemonByName[0].hasOwnProperty("error") && setPokemons((p)=>[PokemonByName])
    //Erro de loop -->>>
    PokemonByName.length && PokemonByName[0].hasOwnProperty("error") && history.push("/notfound")

  },[PokemonByName,history])

  useEffect(() => {
    console.log("UseEffect Push de a 12 Pokemons")
    let page = [];
 
    if(!pokemons.length){//Para retornar a la pagina home
      copiaDePokemons.current = allPokemons && allPokemons.map((p)=>p)
    }
    if(pokemons.length < 5){//control de las renderizaciones por dependencias
    for (let i = 0; i < 12; i++) {// [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
        (copiaDePokemons.current && copiaDePokemons.current.length) && page.push(copiaDePokemons.current.shift())
    }
    
    page.length && setPokemons(p=>[...p,page]);
  }
    //Paginacion:
    if(npage.nextPage > npage.numPage){ // cambia a la siguiente pagina
        setPage({...npage, numPage: npage.numPage + 1})
    }else if(npage.nextPage < npage.numPage){ // cambia hacia atras
        setPage({...npage, numPage: npage.numPage - 1})
    }
  }, [allPokemons, npage,pokemons]); 

  console.log(pokemons)

  return (
    <Container>
      <ContainerImg>
        {/*Actualizacion Error al buscar por nombre desde paginas que no sea la cero*/}
          {/*si hay 12 utiliza numPage si hay uno decuelve el cero (busqueda por nombre en otras paginas se resuelve*/}
            {pokemons.length ? pokemons[pokemons[0].length === 1 ? 0 : npage.numPage].map((p) => { 
                  return (
                   
                    <Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />
                    
                  );
                })
              : <ImgLoading src={loading} alt="imagen de loading"></ImgLoading>} 
              
          
       </ContainerImg>
       <ContainerButton>
      {(pokemons.length && pokemons[0].length === 1) && <Button onClick={()=>setPokemons([])}>Home</Button>}   
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage > 0 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage - 1})}>Atras</Button>}
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage < 3 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage + 1})}>Siguiente</Button>} 
      
      </ContainerButton>   
      </Container>
  );
}

const mapStateToProps = (state) => ({
  allPokemons: state.allPokemonsApi[0],
  PokemonByName: state.foundPokemonByName
});

function mapDispatchToProps(dispatch) {
  return {
    getAllPokemons: () => dispatch(getPokemons()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
