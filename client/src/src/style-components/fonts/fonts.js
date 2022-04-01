import { createGlobalStyle } from "styled-components"; // ayuda a manejar los estilos css globales
import PokemonSolid from "./Pokemon-Solid.woff2";

const fontPokemonH1 = createGlobalStyle`
 @font-face { font-family: 'PokemonSolid';
   src: local('PokemonSolid'),
   url(${PokemonSolid})
   format('woff2');}`;

export default fontPokemonH1