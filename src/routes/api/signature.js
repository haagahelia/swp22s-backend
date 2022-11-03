import express from 'express';
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import knex from "../../db/index.js"
import {
  successHandler,
  requestErrorHandler,
  databaseErrorHandler,
  serverErrorHandler
} from "../../responseHandlers/index.js"

const signature = express.Router();

//signing the tasks (after pickup and later after delivery): UPDATE ONE BY ID PUT http:localhost:8787/api/signature/:id
signature.put("/:id", async (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      requestErrorHandler(res, "400 - Request error. Data not found.");
    } else {
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
    }
  } catch (error) {
      databaseErrorHandler(res, error)
  }
})

export default signature;