const express = require("express");
const app     = express();

const PORT = process.env.PORT || 8080; //Ready for Heroku integration
const MIDDLEWARE = require("./middleware");

app.use(MIDDLEWARE.logger);

app.get("/about", function (req, res) {
    res.send("About Us");
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, function () {
    console.log("Server is running at: localhost:" + PORT);
});