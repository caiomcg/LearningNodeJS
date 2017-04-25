const express = require("express");
const parser  = require("body-parser");
const _       = require("underscore");
const app     = express();

var nextId    = 1;

const PORT = process.env.PORT || 8081; //Ready for Heroku integration
const MIDDLEWARE = require("./middleware");

function Todo(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
}

var todos = [];

app.use(MIDDLEWARE.logger);
app.use(parser.json());

app.use(express.static(__dirname + "/public"));

app.get("/todos", function (req, res) {
    res.json(todos);
});

app.post("/todos", function (req, res) {
    var body = _.pick(req.body, "status", "description");

    body.description = body.description.trim();

    if (!_.isBoolean(body.status) || !_.isString(body.description) || body.description.length === 0)  {
        return res.status(400).send();
    }

    todos.push(new Todo(nextId++, body.description, body.status));
    return res.json(body);
});

app.get("/todos/:id", function (req, res) {
    const match = _.findWhere(todos, {id: parseInt(req.params.id, 10)});
    return match ? res.json(match) : res.status(404).send();
});

app.delete("/todos/:id", function (req, res) {
    const match = _.findWhere(todos, {id: parseInt(req.params.id, 10)});
    if (match) {
        todos = _.without(todos, match);
        return res.json(match);
    }
    return res.status(404).send();
});

app.put("/todos/:id", function (req, res) {
    var body = _.pick(req.body, "status", "description");
    const match = _.findWhere(todos, {id: parseInt(req.params.id, 10)});
    var todo = {};

    if (!match) {
        return res.status(404).send();
    }


    if (body.hasOwnProperty("status") && _.isBoolean(body.status)) {
        todo.status = body.status;
    } else if (body.hasOwnProperty("status")) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty("description") && _.isString(body.description) && body.description.trim().length > 0) {
        todo.description = body.description.trim();
    } else if (body.hasOwnProperty("description")) {
        return res.status(400).send();
    }

    _.extend(match, todo);

    return res.json(match);
});


app.listen(PORT, function () {
    console.log("Server is running at: localhost:" + PORT);
});