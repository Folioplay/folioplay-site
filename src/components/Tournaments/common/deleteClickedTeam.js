export default function deleteClickedTeam(event, teams, deleteTeam) {
  var teamId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
  var teamIndex = teamId.split("-")[1];
  teamId = teams[parseInt(teamIndex)].id;
  if (window.confirm(`Are you sure you want to Delete ${teams[parseInt(teamIndex)].name}?`))
    deleteTeam({ teamId, teamIndex });
}
