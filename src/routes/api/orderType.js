import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const orderType = express.Router();

// GET ALL http:localhost:8777/api/report/
orderType.get("/", (req, res) => {
    knex("OrderType").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all Order Type !")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the Order Type from DB!")
        })
})

export default orderType;