//var array of teams
var teams = ["Broncos", "Chiefs", "Patriots"];

//Onclick event for the created buttons
$("#add-team").on("click", function (event) {
    event.preventDefault();
    var userTeam = $(".form-control").val().trim();
    console.log(userTeam)
    teams.push(userTeam)

    createButtons()
    $("#team-input").val("")
    
})

createButtons()


//Create buttons function

function createButtons() {
    $(".button-area").empty();

    for (var i = 0; i < teams.length; i++) {
        var button = $("<button>")
        button.addClass("btn")
        button.attr("data-name", teams[i])
        button.text(teams[i])
        $(".button-area").append(button)
        clicked()
        
    }
}

//Function for the ajax call
function gifs(q) {

    console.log('Gifs q: ', q);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=f1sJbaR8qBBE1xWalakygjhtwREDkmFA&q=" +
            q + "&limit=6";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            $(".gif-view").empty()
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                //new div, p tag, and image tag
                var newDiv = $("<div class='display'>");
                var p = $("<h4>").text("Rating: " + results[i].rating);
                var teamImage = $("<img>");

                teamImage.attr("src", results[i].images.fixed_width_still.url);
                teamImage.attr("data-animate", results[i].images.fixed_width.url);
                teamImage.attr("data-still", results[i].images.fixed_width_still.url);
				teamImage.attr("data-state", "still");
                teamImage.attr("class", "gif");
                
                newDiv.append(p);
                newDiv.append(teamImage);
                $(".gif-view").prepend(newDiv)
            }
    })

    
}



function clicked (){
$('.btn').on('click', function(value) {
    console.log($(this).data('name'))
    var q = $(this).data('name')
    gifs(q)
})
}

clicked ()


//Animate gifs
function animateTeam(){
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
        console.log("clicked to still")
    }
}


$(document).on("click", ".gif", animateTeam);