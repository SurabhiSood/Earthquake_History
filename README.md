### USGS: Earthquake Visualizations
---
![earthquakemap](https://github.com/SurabhiSood/Earthquake_History/blob/master/Images/5-Advanced.png)

### Goal
---
Use Leaflet.js to visualize earthquakes by plotting markers on a global map, colored and sized by magnitude.

### Process
---
First, I designed a basic HTML file with the map container along with a css file set with the dimensions of the map. Then, in the logic-1.js file, I created a Leaflet map object and tile layer, importing the necessary API key through a config file.

I wanted to visualize one week’s worth of earthquakes around the world, so I found the appropriate link on the [USGS website](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and stored that URL address as a variable. Then, using d3.json(), I accessed that data and created a function to plot a circle marker for each earthquake.

I used pointToLayer, style function and L.circleMarkers to create and style  the markers,and used .bindPopup() to attach a tooltip to each marker with further information about the earthquake.

Because I wanted the color of each marker to be conditional on the magnitude, I created a function, getColor() using a ternary operator to return a different color code based on magnitude. This function was then used in the fillColor field of L.circle() in the for loop.

Lastly, a legend was added to clarify the colors used on the markers. To accomplish this, a layer control was first added, and then new <div> elements containing the legend contents appended to the legend using L.DomUtil.create(). Additional legend styling elements were added to the CSS file.

For the Advanced level, I defined different layers(satllite, grayscale and outdoor) and grouped them together for baseMaps. Next, grabbed data on  [tectonic plates](https://github.com/fraxen/tectonicplates) along with earthquake data to make OverlayMaps.
 


