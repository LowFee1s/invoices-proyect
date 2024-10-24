const express = require("express");
const router = express.Router();
const invoicesController = require("../../controllers/invoicesController.js");

router
    .get("/", invoicesController.getAllInvoices)

    .get("/:invoiceId", invoicesController.getInvoiceById)

    .post("/", invoicesController.createNewInvoice)

    .delete("/:invoiceId", invoicesController.deleteInvoiceById);

module.exports = router;