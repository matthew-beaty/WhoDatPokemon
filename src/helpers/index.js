export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// TODO: Instead of randomly getting a specific pokemon, it'd be better to have a 'shuffled' set of each 150,
// so that repeats do not happen. This way, shuffle can also be a toggle-able option for the game.
export const getRandomPokeNum = () => getRandomInt(1, 150);

export const getPokeUrl = (pokeNumber) =>
  `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;

/**
 * Format as a readable percentage
 * @param {*} numerator
 * @param {*} total
 * @returns number
 */
export const percentage = (numerator, total) => {
  const result = Math.round((numerator / total) * 100);
  return isNaN(result) ? 0 : result;
};

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
