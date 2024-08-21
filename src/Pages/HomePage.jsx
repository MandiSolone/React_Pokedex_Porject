//make hyper links to individual pages 

import { useState, useEffect } from "react";
import { filterPokemonByName, getListOfWeakness, getListOfTypes, filterPokemonByTypeSelect, filterPokemonByWeaknessSelected} from "../helpers/pokemonHelpers";
import { Link } from "react-router-dom";

export function HomePage (){
    const [item, setItem] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [searchedType, setSearchedType] = useState("");
    const [searchedWeakness, setSearchedWeakness] = useState("");
    const [searchedName, setSearchedName] = useState("");

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
    console.log("searchedName", searchedName); 
    console.log("searchedType", searchedType); 
    console.log("searchedWeakness", searchedWeakness); 

    useEffect( ()=> {
        getPokemon(); 
    }, []);
    
    if (loading) {
        return <div>Loading Pokemon...</div>;
    }

    let pokemonByWeakness = filterPokemonByWeaknessSelected((item.pokemon), searchedWeakness);
    let pokemonByType = filterPokemonByTypeSelect((item.pokemon), searchedType); // item.pokemon (), grass
    let typesOptions = getListOfTypes((item.pokemon), "type"); //151 ind arrays 
    let weaknessOptions = getListOfWeakness((item.pokemon), "weaknesses"); 
    let pokemonByName = filterPokemonByName((item.pokemon), searchedName); 

    console.log(`pokemonByName`, pokemonByName);
    console.log(`pokemonByType`, pokemonByType);
    console.log("pokemonByWeakness",pokemonByWeakness); 
    console.log("typesOptions",typesOptions); 
    console.log("weaknessOptions",weaknessOptions); 
    console.log("pokemonByType.length", pokemonByType.length);
    console.log("pokemonByWeakness.length", pokemonByWeakness.length);

    function handleClick (e){
        e.preventDefault();
        let pokemonInputValue = document.querySelector('#pokemonInput').value;
        pokemonInputValue = pokemonInputValue.charAt(0).toUpperCase() + pokemonInputValue.slice(1).toLowerCase();
        setSearchedName(pokemonInputValue); 
        document.querySelector('#pokemonInput').value = ''; //reset searchbar
        console.log(`pokemonInputValue`, pokemonInputValue);
        setSearchedType(""); 
        setSearchedWeakness(""); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchedName(""); 
        console.log('Selected Type:', searchedType);
        console.log('Selected Weakness:', searchedWeakness);
    };

    return (
        <>  
        <h1>POKÉDEX</h1>
        <div id='searchBar'>
        <input type="text" id="pokemonInput" placeholder="Enter a Pokémon"/>
        <button id="searchBtn" onClick={handleClick}> Search</button>
        </div>
        <h4>OR</h4>
        <form onSubmit={handleSubmit}>
            <label htmlFor="searchType">Filter by Type: </label>
            <select
            name="searchType"
            id="searchType"
            value={searchedType} //seperate state for each selected 
            onChange={(e) => setSearchedType(e.target.value)} 
            >
            <option value="">ALL</option>
                {typesOptions.map((type, index) => 
                        <option key={type + index} value={type}>{type}</option>
            )}
            </select>

          <label htmlFor="searchWeakneeses">Filter by Weaknesses: </label>
            <select
                name="searchedWeakness"
                id="searchedWeakness"
                value={searchedWeakness}
                onChange={(e) => setSearchedWeakness(e.target.value)}
            >
                <option value="">ALL</option>
                {weaknessOptions.map((weakness, index) => (
                    <option key={weakness + index} value={weakness}>{weakness}</option>   
                ))}
            </select>
            <button type="submit">Submit</button>  
        </form>

        <ul className="">
  {(() => {
   
    //populate error message if name entered but no matching pokemon 
    if (pokemonByName && pokemonByName.length === 0 && searchedName) {
        return (<li>No Pokémon found matching your criteria of ${searchedName}.</li>);  
     //Start the page fully populated with ALL pokemon 
    }else if  ((!pokemonByName || pokemonByName.length === 0) &&
    (!pokemonByType || pokemonByType.length === 0) &&
    (!pokemonByWeakness || pokemonByWeakness.length === 0)) {
        return (item.pokemon).map((x) => (
            <li className="" key={x.id}>
            <Link to={`/pokemon/${x.id}`}><b>{x.name}</b> </Link>
              <br></br>{`#: ` + x.num}
              <br></br>{`Type: ` + x.type}
              <br></br>{`Weaknesses: ` + x.weaknesses}
            </li>
          ));
     //populate by name only 
    } else if (pokemonByName && pokemonByName.length > 0) {
      return pokemonByName.map((x) => (
        <li className="" key={x.id}>
          <Link to={`/pokemon/${x.id}`}><b>{x.name}</b> </Link>
          <br></br>{`#: ` + x.num}
          <br></br>{`Type: ` + x.type}
          <br></br>{`Weaknesses: ` + x.weaknesses}
        </li>
      ));
      //populate by both filters set 
    }else if (pokemonByType && pokemonByType.length > 0 && pokemonByWeakness && pokemonByWeakness.length > 0) {
      const filteredByTypeAndWeakness = pokemonByType.filter((pokemon) =>
        pokemonByWeakness.some((w) => w.id === pokemon.id)
      );
            if (filteredByTypeAndWeakness.length === 0) {
                return <li>No Pokémon found matching your criteria of Type: {searchedType} & Weakness: {searchedWeakness}.</li>;
            }
        return filteredByTypeAndWeakness.map((x) => (
            <li className="" key={x.id}>
            <Link to={`/pokemon/${x.id}`}><b>{x.name}</b> </Link>
            <br></br>{`#: ` + x.num}
            <br></br>{`Type: ` + x.type}
            <br></br>{`Weaknesses: ` + x.weaknesses}
            </li>
        ));
        //populate by Type fiter only 
    } else if (pokemonByType && pokemonByType.length > 0) {
      return pokemonByType.map((x) => (
        <li className="" key={x.id}>
          <Link to={`/pokemon/${x.id}`}><b>{x.name}</b> </Link>
          <br></br>{`#: ` + x.num}
          <br></br>{`Type: ` + x.type}
          <br></br>{`Weaknesses: ` + x.weaknesses}
        </li>
      ));
      //populate by Weakness filter only 
    } else if (pokemonByWeakness && pokemonByWeakness.length > 0) {
      return pokemonByWeakness.map((x) => (
        <li className="" key={x.id}>
          <Link to={`/pokemon/${x.id}`}><b>{x.name}</b> </Link>
          <br></br>{`#: ` + x.num}
          <br></br>{`Type: ` + x.type}
          <br></br>{`Weaknesses: ` + x.weaknesses}
        </li>
      ));
    } else {
      return <li>No Pokémon found matching your criteria.</li>;
    }
  })()}
</ul>
</>  
        );
    }

