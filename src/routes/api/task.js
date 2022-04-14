import express from 'express';
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
  successHandler,
  requestErrorHandler,
  databaseErrorHandler
} from "../../responseHandlers/index.js"

const router = express();

// This router is about adding more individual order pickup tasks etc. 
// Not about signing, not about summary reports or lists.
  
//GET ONE BY ID http:localhost:8777/api/signature/:uuid
router.get("/:uuid", (req, res) => {
    if (!req.params.uuid) {
        requestErrorHandler(res, "400 Task's uuid is missing.");
    } else {
        knex("Task").select().where("uuid", req.params.uuid)
        .then( (signatureArray) => {
        if (signatureArray.length === 1) {
            successHandler(res, signatureArray[0], "GET /api/signature/:uuid worked!" );
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
router.post("/", async (req, res) => {
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