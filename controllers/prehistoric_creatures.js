const express = require("express");
const router = express.Router();
//  (at the very top, declaring your router)
//  your routes here: router.get, router.post, etc
const fs = require("fs");

// prehistoric_creatures

// index route
router.get("/", (req, res) => {
  // get the json from dinosaurs.json
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  // convert the json to javascript
  let creatureData = JSON.parse(creatures);

  let nameFilter = req.query.nameFilter;
  // keep in creatureData any creatures whose name matches the
  // nameFilter the user searched for
  if (nameFilter) {
    creatureData = creatureData.filter((creature) => {
      return creature.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }
  // render our creature index page and pass it the
  // creatureData as "myCreatures"
  res.render("prehistoric_creatures/index", { myCreatures: creatureData });
});
// TODO: add somewhere if filter search cant find something type text cant found

// get the new creature
router.get("/new", (req, res) => {
  res.render("prehistoric_creatures/new");
});

// show route [uses URL parameter "id"]
router.get("/:id", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(creatures);
  // grab the id parameter from the url and convert it to int (was string originally)
  let creatureIndex = parseInt(req.params.id);
  res.render("prehistoric_creatures/show", {
    myCreature: creatureData[creatureIndex],
  });
});

// post a new creature!
router.post("/", (req, res) => {
  // get json creatures and converrt to a js array of objects
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(creatures);
  // push new creature to the array
  creatureData.push(req.body);
  // convert creatureData back to json and write to prehistoric_creatures.json file
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(creatureData)
  );
  // redirect to the index get route
  res.redirect("/prehistoric_creatures");
});

module.exports = router;
// (at the bottom, so routes can be included elsewhere)
