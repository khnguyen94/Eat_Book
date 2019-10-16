// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNToNaaJbIqZct7gsk1J8r9vgqGpj2aPs",
  authDomain: "restaurant-scheduler-5cf4d.firebaseapp.com",
  databaseURL: "https://restaurant-scheduler-5cf4d.firebaseio.com",
  projectId: "restaurant-scheduler-5cf4d",
  storageBucket: "restaurant-scheduler-5cf4d.appspot.com",
  messagingSenderId: "1098873832283",
  appId: "1:1098873832283:web:00e83ace6520c4eb9c107e",
  measurementId: "G-7FFD428JC8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create handle reference on the database
var database = firebase.database();

// Create handle reference to authorization

// Search-container hidden when page load
$("#search-container").hide(0);

// Create an empty newUser object that will hold all restaurants for that user
var newUser = [];

// Create an on-click listener for the email-submit-button that creates a new object with the user's email
$(document).on("click", "#email-submit-button", function() {
  // Prevent page refresh/reload
  event.preventDefault();

  // If field is empty return error alert
  if ($("#email-input").length < 0 || $("#email-input").val() === "") {
    alert("Error: Please input a valid email.");  // change away from alert
  }
  // If field has correct email,
  else {
    // Grab the text from the email input box and set it as the email of the newUser
    newUser.userEmail = $("#email-input")
      .val()
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase();

    // newUser.toVisitRestaurants = [];

    console.log(newUser);

    // If user already exists in database, return error

    // If user doesn't already exist in database,
    // Push newUser to database
    // database.ref().push(newUser);

    // Access the database to create a newUser if one with same email doesnt already exists


    // If a user with that email does exist, then call all their data
  }
});

// Create an on search-button click function that creates a new search handle based on what the user input
$("#search-submit-button").on("click", function(event) {
  // Prevent the form from submitting itself
  event.preventDefault();

  // Grab the text from the search input box
  var newSearchQuery = $("#search-input")
    .val()
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase();

  console.log(newSearchQuery);

  // Clear the form
  $("#search-input").val("");

  // renderSearchCards(newSearchQuery)
  renderSearchCards(newSearchQuery);
});

// Create a global variable to hold Zomato API response
var res;

// Create a function that will dynamically render search result cards
function renderSearchCards(searchQuery) {
  // Establish query variables
  var queryURL =
    "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" +
    searchQuery +
    "&count=4";

  // Create AJAX API command
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": zomatoAPIKey
    }
  }).then(function(response) {
    // Assign global res variable to API response
    res = response.restaurants;

    console.log(res);

    // Create a for-loop that goes through every one of those 4 objects in the response
    for (var i = 0; i < res.length; i++) {
      // Create a newColDiv div
      var newColDiv = $("<div>").attr("class", "col s12 m6");

      // Create a newCard div, add class & unique result ID
      var newCard = $("<div>").attr("class", "card horizontal");
      newCard.attr("result-num-" + i);

      // Create a newCardContentDiv, add class
      var newCardContent = $("<div>").attr("class", "card-content");

      // Create a newRestNameDisp, add id & class & name
      var newRestNameDisp = $("<p>")
        .attr("id", "restaurant-name-display")
        .addClass("seach-text-display")
        .text(res[i].restaurant.name);

      // Create a newRestRatingDisp, add id & class & rating
      var newRestRatingDisp = $("<p>")
        .attr("id", "restaurant-rating-display")
        .addClass("search-text-display")
        .text(res[i].restaurant.user_rating.aggregate_rating);

      // Create a newRestAddrDisp, add id & class & address
      var newRestAddrDisp = $("<p>")
        .attr("id", "restaurant-address-display")
        .addClass("search-text-display")
        .text(res[i].restaurant.location.address);

      // Create a newRestPhoneDisp, add id & class & phone number
      var newRestPhoneDisp = $("<p>")
        .attr("id", "restaurant-phone-display")
        .addClass("search-text-display")
        .text(res[i].restaurant.phone_numbers);

      // Create a newRestAddButton, add unique id & class & text
      var newRestAddButton = $("<a>")
        .attr("id", "save-to-list-btn-" + i)
        .addClass("btn-small")
        .text("Save to List");

      // Append all 4 data pieces & button to newCardContent
      newCardContent.append(
        newRestNameDisp,
        newRestRatingDisp,
        newRestAddrDisp,
        newRestPhoneDisp,
        newRestAddButton
      );

      // Append newCardContent to newCard
      newCard.append(newCardContent);

      console.log(newCard);

      // Append newCard to newCardCol
      newColDiv.append(newCard);

      // Append newCardCol to #search-container
      $("#search-container").append(newColDiv);

      // Show the #search-container
      $("#search-container").show(0);
    }

    // Read the data from database, automatically updates on initial data and then on further creation of new child objects in the database
    // Snapshot should only return the last object written into the database
    database.ref().on("value", function(snapshot) {
      // Capture the snapshot.val() in a convenient variable
      var snapVal = snapshot.val();

      console.log(snapVal);
    });

    // Create an on-click listener for the save-to-list button that creates a new object and with all the information of that rest and pushes it to the database
    $(document).on("click", ".btn-small", function(event) {
      // Prevent page refresh/reload
      event.preventDefault();

      console.log("clicked");

      // Create a new restaurant object
      var newRestaurant = new Object();

      // Confirm that a newRestaurant object was created
      console.log("New restaurant successfully created");

      // Set the name, rating, address, and phone number for the newRestaurant object from the search result that the user clicked on
      newRestaurant.newRestaurantName = $(this)
        .siblings("p#restaurant-name-display")
        .text();
      newRestaurant.newRestaurantRating = $(this)
        .siblings("p#restaurant-rating-display")
        .text();
      newRestaurant.newRestaurantAddress = $(this)
        .siblings("p#restaurant-address-display")
        .text();
      newRestaurant.newRestaurantPhoneNumber = $(this)
        .siblings("p#restaurant-phone-display")
        .text();

      console.log(newRestaurant);

      // Append the newRestaurant to the newUser
      newUser.push(newRestaurant);

      // Save newTrain form inputs to firebase database
      database.ref().push(newUser);

      console.log("successfully pushed to db");

      // Clear the search-display
      $("#search-container").html("");

      console.log("search display cleared");
    });
  });
}
