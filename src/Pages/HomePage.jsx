import { useState, useEffect } from "react";
import { filterPokemonByName, filterPokemonByDropDown, getListOfTypes } from "../helpers/pokemonHelpers";

export function HomePage (){
    const [item, setItem] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [searchedPokemon, setSearchedPokemon] = useState("");

    function getPokemon () {
        fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
        .then((res) => res.json())
        .then((data) => {
            setItem(data);
            setLoading(false); 
        })
        .catch((err) => {console.error("Error fetching data", err); 
        }); 
    }
    console.log("item", item); 
    console.log("loading", loading); 
    console.log("searchedPokemon", searchedPokemon); 

    useEffect( ()=> {
        getPokemon(); 
    }, []);
    
    if (loading) {
        return <div>Loading Pokemon...</div>;
    }

    function handleClick (){
        let pokemonInputValue = document.querySelector('#pokemonInput').value;
        pokemonInputValue = pokemonInputValue.charAt(0).toUpperCase() + pokemonInputValue.slice(1).toLowerCase();
        setSearchedPokemon(pokemonInputValue); 
        console.log(`pokemonInputValue`, pokemonInputValue);
        document.querySelector('#pokemonInput').value = '';
    }

    let pokemonByName = filterPokemonByName((item.pokemon), searchedPokemon);
    let pokemonByfilter = filterPokemonByDropDown((item.pokemon), searchedPokemon); // item.pokemon (), grass
    let pokemonByTypes = getListOfTypes((item.pokemon), "type"); //151 ind arrays 
    //let pokemonByWeaknesses = // 

    console.log(`pokemonByName`, pokemonByName);
    console.log(`pokemonByfilter`, pokemonByfilter);
    console.log("pokemonByTypes",pokemonByTypes); 

    return (
        <>  
        <h1>POKEDEX</h1>
        <input type="text" id="pokemonInput" placeholder="Enter a Pokemon"/>
        <button id="searchBtn" onClick={handleClick}> Search</button>
        {/* //add a prevent default to the form  */}

        <form>
            <label htmlFor="searchType">Filter by Type: </label>
            <select
            name="searchType"
            id="searchType"
            // value ={} // need to change these to something different then the searchbar search
            // onChange=
            value={searchedPokemon}
            onChange={(e) => setSearchedPokemon(e.target.value)}
            >
            <option value="">ALL</option>
                {/* Also this value {searchedPokemon} [grass] is resetting my setSearchedPokemon,  */}
                {/* Do I even need ID? */}
                {pokemonByTypes.map((type, id) => {
                    return (
                        <option key={type + id} value={type}>{type}</option>
                    );
                })}
            </select>

            {/* <label htmlFor="searchWeakneeses">Filter by Weakneeses: </label>
            <select
                name="searchWeakneeses"
                id="searchWeakneeses"
                // value={searchedWeakneeses}//Left off here 
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">ALL</option>
                {pokemonByCategories.map((category, index) => (
                    <option key={category + index} value={category}>{category}</option>
                ))}
            </select>

            <button type="submit">Submit</button>                 */}

        </form>
        <ul className=""> {(pokemonByName && pokemonByName.length > 0 ? pokemonByName : pokemonByfilter).map((x) => (
            (<li className="" key ={x.id}>
                <b>{x.name}</b>
                <br></br>{`#: `+ x.num}
                <br></br>{`Type: ` + x.type}
                <br></br>{`Weaknesses: ` + x.weaknesses}
            </li>)
        ))}
        </ul>
        </>  
        );
    }