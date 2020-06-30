//obtain the url from API Documentation-EQ Catalog [https://earthquake.usgs.gov/fdsnws/event/1/]
//create the query with desired method and perimeters(format,lat,long,start and end date)

var url = "https://earthquake.usgs.gov/fdsnws/event/1/application.json?format=geojson&starttime=2014-01-01&endtime=" +
"2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

