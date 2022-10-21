
  export default async function joinTournament(teams, tournamentId, joinTournamentAPI, setErrorMessage, setErrorMessageSnackOpen, tournaments) {
  document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
  var teamId = "";
  for (var i = 0; i < teams.length; i++) {
    if (
      [...document.getElementById("team-" + i).classList].includes(
        "selected-background"
      ) === true
    ) {
      teamId = teams[parseInt(i)].id;
      break;
    }
  }
  // const NFTHolder = await checkNFTHolder();
  //       if (!NFTHolder) {
  //           await paymentTournament(user,tournament);
  //       }
  await joinTournamentAPI(tournamentId, teamId)
    .then((res) => {
      var status = res.statusCode;
      if (status != 200) {
        setErrorMessage((errorMessage) => ({ ...errorMessage, message: res.message, variant: "error" }));
        setErrorMessageSnackOpen(true);
      } else {
        for (var i = 0; i < tournaments.length; i++) {
          if (tournaments[i].id === tournamentId) {
            tournaments[i].filled_spots++;
          }
        }
        setErrorMessage((errorMessage) => ({ ...errorMessage, message: res.message, variant: "success" }));
        setErrorMessageSnackOpen(true);
      }
    })
    .catch((err) => console.log(err));
}
