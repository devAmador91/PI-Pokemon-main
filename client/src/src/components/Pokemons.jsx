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


function Pokemons({ getAllPokemons, allPokemons, PokemonByName}) { //renderizar al pokemon encontrado
  const [pokemons, setPokemons] = useState([]); // primeros 12 pokemons en un arreglo de arreglos
  const [npage, setPage] = useState({ //guarda el numero de las paginas a renderizar
      numPage : 0,
      nextPage: 0
  });
  let copiaDePokemons = useRef();
  let homeReturn = useRef()
  let history = useHistory();


//Opciones de mapeo ->>>>>
// const allTypes = useSelector((state)=>state.allTypesOfPokemons)

   /* useEffect(()=>{
        dispatch(getAllTypes())
    },[dispatch])*/



  console.log("allPokemon",allPokemons)
  console.log("pokemon",pokemons)
  useEffect(() => {
    console.log("UseEffect Obtener Pokemons de la API")
    homeReturn.current = false;
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() =>{
    console.log("UseEffect NavBar Busqueda Nombre")
    PokemonByName.data && PokemonByName.data.hasOwnProperty("error") && history.push("/notfound")
    PokemonByName.data && setPokemons((p)=>[[PokemonByName.data]])
  },[PokemonByName,history])

  useEffect(() => {
    console.log("UseEffect Push de a 12 Pokemons por Pagina")
    let page = [];
 
    if(!pokemons.length){//Para cargar todos los pokemons de vuelta cuando se aprieta el boton atras(se carga el que sigue en la posicion del array)
      copiaDePokemons.current = allPokemons && allPokemons.map((p)=>p)
      if(homeReturn.current){//evita el loop de renderizados cuando se retorna al home
      setPage({...npage,numPage:0})
      homeReturn.current =false
      }
    }
    if(pokemons.length < 5){//control de las renderizaciones por dependencias (solo 4 paginas)
    for (let i = 0; i < 12; i++) {// [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
        (copiaDePokemons.current && copiaDePokemons.current.length) && page.push(copiaDePokemons.current.shift())
    }
    page.length && setPokemons(p=>[...p,page]);
  } 
  }, [allPokemons, npage,pokemons]); //renderiza 55 veces por la dependencia de pokemon


  useEffect(()=>{
    console.log("Paginacion")
    if(npage.nextPage > npage.numPage){ // cambia a la siguiente pagina
      setPage({...npage, numPage: npage.numPage + 1})
  }else if(npage.nextPage < npage.numPage){ // cambia hacia atras
      setPage({...npage, numPage: npage.numPage - 1})
  }
  },[npage])

  return (
    <Container>
      {/* <ContainerOptions>
                <ContainerInput>
                <select name="select">
                    {allTypes.length && allTypes.map((t)=><option key={t.name} value={t.name}>{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</option>)}
                </select>
                </ContainerInput>
           </ContainerOptions>*/}
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
      {(pokemons.length && pokemons[0].length === 1) && <Button onClick={()=>{homeReturn.current = true;setPokemons([])}}>Atras</Button>} {/*cuando se busca por nombre ,aparece el boton atras*/}
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage > 0 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage - 1})}>Atras</Button>}
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage < 3 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage + 1})}>Siguiente</Button>} 
      
      </ContainerButton>   
      </Container>
  );
}

const mapStateToProps = (state) => ({
  allPokemons: state.allPokemonsApi[0],
  PokemonByName: state.foundPokemonByName,
});

function mapDispatchToProps(dispatch) {
  return {
    getAllPokemons: () => dispatch(getPokemons()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
