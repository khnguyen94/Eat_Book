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

$(document).ready(

  // Create a renderRestaurants function that gets an API response

  function restaurantApp() {
    /* handle HTML Inputs */
    // Search-container hidden when page load
    $("#search-container").hide(0);

    // When #submit-button click, grab searchInput from #search-input
    $(".submit-button").on("click", function submitButtonPreventDefault(e) {
      e.preventDefault();
    });
    // When #submit-button click, grab searchInput from #search-input
    $("#search-submit-button").on("click", function handleSearchInput() {
      var searchInput = $("#search-input").val().trim().split(" ").join("-").toLowerCase();
      console.log("SearchInputHandle: " + searchInput);
      $("#search-input").val("");
      zomatoSearchReturn(searchInput);
      // generateSearchCard();
    });

    /* Zomato API search return */
    function zomatoSearchReturn(searchString) {
      console.log(searchString);

      var queryURL =
        "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=" +
        searchString +
        "&count=4";

      // AJAX command
      $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          "user-key": zomatoAPIKey
        },
      }).then(function (response) {
        console.log(response);
        // console.log("resName: " + response.restaurants.restaurant.name);

        console.log("Restaurant name API call success");

        response.restaurants.forEach(function generateSearchCard(res) {
<<<<<<< HEAD
            var newColDiv = $("<div>").attr("class", "col s12 m6");
            var newCard = $("<div>").attr("class", "card horizontal");
            var newCardContent = $("<div>").attr("class", "card-content");
            var resDisplay = $("<p>").text(res.restaurant.name);
            resDisplay.addClass("search-text-display");
            var ratDisplay = $("<p>").text(res.restaurant.user_rating.aggregate_rating);
            ratDisplay.addClass("search-text-display");
            var addrDisplay = $("<p>").text(res.restaurant.location.address);
            addrDisplay.addClass("search-text-display");
            var phoneDisplay = $("<p>").text(res.restaurant.phone_numbers);
            phoneDisplay.addClass("search-text-display");




            /* add button to each card*/
            // <a class="waves-effect waves-light btn-flat btn-small" id="save-to-list-btn">Save to List</a>
            var newCardSubmitButton = $("<a>");
            newCardSubmitButton.addClass("waves-effect waves-light btn-flat btn-small");
            newCardSubmitButton.attr("id", "save-to-list-btn");
            newCardSubmitButton.text("Save to List");


            newCardContent.append(resDisplay, ratDisplay, addrDisplay, phoneDisplay);
            newColDiv.append(newCard, newCardContent);
            $("#search-container").append(newColDiv);
            $("#search-container").show(0);

        })})
      };
    
=======
          var newColDiv = $("<div>").attr("class", "col s12 m6");
          var newCard = $("<div>").attr("class", "card horizontal");
          var newCardContent = $("<div>").attr("class", "card-content");
          var resDisplay = $("<p>").text(res.restaurant.name).addClass('search-text-display').attr("id", "restaurant-name-display");
          console.log(res.restaurant.name);
          var ratDisplay = $("<p>").text(res.restaurant.user_rating.aggregate_rating).addClass('search-text-display');
          var addrDisplay = $("<p>").text(res.restaurant.location.address).addClass('search-text-display');;
          var phoneDisplay = $("<p>").text(res.restaurant.phone_numbers).addClass('search-text-display');

          /* add class="search-text-display" to <p> */
          /* add button to each card*/

          newCardContent.append(resDisplay, ratDisplay, addrDisplay, phoneDisplay);
          newColDiv.append(newCard, newCardContent);
          $("#search-container").append(newColDiv);
          $("#search-container").show(0);

        })
      })
    };

>>>>>>> 2e14196ae54fb828c1c9874b5ae7f2828f72dd18

    // Create an on-click event listener that will capture and store the restaurant data from the specific search result the user clicked on in the database

    // $("#search-submit-button").on("click", function() {}

    // Then it should add functionality to add that restaurant to the to-visit list
    $("").on("click", function () {
      // Open up an in-browser pop-up that prompts the user if they want to add it to their to-visit list, "Add to to-visit list?"

      // Create internal on-click listeners for confirm add & cancel
      // Click "Confirm" to add
      $("#add-to-list-btn").on("click", function (event) {
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

        // Read the data from database, automatically updates on initial data and then on further creation of new child objects in the database
        // Snapshot should only return the last object written into the database
        database.ref().on("child_added", function (snapshot) {
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
      $("cancel-button").on("click", function () {
        // Close the pop-up
      });
    });

    // Dynamically render HTML
    // Create new to-do items based on Firebase data, have it auto refresh and auto populate when data changes, use "Add_Child" listener
    // append to display area on the dashboard


    // grab emailInput from #email-input
    $("#email-submit-button").on("click", function () {
      var emailInput = $("#email-input")
        .val()
        .trim();
      console.log(emailInput);

      database.ref().push({

        email: emailInput,

      });
      updateTheHtml();
      $("#email-input").val("");
    });

    function updateTheHtml() {
      console.log("updateThatHtmlIsCalled")
      var userDataRef = firebase.database().ref().on(
        'child_added',
        snapshot => {
          console.log(snapshot.val().email);
          $("#todo-restaurant-name-display").append(snapshot.val().email);
        },
        err => {
          console.log('Error reading from database: ', err.code);
        });

      // .ref().on()

      // ref().on(
      //   'child_added',
      //   snapshot => {ref().on(
      //     'child_added',
      //     snapshot => {}
      // userDataRef.once("value").then(function(snapshot) { console.log(snapshot.val());
      // snapshot.forEach(function(childSnapshot) {
      //   var key = childSnapshot.key;
      //   var childData = childSnapshot.val();              

      //   var name_val = childSnapshot.val().email;
      //   // var id_val = childSnapshot.val().;
      //   console.log(name_val);

      //   $("#name").append(name_val);
      //   // $("#id").append(id_val);

      //   });
      // }),(function(error){ console.log(error)});
    };


    // Adding user email to authenticate via firebase
    firebase.auth().onAuthStateChanged(function (user) {

      var username = usernameTxt.value;

      if (user) {
        firebaseDataBase.ref('users/' + user.uid).set({
          email: user.email,
          uid: user.uid,
          username: username
        });


        console.log("User is signed in.");
      } else {
        console.log("No user is signed in.");

      }
    });
  });