var openWeatherAppId = '990ec514a54963a7c452d11675a53e54',
 openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily'



  //openWeatherUrl = new XMLHttpRequest();
  		//	openWeatherUrl.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?q=&appid="+openWeatherAppId+"&units=metrics", true);

var prepareData = function(units) {
  var cityName = $('#city-name').val()
  if (cityName && cityName != ''){
    cityName = cityName.trim()
    getData(openWeatherUrl, cityName, openWeatherAppId, units)
  }
  else {
    alert('Please enter the city name')
  }
}
$(document).ready(function(){
  $('#submitWeather').click(function() {
    prepareData('metric')
  })

})
function getData (url, cityName, appId, units) {
  var request = $.ajax({
    url: url,
    dataType: "jsonp",
    data: {q: cityName, appid: appId, units: units},
    jsonpCallback: "fetchData",
    type: "GET"
  }).fail(function(error){
    console.error(error)
    alert('Error sending request')
  })
}


function fetchData (forecast) {
console.log(forecast)

var day = new Date();


  var weatherHere = '',
    cityName = forecast.city.name,
    country = forecast.city.country


  weatherHere += '<h2> Weather Forecast for ' + cityName + ', ' + country + '</h2>'
  forecast.list.forEach(function(forecastEntry, index, list){
    weatherHere += '<p class="data">' + day.getDate() + "/" + (day.getMonth() + 1) + "/" +  day.getFullYear() + ': ' + forecastEntry.temp.day  + '\u00B0' + '  : ' +  forecastEntry.weather[0].main + '  ' +'</p>' +'<p>' + "<i class='owf owf-" + forecastEntry.weather[0].id + "-d'></i>" + '</p>'


    /*"<img src='http://openweathermap.org/img/w/" + forecastEntry.weather[0].icon + ".png'" + '</p>' */

    day.setDate(day.getDate()+1);

  })


  $('#result').html(weatherHere)
}
