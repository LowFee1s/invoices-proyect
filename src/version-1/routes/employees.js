const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController.js");

router
    .get("/", employeesController.getAllEmployees)

    .get("/:employeeId", employeesController.getEmployeeById)

    .post("/", employeesController.createNewEmployee)

    .delete("/:employeeId", employeesController.deleteEmployeeById);

module.exports = router;