import styled from 'styled-components';



export const Header = styled.header`
display: flex;
justify-content: space-around;
align-items: center;
height: 120px;
background-color: black;
padding-left: 250px;
padding-right: 250px;
`;

export const Form = styled.form`
display: flex;
margin-top: 5px;
`;

export const Input = styled.input`
width: 50vmax;
border-radius: 60px;
border-color:  red;
background-color: red;
color: yellow;
font-size: 15px;
`

export const Button = styled.input`
width: 6vmax;
border-radius: 60px;
background-color: red;
color: white;
margin-left: 10px;
`

export const Pokeball = styled.img`
width: 150px;
`;

export const PikachuLogo = styled.img`
width: 150px;
transform: scaleX(-1); //voltea la imagen horizontalmente
margin-bottom: 30px;

`;

