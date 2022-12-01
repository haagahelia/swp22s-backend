import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const userrole = express.Router();


//GET USERS BY ROLE http:localhost:8787/api/role/courier http:localhost:8787/api/role/:roleId

userrole.get("/:roleId", (req, res) => {
    if (!req.params.roleId) {
        requestErrorHandler(res, "400 User role id is missing.");
    } else {
        knex("Roles").select().where('roleId', req.params.roleId)
            .then((signatureArray) => {
                if (signatureArray.length === 1) {
                    successHandler(res, signatureArray[0], "GET one role info on role worked!");
                } else {
                    requestErrorHandler(res, `404 - Role with role: ${req.params.roleId} not found.`);
                }
            })
            .catch((error) => {
                databaseErrorHandler(res, error, "Some database error happened");
            })
    }
})


// GET ALL http:localhost:8777/api/userrole
userrole.get("/", (req, res) => {
    knex("Roles").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all roles !")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the users from DB!")
        })
})


export default userrole;
