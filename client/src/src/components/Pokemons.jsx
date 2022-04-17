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
import { ContainerOptions, ContainerUl, Li } from "../style-components/styles-Pokemons/containerOptions";
import { filterType } from "./FunctionsPokemons/functionsFilters";
import { filterPokemonCreatedByUser } from "./FunctionsPokemons/functionsFilters";
import { orderAlphabetically } from "./FunctionsPokemons/functionsFilters";
import { orderReverse } from "./FunctionsPokemons/functionsFilters";
import { orderByForceAsc } from "./FunctionsPokemons/functionsFilters";
import { orderByForceDes } from "./FunctionsPokemons/functionsFilters";
import { paginationNext } from "./FunctionsPokemons/functionPagination";
import { paginationPrev } from "./FunctionsPokemons/functionPagination";
import { Link } from "../style-components/styles-Pokemons/containerOptions";
import { structurePage } from "./FunctionsPokemons/functionStructure";
import { buttonPrev } from "./FunctionsPokemons/functionButtonPrev";
import { ContainerImgButton } from "../style-components/styles-Pokemons/containerImg";
import { Ul } from "../style-components/styles-Pokemons/containerOptions";
import { LiSub } from "../style-components/styles-Pokemons/containerOptions";



function Pokemons({ getAllPokemons,getTypes, allPokemons, PokemonByName,allTypes}) {
  //Estados
  const [pokemons, setPokemons] = useState([]);
  const [npage, setPage] = useState({numPage : 0});
  //Flags
  let copyPokemons = useRef();//permite hacer una copia de todos los pokemons para utilizarlo con shift
  let homeReturn = useRef();//permite retornar al home seteando el numPage
  let buttonBackFilterType = useRef();//permite aparecer el boton atras cuando se filtran pokemones por tipo
  let buttonBackFilterCreated = useRef();// permite aparecer el boton de atras cuando se filtra por creacion deusuario
  let history = useHistory();
 
  //Efectos Secundarios
  useEffect(()=>{
  //flags para los botones
    homeReturn.current = false;
    buttonBackFilterType.current = false;
    buttonBackFilterCreated.current = false;
  },[])
  //Obtener todos los pokemons de la api y todos los tipos de la BD
  useEffect(() => {
    getAllPokemons();
    getTypes();
  }, [getAllPokemons,getTypes]);

  //Obtener al pokemon especificado por su nombre  
  useEffect(() =>{
    PokemonByName.data && PokemonByName.data.hasOwnProperty("error") && history.push("/notfound")
    PokemonByName.data && setPokemons((p)=>[[PokemonByName.data]])
  },[PokemonByName,history])

  //Crea la esructura de la pagina de 12 pokemons en cada una  
  useEffect(() => {
      structurePage(pokemons,copyPokemons,setPokemons,allPokemons,buttonBackFilterCreated)
  }, [allPokemons, pokemons]); 

  console.log(pokemons)
  return (
    <Container>

           {npage.numPage < 1 && 
           <ContainerOptions>

              <ContainerUl>
                <LiSub><Link to={"#"}>Filter by type</Link>
                    <Ul>
                      {allTypes.length && allTypes.map((t)=><Li value={t.name} onClick={(e)=>{buttonBackFilterType.current = true; filterType(e,setPokemons,allPokemons)}} key={t.name}>{t.name.replace(t.name.charAt(0),t.name.charAt(0).toUpperCase())}</Li>)}
                    </Ul>
                </LiSub>

              </ContainerUl>  

              <ContainerUl>

                <LiSub><Link to={"#"}>Show Pokemons</Link>
                    <Ul>
                      <Li onClick={()=>{homeReturn.current = true;setPokemons([])}}>Show all pokemons</Li>
                      <Li onClick={()=>{buttonBackFilterCreated.current = true;filterPokemonCreatedByUser(allPokemons,setPokemons)}}>Show pokemons created by user</Li>
                    </Ul>
                </LiSub>

              </ContainerUl> 

              <ContainerUl> 

                <LiSub><Link to={"#"}>Order by</Link>
                    <Ul>
                      <Li onClick={()=>{orderAlphabetically(allPokemons,setPokemons,copyPokemons)}}>A-Z</Li>
                      <Li onClick={()=>{orderReverse(allPokemons,setPokemons,copyPokemons)}}>Z-A</Li>
                      <Li onClick={()=>{orderByForceAsc(allPokemons,setPokemons,copyPokemons)}}>Asc by force</Li>
                      <Li onClick={()=>{orderByForceDes(allPokemons,setPokemons,copyPokemons)}}>Desc by force</Li>
                    </Ul>
                </LiSub>

          </ContainerUl> 

          <ContainerUl> 

                <LiSub><Link to={"/about"}>About</Link></LiSub>

          </ContainerUl> 
             
      </ContainerOptions>}

        <ContainerImgButton>
          
          <ContainerImg>
           {/*si en pokemons existe solo 1 pokemon se renderiza la posicion cero, si no se renderiza en la posicion que este la pag*/}
            {pokemons.length ? pokemons[pokemons[0].length === 1 ? 0 : npage.numPage].map((p) => { 
                  return (<Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />);
                })
                             : <ImgLoading src={loading} alt="imagen de loading"></ImgLoading>} 
          </ContainerImg>

          <ContainerButton>
         {/*cuando se busca por nombre ,aparece el boton atras*/}
      {(pokemons.length && pokemons[0].length === 1) && <Button onClick={()=>buttonPrev(homeReturn,setPokemons)}>Back</Button>
        } 

        {/*cuando se busca por createdByUser ,aparece el boton atras*/}
      {(pokemons.length && pokemons[0].length > 1) && buttonBackFilterCreated.current && <Button onClick={()=>buttonPrev(homeReturn,setPokemons)}>Back</Button>}
        
      {/*Cuando se pasa a la paguina siguiente aparece el boton atras */}
      {(pokemons.length && pokemons[0].length > 1) && npage.numPage > 0 && <Button onClick={()=> paginationPrev(npage,setPage)}>Back</Button>}
      
      {/*boton siguiente */}    
      {(pokemons.length && pokemons[0].length > 1) && (npage.numPage < 3 && !buttonBackFilterType.current) && !buttonBackFilterCreated.current && <Button onClick={()=> paginationNext(npage,setPage)}>Next</Button>} 
      
      {/*cuando se busca pot type aparece el boton atras */}
      {(pokemons.length && pokemons[0].length > -1) && buttonBackFilterType.current &&  <Button onClick={()=>buttonPrev(homeReturn,setPokemons)}>Back</Button>}
      </ContainerButton> 


        
      </ContainerImgButton>
      
        
         
     
      </Container>
  );
}

const mapStateToProps = (state) => ({
  allPokemons: state.allPokemonsApi,
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
