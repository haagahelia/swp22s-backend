import express from 'express';
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
  successHandler,
  requestErrorHandler,
  databaseErrorHandler
} from "../../responseHandlers/index.js"

const signature = express.Router();

// This router is about signing the tasks (after pickup and later after delivery)

//UPDATE ONE BY ID PUT http:localhost:8787/api/signature/:id
signature.put("/:id", async (req, res) => {
  const files = req.files;
  if (!files) {
    requestErrorHandler(res, 400, "Request error. Data not found.");
  } else if (!req.params.id) {
    requestErrorHandler(res, 400, "Signature id is missing.");
  } else {
    try {
      const image = files.signature;
      const fileContents = readFileSync(image.tempFilePath).toString();
      const rowsAffected = await knex("Signature")
        .where({ id: req.params.id })
        .update({ image: fileContents })
      if (rowsAffected === 1) {
        successHandler(res, String(rowsAffected), `Successfully updated signature, modified rows: ${rowsAffected}.`)
      } else {
        requestErrorHandler(res, 409, `Duplicated: signature with id ${req.params.id}.`)
      }
    } catch (error) {
      databaseErrorHandler(res, error)
    }
  }
})

export default signature;