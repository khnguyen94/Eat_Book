// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNToNaaJbIqZct7gsk1J8r9vgqGpj2aPs",
  authDomain: "restaurant-scheduler-5cf4d.firebaseapp.com",
  databaseURL: "https://restaurant-scheduler-5cf4d.firebaseio.com",
  projectId: "restaurant-scheduler-5cf4d",
  storageBucket: "",
  messagingSenderId: "1098873832283",
  appId: "1:1098873832283:web:00e83ace6520c4eb9c107e",
  measurementId: "G-7FFD428JC8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create handle reference on the database
var database = firebase.database();

// Create a renderRestaurants function that obtains a Yelp API response

// Base queryURL
// https://api.yelp.com/v3/autocomplete

// categories
// "restaurants, All"

// Seattle's 
// latitude= 47.6062
// longitude= 122.3321

function renderRestaurants() {
  // Create a reference to HTML input for search bar
  var searchString = $("search-input");

  var queryURL = "https://api.yelp.com/v3/autocomplete?text=" + searchString + "&latitude=47.6062&longitude=122.3321";

  $.ajax({
    url: queryURL, 
    method: GET
  }).then(function(response) {
    
    console.log(response.data);

    // Create a new Yelp API Response reference
    var yelpRes = response.data;

    // 
  });
};

// Create on-submit listener
// Takes in the form inputs and stores them in the database, use .push()


// Dynamically render HTML
// Create new to-do items based on Firebase data, have it auto refresh and auto populate when data changes, use "Add_Child" listener
// append to display area on the dashboard



// 
$(document).ready (

  // When #submit-button click, grab searchInput from #search-input 
  $("#submit-button").on("click", function grabSearchInput(){
    var searchInput = $("#search-input").val().trim();
    console.log(searchInput);
  })

  )