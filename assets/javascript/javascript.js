console.log("works");

var trainData = [];

function displayTrains(){
    $('.train-data').empty()
    for (var i = 0; i  < trainData.length; i++) {
        console.log(i)
        var newRow = $(`
        <tr>
        <td>${trainData[i].trainName}</td>
        <td>${trainData[i].destination}</td>
        <td>${trainData[i].firstTrainTime}</td>
        <td>${trainData[i].frequency}</td>
        <td>?</td>
        <td>?</td>
        <tr>
        `)
       
        $('.train-data').append(newRow)
    }
}

$("#add-train-form").on("submit", function(event){
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
    trainData.push(payload);
    localStorage.setItem("train-data", JSON.stringify(trainData));

    displayTrains()
})

trainData = JSON.parse(localStorage.getItem('train-data'));
displayTrains();