
export const structurePage = (pokemons,copyPokemons,setPokemons,allPokemons,buttonBackFilterCreated)=>{
    if(!pokemons.length){//hace una copia de todos los pokemons cuando se renderiza la pagina
        copyPokemons.current = allPokemons && allPokemons.map((p)=>p)
  
        if(buttonBackFilterCreated.current){//setea la bandera cuando se retorna con el boton atras
          buttonBackFilterCreated.current = false;
        }
        }

    let page = [];
    if(pokemons.length < 5){
     
        for (let i = 0; i < 12; i++) {// [[],[],[],[]] <--- Cada array es una pagina con 12 pokemons
            (copyPokemons.current && copyPokemons.current.length) && page.push(copyPokemons.current.shift())
        }
        page.length && setPokemons(p=>[...p,page]);
    
      } 


}

