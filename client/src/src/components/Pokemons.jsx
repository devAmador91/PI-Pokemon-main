import React, { useEffect, useState } from "react";
import { getPokemons } from "../actions";
import { connect } from "react-redux";
import Pokemon from "./Pokemon";
import { Row } from "../style-components/style-Pokemons/pokemons";
import { Column } from "../style-components/style-Pokemons/pokemons";
import { Background } from "../style-components/styles-Pokemons/background";

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
    <React.Fragment>
      <Background>
        <Row>
          <Column>
            {pokemons.length ? pokemons[npage.numPage].map((p) => { 
                  return (
                    <Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />
                  );
                })
              : null}
          </Column>
        </Row>
        {npage.numPage < 3 && <button onClick={()=> setPage({...npage, nextPage: npage.nextPage + 1})}>Siguiente</button>} 
        {npage.numPage > 0 && <button onClick={()=> setPage({...npage, nextPage: npage.nextPage - 1})}>Atras</button>}   
      </Background>
    </React.Fragment>
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
