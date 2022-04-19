import express from 'express';
import { readFileSync } from 'fs';
import knex from "../../db/index.js"
import {
    successHandler,
    requestErrorHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const task = express.Router();

// This router is about adding more individual order pickup tasks etc. 
// Not about signing, not about summary reports or lists.

//GET ONE BY ID http:localhost:8777/api/task/:uuid
task.get("/:uuid", (req, res) => {
    if (!req.params.uuid) {
        requestErrorHandler(res, "400 Task's uuid is missing.");
    } else {
        knex("Task").select().where("uuid", req.params.uuid)
            .then((signatureArray) => {
                if (signatureArray.length === 1) {
                    successHandler(res, signatureArray[0], "GET one task based on uuid worked!");
                } else {
                    requestErrorHandler(res, `404 - Task with uuid: ${req.params.uuid} not found.`);
                }
            })
            .catch((error) => {
                databaseErrorHandler(res, error, "Some database error happened");
            })
    }
})

// This endpoint is for entering tech test data. A new endpoint should be added:
// Where all the needed data is in, BUT no pu_signature NOR pu_signed_at yet.   TODO
//SAVE TO DB POST http:localhost:8787/api/task   
task.post("/tech", async (req, res) => {
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

//DELETE ONE BY ID http:localhost:8787/api/task/:id
task.delete("/:id", async (req, res) => {
    if (!req.params.id) {
        requestErrorHandler(res, 400, "Signature id is missing.");
    } else {
        try {
            const rowsAffected = await knex("Signature").where("uuid", req.params.id).del()
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

export default task;