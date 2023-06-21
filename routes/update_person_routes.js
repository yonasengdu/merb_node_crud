const express = require('express');
const validatePersonSchema = require('../middleware/schema_validator');
const { validate } = require('../schema/schema');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");



router.put("/:id", validatePersonSchema, (req, res) => {
      const { id } = req.params;
      const { name, age, hobbies } = req.body;
      const persons = req.app.get('db');
      const personNumber = persons.findIndex(person => person.id === id);
      if (personNumber !== -1) {
        const updatedPerson = {
          id: id,
          name: name || "",
          age: age || "",
          hobbies: hobbies || [],
        };
        persons[personNumber] = updatedPerson;
        res.status(200).json(updatedPerson);
      } else {
        res.status(404).send("Person not found");
      }
      }
      );


router.delete("/:id", (req, res) => {
      const { id } = req.params;
      const persons = req.app.get('db');
      const personNumber = persons.findIndex(person => person.id === id);
      if (personNumber !== -1) {
        persons.splice(personNumber, 1);
        res.status(200).send("Person deleted");
      } else {
        res.status(404).send("Person not found");
      }
      }
      );

module.exports = (app) => {
      app.use("/person", router);
      };
