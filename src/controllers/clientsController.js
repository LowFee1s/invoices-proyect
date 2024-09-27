const clientsService = require("../services/clientsService.js");

const getAllClients = async (req, res) => {
    const allClients = await clientsService.getAllClients();
    res.status(200).send({ status: "OK", data: allClients })
};

const getClientById = async (req, res) => {
    const { params: { clientId }, } = req; 
    if (!clientId) {
        return;
    }
    try {
        const client = await clientsService.getClientById(clientId);
        res.status(200).send({ status: "OK", data: client })
    } catch (error) {
        res.status(500).send({ error: 'Failed to searching client' });
    }
};

const createNewClient = async (req, res) => {
    const { body } = req;

    if (!body.name || !body.apellidos || !body.direccion || !body.email || !body.tipo_cliente || !body.telefono) {
        res.status(400).send({ error: 'Falta informacion en el body' });
        return;
    }

    const newClient = {
        name: body.name,
        apellidos: body.apellidos,
        direccion: body.direccion,
        email: body.email,
        tipo_cliente: body.tipo_cliente,
        telefono: body.telefono,
    };

    const createClient = await clientsService.createNewClient(newClient);
    res.status(201).send({ status: "OK", data: createClient });
};

const deleteClientById = async (req, res) => {
    const { params: { clientId }, } = req;
    
    if (!clientId) {
        return;
    }
    try {
      const result = await clientsService.deleteClientById(clientId);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete client' });
    }
};

module.exports = {
    getAllClients, 
    getClientById,
    createNewClient,
    deleteClientById,
};