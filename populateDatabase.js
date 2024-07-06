#! /usr/bin/env node

console.log(
  'This script populates some pokemon to your database. Specified database as argument - e.g.: node populatedatabase "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Pokemon = require("./models/pokemon");
const Captured = require("./models/captured");
const Types = require("./models/types");

const pokemonArray = [];
const capturedArray = [];
const typesArray = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createTypes();
  await createPokemon();
  await createCaptured();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Create types
async function typesCreate(index, type) {
  const types = new Types({ type: type });
  await types.save();
  typesArray[index] = types;
  console.log(`Added type: ${type}`);
}

async function createTypes() {
  console.log("Adding types");

  const types = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
  ];

  await Promise.all(types.map((type, index) => typesCreate(index, type)));
}

// Create pokemon
async function pokemonCreate(index, name, description, rarity, typeNames) {
  // Find the types by name
  const typeObjects = typesArray.filter((typeObj) =>
    typeNames.includes(typeObj.type)
  );
  const typeIds = typeObjects.map((typeObj) => typeObj._id);

  // Dont create pokemon if type id invalid
  if (typeIds.length === 0) {
    console.log(`Error: No valid types found for Pokémon: ${name}`);
    return;
  }

  const pokemondetail = {
    name: name,
    description: description,
    rarity: rarity,
    type: typeIds,
  };

  const pokemon = new Pokemon(pokemondetail);

  await pokemon.save();
  pokemonArray[index] = pokemon;
  console.log(`Added pokemon: ${name}`);
}

async function createPokemon() {
  console.log("Adding pokemon");
  await Promise.all([
    pokemonCreate(
      0,
      "Charmander",
      "Charmander is a Fire type Pokémon introduced in Generation 1. Charmander is a bipedal, reptilian Pokémon. Most of its body is colored orange, while its underbelly is light yellow and it has blue eyes. It has a flame at the end of its tail, which is said to signify its health. Charmander's design is based on a lizard, however as its name suggests it may also have been inspired by salamanders, which in mythology have an affinity with fire.",
      "Epic",
      ["Fire"]
    ),
    pokemonCreate(
      1,
      "Squirtle",
      "Squirtle is a Water type Pokémon introduced in Generation 1. Squirtle is a bipedal, reptilian Pokémon. It has a blue body with purple eyes, a light brown belly, and a tough red-brown shell on its back. It has a long tail that curls into a spiral. Squirtle is primarily based on a turtle, taking inspiration from both land-dwelling and sea-dwelling varieties. The curly tail resembles a crashing wave.",
      "Epic",
      ["Water"]
    ),
    pokemonCreate(
      2,
      "Bulbasaur",
      "Bulbasaur is a Grass/Poison type Pokémon introduced in Generation 1. Bulbasaur is a small, mainly turquoise amphibian Pokémon with red eyes and a green bulb on its back. It is based on a frog/toad, with the bulb resembling a plant bulb that grows into a flower as it evolves. Bulbasaur is notable for being the very first Pokémon in the National Pokédex.",
      "Epic",
      ["Grass", "Poison"]
    ),
    pokemonCreate(
      3,
      "Pikachu",
      "Pikachu is an Electric type Pokémon introduced in Generation 1.",
      "Epic",
      ["Electric"]
    ),
    pokemonCreate(
      4,
      "Pidgy",
      "Pidgey is a Normal/Flying type Pokémon introduced in Generation 1.",
      "Common",
      ["Normal", "Flying"]
    ),
  ]);
}

// Create captured pokemon
async function capturedCreate(
  index,
  pokemon,
  nickName,
  capturedLevel,
  captureDate
) {
  const capturedDetails = {
    pokemon: pokemon,
    capturedLevel: capturedLevel,
    nickName: nickName,
    captureDate: captureDate,
  };

  const capturedPokemon = new Captured(capturedDetails);
  await capturedPokemon.save();
  capturedArray[index] = capturedPokemon;
  console.log(`Added captured pokemon: ${capturedPokemon.pokemon.name}`);
}

async function createCaptured() {
  console.log("Adding captured");

  await Promise.all([
    capturedCreate(0, pokemonArray[0], undefined, 5),
    capturedCreate(1, pokemonArray[1], "Wet", 6),
    capturedCreate(2, pokemonArray[2], "Pika", 2),
    capturedCreate(3, pokemonArray[3], "Wing", 2),
  ]);
}
