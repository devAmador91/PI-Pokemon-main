import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
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

export const Img = styled.img`
  width: 500px;
  position: relative;
  z-index: 1000;
`;

export const ImgText = styled.div`
  display: flex;
  position: relative;
  z-index: 1000;
`;

export const H1 = styled.h1`
  font-size: 50px;
  color: red;
  margin-top: 260px;
  margin-left: 100px;
  font-family: "PokemonSolid";
`;

export const Button = styled.button`
  width: 100px;
  color: black;
  background-color: yellow;
  font-size: 15px;
  border-radius: 30px;
  border: 4px solid black;
  margin-bottom: 70px;
  position: relative;
  z-index: 1000;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
