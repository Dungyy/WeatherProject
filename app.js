
const express = require("express");
const https = require("https");
const app = express();


app.get('/', function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Minnesota&appid=7aa471e466f99787941e1727bb31a222&units=imperial";
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            res.write("<h1>The weather Description is: " + weatherDescription + "</h1>");
            res.write("<h1>The Temp in Minnesota is " + temp + " Degrees Celcius.</h1>");
            res.send()
        })
    })
})


app.listen(4000, function(){
    console.log("SERVER RUNNING ON PORT 4000")
});