import express from "express";
import knex from "../../db/index.js";
import {
  successHandler,
  databaseErrorHandler,
} from "../../responseHandlers/index.js";

const country = express.Router();

// GET ALL http:localhost:8777/api/country/
country.get("/", (req, res) => {
  knex("Country")
    .select()
    .then((signatureArray) => {
      successHandler(res, signatureArray, "GET all countries worked!");
    })
    .catch((error) => {
      databaseErrorHandler(res, error, "Could not get the countries from DB!");
    });
});

export default country;
