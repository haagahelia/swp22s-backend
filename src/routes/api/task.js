import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    requestErrorHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const task = express.Router();

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
// Where all the needed data is in, BUT no pu_signature_image NOR pu_signed_at yet.   TODO
//SAVE TO DB POST http:localhost:8787/api/task   
task.post("/", (req, res) => {
    const body = req.body;
    if (!req.body) {
        requestErrorHandler(res, 400, "Request error. Task data body not found.");
    } else if (!req.body.uuid || !req.body.pu_address) {
        requestErrorHandler(res, 400, "uuid or address not found in request body.");
    } else {
        knex.insert(body).into("Task")
        .then((rowIdArr) => {
            successHandler(res, {rowIdArr: rowIdArr}, `Task successfully saved, id not yet used: ${rowIdArr}`)
        })
        .catch( (err) => {
            databaseErrorHandler(res, err, 
                `Inserting new task with ${req.body.uuid} failed`)
        })    
    }
})

//UPDATE ONE BY ID http:localhost:8787/api/task/:uuid
task.put("/", (req, res) => {
    const body = req.body;
    if (!req.body) {
        requestErrorHandler(res, 400, "Request error. Task data body not found.");
    } else if (!req.body.uuid || !req.body.pu_address) {
        requestErrorHandler(res, 400, "uuid or address not found in request body.");
    } else {
        knex("Task")
            .where("uuid", "=", body.uuid)
            .update(body)
            .then((rowsAffected) => {
                if (rowsAffected === 1) {
                    successHandler(res, {rowsAffected: rowsAffected}, `Task successfully edited, id not yet used: ${rowsAffected}`)
                } else {
                    databaseErrorHandler(res, err, 
                        `Updating task with ${body.uuid} failed`)
                }
            })
            .catch( (err) => {
                databaseErrorHandler(res, err, 
                    `Updating task with ${body.uuid} failed`)
            })    
    }
})

//DELETE ONE BY ID http:localhost:8787/api/task/:uuid
task.delete("/:uuid", (req, res) => {
    if (!req.params.uuid) {
        requestErrorHandler(res, "Task uuid is missing.");
    } else {
        knex("Task").where({"uuid": req.params.uuid}).whereNull('pu_signed_at').del()
        .then( (rowsAffected) => {
            if (rowsAffected === 1) {
                successHandler(res, {"rowsAffected":rowsAffected}, `Successfully deleted task, modified rows: ${rowsAffected}.`);
            } else {
                requestErrorHandler(res, `Signature with id: ${req.params.id} not found.`);
            }
        })
        .catch( (error) => {
            databaseErrorHandler(res, error, `Deleting task with uuid ${req.params.uuid} failed.`)
        })
    }
})

export default task;