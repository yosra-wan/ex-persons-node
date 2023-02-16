const { required } = require("nodemon/lib/config");

const express = require("express");

const app = express();

//Middleware
app.use(express.json());

let data = require("./data");
let persons = data.persons;
let cities = data.cities;

//obtenir la liste des personnes
app.get("/persons", (req, res) => {
    res.send(persons);
});

//Une personne en fonction de son id
app.get("/persons/:id", (req, res) => {
    const person = persons.find((p) => p.id === parseInt(req.params.id));
    if (!person) {
        res.status(400).send("the person with given ID was not found");
    }
    res.send(person);
});

//La liste des personnes triées selon un champ (id ou name)
app.get("/person", function(req, res) {
    const array = data.persons;

    if (req.query.sort === "id") {
        array.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id > b.id) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (req.query.sort === "name") {
        array.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    console.log(array);
    res.send(array);
});

//La liste des personnes en précisant les champs que l’on souhaite obtenir (id, name, cities)

app.get("/persons/AllChamps", function(req, res) {
    const personnesAvecInfos = data.persons.map(({ id, name, cities }) => ({
        id,
        name,
        cities,
    }));

    personnesAvecInfos.forEach((item, index) => {
        if (!item.cities) {
            personnesAvecInfos.splice(index, 1);
        }
    });
    res.send(personnesAvecInfos);
});

//La liste des personnes triées selon un champ (id ou name)
app.get("/persone", function(req, res) {
    const array = data.persons;

    if (req.query.sort === "id") {
        array.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            } else if (a.id > b.id) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (req.query.sort === "name") {
        array.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    console.log(array);
    res.send(array);
});

// la liste des personnes dans l’ordre lexicographique
// app.get("/persons/sort", (req, res, next) => {
//   const filters = req.query;
//   const filteredUsers = data.filter((user) => {
//     let isValid = true;
//     for (key in filters) {
//       console.log(key, user[key], filters[key]);
//       isValid = isValid && user[key] == filters[key];
//     }
//     return isValid;
//   });
//   res.send(filteredUsers);
// });

//Une personne en fonction de son nom
app.get("/persons/:nom", (req, res) => {
    const person = persons.find((p) => p.nom === nom);
    if (!person) {
        res.status(400).send("the city with given name was not found");
    }
    res.send(person);
});

// La liste des villes
app.get("/cities", (req, res) => {
    res.send(cities);
});

//   Une ville en fonction de son id
app.get("/cities/:id", (req, res) => {
    const city = cities.find((c) => c.id === parseInt(req.params.id));
    if (!city) {
        res.status(400).send("the city with given ID was not found");
    }
    res.send(city);
});

// Ajouter une personne
app.post("/person/add", (req, res) => {
    new_cities = [];
    cities_id = req.body.cities_id;
    cities_id.forEach((c) => {
        city = cities.find((cy) => cy.id === parseInt(c));
        new_cities.push(city);
    });
    const addPerson = {
        id: persons.length + 1,
        name: req.body.name,
        cities: new_cities,
    };
    persons.push(addPerson);
    res.status(200).send(addPerson);
});

// Ajouter une ville
app.post("/city/add", (req, res) => {
    const addCity = {
        id: cities.length + 1,
        name: req.body.name,
        area: req.body.area,
        population: req.body.population,
    };
    persons.push(addCity);
    res.status(200).send(addCity);
});
// Modifier une personne
app.patch("/persons/:id", function(req, res) {
    const id = parseInt(req.params.id);
    let person = persons.find((person) => person.id === id);
    if (!person) {
        res.status(404).send("The student with given ID is not found");
    } else {
        person.name = req.body.name;
        res.send(person);
    }
});

// Ajouter une ville à une personne
app.patch("/person/:id/add/ville/", (req, res) => {
    const id = parseInt(req.params.id);
    let person = persons.find((person) => person.id === id);
    if (!person) {
        res.status(404).send("The person with given ID is not found");
    } else {
        city_id = req.body.city_id;
        city = cities.find((cy) => cy.id === parseInt(city_id));
        person.cities.push(city);
        res.send(person);
    }
});

// Supprimer une ville à une personne
app.patch("/person/:id/delete/ville/", (req, res) => {
    const id = parseInt(req.params.id);
    let person = persons.find((person) => person.id === id);
    if (!person) {
        res.status(404).send("The person with given ID is not found");
    } else {
        city_id = req.body.city_id;
        city = cities.find((cy) => cy.id === parseInt(city_id));
        person.cities.splice(person.cities.indexOf(city), 1);
        res.send(person);
    }
});
//supprimer une personne
app.delete("/person/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let person = persons.find((person) => person.id === id);
    if (!person) {
        res.status(404).send("The person with given ID is not found");
    } else {
        persons.splice(persons.indexOf(person), 1);
        res.status(200).send("person deleted");
    }
});

//supprimer une ville
app.delete("/city/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let city = cities.find((city) => city.id === id);
    if (!city) {
        res.status(404).send("The city with given ID is not found");
    } else {
        cities.splice(cities.indexOf(city), 1);
        res.status(200).send("city deleted");
    }
});

app.listen(8000, () => {
    console.log(`Server started on port 8000`);
});