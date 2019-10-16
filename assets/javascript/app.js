// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBCPUmsGUPIuxlTn95s4UVkzciH19_JW94",
  authDomain: "potential-project1-fc63e.firebaseapp.com",
  databaseURL: "https://potential-project1-fc63e.firebaseio.com",
  projectId: "potential-project1-fc63e",
  storageBucket: "potential-project1-fc63e.appspot.com",
  messagingSenderId: "371811198542",
  appId: "1:371811198542:web:657c037801356799ddc51f",
  measurementId: "G-EXXEB38QKC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create handle reference on the database
var database = firebase.database();

// Create universal Variables (UsersList, snapVal)
var Users = [];
var newUser = [];
var snapVal;

// Search-container hidden when page load
$("#search-container").hide(0);

// Create an on-click listener for the email-submit-button that creates a new object with the user's email
$(document).on("click", "#email-submit-button", function() {
  // Prevent page refresh/reload
  event.preventDefault();

  // If field is empty return error alert
  if ($("#email-input").length < 0 || $("#email-input").val() === "") {
    alert("Error: Please input a valid email.");
  } else {
    // Grab the text from the email input box and set it as the email of the newUser
    newUser.UserEmail = $("#email-input")
      .val()
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase();

    console.log(newUser);

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
  });
}

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
  database.ref().set(newUser);

  console.log("successfully pushed to db");

  // Clear the search-display
  $("#search-container").html("");

  console.log("search display cleared");
});

// Read data from database, automatically updates on initial data and then on further creation of new child objects in the database
database.ref().on("child_added", function(snapshot) {
  // Capture snapshot in global snapVal variable
  snapVal = snapshot.val();

  console.log(snapVal);

  // Console log all relevant information
  console.log(snapVal.newRestaurantName);
  console.log(snapVal.newRestaurantRating);
  console.log(snapVal.newRestaurantAddress);
  console.log(snapVal.newRestaurantPhoneNumber);

  // Create a newRestaurantRow, set value
  var newRestaurantRow = $("<tr>");

  // Create a mewRestaurantColName
  var newRestaurantColName = $("<td>");
  newRestaurantColName.attr("id", "todo-restaurant-name-display");
  newRestaurantColName.text(snapVal.newRestaurantName);

  // Create a newRestaurantColRating
  var newRestaurantColRating = $("<td>");
  newRestaurantColRating.attr("id", "todo-restaurant-rating-display");
  newRestaurantColRating.text(snapVal.newRestaurantRating);

  // Create a newRestaurantColAddress
  var newRestaurantColAddress = $("<td>");
  newRestaurantColAddress.attr("id", "todo-restaurant-address-display");
  newRestaurantColAddress.text(snapVal.newRestaurantAddress);

  // Create a newRestaurantColPhone
  var newRestaurantColPhone = $("<td>");
  newRestaurantColPhone.attr("id", "todo-restaurant-phone-display");
  newRestaurantColPhone.text(snapVal.newRestaurantPhoneNumber);

  // Check button
  // Create a newRestaurantColBtn for check, add id
  var newRestaurantColBtnCheck = $("<td>");
  newRestaurantColBtnCheck.attr("id", "todo-check-btn");

  // Create a newRestaurantColBtnLink for check
  var newRestaurantColBtnCheckLink = $("<a>");
  newRestaurantColBtnCheckLink.attr("href", "#!");
  newRestaurantColBtnCheckLink.addClass(
    "waves-effect waves-light btn-flat btn-small"
  );

  // Create a newRestaurantColBtnLinkIcon
  var newRestaurantColBtnCheckLinkIcon = $("<i>");
  newRestaurantColBtnCheckLinkIcon.addClass("material-icons todo-done-btn1");
  newRestaurantColBtnCheckLinkIcon.text("done");

  // Append check button divs
  newRestaurantColBtnCheckLink.append(newRestaurantColBtnCheckLinkIcon);
  newRestaurantColBtnCheck.append(newRestaurantColBtnCheckLink);

  // Cancel button
  // Create a newRestaurantColBtn for cancel
  var newRestaurantColBtnCancel = $("<td>");
  newRestaurantColBtnCancel.attr("id", "todo-cancel-btn");

  // Create a newRestaurantColBtnLink for cancel
  var newRestaurantColBtnCancelLink = $("<a>");
  newRestaurantColBtnCancelLink.attr("href", "#!");
  newRestaurantColBtnCancelLink.addClass(
    "waves-effect waves-light btn-flat btn-small"
  );

  // Create a newRestaurantColBtnLinkIcon
  var newRestaurantColBtnCancelLinkIcon = $("<i>");
  newRestaurantColBtnCancelLinkIcon.addClass("material-icons todo-done-btn1");
  newRestaurantColBtnCancelLinkIcon.text("cancel");

  // Append check button divs
  newRestaurantColBtnCancelLink.append(newRestaurantColBtnCancelLinkIcon);
  newRestaurantColBtnCancel.append(newRestaurantColBtnCancelLink);

  // Append all new <tr>'s to the newRestaurantRow
  newRestaurantRow.append(
    newRestaurantColName,
    newRestaurantColRating,
    newRestaurantColAddress,
    newRestaurantColPhone,
    newRestaurantColBtnCheck,
    newRestaurantColBtnCancel
  );

  // Append newRestaurantRow to <tbody>
  $("#todo-restaurants").append(newRestaurantRow);

  // // Create a for loop, that loops through the database and dynamically renders each restaurant object
  // for (var i = 0; i < snapshot.val().length; i++) {
    
  // }
});
