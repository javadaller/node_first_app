const express = require("express");
const jsonfile = require("jsonfile");

module.exports = (app) => {
    app.get("/users", (req, res) => {
        console.log("Fetching all users");
        // Read the JSON file
        jsonfile.readFile("./DB/users.json", (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                res.status(500).send("Error reading file");
            } else {
                // Send file contents back to sender
                res.json(content);
            }
        });
    });
};
