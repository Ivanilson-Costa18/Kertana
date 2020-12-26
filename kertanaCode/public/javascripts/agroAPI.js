
async function createPolygon() {
    try {
        obj = 
    {
            "id": "5fe69ace714b5200b0e2163d",
            "geo_json": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                -121.1958,
                                37.6683
                            ],
                            [
                                -121.1779,
                                37.6687
                            ],
                            [
                                -121.1773,
                                37.6792
                            ],
                            [
                                -121.1958,
                                37.6792
                            ],
                            [
                                -121.1958,
                                37.6683
                            ]
                        ]
                    ]
                }
            },
            "name": "Polygon Sample",
            "center": [
                -121.1867,
                37.67385
            ],
            "area": 190.9484,
            "user_id": "5fba86583da20c0007536597",
            "created_at": 1608948430
        
        }
            let result = await $.ajax({
            url: "http://api.agromonitoring.com/agro/1.0/polygons?appid=eaf41ee48e35adb39c24586fc8eb11c6",
            method: "post",
            dataType: "json",
            data:JSON.stringify(obj),
            contentType: "application/json"
        });
        console.log(JSON.stringify(result));
    } catch(err) {
        console.log(err);
    }
}
    


async function getSoilMoisture() {
    try {
            let result = await $.ajax({
            url: "http://api.agromonitoring.com/agro/1.0/soil?polyid=5fd7dd91714b52abc0e1f0b8&appid=eaf41ee48e35adb39c24586fc8eb11c6",
            method: "get",
            dataType: "json"
        });
        soilInfo = result;
        console.log(soilInfo.moisture);
    } catch(err) {
        console.log(err);
    }
}
    
    