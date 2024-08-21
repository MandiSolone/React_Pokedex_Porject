
export function getListOfTypes (list, prop){
    return [...new Set(list.flatMap((pokemon) => pokemon[prop] || ""))].sort();
}

export function getListOfWeakness(list, prop){
    return [...new Set(list.flatMap((pokemon) => pokemon[prop] || ""))].sort();
}

// else {return list; }
export function filterPokemonByName(list, name) {
    if (name) {
        return list.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
    } else {
        return ('');
    }
}

export function filterPokemonByTypeSelect (list, selectedPokemonType){  //item.pokemon (), grass
    if (selectedPokemonType) {
        return list.filter((pokemon) =>
             pokemon.type.includes(selectedPokemonType)
    );
    } else {
        return ('');
    } 
}

export function filterPokemonByWeaknessSelected (list, selectedWeakness){  //item.pokemon (), grass
    if (selectedWeakness) {
        return list.filter((pokemon) =>
             pokemon.weaknesses.includes(selectedWeakness)
    );
    } else {
        return ('');
    } 
}

export function nextEvolution(pokemon) {
    if (!pokemon.next_evolution) {
        return []; // Return an empty array if there are no next evolutions
    }
    
    return pokemon.next_evolution.map(evolution => evolution.name);
}

