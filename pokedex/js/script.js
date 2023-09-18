const pokemonImage = document.querySelector('.pokemon_image')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
let searchPokemon = 350

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (apiResponse.status === 200) {
        const data = await apiResponse.json();
        return data;
    }
}
const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = ''
    pokemonName.innerHTML = 'Buscando dados'
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonNumber.innerHTML = data.id
        pokemonName.innerHTML = data.name
    } else {
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = ''
        pokemonName.innerHTML = 'Pokemon não foi encontrado'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);