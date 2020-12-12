//putting all of the ajax functions within a function ensures that the page loads before trying to execute any functions contained within
$(function () {
  $(".add-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      //the data to be added to the burger_name part of the table will come from the text submitted in the #newburger form
      burger_name: $("#newburger").val().trim(),
      //the devoured boolean will always be set to false by default. No one wants an already eaten burger!
      devoured: 0,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("We've added your burger!");
      //refreshes the page to display the new burger in the list
      location.reload();
    });
  });

  $(".devourburger").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");
    var isDevoured = {
      devoured: 1,
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: isDevoured,
    }).then(function () {
      console.log("Your burger has been devoured!");
      location.reload();
    });
  });
});
