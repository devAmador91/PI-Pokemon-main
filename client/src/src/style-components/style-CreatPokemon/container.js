import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: black;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      rgba(251, 244, 14, 0.8),
      rgba(163, 17, 6, 0.8),
      rgba(5, 253, 18, 0.8),
      rgba(5, 253, 235, 0.8),
      rgba(235, 5, 253, 0.8)
    );
    animation: animate 2.5s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    background: black;
    border-radius: 20pt;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const H1 = styled.div`
  margin-bottom: 25px;
  font-size: 35px;
  font-family: "PokemonSolid";
  color: red;
  position: relative;
  z-index: 1000;
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
  position: relative;
  z-index: 1000;
`;

export const DeleteButton = styled.button`
  background-color: red;
  font-size: 15px;
  border: 2px solid black;
  border-radius: 25px;
  margin-top: 10px;
  position: relative;
  z-index: 1000;
`;

export const Label = styled.label`
  color: white;
  margin-right: 20px;
  position: relative;
  z-index: 1000;
`;

export const Hp = styled.label`
  color: white;
  margin-right: 50px;
  position: relative;
  z-index: 1000;
`;

export const LabelNum = styled.label`
  color: red;
  position: relative;
  z-index: 1000;
`;

export const ContainerInput = styled.div`
  margin: 10px;
  position: relative;
  z-index: 1000;
`;

export const ButtonCreate = styled.input`
  margin-top: 30px;
  margin-left: 50px;
  background-color: red;
  color: white;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const P = styled.p`
  color: red;
  position: relative;
  z-index: 1000;
`;

export const Error = styled.p`
  color: red;
  position: relative;
  z-index: 1000;
`;
