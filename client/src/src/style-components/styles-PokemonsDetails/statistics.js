import styled from 'styled-components';

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    height:100vh; 
    background-color: rgba(0,0,0,0.6);
`;

export const Background = styled.div`
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px solid yellow;
    border-radius: 30px;
    margin-top: 40px;
    padding: 15px;
    overflow: hidden;
    position: relative;

    &::before{
        content: "";
        position: absolute;
        width: 1000px;
        height: 160%;
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
        border-radius: 15pt;
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

export const Statistics = styled.div`
position: relative;
z-index: 1000;
    display: flex;
    flex-direction: column;
    color: black;
    border: 2px solid yellow;
    border-radius: 80px;
    padding: 15px;
    background-color: yellow;
`;

export const Img = styled.img`
position: relative;
z-index: 1000;
    width: 300px;
    margin-left: 100px;
    margin-right: 50px;
    margin-top: 100px;
`;

export const H1 = styled.h1`
position: relative;
z-index: 1000;
    font-size: 50px;
    color: red;
    font-family: 'PokemonSolid';
`;

export const Button = styled.button`
width: 100px;
color: black;
background-color: yellow;
font-size: 15px;
border-radius: 30px;
border: 4px solid black;
margin-top: 50px;
`

