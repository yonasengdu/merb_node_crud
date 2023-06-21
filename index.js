const express = require('express');
const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []    
}] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person

const personDatabase = app.get('db')

app.use(express.json());
// app.use(cors());

const createPersonRoutes = require('./routes/create_person_routes');
const updatePersonRoutes = require('./routes/update_person_routes');
const fetchPersonRoutes = require('./routes/fetch_person_routes');

createPersonRoutes(app, personDatabase);   
updatePersonRoutes(app, personDatabase);
fetchPersonRoutes(app, personDatabase);


app.use((req, res, next) => res.status(404).send("Page not found"));



app.use((err, req, res, next) => {
    res.status(500).send("Uknown server error");
    });

const port = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(port, () => {
        console.log("server runnig on port ${port}");
    });
}





module.exports = app;