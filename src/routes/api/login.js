import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import knex from "../../db/index.js"
import {
    successHandler,
    requestErrorHandler,
    databaseErrorHandler
} from "../../responseHandlers/index.js"


const login = express.Router()

login.post('/login', async (req, res) => {
  try {
    const { email, pword } = req.body
    if (!(email && pword)) {
      res.status(400).send('All field are required')
    }

   const user= await knex("User").select().join("Roles", "User.roles", "=", "Roles.roleId").where("email", email).then(result => result[0]);

   console.log(user);
    
    if (user && (await bcrypt.compare(pword, user.pword))) {
      const token = jwt.sign(
        { id: user.userId, email, firstName: user.firstName, role: user.explanation},
        process.env.JWT_SECRET,
        {
          expiresIn: '1d', // 1 day
        }
      )
      res.json({ token })
      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {}
})

//Pending changes with the Database to be fully functional
login.post('/signup', async (req, res) => {
  try {
    const { email, pword } = req.body
    if (!(email && pword)) {
      res.status(400).send('All fields required')
    }
    const oldUser= await knex("User").select().where("email", email).then(result => result[0]);

    if (oldUser) {
      return res.status(409).send('Email already exists')
    }
    const encryptedPassword = await bcrypt.hash(pword, 10)
    
    const user= await knex("User").insert({email:email, pword:encryptedPassword, userId:1526, phone:1551, firstName:"udhiud", lastName:"gdyusgd"})

    const token = jwt.sign(
      { id: user.userId, email},
      process.env.JWT_SECRET,
      {
        expiresIn: '1d', // 1 day
      }
    )
    res.json({ token })
    res.status(201).json(user)
  } catch (err) {}
})

export default login;
