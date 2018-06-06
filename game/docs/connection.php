<?php
$mysqli = new mysqli('192.168.10.10', 'homestead', 'secret', 'spreekwoorden');

//Retrieve all players
$query = 'SELECT spreekwoord.desc spreekwoord, antwoord.desc antwoord
            from spreekwoord
            inner join antwoord
            on spreekwoord.ant_id = antwoord.id';

//Create players array for all te results from the query
$spreekwoorden = [];

//Execute query & loop the results from the query and add them to the players array
if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $spreekwoorden[] = $row;
    }
}

//Free result set & close connection
$result->close();
$mysqli->close();

//Set the header to tell the client some json is coming its way
header("Content-Type: application/json");
echo json_encode($spreekwoorden);
exit;
