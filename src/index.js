require('dotenv').config();
const express = require("express")
const PORT = process.env.PORT || 3000;
const v1routerclients = require('./version-1/routes/clients')
const v1routeremployees = require('./version-1/routes/employees')
const app = express();

app.use(express.json());
app.use("/api/version-1/clients", v1routerclients);
app.use("/api/version-1/employees", v1routeremployees);

app.listen(PORT, () => {
    console.log(`🚀 Server listening in port ${PORT} `);
})