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
    requestErrorHandler(res, "400 - Request error. Data not found.");
  } else {
    try {
      const image = files.signature;
      const fileContents = readFileSync(image.tempFilePath).toString("base64");
      console.log(fileContents)
      const rowsAffected = await knex("Task")
        .where({ uuid: req.params.id })
        .update({ pu_signature_image: fileContents })
      if (rowsAffected === 1) {
        successHandler(res, String(rowsAffected), `Successfully updated signature, modified rows: ${rowsAffected}.`)
      } else {
        requestErrorHandler(res, `409 - Duplicated: signature with id ${req.params.id}.`)
      }
    } catch (error) {
      databaseErrorHandler(res, error)
    }
  }
})

export default signature;