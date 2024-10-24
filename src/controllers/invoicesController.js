const invoicesService = require("../services/invoicesService");

const getAllInvoices = async (req, res) => {
    const allInvoices = await invoicesService.getAllInvoices();
    res.status(200).send({ status: "OK", data: allInvoices })
};

const getInvoiceById = async (req, res) => {
    const { params: { invoiceId }, } = req; 
    if (!invoiceId) {
        return;
    }
    try {
        const invoice = await invoicesService.getInvoiceById(invoiceId);
        res.status(200).send({ status: "OK", data: invoice })
    } catch (error) {
        res.status(500).send({ error: 'Failed to searching invoice' });
    }
};

const createNewInvoice = async (req, res) => {
    const { body } = req;

    if (!body.cliente || !body.empleado || !body.modo_pago || !body.usocliente_CDFI || !body.regimenfiscal_CDFI || !body.detalles || !body.estatus) {
        res.status(400).send({ error: 'Falta informacion en el body' });
        return;
    }

    const newInvoice = {
        cliente: body.cliente,
        empleado: body.empleado,
        modo_pago: body.modo_pago,
        usocliente_CDFI: body.usocliente_CDFI,
        regimenfiscal_CDFI: body.regimenfiscal_CDFI,
        estatus: body.estatus,
        detalles: [],
    };

    body.detalles.forEach(detalle => {
        newInvoice.detalles.push({
            idproducto: detalle.idproducto,
            cantidad: detalle.cantidad,
            precio_unitario: detalle.precio_unitario,
        });
      });

    const createInvoice = await invoicesService.createNewInvoice(newInvoice);
    res.status(201).send({ status: "OK", data: createInvoice });
};

const deleteInvoiceById = async (req, res) => {
    const { params: { invoiceId }, } = req;
    
    if (!invoiceId) {
        return;
    }
    try {
      const result = await invoicesService.deleteInvoiceById(invoiceId);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete invoice' });
    }
};

module.exports = {
    getAllInvoices, 
    getInvoiceById,
    createNewInvoice,
    deleteInvoiceById,
};