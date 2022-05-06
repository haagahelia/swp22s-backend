import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const country = express.Router();

// This router is for get all country from the database

// GET ALL http:localhost:8777/api/report/
country.get("/", (req, res) => {
    knex("Country").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all countries !")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the countries from DB!")
        })
})

export default country;