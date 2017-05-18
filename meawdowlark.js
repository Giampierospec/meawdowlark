var express = require("express");
var fortune = require("./lib/fortune");
var app = express();
//Getting the weather data
var weatherData = require("./lib/weather");

//Uses express-handlebars
var handlebars = require("express-handlebars");
//sets the default layout
var hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
        //Renders the section
        section: function (name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }

});

//we use an engine
app.engine("hbs", hbs.engine);
//Sets the view templating engine we will use.
app.set("view engine", "hbs");
//Sets the port
app.set("port", process.env.PORT || 3000);
//Getting weather data


//Use static pages middleware
app.use(express.static(__dirname + "/public"));

//Rendering a partial view
app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherData = weatherData.getWeatherData();
    next();
});
//Adding tests
app.use(function (req, res, next) {
    res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
    next();
});
app.get("/", function (req, res) {
    res.render("home");
});
//Redirects to the about page
app.get("/about", function (req, res) {
    res.render("about", {
        fortune: fortune.getFortune,
        pageTestScript: "/qa/test-about.js"

    });
});
app.get("/tours/hood-river", function (req, res) {
    res.render("tours/hood-river");
});
app.get("/tours/request-group-rate", function (req, res) {
    res.render("tours/request-group-rate");
});
//getting nursery-rhymes
app.get('/nursery-rhyme', function (req, res) {
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
});


//404 catch-all handler(middleware)
app.use(function (req, res) {
    res.status(404);
    res.render("404");
});
//Custom error page
app.use(function (req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render(500);

});
//listens on this port
app.listen(app.get("port"), function () {
    console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");

});