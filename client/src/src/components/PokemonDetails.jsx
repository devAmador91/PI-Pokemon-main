import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getPokemonById } from "../actions";
import { Background } from "../style-components/styles-PokemonsDetails/statistics";
import { Statistics } from "../style-components/styles-PokemonsDetails/statistics";
import { Img } from "../style-components/styles-PokemonsDetails/statistics";
import { H1 } from "../style-components/styles-PokemonsDetails/statistics";
import { Button } from "../style-components/styles-PokemonsDetails/statistics";
import { Container } from "../style-components/styles-PokemonsDetails/statistics";
import { Container2 } from "../style-components/styles-PokemonsDetails/statistics";

export default function PokemonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { height, weight, hp, defense, attack } = useSelector(
    (state) => state.foundPokemonById
  );
  const location = useLocation(); //pasa por props desde NavLink
  const history = useHistory();
  const { img, name, type } = location.state;

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Background>
        <Container2>
          <Statistics>
            <H1>
              {name.replace(name.charAt(0), name.charAt(0).toUpperCase())}
            </H1>
            <h4>Type: {type && type.map((t) => `${t} `)}</h4>
            <h4>Height: {height}</h4>
            <h4>Weihht: {weight}</h4>
            <h4>Hp: {hp}</h4>
            <h4>Defense: {defense}</h4>
            <h4>Attack: {attack}</h4>
            <h4>Numero de Pokemon: {id}</h4>
          </Statistics>
          <Img src={img}></Img>
        </Container2>
        <Button onClick={() => history.push("/pokemons")}>Atras</Button>
      </Background>
      
    </Container>
  );
}
