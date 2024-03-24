function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function fetchPokemons() {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";
    const pokemonsData = await fetchPokemon(url);

    const pokemons = []

    for (let i = 0; i < pokemonsData.results.length; i ++) {
        const pokemon = pokemonsData.results[i];
        const pokemonDetail = await fetchPokemon(pokemon.url);
       
        pokemons.push(pokemonDetail)
    }

    pokemons.sort((a,b) => a.id < b.id).forEach(async (pokemonDetail) => {
       
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.id = pokemonDetail.name;

        const pId = document.createElement('p');
        pId.classList.add('pid');
        pId.textContent = `${pad(pokemonDetail.id, 3)}`;
        pokemonDiv.appendChild(pId);

        const img = document.createElement('img');
        img.src = pokemonDetail.sprites.front_default;
        pokemonDiv.appendChild(img);

        const pName = document.createElement('p');
        pName.classList.add('name');
        pName.textContent = pokemonDetail.name.toUpperCase();
        pokemonDiv.appendChild(pName);

        const pType = document.createElement('p');
        pType.classList.add('type');
        const types = pokemonDetail.types.map(type => type.type.name).join(', ');
        pType.textContent = types.charAt(0).toUpperCase() + types.slice(1);
        pokemonDiv.appendChild(pType);

        document.getElementById('pokemons').appendChild(pokemonDiv);
    });
}

fetchPokemons();
