import React, { useEffect, useState } from "react";
import { getPokemons } from "../actions";
import { connect } from "react-redux";
import Pokemon from "./Pokemon";
import { ContainerImg } from "../style-components/styles-Pokemons/containerImg";
import { Button } from "../style-components/styles-Pokemons/butonNext-Prev";
import { Container } from "../style-components/styles-Pokemons/container";
import { ContainerButton } from "../style-components/styles-Pokemons/containerButton";
import loading from '../img/Pokemons/loading.gif'
import { ImgLoading } from "../style-components/styles-Pokemons/imgLoading";

function Pokemons({ getAllPokemons, allPokemons }) {
  const [pokemons, setPokemons] = useState([]); // primeros 12 pokemons en un arreglo de arreglos
  const [copyPokemons, setCopyPokemons] = useState([]); // copia de los 40 pokemons
  const [npage, setPage] = useState({ //guarda el numero de las paginas a renderizar
      numPage : 0,
      nextPage: 0
  });

  useEffect(() => {
    console.log("UseEffect getAllPokeons")
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() => {
    console.log("UseEffect copyPokemons")
    setCopyPokemons(allPokemons ? allPokemons.map((p) => p) : []);
  }, [allPokemons]);


  useEffect(() => {
    console.log("UseEffect pushPokemons")
    let page = [];
    
    // [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
    for (let i = 0; i < 12; i++) {
        copyPokemons.length && page.push(copyPokemons.shift())   
    }

    page.length && setPokemons(p=>[...p,page]);
    

    if(npage.nextPage > npage.numPage){ // cambia a la siguiente pagina
        setPage({...npage, numPage: npage.numPage + 1})
    }else if(npage.nextPage < npage.numPage){ // cambia hacia atras
        setPage({...npage, numPage: npage.numPage - 1})
    }
  }, [copyPokemons,npage]);


  return (
    <Container>
      <ContainerImg>
          
            {pokemons.length ? pokemons[npage.numPage].map((p) => { 
                  return (
                   
                    <Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />
                    
                  );
                })
              : <ImgLoading src={loading} alt="imagen de loading"></ImgLoading>} {/*<-- incorporar imagen de loading*/}
              
          
       </ContainerImg>
       <ContainerButton>        
      {npage.numPage > 0 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage - 1})}>Atras</Button>}
      {npage.numPage < 3 && <Button onClick={()=> setPage({...npage, nextPage: npage.nextPage + 1})}>Siguiente</Button>} 
      </ContainerButton>   
      </Container>
  );
}

const mapStateToProps = (state) => ({
  allPokemons: state.pokemonsCreatedbyUser.pop(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllPokemons: () => dispatch(getPokemons()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
