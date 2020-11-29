
map.on('load', function () {
map.addSource('slots', {
'type': 'geojson',
'data': {
    'type': 'FeatureCollection',
    'features': [
                        {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Polygon',
                        'coordinates': [
                        [                                         
                                        
                                    ]]
                                                                        
                                    }},{
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[
                                        
                                    ]] 
                        }}
                ]}});
        
                    
map.addLayer({
'id': 'slots',
'type': 'fill',
'source': 'slots',
'layout': {},
'paint': {
'fill-color': '#088',
'fill-opacity': 0.65
}
});
});
