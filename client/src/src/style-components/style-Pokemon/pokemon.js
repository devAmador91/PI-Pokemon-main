import styled from 'styled-components';


export const StylePokemon = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 5px;
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

export const Pa = styled.p`
display: inline-block;
border-radius: 20px;
background-color: red;
font-size: 13px;
color: black;
margin-right: 5px;
padding: 5px;
`;

export const Ul = styled.ul`
display: flex;
align-items: center;
justify-content: center;
padding: 0px;
`