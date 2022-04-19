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

// This router is about signing the tasks (after pickup and later after delivery)

//UPDATE ONE BY ID PUT http:localhost:8787/api/signature/:id
signature.put("/:id", (req, res) => {
  const files = req.files;
  if (!files) {
    requestErrorHandler(res, "400 - Request error. Data not found.");
  } else if (!req.params.id) {
    requestErrorHandler(res, "400 - Signature id is missing.");
  } else {
      const image = files.signature;

      readFile(image.tempFilePath)
      .then((results) => {
        const fileContents = results.toString();
        
        knex("Signature").where({ uuid: req.params.id }).update({ pu_signature_image: fileContents })
        .then((rowsAffected)=>{
          if (rowsAffected === 1) {
            successHandler(res, String(rowsAffected), `Successfully updated signature, modified rows: ${rowsAffected}.`);
          } else {
            requestErrorHandler(res, `Could not update signature with uuid ${req.params.id}.`)
          }
        })
        .catch((error)=>{
          databaseErrorHandler(res, error, `Trying to update signature with uuid ${req.params.id} failed in DB.`);
        });

      })
      .catch((error) => {
        serverErrorHandler(res, `Temp image file reading operation failed for signature ${req.params.id}`);
      });      
  }
})

export default signature;