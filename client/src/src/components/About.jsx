import React from "react";
import { StyleDev } from "../style-components/stule-About/about";
import { ImgDev } from "../style-components/stule-About/about";
import { H1 } from "../style-components/stule-About/about";
import { Ul } from "../style-components/stule-About/about";
import imgDev from "../img/About/dev.jpg";
import { Li } from "../style-components/stule-About/about";
import { Container } from "../style-components/stule-About/about";
import { P } from "../style-components/stule-About/about";

export default function About() {
  return (
    <Container>
      <StyleDev>
        <ImgDev src={imgDev} alt="pokemon"></ImgDev>
        <div>
          <H1>Amador Aguilar</H1>
          <P>Full Stack Developer</P>
          <Ul>
            <Li>JavaScript</Li>
            <Li>React</Li>
            <Li>Redux</Li>
            <Li>Node Js</Li>
            <Li>Express</Li>
            <Li>Sequelize</Li>
            <Li>Posgress</Li>
          </Ul>
        </div>
      </StyleDev>
    </Container>
  );
}
