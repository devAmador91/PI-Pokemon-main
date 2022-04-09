import React, { useEffect, useState, useRef } from "react";
import { getAllTypes, getPokemons } from "../actions";
import { connect } from "react-redux";
import Pokemon from "./Pokemon";
import { ContainerImg } from "../style-components/styles-Pokemons/containerImg";
import { Button } from "../style-components/styles-Pokemons/butonNext-Prev";
import { Container } from "../style-components/styles-Pokemons/container";
import { ContainerButton } from "../style-components/styles-Pokemons/containerButton";
import loading from '../img/Pokemons/loading.gif'
import { ImgLoading } from "../style-components/styles-Pokemons/imgLoading";
import { useHistory } from "react-router-dom";
import { ContainerOptions } from "../style-components/styles-Pokemons/containerOptions";
import { ContainerInput } from "../style-components/styles-Pokemons/containerOptions";
import { Label } from "../style-components/styles-Pokemons/containerOptions";


function Pokemons({ getAllPokemons,getTypes, allPokemons, PokemonByName,allTypes}) { //renderizar al pokemon encontrado
  const [pokemons, setPokemons] = useState([]); // primeros 12 pokemons en un arreglo de arreglos
  const [npage, setPage] = useState({ //guarda el numero de las paginas a renderizar
      numPage : 0,
      nextPage: 0
  });
  let copiaDePokemons = useRef();//permite hacer una copia de todos los pokemons para utilizarlo con shift
  let homeReturn = useRef();//permite retornar al home seteando el numPage
  let findFilter = useRef();//permite aparecer el boton atras cuando se filtran pokemones por tipo
  let findFilterOtherPage = useRef();//permite filtrar pokemons por tipo desde otras paginas
  let findFilterCreateds = useRef();
  let history = useHistory();
 


  useEffect(() => {
    console.log("UseEffect Obtener Pokemons de la API")
    homeReturn.current = false;
    findFilter.current = false;
    findFilterOtherPage.current = false;
    findFilterCreateds.current = false;
    getAllPokemons();
    getTypes();
  }, [getAllPokemons,getTypes]);

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
          homeReturn.current = false;
          findFilter.current = false;
          setPage({...npage,numPage:0}) //setea el paginado a cero
         }

        if(findFilterOtherPage.current){

          findFilterOtherPage.current = false;
          setPage({...npage,numPage:0})//setea el paginado a cero
        }

        if(findFilterCreateds.current){
          findFilterCreateds.current = false;
          console.log("Entreeeeeeeee")
        }

    }
    if(pokemons.length < 5){//control de las renderizaciones por dependencias (solo 4 paginas)
    for (let i = 0; i < 12; i++) {// [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
        (copiaDePokemons.current && copiaDePokemons.current.length) && page.push(copiaDePokemons.current.shift())
    }
    page.length && setPokemons(p=>[...p,page]);
 
  } 
  }, [allPokemons, npage,pokemons]); 


  useEffect(()=>{
    console.log("Paginacion")
    if(npage.nextPage > npage.numPage){ // cambia a la siguiente pagina
      setPage({...npage, numPage: npage.numPage + 1})
  }else if(npage.nextPage < npage.numPage){ // cambia hacia atras
      setPage({...npage, numPage: npage.numPage - 1})
  }
  },[npage])

  const filterType = (e)=>{ //se rompe si hay pokemons de usario ya que no tienen type
    let pokemonTypes = []
    allPokemons.forEach((p)=>{
    p.typeName.find((t)=>t=== e.target.value) && pokemonTypes.push(p);
    })
    findFilter.current = true;

    setPokemons([pokemonTypes])
    
  }

  const filterPokemonCreatedByUser = ()=>{
    let pokemonByUser = []
    allPokemons.forEach((p)=>{
    typeof(p.id) === "string" && pokemonByUser.push(p);
    })
    setPokemons([pokemonByUser])
  }

  const orderAlphabetically = ()=>{

    const sortArray = (x, y)=>{
      if (x.name < y.name){
        return -1;
      }
      if (x.name > y.name){
        return 1;
      }
      return 0;
  }
    setPokemons([allPokemons.sort(sortArray)])//error se cargan todos los pokemons, no 12
  }

  const orderReverse = ()=>{
    const sortArray = (x, y)=>{
      if (x.name > y.name){
        return -1;
      }
      if (x.name < y.name){
        return 1;
      }
      return 0;
  }
  setPokemons([allPokemons.sort(sortArray)])
  }
    
console.log(pokemons)
  
  
  return (
    <Container>

      <ContainerOptions>
           <ContainerInput>
                <select name="select" onChange={(e)=>{npage.numPage === 0 ? filterType(e) : (findFilterOtherPage.current = true) && filterType(e)}}>
                    {allTypes.length && allTypes.map((t)=><option key={t.name} value={t.name} >{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</option>)}
                </select>
           </ContainerInput>

           <ContainerInput>
                <input type="radio" name="showPokemons" value={"showAllPokemons"} id="showAll" defaultChecked onClick={()=>{homeReturn.current = true;setPokemons([])}}></input><Label >All Pokemons</Label><br/> 
                <input type="radio" name="showPokemons" value={"showPokemonsCreatedByUser"} onClick={()=>{findFilterCreateds.current = true;filterPokemonCreatedByUser()}}></input><Label >Pokemon by User</Label>
           </ContainerInput>

           <ContainerInput>
                <input type="radio" name="showOrder" value={"showOrderAlfabetic"} onClick={()=>{orderAlphabetically()}}></input><Label >Order A-Z</Label> <br/>
                <input type="radio" name="showOrder" value={"showOrderReverse"} onClick={()=>{orderReverse()}}></input><Label >Order Z-A</Label>
           </ContainerInput>


      </ContainerOptions>

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
      {(pokemons.length && pokemons[0].length > 1) && findFilterCreateds.current && <Button onClick={()=>{
        document.querySelector('input[type=radio][name=showPokemons]:checked').checked = false;
        document.querySelector('input[id=showAll][type=radio][name=showPokemons]').checked = true;
        homeReturn.current = true;
        setPokemons([])}}>Atras</Button>}

      {(pokemons.length && pokemons[0].length > 1) && npage.numPage > 0 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage - 1})}>Atras</Button>}
      {(pokemons.length && pokemons[0].length > 1) && (npage.numPage < 3 && !findFilter.current) && !findFilterCreateds.current && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage + 1})}>Siguiente</Button>} 
      {(pokemons.length && pokemons[0].length > 0) && findFilter.current &&  <Button onClick={()=>{
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
