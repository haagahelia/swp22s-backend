import express from 'express';
import knex from "../../db/index.js"
import {
    successHandler,
    requestErrorHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"
import orderType from './orderType.js';

const report = express.Router();

// This router is for all kinds of reports and stats about multiple tasks
// Like tasks needing signature, tasks already signed, tasks not 
// signed even if the planned delivery was yesterday or similar

// GET ALL http:localhost:8777/api/report/
report.get("/", (req, res) => {
    knex("Task").select()
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all tasks worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the signatures from DB!")
        })
})

// GET SIGNED http:localhost:8777/api/report/signed
report.get("/signed", (req, res) => {
    knex("Task").select().whereNotNull("pu_signature_image")
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all signed tasks worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the signed signatures from DB!")
        })
})

// GET NOT SIGNED http:localhost:8777/api/report/notsigned
report.get("/notsigned", (req, res) => {
    knex("Task").select().whereNull("pu_signature_image")
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET all not signed tasks worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the not signed signatures from DB!")
        })
})

// GET report grouped by order_type http:localhost:8777/api/report/by_order_type
report.get("/by_order_type", (req, res) => {
    knex("Task").select('order_type')
        .count('order_type', { as: 'total' })
        .count('pu_signed_at', { as: 'signed' })
        .max('pu_planned_time', { as: 'last_planned_pickup' })
        .groupBy("order_type")
        .orderBy('order_type', 'asc')
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET report by order type worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the report by order type from DB!")
        })
})

// GET report grouped by courier http:localhost:8777/api/report/courier/
report.get("/courier/", (req, res) => {
    knex("Task").select('courier')
        .count('uuid', { as: 'amount of orders' })
        .groupBy("courier")
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET report by courier worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the report by order type from DB!")
        })
})

// GET report grouped by courier id http:localhost:8777/api/report/courier/:id
report.get("/courier/:id", (req, res) => {
    knex("Task").select('courier')
    .where("courier", req.params.id)
        .count('uuid', { as: 'amount of orders' })
        .then((signatureArray) => {
            successHandler(res, signatureArray, "GET report by courier worked!")
        })
        .catch((error) => {
            databaseErrorHandler(res, error, "Could not get the report by order type from DB!")
        })
})




export default report;

//  .count('uuid', { as: 'total amount of orders' })