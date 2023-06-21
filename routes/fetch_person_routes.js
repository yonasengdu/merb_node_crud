const express = require('express');
const validatePersonSchema = require('../middleware/schema_validator');
const { validate } = require('../schema/schema');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


router.get("", (req, res) => {
      const persons = req.app.get('db');
      res.status(200).json(persons);
      });


router.get("/:id", (req, res) => {
      const { id } = req.params;
      const persons = req.app.get('db');
      const isTherePerson = persons.find(person => person.id === id);
      if (isTherePerson) {
        res.status(200).json(isTherePerson);
      } else {
        res.status(404).send("Person not found");
      }
      }
      );

module.exports = (app) => {
  app.use("/person", router);
  };

