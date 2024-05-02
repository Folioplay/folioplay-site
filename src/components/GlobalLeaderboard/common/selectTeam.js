export default function selectTeam(clickedId, teams, tournament) {
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
  var seatsFilled = 0;
  if (tournament !== undefined) {
    seatsFilled = (100 * tournament.filled_spots) / tournament.total_spots;
  }

function selectTeam(clickedId) {
    var allTeams = document.getElementsByClassName("team");
    var selectedTeam = document.getElementById(clickedId);
    for (var i = 0; i < allTeams.length; i++) {
      allTeams[i].classList.remove("selected-background");
    }
    if ([...selectedTeam.classList].includes("selected-background") === false) {
      document.getElementById("jointournament-button").style.display = "block";
      selectedTeam.classList.add("selected-background");
    }
  }
}
