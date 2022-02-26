var today = moment().format("dddd, MMMM Do");
var currentHour = moment().format("k");

var dateP = $("<p class=\"lead\" id=\currentDay\">");
dateP.text(today);

var schedule = JSON.parse(localStorage.getItem("schedule")) || {};

$(".jumbotron").append(dateP);

$("[data-hour]").each(function(i, row) {
    var $row = $(row);
    var hour = $row.data("hour");
    
    if (currentHour == hour) {
        $row.addClass("present");
    } else if (currentHour > hour) {
        $row.addClass("past");
    } else {
        $row.addClass("future");
    }

    $row.find("textarea").val(schedule[hour]);
});

$(".saveBtn").on("click", function() {
    var $parent = $(this).closest("[data-hour]");

    var hour = $parent.data("hour");
    
    var value = $parent.find("textarea").val().trim();

    schedule[hour] = value;

    localStorage.setItem("schedule", JSON.stringify(schedule));
});