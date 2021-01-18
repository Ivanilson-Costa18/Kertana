
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
        var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
                center: [0,0], 
                zoom: 3
                });

        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
            polygon: true,
            trash: true
            }
            });
        map.addControl(draw);
                
        map.on('draw.create',updateArea);
        map.on('draw.delete',updateArea);
        map.on('draw.update',updateArea);
                    
        function updateArea(e) {
            var data = draw.getAll();
            if (data.features.length > 0) {
                var area = turf.area(data);
                return console.log(data.features[0].geometry.coordinates);
            } 
            else {
                if (e.type !== 'draw.delete')
                alert('Use the draw tools to draw a polygon!');
                }
        }
    map.on('load',function(){
        map.addSource('1', {
            'type': 'geojson',
            'data': {
                    'type': 'FeatureCollection',
                    'features': [
                                    {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': [[[-7.207031249999119, -6.140554782450124],
                                        [7.031250000000995, -6.140554782450124],
                                        [7.031250000000995, -8.928487062665695],
                                        [-7.207031249999119, -8.75479470243657],
                                        [-7.207031249999119, -6.140554782450124]]]                               
                                                    }
                                                }
                            ]
                        }
                    }); 
            map.addLayer({
                    'id': '1',
                    'type': 'fill',
                    'source': '1',
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.65
                    }
            });
            map.addSource('2', {
                'type': 'geojson',
                'data': {
                        'type': 'FeatureCollection',
                        'features': [
                                        {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Polygon',
                                            'coordinates': [[[-13.710937499999886, -10.141931686131016],
                                            [11.777343750000682, -10.141931686131016],
                                            [7.031250000000995, 8.581021215641158],
                                            [-0.6152343749992895, -3.864254615722288],
                                            [-8.789062499999773, 8.581021215641158],
                                            [-13.710937499999886, -10.141931686131016]]]                               
                                                        }
                                                    }
                                ]
                            }
                        }); 
                map.addLayer({
                        'id': '2',
                        'type': 'fill',
                        'source': '2',
                        'layout': {},
                        'paint': {
                            'fill-color': '#000',
                            'fill-opacity': 0.65
                        }
                });
        })

var polygon = [
    [-7.207031249999119, -6.140554782450124],
[7.031250000000995, -6.140554782450124],
[7.031250000000995, -8.928487062665695],
[-7.207031249999119, -8.75479470243657],
[-7.207031249999119, -6.140554782450124]]
var polygon2 =  [[-13.710937499999886, -10.141931686131016],
[11.777343750000682, -10.141931686131016],
[7.031250000000995, 8.581021215641158],
[-0.6152343749992895, -3.864254615722288],
[-8.789062499999773, 8.581021215641158],
[-13.710937499999886, -10.141931686131016]]




function click() {
    console.log('aaaaaaaaaaaa');
}

function clicker(){

    console.log('here')
    var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
    var point = turf.point([1, 2]);
    console.log(line)
    console.log('done')
    console.log(turf.booleanWithin(point, line)?true:false)
}