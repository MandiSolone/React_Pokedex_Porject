// //build evolutions with links 

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { nextEvolution } from "../helpers/pokemonHelpers";

export function SinglePokemonPage () {
    const [item, setItem] = useState({}); 
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 

    console.log(loading); 
    console.log(`item`, item); 
    console.log(`id`, id); 

    function getPokemon (){
            fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            .then((res) => res.json())
            .then((data) => {
                const pokemonData = data.pokemon.find(p => p.id === parseInt(id)); //parseInt string to integar '11' to 11
                setItem(pokemonData); 
                setLoading(false);
            })
            .catch((err) => {console.error("Error fetching data", err); 
                setLoading(false);
            });
    }    

    useEffect(()=> {
        getPokemon();
    }, [id]);

    if (loading) {
        return <div>Loading Pokemon Data...</div>;
      }
     
    let evolutions = nextEvolution(item);
    console.log(`evolutions`, evolutions);

      return (
        <card>
          {item ? (
            <>
              <div>
                <img src={`${item.img}`} alt={`${item.name} picture`} />
              </div>
              <h1>{item.name}</h1>
              <p>ID: {item.id}</p>
              <p>Type: {item.type.join(`, `)}</p>
              <p>Weaknesses: {item.weaknesses.join(`, `)}</p>
              <p>Next Evolution(s): {evolutions.join(`, `)}</p> 
              {/* //build links  */}
            </>
          ) : (
            <p>Pokémon not found</p>
          )}
        </card>
      );
    }
    


