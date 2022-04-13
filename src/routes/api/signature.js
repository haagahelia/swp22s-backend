import express from "express"
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
  successHandler,
  requestErrorHandler,
  databaseErrorHandler
} from "../../responseHandlers/index.js"

const signatureRouter = express()

// GET ALL http:localhost:8787/api/signatures/all
signatureRouter.get("", async (_, res) => {
  try {
    const signatures = await knex("Task")
    return signatures
      ? successHandler(res, signatures)
      : requestErrorHandler(res, "404 - Request error. Data not found.")
  } catch (err) {
    databaseErrorHandler(res, err)
  }
})

//GET ONE BY ID http:localhost:8777/api/signatures/:uuid
signatureRouter.get("/:uuid", (req, res) => {
  if (!req.params.uuid) {
    requestErrorHandler(res, "400 Task's uuid is missing.");
  } else {
    knex("Task").select().where("uuid", req.params.uuid)
    .then( (signatureArray) => {
      if (signatureArray.length === 1) {
        successHandler(res, signatureArray[0]);
      } else {
        requestErrorHandler(res, `404 - Task with uuid: ${req.params.uuid} not found.`);
      }
    })   
    .catch((error) => {
      databaseErrorHandler(res, error, "Some database error happened");
    })
  }
})

//SAVE TO DB POST http:localhost:8787/api/signatures
signatureRouter.post("/", async (req, res) => {
  //Note req.files not req.body!
  const files = req.files;
  if (!files) {
    requestErrorHandler(res, 400, "Request error. Data not found.");
  } else if (!files.signature) {
    requestErrorHandler(res, 400, "Signature not found in file");
  } else {
    try {
      const image = files.signature;
      const filecontents = readFileSync(image.tempFilePath).toString();
      const rowIdArr = await knex
        .insert({ image: filecontents })
        .into("Signature")
      successHandler(res, rowIdArr, `Signature successfully saved, inserted row id: ${rowIdArr}`, 201)
    } catch (err) {
      databaseErrorHandler(res, err);
    }
  }
})

//DELETE ONE BY ID http:localhost:8787/api/signatures/:id
signatureRouter.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    requestErrorHandler(res, 400, "Signature id is missing.");
  } else {
    try {
      const rowsAffected = await knex("Signature")
        .where("id", req.params.id)
        .del()
      if (rowsAffected === 1) {
        successHandler(res, rowsAffected, `Successfully deleted signature, modified rows: ${rowsAffected}.`, 204);
      } else {
        requestErrorHandler(res, 404, `Signature with id: ${req.params.id} not found.`);
      }
    } catch (error) {
      databaseErrorHandler(res, error)
    }
  }
})

//UPDATE ONE BY ID PUT http:localhost:8787/api/signatures/:id
signatureRouter.put("/:id", async (req, res) => {
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

export default signatureRouter