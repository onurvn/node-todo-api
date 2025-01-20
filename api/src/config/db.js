
const mongoose = require("mongoose")

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((error) => {
        console.log("DB NOT CONNECTED " + error);
    })