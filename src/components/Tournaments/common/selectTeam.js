export default function selectTeam(clickedId,teams) {
    var allTeams = document.getElementsByClassName("team");
    var selectedTeam = document.getElementById(clickedId);
    for (var i = 0; i < teams.length; i++) {
        document
            .getElementById("team-" + i)
            .classList.remove("selected-background");
    }
    if ([...selectedTeam.classList].includes("selected-background") === false) {
        document.getElementById("jointournament-button").style.display = "block";
        selectedTeam.classList.add("selected-background");
    }
}