export function getListOfTypes (list, prop){
    return [...new Set(list.flatMap((pokemon) => pokemon[prop] || ""))];
   //  console.log(`returnedList`, returnedList); 
}

export function filterPokemonByDropDown (list, searchType){  //item.pokemon (), grass
    if (searchType) {
        return list.filter((pokemon) =>
             pokemon.type.includes(searchType)
    );
    } else {
        return list;
    } 
}

export function filterPokemonByName (list, name){
    if (name) return list.filter((pokemon) => pokemon.name === name); 
    else return list; 
    //make less restricktive to inlcude part of a name & still find the pokemon ("bulb")
}

