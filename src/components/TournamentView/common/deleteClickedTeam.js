export default function deleteClickedTeam(event, teams, deleteTeam) {
  var teamId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
  console.log(teamId);
  var teamIndex = teamId.split("-")[1];
  teamId = teams[parseInt(teamIndex)].id;
  deleteTeam({ teamId, teamIndex });
}
