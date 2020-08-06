const express = require("express");
const app = express();
// create an instance of layouts
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");
const methodOverride = require("method-override");

// tell express we are using ejs
app.set("view engine", "ejs");
// tell express to let us use an ejslayout
app.use(ejsLayouts);
// body-parser middleware
app.use(express.urlencoded({ extended: false }));

// configuring method override to be used in the app
app.use(methodOverride("_method"));

app.use("/dinosaurs", require("./controllers/dinosaurs"));
//(linking your / dinosaurs routes to your dinosaurs.js router)
app.use(
  "/prehistoric_creatures",
  require("./controllers/prehistoric_creatures")
);
//(linking your / prehistoric_creatures routes to your prehistoric_creatures.js router)

// home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(8000, () => {
  console.log("HE-MAN reporting to the 8000th regiment, sir.");
});
