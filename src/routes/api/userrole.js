import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"

const userrole = express.Router();


//GET USERS BY ROLE http:localhost:8787/api/role/courier http:localhost:8787/api/role/taskplanner

userrole.get("/role/:role", (req, res) => {
    if (!req.params) {
        requestErrorHandler(res, "400 User role is missing.");
    } else {
        knex("User_Roles").select().where('givenrole', req.params.role)
            .then((signatureArray) => {
                if (signatureArray.length === 1) {
                    successHandler(res, signatureArray[0], "GET one user based on role worked!");
                } else {
                    requestErrorHandler(res, `404 - User with role: ${req.params.role} not found.`);
                }
            })
            .catch((error) => {
                databaseErrorHandler(res, error, "Some database error happened");
            })
    }
})


// GET ALL http:localhost:8777/api/userrole
userrole.get("/", (req, res) => {
    knex("User_Roles").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all roles !")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the users from DB!")
        })
})


export default userrole;
