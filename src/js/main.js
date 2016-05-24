'use strict';

(function () {

  var request = require('superagent');
  var template = require('lodash.template');
  var debounce = require('lodash.debounce');

  var getWeather = function (event) {
    var city = document.getElementById('city').value;
    var url = buildRequestURL(city);
	
	displayLoading();
	
    request
      .get(url)
      .end(function(err, res) {
		if (err!=null){
			displayError();
			return;
		}
		displayWeatherInfo(city, res.body.query);
      });
  };

  var displayWeatherInfo = function(city, info){
    if (info.count == 0){
		displayWarning(city);
		return;
	}
	
    var results = info.results.channel;
    var forecast = results.item.forecast;
    var html = require('./templates/weather');
    var compiled = template(html);

    html = compiled({
      city: results.location.country + " - " + results.location.city,
      curdate: results.item.condition.date,
      curtemp: results.item.condition.temp,
      curconditions: results.item.condition.text,
      tempUnits: results.units.temperature,
      pressureUnits: results.units.pressure,
      distanceUnits: results.units.distance,
      speedUnits: results.units.speed,
      forecast: forecast
	});

    displayContent(html);
  }
  
  var displayWarning = function(city){
	var html = require('./templates/warnings');
    var compiled = template(html);
	html = compiled({
      city: city
	});
	displayContent(html);
  }
  
  var displayError = function(){
	var html = require('./templates/errors');
	displayContent(html);
  }
  
  var displayLoading = function() {
	var html = require('./templates/loading');
	displayContent(html);
  };

  var displayContent = function(html){
	document.getElementById('content').innerHTML = html;
  }
  
  var buildRequestURL = function(text) {
    var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\")";
    var url = "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

    return url + escape(query.replace("%s", text));
  }

  document.getElementById('search').addEventListener('click', debounce(getWeather, 500));
})();
