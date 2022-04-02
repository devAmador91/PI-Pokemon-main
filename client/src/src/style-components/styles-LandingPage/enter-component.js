import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

export const Pokeball = styled.img`
width: 150px;
margin-top: 230px;
margin-left: 250px;
margin-bottom: 0px;
cursor: pointer;
&:hover{
    animation: rotation 300ms linear;
    @keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
    transform: scale(1.2);
}
`

export const StyledText = styled(NavLink)`
text-decoration: none;
`

export const PokemonGlobalCss = createGlobalStyle`
*{
  margin: 0px;
}

h3{
display: inline-block;
font-family:'PokemonSolid';
color: #e63648;
font-size: 20px;
margin-left: 288px;
margin-top: 0px;
&:hover{
    color:#fefb24;
    transform: scale(1.5);
}

}
`;