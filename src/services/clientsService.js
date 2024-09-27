const Clients = require("../database/Clients");
const { v4: uuid } = require("uuid");

const getAllClients = async () => {
    const AllClients = await Clients.getAllClients();
    return AllClients;
}
const getClientById = async (id) => {
    try {
        const client = await Clients.getClientById(id);
        return client;
    } catch (error) {
        throw error;
    }
}
const createNewClient = async (newClient) => {
    const clientToInsert = {
        ...newClient,
        id: uuid(),
        createAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }

    const createdClient = await Clients.createNewClient(clientToInsert)
    console.log(createdClient);
    
    return createdClient;
}

const deleteClientById = async (id) => {
    try {
        const client = await Clients.deleteClientById(id);
        return client;
      } catch (error) {
        throw error; // Re-throw the error to be handled by a higher-level component
      }
}

module.exports = {
    getAllClients, 
    getClientById,
    createNewClient,
    deleteClientById,
}