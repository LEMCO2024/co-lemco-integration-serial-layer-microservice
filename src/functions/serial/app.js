const { POOL_STATUS_CLOSED } = require("./utils/constans.js")
const db = require('./utils/db_manager.js');
let dbPool = null;

const serverlessExpress = require('@vendia/serverless-express');
const express = require("express");
const cors = require("cors");
const api = require("./routes.js");
const app = express();
app.disable('x-powered-by');
// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
// Lambda main route
app.use("", api);

async function initializeServer() {
    try {
        console.log(dbPool, "dbPool")
        if (!dbPool || dbPool.status == POOL_STATUS_CLOSED) {
            dbPool = await db.openConnection();
        }
        // Start the server
        return serverlessExpress({ app });
    } catch (error) {
        console.error('Error during initialization:', error);
        throw error; // Rethrow the error to terminate Lambda execution
    }
}

// Lambda handler
module.exports.handler = async (event, context) => {
    const server = await initializeServer();
    return server(event, context);
};