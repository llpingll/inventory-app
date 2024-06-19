const Pokemon = require("../models/pokemon");
const Captured = require("../models/captured");
const Types = require("../models/types");
const asyncHandler = require("express-async-handler");
const { render } = require("ejs");
const pokemon = require("../models/pokemon");
const { body, validationResult } = require("express-validator");

// Define the rarity options for pokemon form
const rarityOptions = [
  "Common",
  "Uncommon",
  "Rare",
  "Very rare",
  "Epic",
  "Legendary",
];

// Display index on GET.
exports.index = asyncHandler(async (req, res, next) => {
  const [totalPokemon, totalCaptured, totalTypes] = await Promise.all([
    Pokemon.countDocuments({}).exec(),
    Captured.countDocuments({}).exec(),
    Types.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Pokedex Index",
    totalPokemon: totalPokemon,
    totalCaptured: totalCaptured,
    totalTypes: totalTypes,
  });
});

// Display pokemon list on GET.
exports.pokemon_list = asyncHandler(async (req, res, next) => {
  const pokemons = await Pokemon.find({}).exec();

  res.render("pokemon_list", { title: "Pokemon List", pokemons: pokemons });
});

// Display detail page for a specific pokemon.
exports.pokemon_detail = asyncHandler(async (req, res, next) => {
  const pokemon = await Pokemon.findById(req.params.id).populate("type").exec();
  if (pokemon === null) {
    const error = new Error("Pokemon not found");
    error.status = 404;
    return next(error);
  }
  res.render("pokemon_detail", { title: "Pokemon Detail", pokemon: pokemon });
});

// Display Pokemon create form on GET.
exports.pokemon_create_get = (req, res, next) => {
  res.render("pokemon_add", { title: "Add Pokemon", rarityOptions });
};

// Handle Pokemon create form on POST.
exports.pokemon_create_post = [
  // Validate and sanitize inputs
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("First name must be 3 or more letters long.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("description")
    .isLength({ min: 10 })
    .escape()
    .withMessage("Description must be 10 or more letters long."),
  body("rarity")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Rarity must be 3 or more letters long."),
  body("type")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Type must be 3 or more letters long."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Convert type string to array
    const typeArray = req.body.type.split(",").map((type) => type.trim());

    // Get types from database
    const typeObjects = await Types.find({ type: { $in: typeArray } })
      .collation({ locale: "en", strength: 2 })
      .exec();
    // Get typeObjects IDs
    const typeIDs = typeObjects.map((objects) => objects._id);

    // Custom validation: Add new error if type validation fails
    if (typeIDs.length !== typeArray.length) {
      errors.errors.push({
        value: req.body.type,
        msg: "One or more types are invalid.",
        path: "type",
        location: "body",
      });
    }

    // Rerender form with sanitized values if validation errors exist
    if (!errors.isEmpty()) {
      res.render("pokemon_add", {
        title: "Add Pokemon",
        rarityOptions,
        errors: errors.array(),
        name: req.body.name,
        description: req.body.description,
        rarity: req.body.rarity,
        type: req.body.type,
      });
      console.log("Body validation error", errors.array());
      return;
    }

    // Data from form is valid.
    // Create a pokemon object with escaped and trimmed data.
    const pokemon = new Pokemon({
      name: req.body.name,
      description: req.body.description,
      rarity: req.body.rarity,
      type: typeIDs,
    });

    // Check if pokemon with same name already exists.
    const existingPokemon = await Pokemon.findOne({ name: req.body.name });
    // Pokemon exists, redirect to its detail page.
    if (existingPokemon) {
      console.log("Pokemon exists");
      res.redirect(`/pokedex/pokemon/${pokemon._id}`);
    } else {
      await pokemon.save();
      console.log("Created");
      res.redirect(`/pokedex/pokemon/${pokemon._id}`);
    }
  }),
];

// Display Pokemon delete form on GET.
exports.pokemon_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete GET");
});

// Handle Pokemon delete form on POST.
exports.pokemon_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete POST");
});

// Display Pokemon update form on GET.
exports.pokemon_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update GET");
});

// Handle Pokemon update form on POST.
exports.pokemon_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update POST");
});
