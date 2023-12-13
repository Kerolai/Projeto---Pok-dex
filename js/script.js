const pokemon_Name = document.querySelector('.pokemon_name');
const pokemon_Number = document.querySelector('.pokemon_number');
const pokemon_Image = document.querySelector('.pokemon_image');
const Form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let currentPokemonId = 1; // Inicialmente, exibiremos o Pokémon de ID 1

const fetchPokemon = async (pokemonId) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        } else {
            throw new Error('Pokemon not found');
        }
    } catch (error) {
        throw error;
    }
};

const renderPokemon = async (pokemonId) => {
    try {
        pokemon_Name.innerHTML = 'Loading ...';
        pokemon_Number.innerHTML = '';

        const data = await fetchPokemon(pokemonId);

        pokemon_Name.innerHTML = data.name;
        pokemon_Number.innerHTML = data.id;
        pokemon_Image.src = data.sprites.other['official-artwork'].front_default;
        input.value = '';
    } catch (error) {
        pokemon_Image.style.display = 'none';
        pokemon_Name.innerHTML = 'Not found :c';
        pokemon_Number.innerHTML = '';
        input.value = '';
    }
};

Form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemonId = input.value;
    if (!isNaN(pokemonId) && pokemonId >= 1 && pokemonId <= 898) {
        currentPokemonId = Number(pokemonId);
        renderPokemon(currentPokemonId);
    } else {
        alert('Por favor, insira um número de Pokémon válido (1-898).');
    }
});

btnPrev.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        renderPokemon(currentPokemonId);
    }
});

btnNext.addEventListener('click', () => {
    if (currentPokemonId < 898) {
        currentPokemonId++;
        renderPokemon(currentPokemonId);
    }
});

// Inicialmente, carrega o primeiro Pokémon
renderPokemon(currentPokemonId);