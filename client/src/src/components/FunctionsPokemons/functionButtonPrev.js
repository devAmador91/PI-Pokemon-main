export const buttonPrev = (homeReturn,setPokemons)=>{
    /*desmarca el boton radio de Pokemon created by user caundo se retorna a la pagina home en caso de ser > 1*/
        document.querySelector('input[type=radio][name=showPokemons]:checked').checked = false;
        document.querySelector('input[id=showAll][type=radio][name=showPokemons]').checked = true;
        homeReturn.current = true;
        setPokemons([])
}