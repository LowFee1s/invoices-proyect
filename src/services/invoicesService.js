const Invoices = require("../database/Invoices");
const { v4: uuid } = require("uuid");

const getAllInvoices = async () => {
    const AllInvoices = await Invoices.getAllInvoices();
    return AllInvoices;
}
const getInvoiceById = async (id) => {
    try {
        const invoice = await Invoices.getInvoiceById(id);
        return invoice;
    } catch (error) {
        throw error;
    }
}
const createNewInvoice = async (newInvoice) => {
    const invoiceToInsert = {
        ...newInvoice,
        id: uuid(),
        createAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }

    const createdInvoice = await Invoices.createNewInvoice(invoiceToInsert)
    console.log(createdInvoice);
    
    return createdInvoice;
}

const deleteInvoiceById = async (id) => {
    try {
        const invoice = await Invoices.deleteInvoiceById(id);
        return invoice;
      } catch (error) {
        throw error; // Re-throw the error to be handled by a higher-level component
      }
}

module.exports = {
    getAllInvoices, 
    getInvoiceById,
    createNewInvoice,
    deleteInvoiceById,
}