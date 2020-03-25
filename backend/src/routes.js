const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentsController = require("./controllers/IncidentsController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.get("/ongs", OngController.index);

routes.post("/ongs", OngController.create);

//ROTAS DE CASOS
routes.get("/incidents", IncidentsController.index);

routes.post("/incidents", IncidentsController.create);

routes.delete("/incidents/:id", IncidentsController.delete);

//PROFILE ONGS
routes.get("/profile", ProfileController.index);

//SESSION
routes.post("/sessions", SessionController.create);

module.exports = routes;
