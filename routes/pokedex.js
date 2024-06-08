const express = require("express");
const router = express.Router();

// Require controllers
const types_controller = require("../controllers/typesController");
const pokemon_controller = require("../controllers/pokemonController");
const captured_controller = require("../controllers/capturedController");

// POKEMON ROUTES

// GET pokemon homepage
router.get("/", pokemon_controller.index);

// GET request for pokemon list
router.get("/pokemon", pokemon_controller.pokemon_list);

// GET request for creating a pokemon
router.get("/pokemon/create", pokemon_controller.pokemon_create_get);

// POST request for creating a pokemon
router.post("/pokemon/create", pokemon_controller.pokemon_create_post);

// GET request for deleting a pokemon
router.get("/pokemon/:id/delete", pokemon_controller.pokemon_delete_get);

// POST request for deleting a pokemon
router.post("/pokemon/:id/delete", pokemon_controller.pokemon_delete_post);

// GET request for updating a pokemon
router.get("/pokemon/:id/update", pokemon_controller.pokemon_update_get);

// POST request for updating a pokemon
router.post("/pokemon/:id/update", pokemon_controller.pokemon_update_post);

// CAPTURED ROUTES

// GET request for captured list
router.get("/captured", captured_controller.captured_list);

// GET request for creating a captured
router.get("/captured/create", captured_controller.captured_create_get);

// POST request for creating a captured
router.post("/captured/create", captured_controller.captured_create_post);

// GET request for deleting a captured
router.get("/captured/:id/delete", captured_controller.captured_delete_get);

// POST request for deleting a captured
router.post("/captured/:id/delete", captured_controller.captured_delete_post);

// GET request for updating a captured
router.get("/captured/:id/update", captured_controller.captured_update_get);

// POST request for updating a captured
router.post("/captured/:id/update", captured_controller.captured_update_post);

// DELETE ROUTES

// GET request for types list
router.get("/types", types_controller.types_list);

// GET request for creating a types
router.get("/types/create", types_controller.types_create_get);

// POST request for creating a types
router.post("/types/create", types_controller.types_create_post);
