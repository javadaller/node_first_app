//import the NPM dependancy package
const express = require("express");

//initialise express() inside and write to the app variable
const app = express();

//import route module and pass your app
require("./routes/userRoutes")(app);

//choose what port on which to run the server
const PORT = 5000;

//use the app variable and listen on the port
app.listen(PORT, () => {
  console.log(`Server running`);
});

// const jsonfile = require('jsonfile')
// const file = './DB/users.json'
// jsonfile.readFile(file)
//   .then(obj => console.dir(obj))
//   .catch(error => console.error(error))