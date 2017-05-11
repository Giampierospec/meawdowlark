var express = require("express");

var app = express();
//Array to be rendered
var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple."
];
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
app.get("/", function(req, res){
    res.render("home");
});
//Redirects to the about page
app.get("/about", function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about",{fortune:randomFortune});
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