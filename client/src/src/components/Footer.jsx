import { FooterContainer } from "../style-components/style-Footer/footer";
import { Img } from "../style-components/style-Footer/footer";
import pokemonLogo from "../img/Pokemons/pokemon.png"

export default function Footer(){
    return(
    <FooterContainer>
        <Img src={pokemonLogo}></Img>
    </FooterContainer>
    
    )
    }

