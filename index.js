const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const bodyParser = require("body-parser");

// const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));
app.use("/api", express.static("api"), function (req, res) {
    // Optional 404 handler
    res.status(404);
    res.json({ error: { code: 404 } });
});

app.get("/", function (req, res) {
    res.render('pages/index.ejs', {
        header: {

            heading_h1: "Project 2",
            heading_h2: "R0314-MEAN-Guestbook"

        }
    });
});

app.get("/guestbook", function (req, res) {
    res.render('pages/guestbook.ejs', {
        header: {

            heading_h1: "Guestbook",
            heading_h2: "Here you can view the entries"

        }
    });
});

app.get("/newmessage", function (req, res) {
    res.render('pages/newmessage.ejs', {
        header: {

            heading_h1: "Add Entry",
            heading_h2: "You are welcome to leave a message"

        }
    });
});

app.get("/newmessageajax", function (req, res) {
    res.render('pages/newmessageajax.ejs', {
        header: {

            heading_h1: "Add Entry (AJAX)",
            heading_h2: "You are welcome to leave a message"

        }
    });
});

app.get("*", function (req, res) {
    res.send("Cant find the requested page", 404);
});



let data = require(__dirname + "/public/api/data.json");

app.post("/update", function (req, res) {
    let date = new Date();
    date = date.toUTCString();

    let entry = {
        "id": data.length + 1,
        "username": req.body.name,
        "country": req.body.country,
        "date": date,
        "message": req.body.message
    };

    data.push(entry);

    fs.writeFile(__dirname + "/public/api/data.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    res.sendFile(__dirname + '/public/guestbook.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update-with-ajax', function (req, res) {
    console.log(req.body.name);

    let date = new Date();
    date = date.toUTCString();

    let entry = {
        "id": data.length + 1,
        "username": req.body.name,
        "country": req.body.country,
        "date": date,
        "message": req.body.message
    };

    data.push(entry);

    fs.writeFile(__dirname + "/public/api/data.json", JSON.stringify(data), function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    res.end();

});

app.listen(8081, function () {
    console.log("Example app listening on port 8081!");
});