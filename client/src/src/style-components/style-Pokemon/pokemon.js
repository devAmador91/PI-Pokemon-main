import styled from 'styled-components';


export const StylePokemon = styled.div`
   border: 3px solid yellow;
   border-radius: 30px;
   margin: 10px;
   width: 13%;
   background-color: black;
   &:hover{
      background-color: yellow;
   }
`;

export const ImgPokemon = styled.img`
padding: 25px;
width: 80%;
&:hover{
      transform: scale(1.2);
     
   }
`

export const P = styled.p`
font-family: 'PokemonSolid';
font-size: 25px;
text-align: center;

color: #e63648;
`

export const Li = styled.li`
font-size: 15px;
color: red;
font-size: 20px;
`;