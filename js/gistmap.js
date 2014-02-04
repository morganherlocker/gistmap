$(function(){
  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map').setView([51.505, -0.09], 13);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var repo = window.location.href.split('#')[1]
  var layers = []

  //var url = 'https://raw2.github.com/'+repo+'/master/'+layers[layer].name
  url = 'https://api.github.com/gists/c1d73d8e4b23dbabe8ba'
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp'
  }).success(function(gistData) {
      for (file in gistData.data.files) {
        if (gistData.data.files.hasOwnProperty(file)) {
          var o = JSON.parse(gistData.data.files[file].content);
          if (o) {
            layers.push(o);
          }
        }
      }
      if (layers.length > 0) {
        for(var layer in layers){
          var geojsonLayer = L.geoJson().addTo(map);
          geojsonLayer.addData(layers[layer]);
          var bounds = geojsonLayer.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds);
          }
        }
      }         
    }).error( function(err) {
      console.log(err)
    }
  );
})

