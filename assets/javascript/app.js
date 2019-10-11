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

// Create a renderRestaurants function that gets an API response from the Yelp API
function renderRestaurants() {
  // Create a reference to HTML input for search bar
  var searchString = $("search-input");

  // The search term should be passed through the renderRestaurant function
  var queryURL =
    "https://api.yelp.com/v3/autocomplete?text=" +
    searchString +
    "&latitude=47.6062&longitude=122.3321";

  $.ajax({
    url: queryURL,
    method: GET
  }).then(function(response) {
    console.log(response.data);

    // Create a new Yelp API Response reference
    var yelpRes = response.data;

    //
  });
}

// Create on-submit that then runs the renderRestaurants functino
$("submit-button").on("click", function() {
  renderRestaurants();
});

// Create an on-click event listener that will capture and store the restaurant data from the specific search result the user clicked on in the database
$("search-result").on("click", function() {
  // Open up an in-browser pop-up that prompts the user if they want to add it to their to-visit list, "Add to to-visit list?"

  // Create internal on-click listeners for confirm add & cancel
  // Click "Confirm" to add
  $("confirm-add-button").on("click", function(event) {
    // Prevent page refresh/reload
    event.preventDefault();

    // Create a new restaurant object
    var newRestaurant = new Object();

    // Confirm that a newRestaurant object was created
    console.log("New restaurant successfully created");

    // Set the name, rating, address, and phone number for the newRestaurant object from the search result that the user clicked on
    newRestaurant.newRestaurantName = $();
    newRestaurant.newRestaurantRating = $();
    newRestaurant.newRestaurantAddress = $();
    newRestaurant.newRestaurantPhoneNumber = $();

    // Console log newRestaurant object, now with information
    console.log(newRestaurant);

    // Push the newRestaurant object to the database
    database.ref().push(newRestaurant);

    // Close the confirmation pop-up

    // Clear the search results
    $("search-input").text("");

    // Read the data from database, automatically updates on initial data and then on further creation of new child objects in the database
    // Snapshot should only return the last object written into the database
    database.ref().on("child_added", function(snapshot) {
      // Create a reference handle for the database snapshot
      let dbSnapshot = snapshot.val();

      // Console log all the relevant information about the most recent newRestaurant object
      console.log(dbSnapshot.newRestaurantName);
      console.log(dbSnapshot.newRestaurantRating);
      console.log(dbSnapshot.newRestaurantAddress);
      console.log(dbSnapshot.newRestaurantPhoneNumber);

      //
    });

    // Create the new to-visit restaurant item display
    // Create new div for restaurant name
    // Set name
    var newRestaurantName = $("<div>");
    newRestaurantName.text(dbSnapshot.newRestaurantName);

    // Create new div for restaurant rating
    // Set rating
    var newRestaurantRating = $("<div>");
    newRestaurantRating.text(dbSnapshot.newRestaurantRating);

    // Create new div for restaurant address
    // Set address
    var newRestaurantAddress = $("<div>");
    newRestaurantAddress.text(dbSnapshot.newRestaurantAddress);

    // Create a new div for restaurant phone number
    // Set phone number
    var newRestaurantPhoneNumber = $("<div>");
    newRestaurantPhoneNumber.text(dbSnapshot.newRestaurantPhoneNumber);

    // Append restaurant component elements to the new restaurant object
    newRestaurant.append(
      newRestaurantName,
      newRestaurantRating,
      newRestaurantAddress,
      newRestaurantPhoneNumber
    );

    // Append that newRestaurant object to the to-visit restaurant list
  });

  // Click "Cancel" to exit the pop-up
  $("cancel-button").on("click", function() {
    // Close the pop-up
  });
});

// Dynamically render HTML
// Create new to-do items based on Firebase data, have it auto refresh and auto populate when data changes, use "Add_Child" listener
// append to display area on the dashboard


//
$(document).ready(
  // When #submit-button click, grab searchInput from #search-input
  $("#submit-button").on("click", function grabSearchInput() {
    var searchInput = $("#search-input")
      .val()
      .trim();
    console.log(searchInput);
  })
);



// 
$(document).ready(

  // When #submit-button click, grab searchInput from #search-input 
  $(".submit-button").on("click", function submitButtonPreventDefault(e) {
    e.preventDefault();
  }));
  // grab searchInput from #search-input
  $("#search-submit-button").on("click", function () {
    var searchInput = $("#search-input").val().trim();
    console.log(searchInput);
    $("#search-input").val("");
  });
  // grab emailInput from #email-input
  $("#email-submit-button").on("click", function () {
    var emailInput = $("#email-input").val().trim();
    console.log(emailInput);
    $("#email-input").val("");

    
});

