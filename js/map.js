function style(feature) {
    return {
        fillColor: getColor(feature.properties.objekt),
        weight: 1,
        opacity: 0.8,
        color: '#1807bf',
        fillOpacity: 0.8
    };
}
function getColor(objekt) {
    return objekt == 'kemp' ? 'red' :
           objekt == 'penzion' ? 'yellow' :
                      'yellow';
}

function s_uzemi(feature) {
    return {
        fillColor: '#1807bf',
        weight: 1.5,
        opacity: 0.8,
        color: '#1807bf',
        dashArray: '0',
        fillOpacity: 0.1
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.3
    });
    
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    l_objekty.resetStyle(e.target);
    info.update();
}

function featureDetails(e) {
    map.fitBounds(e.target.getBounds());
    var details = e.target.feature.properties;
    detail.update(details);
}

function goHome(e) {
	map.setView([50.7956, 14.3189], 13);
}

function goUbytovani(e) {
	map.setView([50.7975, 14.3430], 15);
}

function zoomChangeLayer(e) {
    	var zoom = map.getZoom();    	

		if (zoom >=15) {
		      l_uzemi.setStyle({fillOpacity:0, weight:1, opacity: 0.6, dashArray: '9',})
		   }else if (zoom < 15) {
		      l_uzemi.setStyle(s_uzemi);
		   }
}

var map = L.map('map', {zoomControl:false});

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18, minZoom: 13,  	
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'petrtichy.pljnlj28'
    }).addTo(map);
    map.setView([50.7956, 14.3189], 13);
    map.on('zoomend', zoomChangeLayer);

    function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: featureDetails
    });
	}

	var l_uzemi = L.geoJson(uzemi, {
	    style: s_uzemi
	}).addTo(map);

	var l_objekty = L.geoJson(objekty, {
	    style: style,
	    onEachFeature: onEachFeature
	}).addTo(map);

	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info');
	    this.update();
	    return this._div;
	};

	info.update = function (props) {
	    this._div.innerHTML = '<h4>Objekt:</h4>' +  	    
	    (props ? '<b>' + props.nazev + '</b><br>':   
	    'Najeďte kurzorem na objekt.');
	};

	info.addTo(map);

	var detail = L.control({position: 'bottomright'});

	detail.onAdd = function (map) {

	    this._div = L.DomUtil.create('div', 'info detail');
	    this.update();
	    return this._div;

	};
	
	detail.update = function(details){
		this._div.innerHTML = '<h4>Detail:</h4>' +  	    
	    (details ? 
	    	'<b>' + details.nazev + '</b><br>'+
	    	'<i>'+ details.provozovatel_nazev+'</i><br>'+
	    	'<table>'+
	    	'<tr><td>Telefon</td><td>' + details.kontakt_telefon + '</td></tr>'+
	    	'<tr><td>Mobil</td><td>' + details.kontakt_mobil + '</td></tr>'+
	    	'<tr><td>E-mail</td><td><a href="mailto:' + details.kontakt_email + '">'+ details.kontakt_email +'</td></tr>'+
	    	'</table>'+
	    	'<a href="http://'+ details.kontakt_url +'" target="_blank">'+ details.kontakt_url +'</a>'	    	
	    :'Kliknutím vyberte objekt.');
	};

	detail.addTo(map);
	
	var oddal = L.control({position: 'topleft'});

	oddal.onAdd = function (map) {

	    this._div = L.DomUtil.create('div', 'oddal');
	    this._div.innerHTML = 'Oblast ubytování';
	    L.DomEvent.on(this._div, 'click', goUbytovani);
	    return this._div;

	};
	oddal.addTo(map);

	var oddal = L.control({position: 'topleft'});

	oddal.onAdd = function (map) {

	    this._div = L.DomUtil.create('div', 'oddal');
	    this._div.innerHTML = 'Oddálit mapu';
	    L.DomEvent.on(this._div, 'click', goHome);
	    return this._div;

	};
	oddal.addTo(map);





    
