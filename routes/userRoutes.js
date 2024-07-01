const express = require("express");
const jsonfile = require("jsonfile");
const path = require("path");

module.exports = (app) => {
    const filePath = path.join(__dirname, "../DB/users.json");

    app.get("/users", (req, res) => {
        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }
            res.json(content);
        });
    });

    app.post("/users/new", (req, res) => {
        const { email, username } = req.body;

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            content.push({ email, username });

            jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).send("Error writing file");
                }
                res.status(200).send("User added successfully");
            });
        });
    });

    app.delete("/users/destroy", (req, res) => {
        const { email } = req.body;

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            const userIndex = content.findIndex(user => user.email === email);

            if (userIndex !== -1) {
                const removedUser = content.splice(userIndex, 1);

                jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                        return res.status(500).send("Error writing file");
                    }
                    res.status(200).send("User removed successfully");
                });
            } else {
                res.status(404).send("User not found");
            }
        });
    });
};
