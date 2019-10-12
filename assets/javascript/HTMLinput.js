$(document).ready(
    // When #submit-button click, grab searchInput from #search-input
    $(".submit-button").on("click", function submitButtonPreventDefault(e) {
      e.preventDefault();
    })
  );
  // grab searchInput from #search-input
  $("#search-submit-button").on("click", function() {
    var searchInput = $("#search-input").val().trim();
    console.log(searchInput);
    $("#search-input").val("");
  });
  // grab emailInput from #email-input
  $("#email-submit-button").on("click", function() {
    var emailInput = $("#email-input").val().trim();
    console.log(emailInput);
    $("#email-input").val("");
  });