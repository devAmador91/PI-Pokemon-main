import styled from 'styled-components';


export const StylePokemon = styled.div`
   display: inline-block;
   padding: 5px;
   border: 3px solid yellow;
   border-radius: 30px;
   box-shadow: 12px 5px 5px black;
   margin: 15px;
   width: 13%;
   overflow: hidden;
   position: relative;

    &::before{
        content: "";
        position: absolute;
        width: 1300px;
        height: 1000px;
        background: linear-gradient(rgba(251, 244, 14, 0.8),
        rgba(163, 17, 6, 0.8),
        rgba(5, 253, 18, 0.8),
        rgba(5, 253, 235, 0.8),
        rgba(235, 5, 253, 0.8));
        animation: animate 2.5s linear infinite;
    }

    &::after{
        content: "";
        position: absolute;
        inset: 5px;
        background:black;
        border-radius: 20pt;
    }

    @keyframes animate {
        0%
        {
            transform: rotate(0deg);
        }
        100%
        {
            transform: rotate(360deg);
        }
    }
`;

export const ImgPokemon = styled.img`
position: relative;
z-index: 1000;
padding: 25px;
width: 9vw;
height: 15vh;
&:hover{
      transform: scale(1.3);
   }
`

export const P = styled.p`
font-family: 'PokemonSolid';
font-size: 1.7vw;
text-align: center;
color: #e63648;
position: relative;
z-index: 1000;
`

export const Pa = styled.p`
display: inline-block;
border-radius: 20px;
background-color: red;
font-size: 1.1vw;
color: black;
margin-right: 5px;
padding: 5px;
position: relative;
z-index: 1000;
`;

export const Ul = styled.ul`
display: flex;
align-items: center;
justify-content: center;
padding: 0px;
`