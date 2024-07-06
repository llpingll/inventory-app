const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB =
  "mongodb+srv://luiduarte1:iENCCzp0ZShQYBl1@cluster0.lwbvp2w.mongodb.net/inventory-app?retryWrites=true&w=majority&appName=Cluster0";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log(`connected to ${mongoDB}`);
}

module.exports = mongoose.connection;
