const db = require("./db.json");
const { connection, saveToDb } = require("./utils");

const getAllInvoices = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM factura', (err, results, fields) => {
            if (err) {
                reject(err); 
            } else {
                resolve(results);
            }
        });
    }); 
}

const getInvoiceById = async (id) => {
    try {
        const invoice = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM factura WHERE Id_Factura = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
        
        if (invoice.length == 0) {
            throw new Error('Invoice not found');
        }

        const details = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM detalles WHERE Id_Factura = ?', [id], (err, results, fields) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            });
          });

        invoice.detalles = details;

        return invoice;

    } catch (error) {
        console.error('Error searching invoice:', error);
        throw error;
    }
}

const createNewInvoice = async (newInvoice) => { 
   
    try {
        var total = 0.00;
        for (const producto of newInvoice.detalles) {
            total += (producto.precio_unitario * producto.cantidad);
        }
        // Prepare the SQL statement using parameterized queries
        const sql = 'INSERT INTO factura (Id_Factura, Id_Cliente, Id_Empleado, modo_pago, Usocliente_CDFI, Regimenfiscal_CDFI, estatus, total, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [newInvoice.id, newInvoice.cliente, newInvoice.empleado, newInvoice.modo_pago, newInvoice.usocliente_CDFI, newInvoice.regimenfiscal_CDFI, newInvoice.estatus, parseFloat(total.toFixed(2)), newInvoice.createAt];
    
        // Execute the query with async/await for better error handling
        const result = await connection.promise().query(sql, values);
        var resultG;

        if (result) {
            const sql1 = 'INSERT INTO detalles (Id_Factura, Id_Producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)';
            for (const producto of newInvoice.detalles) {
                const values1 = [newInvoice.id, producto.idproducto, producto.cantidad, producto.precio_unitario, (producto.precio_unitario * producto.cantidad)];
                resultG = await connection.promise().query(sql1, values1); 
            }
            if (resultG) console.log("Factura creada correctamente!");
        }

        newInvoice.total = parseFloat(total.toFixed(2));
        
        total = 0;
        return newInvoice;
      } catch (error) {
        console.error("Error creating new invoice:", error);
        throw error; 
      }
    
}

const deleteInvoiceById = async (id) => {
    try {
        const invoice = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM factura WHERE Id_Factura = ?', [id], (err, results, fields) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results);
                }
            });
        });
        
        if (invoice.length == 0) {
            throw new Error('Invoice not found');
        }
    
        const result = await connection.promise().query('DELETE FROM factura WHERE Id_Factura = ?', [id]);
    
        if (result.affectedRows === 0) {
          throw new Error('Error deleting invoice');
        }
    
        return 'Invoice deleted successfully';
      } catch (error) {
        console.error('Error deleting invoice:', error);
        throw error;
      }
}

module.exports = { getAllInvoices, getInvoiceById, deleteInvoiceById, createNewInvoice }