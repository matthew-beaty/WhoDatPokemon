export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
export const getRandomPokeNum = () => getRandomInt(1,150)

export const getPokeUrl = (pokeNumber) => `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`