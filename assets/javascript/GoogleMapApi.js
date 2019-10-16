
        // list is the array of list that should get value from firebase or other file
        var list=['Starbuck','kfc'];
        var map;
        var service;
        var infowindow;

        function initMap(place) {
        //create a center of map, the restaurants will be searched near the location
        var seattle = new google.maps.LatLng(47.6062, -122.3321);

        infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(
            document.getElementById('map-panel'), {center: seattle, zoom: 15});

        var request = {
            location: seattle,
            radius: 8000,
            query: place

        };

        var service = new google.maps.places.PlacesService(map);

        service.textSearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createPhotoMarker(results[i]);
                }
            map.setCenter(results[0].geometry.location);
            }
        });
        }
        //create photo marker for the location
        function createPhotoMarker(place) {
            var photos = place.photos;
            if (!photos) {
                return;
            }

            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name,
                icon: photos[0].getUrl({maxWidth: 35, maxHeight: 35})
            });
        }
        //run the function
        //initMap(list);