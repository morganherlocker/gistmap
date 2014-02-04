$(function(){
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map').setView([51.505, -0.09], 13);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var repo = window.location.href.split('#')[1]
  var layers = []
  $.get('https://api.github.com/repos/'+repo+'/contents/', function(data){
    for(var file in data){
      if(data[file].name.indexOf('.geojson') != -1){
        layers.push(data[file])
      }
    }

    for(var layer in layers){
      var test = 'https://raw2.github.com/'+repo+'/master/'+layers[layer].name
      $.get('https://raw2.github.com/'+repo+'/master/'+layers[layer].name, function(l){
        alert(l)
      })
    }
  })
})

