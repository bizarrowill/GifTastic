//                          GifTastic Game

//                          Variables

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.



//  Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.



  // Apple 0
  // Banana 1

  // Initial array of topics
  var topics = ["Hulk Hogan" , "Macho Man" , "Ric Flair" , 
                "Ultimate Warrior" , "Andre the Giant" , "John Cena" , 
                "The Rock" , "Jake the Snake" , "Vince McMahon" , 
                "Brett Hart" , "Undertaker" , "The Miz" ];
  
  // Display the still images and setup the proper tags for later use
  function displayGIFs() {
  
    var apiKey = "QP0RDd09AJuZmtlXVZRgQXxN6tdNG0ZL";
    var searchInfo = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInfo + "&api_key=" + apiKey + "&limit=15";
  
    // Creates AJAX call for the specific button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.data);
  
      // Empty any existing images
      $("#images-view").empty();
  
      // Loop for each of the returned images
      for (var i = 0; i < response.data.length; i++) {        
        // Create a var to hold the jQuery data
        var gifDiv = $("<div>", {
          class: "col-lg-4 col-md-4 col-sm-4 col-xs-12"
        });
  
        var gifImg = $("<img>", {
          "class": "img img-responsive gifImg",
          "src": response.data[i].images.downsized_still.url,
          "data-still": response.data[i].images.fixed_height_still.url,
          "data-animate": response.data[i].images.fixed_height.url,
          "data-state": "still"        
        });
  
        gifDiv.append("Rating: " + response.data[i].rating + "<br>");
        gifDiv.append(gifImg);
        $("#images-view").append(gifDiv);
      }
    });
  }
  
  // Draw the buttons at the top of the screen
  function renderButtons() {
    // Delete the buttons that exist to avoid duplicates
    $("#buttons-view").empty();
    // Go through the array of buttons
    for (var i = 0; i < topics.length; i++) {
      // Create a button type
      var a = $("<button>");
      // Add a class of "topic"
      a.addClass("topic btn btn-primary btn-xs");
      // Include the data-name attribute
      a.attr("data-name", topics[i]);
      // Label the button
      a.text(topics[i]);
      // Draw the button in the div
      // buttonDiv.html(a);
      $("#buttons-view").append(a);
    }
  }
  
  // Change the animation state of each image
  function animateGIF(myGIF) {
    // Store the jQuery of myGIF
    var myImg = $(myGIF);
  
    // Store the current data-state of the image
    var state = myImg.attr("data-state");
  
    // If the image is still
    if(state == "still") {
      // Change the image to the animated GIF
      myImg.attr("src", myImg.attr("data-animate"));
      // Change the data-state to animate
      myImg.attr("data-state", "animate");
    }
    // If the image is animated
    else {
      // Change teh image to the still GIF
      myImg.attr("src", myImg.attr("data-still"));
      // Change the data-state to still
      myImg.attr("data-state", "still");
    }
  }
  
  // Searches the document for a click, since .gifImg is dynamically generated
  $(document).on("click", ".gifImg", function() {
    animateGIF(this);
    console.log(this);
  });

