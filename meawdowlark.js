var express = require("express");
var fortune = require("./lib/fortune");
var app = express();

//Uses express-handlebars
var handlebars = require("express-handlebars");
//sets the default layout
var hbs = handlebars.create({defaultLayout:"main"});
//we use an engine
app.engine("handlebars",hbs.engine);
//Sets the view templating engine we will use.
app.set("view engine", "handlebars");
//Sets the port
app.set("port", process.env.PORT || 3000);

//Use static pages middleware
app.use(express.static(__dirname+"/public"));
//Adding tests
app.use(function(req, res, next){
    res.locals.showTests = app.get("env") !== "production"&&req.query.test === "1";
    next();
});
app.get("/", function(req, res){
    res.render("home");
});
//Redirects to the about page
app.get("/about", function(req, res){
    res.render("about",{
            fortune: fortune.getFortune,
            pageTestScript:"/qa/test-about.js"

    });
});
app.get("/tours/hood-river", function(req, res){
    res.render("tours/hood-river");
});
app.get("/tours/request-group-rate", function(req, res){
    res.render("tours/request-group-rate");
});


//404 catch-all handler(middleware)
app.use(function(req, res){
    res.status(404);
    res.render("404");
});
//Custom error page
app.use(function(req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render(500);

});
//listens on this port
app.listen(app.get("port"),function(){
    console.log("Express started on http://localhost:"+app.get("port")+"; press Ctrl-C to terminate.");

});