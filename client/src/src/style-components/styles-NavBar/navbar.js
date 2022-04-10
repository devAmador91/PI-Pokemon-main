import styled from 'styled-components';

export const ContainerHeader = styled.div`
    background-color: #181a1b;
`;

export const Header = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
height: 150px;
background-color: black;
padding-left: 100px;
padding-right: 100px;
border-bottom: 5px solid #9e8c37;
`;

export const Input = styled.input`
width: 1200px;
border-radius: 60px;
border-color:  red;
background-color: red;
color: yellow;
font-size: 15px;
`

export const Button = styled.input`
width: 80px;
border-radius: 60px;
background-color: red;
color: white;
margin-left: 10px;
`

export const Pokeball = styled.img`
width: 150px;
`;

export const Form = styled.form`
margin-top: 5px;
`;

export const PikachuLogo = styled.img`
width: 150px;
transform: scaleX(-1); //voltea la imagen horizontalmente
margin-bottom: 30px;
`;

