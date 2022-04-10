import styled from 'styled-components';
import { NavLink } from 'react-router-dom';



export const ContainerOptions = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-left: 150px;
margin-right: 150px;
`;

export const ContainerInput = styled.div`
margin: 10px;
margin-right: 15px;
margin-top: 15px;
`; 

export const Label = styled.label`
color: yellow;
`;

export const Link = styled(NavLink)`
margin-top: 15px;
text-decoration: none;
border: 2px solid yellow;
border-radius: 15px;
background-color: yellow;
color: black;
cursor: pointer;
&:hover{
    background-color: black;
    color: yellow;
}
padding: 5px;
`;

export const P = styled.p`
text-align: center;
`;