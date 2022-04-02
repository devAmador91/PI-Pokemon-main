import React, { useEffect } from "react";
import { getPokemons } from "../actions";
import { connect } from 'react-redux';
import Pokemon from "./Pokemon";
import { Row } from "../style-components/style-Pokemons/pokemons";
import { Column } from "../style-components/style-Pokemons/pokemons";




import { Background } from "../style-components/styles-Pokemons/background";

function Pokemons({getAllPokemons,allPokemons}){

    useEffect(()=>{
        getAllPokemons();
    },[getAllPokemons]);

    return (
        <React.Fragment>
            <Background>
            <Row>
            <Column>
            {
                
               allPokemons ? allPokemons.map((p)=>{
                    return <Pokemon key={p.id} id={p.id} name={p.name} type={p.typeName} img={p.img} />
                }) : null
            }
            </Column>
            </Row>
            
            </Background>
        </React.Fragment>
        
    )
}

const mapStateToProps = (state) => ({
    allPokemons: state.pokemonsCreatedbyUser.pop(),
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        getAllPokemons: ()=> dispatch(getPokemons()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);