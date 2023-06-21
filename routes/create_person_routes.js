const express = require('express');
const validatePersonSchema = require('../middleware/schema_validator');
const { validate } = require('../schema/schema');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");



router.post("/", validatePersonSchema, (req, res) => {
      const { name, age, hobbies } = req.body;
      const newPerson = {
      id: uuidv4(),
      name: name || "",
      age: age || "",
      hobbies: hobbies || [],
      };
      
      const persons = req.app.get('db');
      persons.push(newPerson);
      res.status(200).json(newPerson);
      }
      );

module.exports = (app) => {
      app.use("/person", router);
      };