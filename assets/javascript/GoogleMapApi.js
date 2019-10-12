
function initMap() {
  // The location of Uluru
  var uluru = {lat: 47.6062, lng: -122.3321};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map-panel'), {zoom: 8, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}