import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"
import jwt from 'jsonwebtoken'

const profile = express.Router();

profile.get("/historic", (req, res) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    knex("Task").select().where("courier", decodedUser.id)
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all orders for the current courier!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the Order Type from DB!")
        })
})

profile.get("/pending", (req, res) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    knex("Task").select().where("courier", decodedUser.id)
        .andWhere("pu_signature_image", null)
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all pending orders for the current courier!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the Order Type from DB!")
        })
})

export default profile;