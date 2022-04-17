import styled from 'styled-components';
import { NavLink } from 'react-router-dom';



export const ContainerOptions = styled.nav`
width: 100%;
height: 40px;
display: flex;
background-color: black;
justify-content: space-around;
margin-bottom: 45px;
border-radius: 0px 0px 50px 50px;
border-bottom: 3px solid yellow;
box-shadow: 3px 3px 5px yellow;
`;

export const ContainerUl = styled.ul`
list-style: none;
width: 100%;
display: block;
text-align: center;
margin: 0px;
padding: 0px;

&:hover{
    transition: all 0.3s;
    background-color: gold;
    border-radius: 0px 0px 50px 50px;
}

`; 

export const Ul = styled.ul`
list-style: none;
margin: 0px;
padding: 0px;
height: 0px;
overflow: visible;
transition: all 0.3s;
position: absolute;
top: 50px;
width: 100%;
z-index: 1000;
opacity: 0;
visibility: hidden;
`;

export const Li = styled.button`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
border: 0px;
padding: 10px;
color: yellow;
letter-spacing: 2px;
background-color: rgba(0,0,0,0.6);
&:last-child{
    border-radius: 0px 0px 50px 50px;
}

&:hover{
    cursor: pointer;
    background-color: rgba(245, 243, 39, 0.69);
    color: black;
    letter-spacing: 2px;
}

`;

export const Link = styled(NavLink)`
text-decoration: none;
font-family:'PokemonSolid';
color: red;
font-size: 20px;
`;

export const LiSub = styled.li`

position: relative;

&:hover ${Link}{
    color: black;
}

&:hover ${Ul}{
    opacity: 1;
    visibility: visible;
    z-index: 1001;
}
`

export const Label = styled.label`
color: yellow;
`;



export const P = styled.p`
text-align: center;
height: 25%;
border: 2px solid yellow;
border-radius: 15px;
background-color: yellow;
box-shadow: 3px 3px 20px yellow;
color: black;
cursor: pointer;
&:hover{
    background-color: black;
    color: yellow;
}
padding: 3px;
`;

export const ButtonOptions = styled.button`
margin-top: 10px;
border-radius: 20px;
background-color: red;
box-shadow: 3px 3px 20px red;
color: white;
cursor: pointer;
&:hover{
    background-color: black;
    color: black;
}
padding: 3px;
`;