var mymap = L.map('mapid').setView([37.09, -95.71], 2);

url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: Access_Key
}).addTo(mymap);

d3.json(url).then((data)=>{
    var features = data.features
    console.log(features)
    //L.geoJson(features).addTo(mymap)

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

    L.geoJson(features, {
        pointToLayer: function(feature,latlng){
            var marker = L.circleMarker(latlng,style(feature));
            marker.bindPopup(feature.properties.place +'<br/> <hr>Magnitude :'+feature.properties.mag)
          return marker;
        }
      }).addTo(mymap);
    });


/*Legend specific*/
var legend = L.control({ position: "bottomright" });

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

