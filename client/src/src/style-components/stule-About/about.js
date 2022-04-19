import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyleDev = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 5px;
   border: 3px solid yellow;
   border-radius: 30px;
   box-shadow: 12px 5px 5px black;
   margin: 15px;
   width: 30%;
   overflow: hidden;
   position: relative;

    &::before{
        content: "";
        position: absolute;
        width: 1000px;
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

export const ImgDev = styled.img`
position: relative;
z-index: 1000;
padding: 25px;
width: 60%;
border-radius: 30px;
`

export const H1 = styled.h1`
font-family: 'PokemonSolid';
font-size: 25px;
text-align: center;
color: #e63648;
position: relative;
z-index: 1000;
`

export const P = styled.p`
text-align: center;
font-size: 18px;
color: yellow;
position: relative;
z-index: 1000;
`;

export const Li = styled.li`
flex-direction: column;
color: yellow;
position: relative;
z-index: 1000;
`;

export const Ul = styled.ul`
display: flex;
flex-direction: column;
list-style: none;
align-items: center;
justify-content: center;
padding: 0px;
`