import checkNFTHolder from "./checkNFTHolder";
import paymentTournament from "./paymentTournament";

export default async function joinTournament(user, tournament, teams, joinTournamentAPI, setErrorMessage, setErrorMessageSnackOpen, account) {
  document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
  var teamId = "";
  const tournamentId = tournament.id;
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
  // const NFTHolder = await checkNFTHolder(tournament.valid_nfts, account);
  // console.log("NFTHolder",NFTHolder);
  //       if (!NFTHolder) {
  //           await paymentTournament(user,tournament);
  //       }
  await joinTournamentAPI(tournamentId, teamId)
    .then((res) => {
      var status = res.statusCode;
      if (status !== 200) {
        setErrorMessage((errorMessage) => ({ ...errorMessage, message: res.message, variant: "error" }));
        setErrorMessageSnackOpen(true);
      } else {
        setErrorMessage((errorMessage) => ({ ...errorMessage, message: res.message, variant: "success" }));
        setErrorMessageSnackOpen(true);
        setTimeout(() => {
          window.location.pathname = `/tournaments/${tournamentId}`
        }, 2000)
      }
    })
}
