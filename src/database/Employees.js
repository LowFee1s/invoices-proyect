const db = require("./db.json");
const { connection, saveToDb } = require("./utils");

const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM empleados', (err, results, fields) => {
            if (err) {
                reject(err); // Handle the error appropriately
            } else {
                resolve(results);
            }
        });
    }); 
}

const getEmployeeById = async (id) => {
    try {
        const employee = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM empleados WHERE Id_Empleado = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err); // Handle the error appropriately
                } else {
                    resolve(results);
                }
            });
        });
        
        if (employee.length == 0) {
            throw new Error('Employee not found');
        }

        return employee;

    } catch (error) {
        console.error('Error searching employee:', error);
        throw error;
    }
}

const createNewEmployee = async (newEmployee) => { 
   
    try {
        // Prepare the SQL statement using parameterized queries
        const sql = 'INSERT INTO empleados (Id_Empleado, Nombres, Apellidos, Direccion, Telefono, Email, RFC, Fecha_Creado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [newEmployee.id, newEmployee.name, newEmployee.apellidos, newEmployee.direccion, newEmployee.telefono, newEmployee.email, newEmployee.rfc, newEmployee.createAt];
    
        // Execute the query with async/await for better error handling
        const result = await connection.query(sql, values);
    
        // Log the results for debugging purposes
        console.log("Usuario creado correctamente!");
    
        // If successful, return the newly created employee object
        return newEmployee;
      } catch (error) {
        console.error("Error creating new employee:", error);
        throw error; 
      }
    
}

const deleteEmployeeById = async (id) => {
    try {
        // Select the employee to ensure it exists
        const employee = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM empleados WHERE Id_Empleado = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err); // Handle the error appropriately
                } else {
                    resolve(results);
                }
            });
        });
        
        if (employee.length == 0) {
            throw new Error('Employee not found');
        }
    
        // Delete the employee
        const result = await connection.query('DELETE FROM empleados WHERE Id_Empleado = ?', [id]);
    
        if (result.affectedRows === 0) {
          throw new Error('Error deleting employee');
        }
    
        return 'Employee deleted successfully';
      } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
      }
}

module.exports = { getAllEmployees, getEmployeeById, deleteEmployeeById, createNewEmployee }