function getTrains() {
    trainArray = []
    if (localStorage.getItem('train-data')) {
        trainArray = JSON.parse(localStorage.getItem('train-data'));
    }
}


getTrains()
displayTrains()

function displayTrains() {
    $('.train-data').empty()
    for (var i = 0; i < trainArray.length; i++) {
        var timeArray = trainArray[i].firstTrainTime.split(":");
        var firstTrainTimeMoment = moment().hours(timeArray[0]).minutes(timeArray[1]).seconds("00");
        var timeDifference = firstTrainTimeMoment.diff(moment(), "minutes");
        //Max moment will determine if the train has already came for the day
        //We passed two moments an whichever is later gets stored to the variable maxMoment
        var maxMoment = moment.max(moment(), firstTrainTimeMoment)
        if (maxMoment == firstTrainTimeMoment) {
              var nextArrival = firstTrainTimeMoment.format("hh:mm a")
              var minutesAway = firstTrainTimeMoment.diff(moment(), "minutes");
          } else {
            //differenceTime is how long it has passed since the 1st train of the day.
            var differenceTime = moment().diff(firstTrainTimeMoment, "minutes");
            
            //tRemainder is the leftover of taking the diffenceTime of the modulus frequency.
            var tRemainder = differenceTime % trainArray[i].frequency;

            //minutesAway takes the frequency and subtracts the remainder.
            var minutesAway = trainArray[i].frequency - tRemainder;
            
            //nextArrival is the currentTime plaus the minutesAway.
            var nextArrival = moment().add(minutesAway, "m").format("hh:mm a")
        }
        
        var newRow = $(`
          <tr>
          <td>${trainArray[i].trainName}</td>
          <td>${trainArray[i].destination}</td>
          <td>${trainArray[i].firstTrainTime}</td>
          <td>${trainArray[i].frequency}</td>
          <td>${nextArrival}</td>
          <td>${minutesAway}</td>
          <tr>
          `)
        $('.train-data').append(newRow)
    }
}

$("#add-train-form").on("submit", function (event) {
    event.preventDefault();
    var trainName = $("#train-name").val();
    var destination = $("#destination").val();
    var firstTrainTime = $("#first-train-time").val();
    var frequency = $("#frequency").val();
    var payload = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    }
    trainArray.push(payload);
    localStorage.setItem("train-data", JSON.stringify(trainArray));
    getTrains()
    displayTrains()
    $("#add-train-form")[0].reset()
})
setInterval(function(){
    displayTrains();
},5000);
