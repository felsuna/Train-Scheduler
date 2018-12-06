function getTrains() {
    trainArray = []
    if (localStorage.getItem('train-data')) {
        trainArray = JSON.parse(localStorage.getItem('train-data'));
    } else {
        alert('no trains please add one')
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
        //  We passed two moments an whichever is later gets stored to the variable maxMoment
        var maxMoment = moment.max(moment(), firstTrainTimeMoment)
        if (maxMoment == firstTrainTimeMoment) {
            console.log("train has not arrived yet")
            var nextArrival = firstTrainTimeMoment.format("hh:mm a")
              var minutesAway = firstTrainTimeMoment.diff(moment(), "minutes");
          } else {
            console.log("trained has arrived")
        }
        console.log(timeDifference)
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
    console.log(payload);
    trainArray.push(payload);
    localStorage.setItem("train-data", JSON.stringify(trainArray));
    getTrains()
    displayTrains()
    $("#add-train-form")[0].reset()
})

console.log(moment());