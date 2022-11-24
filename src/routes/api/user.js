import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const user = express.Router();
const role = express.Router();



// GET ALL http:localhost:8777/api/user/
user.get("/", (req, res) => {
    knex("User").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all users !")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the users from DB!")
        })
})


//GET ONE BY ID http:localhost:8777/api/user/:userId
user.get("/:userId", (req, res) => {
    if (!req.params.userId) {
        requestErrorHandler(res, "400 User's userId is missing.");
    } else {
        knex("User").select().where("userId", req.params.userId)
            .then((signatureArray) => {
                if (signatureArray.length === 1) {
                    successHandler(res, signatureArray[0], "GET one user based on userId worked!");
                } else {
                    requestErrorHandler(res, `404 - User with userId: ${req.params.userId} not found.`);
                }
            })
            .catch((error) => {
                databaseErrorHandler(res, error, "Some database error happened");
            })
    }
})

//SAVE TO DB POST http:localhost:8787/api/user   
user.post("/", (req, res) => {
    const body = req.body;
    if (!req.body) {
        requestErrorHandler(res, 400, "Request error. User data body not found.");
    } else if (!req.body.userId || !req.body.email) {
        requestErrorHandler(res, 400, "userId or email address not found in request body.");
    } else {
        knex.insert(body).into("User")
        .then((rowIdArr) => {
            successHandler(res, {rowIdArr: rowIdArr}, `User successfully saved, id not yet used: ${rowIdArr}`)
        })
        .catch( (err) => {
            databaseErrorHandler(res, err, 
                `Inserting new user with ${req.body.userId} failed`)
        })    
    }
})


user.put("/", (req, res) => {
    const body = req.body;
    if (!req.body) {
        requestErrorHandler(res, 400, "Request error. User data body not found.");
    } else if (!req.body.userId || !req.body.email) {
        requestErrorHandler(res, 400, "userId or email not found in request body.");
    } else {
        knex("User")
            .where("userId", "=", body.userId)
            .update(body)
            .then((rowsAffected) => {
                if (rowsAffected === 1) {
                    successHandler(res, {rowsAffected: rowsAffected}, `User successfully edited, id not yet used: ${rowsAffected}`)
                } else {
                    databaseErrorHandler(res, err, 
                        `Updating user with ${body.userId} failed`)
                }
            })
            .catch( (err) => {
                databaseErrorHandler(res, err, 
                    `Updating user with ${body.userId} failed`)
            })    
    }
})

//DELETE ONE BY ID http:localhost:8787/api/user/:userId
user.delete("/:userId", (req, res) => {
    if (!req.params.userId) {
        requestErrorHandler(res, "User userId is missing.");
    } else {
        knex("User").where({"userId": req.params.uuid}).whereNull('email').del()
        .then( (rowsAffected) => {
            if (rowsAffected === 1) {
                successHandler(res, {"rowsAffected":rowsAffected}, `Successfully deleted user, modified rows: ${rowsAffected}.`);
            } else {
                requestErrorHandler(res, `Signature with id: ${req.params.userId} not found.`);
            }
        })
        .catch( (error) => {
            databaseErrorHandler(res, error, `Deleting user with userId ${req.params.uuid} failed.`)
        })
    }
})



export default user;