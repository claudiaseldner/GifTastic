$(document).ready(function () {
	var countries = ["mexico", "germany", "Holland", "England", "Israel", "colombia", "canada", "china", "australia", "brasil", "egypt"];

	
	function renderButtons() {
		$("#country-buttons").empty();
		for (i = 0; i < countries.length; i++) {
			$("#country-buttons").append("<button class='btn btn-success' data-country='" + countries[i] + "'>" + countries[i] + "</button>");
		}
	}

	renderButtons();
	$("#add-country").on("click", function () {
		event.preventDefault();
		var country = $("#country-input").val().trim();
		countries.push(country);
		renderButtons();
		return;
	});


	$("button").on("click", function () {
        console.log("country")
		var country = $(this).attr("data-country");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			country + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#countries").empty();
			for (var i = 0; i < results.length; i++) {
				var countryDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var countryImg = $("<img>");

				countryImg.attr("src", results[i].images.original_still.url);
				countryImg.attr("data-still", results[i].images.original_still.url);
				countryImg.attr("data-animate", results[i].images.original.url);
				countryImg.attr("data-state", "still");
				countryImg.attr("class", "gif");
				countryDiv.append(p);
				countryDiv.append(countryImg);
				$("#countries").append(countryDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		// var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			// $(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
    
	$(document).on("click", ".gif", changeState);

});