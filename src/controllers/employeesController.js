const employeesService = require("../services/employeesService");

const getAllEmployees = async (req, res) => {
    const allEmployees = await employeesService.getAllEmployees();
    res.status(200).send({ status: "OK", data: allEmployees })
};

const getEmployeeById = async (req, res) => {
    const { params: { employeeId }, } = req; 
    if (!employeeId) {
        return;
    }
    try {
        const employee = await employeesService.getEmployeeById(employeeId);
        res.status(200).send({ status: "OK", data: employee })
    } catch (error) {
        res.status(500).send({ error: 'Failed to searching employee' });
    }
};

const createNewEmployee = async (req, res) => {
    const { body } = req;

    if (!body.name || !body.apellidos || !body.direccion || !body.email || !body.rfc || !body.telefono) {
        res.status(400).send({ error: 'Falta informacion en el body' });
        return;
    }

    const newEmployee = {
        name: body.name,
        apellidos: body.apellidos,
        direccion: body.direccion,
        email: body.email,
        rfc: body.rfc,
        telefono: body.telefono,
    };

    const createEmployee = await employeesService.createNewEmployee(newEmployee);
    res.status(201).send({ status: "OK", data: createEmployee });
};

const deleteEmployeeById = async (req, res) => {
    const { params: { employeeId }, } = req;
    
    if (!employeeId) {
        return;
    }
    try {
      const result = await employeesService.deleteEmployeeById(employeeId);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete employee' });
    }
};

module.exports = {
    getAllEmployees, 
    getEmployeeById,
    createNewEmployee,
    deleteEmployeeById,
};