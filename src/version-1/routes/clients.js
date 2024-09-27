const express = require("express");
const router = express.Router();
const clientsController = require("../../controllers/clientsController");

router
    .get("/", clientsController.getAllClients)

    .get("/:clientId", clientsController.getClientById)

    .post("/", clientsController.createNewClient)

    .delete("/:clientId", clientsController.deleteClientById);

module.exports = router;