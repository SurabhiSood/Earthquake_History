
//reading the json files through their urls , for earthquake
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').then((data)=>{
  var features = data.features
  console.log(features)
  createMarkers(features)
});

function createMarkers(earthquakeData){

  function getColor(d) {
      return d > 5 ? '#66c2a5' :
             d > 4 ? '#fc8d62' :
             d > 3 ? '#8da0cb' :
             d > 2 ? '#FEB24C' :
             d > 1 ? '#e78ac3' :
                     '#a6d854';
  }
  
  function style(feature) {
      return {
          fillColor: getColor(feature.properties.mag),
          fillOpacity:1,
          weight: 1,
          opacity: 1,
          radius: (feature.properties.mag)*3,
          color:'black'
      };
  }

  var earthquakes = L.geoJson(earthquakeData,{
      pointToLayer: function(feature,latlng){
        var marker = L.circleMarker(latlng,style(feature));
        marker.bindPopup(feature.properties.place +'<br/> <hr>Magnitude :'+feature.properties.mag)
      return marker;
    }
  });

  createMap(earthquakes);
}

function createMap(earthquakes){

  var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: Access_Key
  })

  var outdoor   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: Access_Key
    })

  var grayscale   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribtion: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: Access_Key
    })

  var mymap = L.map('mapid', {
      center: [37.09, -95.71],
      zoom: 2,
      layers: [satellite, outdoor, grayscale]
    });
  
  //reading the json files through their urls , for tactonic plates
  d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json').then((dataPlate)=>{
  console.log(dataPlate)
  var plates = L.geoJson(dataPlate).addTo(mymap)
  var baseMaps = {
    "Satellite": satellite,
    "Outdoor": outdoor,
    "Grayscale": grayscale
  };

  var overlayMaps = {
    "Earthquake": earthquakes,
    "Fault Lines": plates

  };

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(mymap);
  });

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
var div = L.DomUtil.create("div", "legend");
div.innerHTML += "<h4>Magnitude of Earthquake</h4>";
div.innerHTML += '<i style="background: #66c2a5"></i><span>>=5</span><br>';
div.innerHTML += '<i style="background: #fc8d62"></i><span>>=4</span><br>';
div.innerHTML += '<i style="background: #8da0cb"></i><span>>=3</span><br>';
div.innerHTML += '<i style="background: #FEB24C"></i><span>>=2</span><br>';
div.innerHTML += '<i style="background: #e78ac3"></i><span>>=1</span><br>';

return div;
};

legend.addTo(mymap);

}
  








