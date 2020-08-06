const express = require("express");
const router = express.Router();
//  (at the very top, declaring your router)
//  your routes here: router.get, router.post, etc
const fs = require("fs");
const { Router } = require("express");

// index route
router.get("/", (req, res) => {
  // get the json from dinosaurs.json
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  // convert the json to javascript
  let dinoData = JSON.parse(dinosaurs);

  let nameFilter = req.query.nameFilter;
  // keep in dinoData any dinos whose name matches the
  // nameFilter the user searched for
  if (nameFilter) {
    dinoData = dinoData.filter((dino) => {
      return dino.name.toLowerCase() === nameFilter.toLowerCase();
    });
  }
  // render our dino index page and pass it the
  // dinoData as "myDinos"
  res.render("dinosaurs/index", { myDinos: dinoData });
});
// TODO: add somewhere if filter search cant find something type text cant found

// get the new dino
router.get("/new", (req, res) => {
  res.render("dinosaurs/new");
});

// get the update form
router.get("/edit/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  res.render("dinosaurs/edit", {
    dino: dinoData[req.params.id],
    dinoId: req.params.id,
  });
});

// put route for updating dino information
router.put("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  dinosaurs = JSON.parse(dinosaurs);

  // update the info
  // re-assigning the name and type fields of the dinosaur
  dinosaurs[req.params.id].name = req.body.name;
  dinosaurs[req.params.id].type = req.body.type;

  // save the edited dinosaurs information
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinosaurs));
  res.redirect("/dinosaurs");
});

// show route [uses URL parameter "id"]
router.get("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // grab the id parameter from the url and convert it to int (was string originally)
  let dinoIndex = parseInt(req.params.id);
  res.render("dinosaurs/show", { myDino: dinoData[dinoIndex] });
});

// post a new dino!
router.post("/", (req, res) => {
  // get json dinos and converrt to a js array of objects
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // push new dino to the array
  dinoData.push(req.body);
  // convert dinoData back to json and write to dinosaurs.json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  // redirect to the index get route
  res.redirect("/dinosaurs");
});

router.delete("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  dinosaurs = JSON.parse(dinosaurs);

  // delete the dinosaur from the dinosaurs json file
  // use the splice() method to deleite it from the array that's saved in the variable dinosaurs
  dinosaurs.splice(req.params.id, 1);

  // save the dinosaurs back into the JSON file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinosaurs));

  res.redirect("/dinosaurs");
});
// we deleted petrie... moment of silence.

module.exports = router;
// (at the bottom, so routes can be included elsewhere)
