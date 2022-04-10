import styled from 'styled-components';


export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #181a1b;
`;

export const Border = styled.div`
margin-top: 80px;
padding: 30px;
border-radius: 30px;
border: 3px solid yellow;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const H1 = styled.div`
margin-bottom: 25px;
font-size: 35px;    
font-family: 'PokemonSolid';
color: red;
`;

export const ContainerButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`;

export const Button = styled.button`
width: 100px;
color: black;
background-color: yellow;
font-size: 15px;
border-radius: 30px;
border: 4px solid black;
`;

export const DeleteButton = styled.button`
background-color: red;
font-size: 15px;
border: 2px solid black;
border-radius: 25px;
margin-top: 10px;
`;

export const Label = styled.label`
color: white;
margin-right: 20px;
`;

export const Hp = styled.label`
color: white;
margin-right: 50px;
`;

export const LabelNum = styled.label`
color: red;
`

export const ContainerInput = styled.div`
margin: 10px;
`;

export const ButtonCreate = styled.input`
margin-top: 30px;
margin-left: 50px;
background-color: red;
color: white;
border: 2px solid black;
border-radius: 10px;
font-size: 20px;
&:hover{
    transform: scale(1.2);
}
`;

export const P = styled.p`
color:red;
`;

export const Error = styled.p`
color: red;
`;