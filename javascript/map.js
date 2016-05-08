var locationsArray = [ 
    {"Mount Rainier National Park" : [46.8800, -121.7269]}, 
    {"North Cascades National Park" : [48.7718, -121.2985]},
    {"Olympic National Park" : [47.8021, -123.6044]},
    {"Crater Lake National Park" : [42.8684, -122.1685]},
    {"Lassen Volcanic National Park" : [40.4977, -121.4207]},
    {"Redwood National Park" : [41.2132, -124.0046]},
    {"Yosemite National Park" : [37.8651, -119.5383]},
    {"Seqouia National Park" : [36.4864, -118.5658]},
    {"Kings Canyon National Park" : [36.8879, -118.5551]},
    {"Death Valley National Park" : [36.5054, -117.0794]},
    {"Channel Island National Park" : [33.9961, -119.7692]},
    {"Joshua Tree National Park" : [33.8734, -115.9010]}
];

$('#submit').on( 'click', submit );

buildOptions(locationsArray);

// buildOptions function creates the selection options on the map page using the locationsArray array

function buildOptions (incomingArray) {
  $("#location").empty();
  
  var i = 0;
  while (i < incomingArray.length) {
    for (var name in incomingArray[i]) {
      $("#location").append('<option value="' + name + '">' + name + '</option>');
    }
    i++;
  }
}

// Initialize the map

for (var name in locationsArray[0]) {
  var map = L.map('mapid').setView(locationsArray[0][name], 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(locationsArray[0][name]).addTo(map)
      .bindPopup(name)
      .openPopup();
}

// Submit function retrieves the value from the form input, finds the matching object key-value pair in the locationsArray array, passes them to the setLocation function

function submit(evt) {
  evt.preventDefault( );
  
  var locationName = $( "#location" ).val();
  var i = 0;
  
  // This while loop loops throught the array, the for loop loops through the objects in each array element looking for a key value that matches var locationName and when it finds it it sets var coordinates equal to the value for that key
  
  while (i < locationsArray.length) { //loop through the elements in locationsArray
    for(var name in locationsArray[i]) { //loop through the property keys in each element
      if (locationName == name){ //look for the property key that matches the input location
        var coordinates = locationsArray[i][name]; //when found, set coordinates equal to the longitude and latitude in the property value
      }
    i++;
    }
  }
  
  setLocation(coordinates, locationName);
}

// setLocation function removes the map and then recreates it with the new coordinates and location passed from the Submit function

function setLocation(coordinates, location) {
  map.remove();
  map = L.map('mapid').setView(coordinates, 7);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coordinates).addTo(map)
      .bindPopup(location)
      .openPopup();
}