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

        if (!email || !username) {
            return res.status(400).send("Email and username are required");
        }

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

        if (!email) {
            return res.status(400).send("Email is required");
        }

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            const userIndex = content.findIndex(user => user.email === email);

            if (userIndex !== -1) {
                content.splice(userIndex, 1);

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

    app.put("/user", (req, res) => {
        const { username } = req.body;
        const { email } = req.query;

        if (!email) {
            return res.status(400).send("Email is required");
        }
        if (!username) {
            return res.status(400).send("Username is required");
        }

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            const user = content.find(user => user.email === email);

            if (user) {
                user.username = username;

                jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
                    if (err) {
                        console.error("Error writing file:", err);
                        return res.status(500).send("Error writing file");
                    }
                    res.status(200).send(`User ${email} updated successfully`);
                });
            } else {
                res.status(404).send("User not found");
            }
        });
    });

    app.get("/user", (req, res) => {
        const { email } = req.query;

        jsonfile.readFile(filePath, (err, content) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file");
            }

            const user = content.find(user => user.email === email);

            if (user) {
                console.log("Found user", user);
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        });
    });
};
