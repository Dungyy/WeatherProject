
const express = require("express");
const https = require("https");
const bodyPaser = require("body-parser");

const app = express();

app.use(bodyPaser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "7aa471e466f99787941e1727bb31a222"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey +"&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather in " + query + " is " + weatherDescription + "</h1>");
            res.write("<h2>The temperature in " + query + " is " + temp + " Degrees Celcius</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })
})
 

app.listen(4000, function(){
    console.log("SERVER RUNNING ON PORT 4000")
});