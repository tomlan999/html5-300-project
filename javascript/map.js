var locationsArray = [ 
    {loc : "Mount Rainier National Park", coord : [46.8800, -121.7269], image1 : "images/rainier1.jpg", image2 : "images/rainier2.jpg"}, 
    {loc : "North Cascades National Park", coord : [48.7718, -121.2985], image1 : "images/n-cascades1.jpg", image2 : "images/n-cascades2.jpg"},
    {loc : "Olympic National Park", coord : [47.8021, -123.6044], image1 : "images/olympic1.jpg", image2 : "images/olympic2.jpg"},
    {loc : "Crater Lake National Park", coord : [42.8684, -122.1685], image1 : "images/crater-lake1.jpg", image2 : "images/crater-lake2.jpg"},
    {loc : "Lassen Volcanic National Park", coord : [40.4977, -121.4207], image1 : "images/lassen1.jpg", image2 : "images/lassen2.jpg"},
    {loc : "Redwood National Park", coord : [41.2132, -124.0046], image1 : "images/redwood1.jpg", image2 : "images/redwood2.jpg"},
    {loc : "Yosemite National Park", coord : [37.8651, -119.5383], image1 : "images/yosemite1.jpg", image2 : "images/yosemite2.jpg"},
    {loc : "Seqouia National Park", coord : [36.4864, -118.5658], image1 : "images/sequoia1.jpg", image2 : "images/sequoia2.jpg"},
    {loc : "Kings Canyon National Park", coord : [36.8879, -118.5551], image1 : "images/kings1.jpg", image2 : "images/kings2.jpg"},
    {loc : "Death Valley National Park", coord : [36.5054, -117.0794], image1 : "images/death1.jpg", image2 : "images/death2.jpg"},
    {loc : "Channel Island National Park", coord : [33.9961, -119.7692], image1 : "images/channel1.jpg", image2 : "images/channel2.jpg"},
    {loc : "Joshua Tree National Park", coord : [33.8734, -115.9010], image1 : "images/joshua1.jpg", image2 : "images/joshua2.jpg"}
];

var map;

$('#location').on( 'change', submit );

buildOptions(locationsArray);
setLocation(locationsArray[0].coord, locationsArray[0].loc);
buildImages(locationsArray[0].image1, locationsArray[0].image2);

// buildOptions function creates the selection options on the map page using the locationsArray array

function buildOptions (incomingArray) {
  $("#location").empty();
  var i = 0;
  
  while (i < incomingArray.length) {
    $("#location").append('<option value="' + incomingArray[i].loc + '">' + incomingArray[i].loc + '</option>');
    i++;
  }
}


// Submit function retrieves the value from the form input, finds the matching object key-value pair in the locationsArray array, passes them to the setLocation function

function submit(evt) {
  evt.preventDefault( );
  
  var locationName = $( "#location" ).val();
  var i = 0;
  var coordinates;
  
  for(var i = 0; i <locationsArray.length; i++) { 
    if (locationName == locationsArray[i].loc){ 
      coordinates = locationsArray[i].coord; 
      image1 = locationsArray[i].image1;
      image2 = locationsArray[i].image2;
    }
  }
  
  setLocation(coordinates, locationName);
  buildImages(image1, image2);
}

// setLocation function removes the map if it exists and then creates it or recreates it with the new coordinates and location passed from the Submit function

function setLocation(coordinates, location) {
  if (map != undefined){
    map.remove();
  }
  
  map = L.map('mapid').setView(coordinates, 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coordinates).addTo(map)
      .bindPopup(location)
      .openPopup();
  
  setWeather(coordinates);
}

function setWeather(coordinates){

   $.ajax({
      url : 'http://api.wunderground.com/api/53f5cb8e2f096344/forecast/conditions/q/' + coordinates + '.json',
      dataType : "jsonp",
      success : function(parsed_json) {
        currentWeather(parsed_json);
        forecastWeather(parsed_json);
      }
    });
  
}

function currentWeather(parsed_json){
  
  $("#current-weather").empty();
  $("#current-weather").append('<h2> Local Weather Conditions </h2>');
  $("#current-weather").append('<p> <b>Site of Observation: </b>' + parsed_json.current_observation.observation_location.full + '</p>');
  $("#current-weather").append('<p> <b>Time of Observation: </b>' + parsed_json.current_observation.observation_time + '</p>');
  $("#current-weather").append('<p> <b>Sky Conditions: </b>' + parsed_json.current_observation.weather + '</p>');
  $("#current-weather").append('<p> <b>Temperature: </b>' + parsed_json.current_observation.temperature_string
 + '</p>');
  $("#current-weather").append('<p> <b>Wind: </b>' + parsed_json.current_observation.wind_string
 + '</p>');
}

function forecastWeather(parsed_json){
  $("#forecast-weather").empty();
  $("#forecast-weather").append('<h2> Local Weather Forecast </h2>');
  for (var i = 0; i<parsed_json.forecast.txt_forecast.forecastday.length; i++){
    $("#forecast-weather").append('<p> <b>' + parsed_json.forecast.txt_forecast.forecastday[i].title + ': </b>' + parsed_json.forecast.txt_forecast.forecastday[i].fcttext + '</p>');
  }
}

function buildImages(image1, image2){
  $("#image-list").empty();
  $("#image-list").append('<li> <img src="' + image1 + '"> </li>');
  $("#image-list").append('<li> <img src="' + image2 + '"> </li>');
}