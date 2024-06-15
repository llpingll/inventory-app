const Pokemon = require("../models/pokemon");
const Captured = require("../models/captured");
const Types = require("../models/types");
const asyncHandler = require("express-async-handler");
const { render } = require("ejs");
const pokemon = require("../models/pokemon");

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
  const pokemon = await Pokemon.findOne({ id: req.params.id });
  res.render("pokemon_detail", { title: "Pokemon Details", pokemon: pokemon });
});

// Display Pokemon create form on GET.
exports.pokemon_create_get = (req, res, next) => {
  res.render("pokemon_form", { title: "Add Pokemon" });
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

    // Create a pokemon object with escaped and trimmed data.
    const pokemon = new Pokemon({
      name: req.body.name,
      description: req.body.description,
      rarity: req.body.rarity,
      type: req.body.type,
    });

    // Rerender form with sanitized values if errors exist
    if (!errors.isEmpty()) {
      res.render("pokemon_add", {
        title: "Add Pokemon",
        pokemon: pokemon,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if pokemon with same name already exists.
      const existingPokemon = await Pokemon.findOne({ name: req.body.name });
      // Pokemon exists, redirect to its detail page.
      if (existingPokemon) {
        res.redirect("/pokedex/pokemon/:id");
      } else {
        await pokemon.save();
        res.redirect("/pokedex/pokemon/:id");
      }
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
