const Employees = require("../database/Employees");
const { v4: uuid } = require("uuid");

const getAllEmployees = async () => {
    const AllEmployees = await Employees.getAllEmployees();
    return AllEmployees;
}
const getEmployeeById = async (id) => {
    try {
        const employee = await Employees.getEmployeeById(id);
        return employee;
    } catch (error) {
        throw error;
    }
}
const createNewEmployee = async (newEmployee) => {
    const employeeToInsert = {
        ...newEmployee,
        id: uuid(),
        createAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }

    const createdEmployee = await Employees.createNewEmployee(employeeToInsert)
    console.log(createdEmployee);
    
    return createdEmployee;
}

const deleteEmployeeById = async (id) => {
    try {
        const employee = await Employees.deleteEmployeeById(id);
        return employee;
      } catch (error) {
        throw error; // Re-throw the error to be handled by a higher-level component
      }
}

module.exports = {
    getAllEmployees, 
    getEmployeeById,
    createNewEmployee,
    deleteEmployeeById,
}