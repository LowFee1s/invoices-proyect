const db = require("./db.json");
const { connection, saveToDb } = require("./utils");

const getAllClients = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM clientes', (err, results, fields) => {
            if (err) {
                reject(err); // Handle the error appropriately
            } else {
                resolve(results);
            }
        });
    });
}

const getClientById = async (id) => {
    try {
        const client = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM clientes WHERE Id_Cliente = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err); // Handle the error appropriately
                } else {
                    resolve(results);
                }
            });
        });
        
        if (client.length == 0) {
            throw new Error('Client not found');
        }

        return client;

    } catch (error) {
        console.error('Error searching client:', error);
        throw error;
    }
}

const createNewClient = async (newClient) => { 
   
    try {
        // Prepare the SQL statement using parameterized queries
        const sql = 'INSERT INTO clientes (Id_Cliente, Nombres, Apellidos, Direccion, Telefono, Email, Tipo_Cliente, Fecha_Creado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [newClient.id, newClient.name, newClient.apellidos, newClient.direccion, newClient.telefono, newClient.email, newClient.tipo_cliente, newClient.createAt];
    
        // Execute the query with async/await for better error handling
        const result = await connection.promise().query(sql, values);
    
        // Log the results for debugging purposes
        console.log("Usuario creado correctamente!");
    
        // If successful, return the newly created client object
        return newClient;
      } catch (error) {
        console.error("Error creating new client:", error);
        throw error; 
      }
    
}

const deleteClientById = async (id) => {
    try {
        // Select the client to ensure it exists
        const client = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM clientes WHERE Id_Cliente = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err); // Handle the error appropriately
                } else {
                    resolve(results);
                }
            });
        });
        
        if (client.length == 0) {
            throw new Error('Client not found');
        }
    
        // Delete the client
        const result = await connection.promise().query('DELETE FROM clientes WHERE Id_Cliente = ?', [id]);
    
        if (result.affectedRows === 0) {
          throw new Error('Error deleting client');
        }
    
        return 'Client deleted successfully';
      } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
      }
}

module.exports = { getAllClients, getClientById, deleteClientById, createNewClient }