const express = require("express");
const jsonfile = require("jsonfile");
const path = require("path");

module.exports = (app) => {
    const filePath = path.join(__dirname, "../DB/users.json");

    // GET /users - Fetch all users
    app.get("/users", (req, res) => {
        console.log("Fetching all users");

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }
            res.json(content);
        });
    });

    // POST /users/new - Add a new user
    app.post("/users/new", (req, res) => {
        const { email, username } = req.body;

        // Validate that email and username are provided
        if (!email || !username) {
            return res.status(400).send("Missing email or username");
        }

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            if (!Array.isArray(content)) {
                console.error("Invalid data format in users.json");
                return res.status(500).send("Invalid data format in users.json");
            }

            // Check if the user with the same email already exists
            const userExists = content.some(user => user.email === email);
            if (userExists) {
                return res.status(400).send("User with this email already exists");
            }

            content.push({ email, username });
            console.log("Added " + email + " to DB");

            jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).send("Error writing file");
                }
                res.status(200).send("User added successfully");
            });
        });
    });
};
