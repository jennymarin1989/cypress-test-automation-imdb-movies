/* eslint-disable no-undef */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.imdb.com'
  },
  env: {
    pokemonApi: 'https://pokeapi.co/api/v2'
  }
});
