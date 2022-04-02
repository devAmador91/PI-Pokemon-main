import React, { useEffect } from "react";
import { getPokemons } from "../actions";
import { getAllTypes } from "../actions";
import { connect } from 'react-redux';
import Pokemon from "./Pokemon";




import { Background } from "../style-components/styles-Pokemons/background";

function Pokemons({getAllPokemons,getAllTypes},{allPokemons,allTypes}){
    useEffect(()=>{
        getAllPokemons();
        getAllTypes();
    },[]);
    return (
        <React.Fragment>
            <Background>
            <section>
            {
                //rederizar los types que tienen que conicidr con cada pokemon
               allPokemons ? allPokemons.map((p)=>{
                    return <Pokemon key={p.id} id={p.id} name={p.name} img={p.img} />
                }) : null
            }
            
            </section>
            </Background>
        </React.Fragment>
        
    )
}

const mapStateToProps = (state) => ({
    allPokemons: state.pokemonsCreatedbyUser,
    allTypes: state.allTypesOfPokemons
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        getAllPokemons: ()=> dispatch(getPokemons()),
        getAllTypes: ()=> dispatch(getAllTypes())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);