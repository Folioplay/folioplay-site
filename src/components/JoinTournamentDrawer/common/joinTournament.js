import checkNFTHolder from "../../TournamentView/common/checkNFTHolder";
import paymentTournament from "../../TournamentView/common/paymentTournament";

export default async function joinTournament(user, tournamentId, teams, joinTournamentAPI, setErrorMessage, setErrorMessageSnackOpen, tournament, tournaments, changeTournament, account) {

  console.log("+++++++++++++++++++++++++++----------------------------")
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
  const NFTHolder = await checkNFTHolder(tournament.valid_nfts, account);
  console.log("NFTHolder",NFTHolder);
  console.log(tournament)
  if (!NFTHolder) {
    if(await paymentTournament(user,tournament)) {
      await joinTournamentAPI(tournamentId, teamId)
          .then((res) => {
            var status = res.statusCode;
            if (status !== 200) {
              setErrorMessage((errorMessage) => ({...errorMessage, message: res.message, variant: "error"}));
              setErrorMessageSnackOpen(true);
            } else {
              // const prevSpots = document.getElementById(tournamentId + '-left-spots').innerText;
              // document.getElementById(tournamentId + '-left-spots').innerText = parseInt(prevSpots) - 1;
              // console.log(document.getElementById(tournamentId + '-left-spots').innerText);
              if (changeTournament === false) {
                tournament.filled_spots++;
              } else {
                for (var i = 0; i < tournaments.length; i++) {
                  if (tournaments[i].id === tournamentId) {
                    tournaments[i].filled_spots++;
                  }
                }
              }

              setErrorMessage((errorMessage) => ({...errorMessage, message: res.message, variant: "success"}));
              setErrorMessageSnackOpen(true);
              // setTimeout(() => {
              //   window.location.pathname = `/tournaments/${tournamentId}`
              // }, 2000)
            }
          })
    }
  }
  else {
    await joinTournamentAPI(tournamentId, teamId)
        .then((res) => {
          var status = res.statusCode;
          if (status !== 200) {
            setErrorMessage((errorMessage) => ({...errorMessage, message: res.message, variant: "error"}));
            setErrorMessageSnackOpen(true);
          } else {
            // const prevSpots = document.getElementById(tournamentId + '-left-spots').innerText;
            // document.getElementById(tournamentId + '-left-spots').innerText = parseInt(prevSpots) - 1;
            // console.log(document.getElementById(tournamentId + '-left-spots').innerText);
            if (changeTournament === false) {
              tournament.filled_spots++;
            } else {
              for (var i = 0; i < tournaments.length; i++) {
                if (tournaments[i].id === tournamentId) {
                  tournaments[i].filled_spots++;
                }
              }
            }

            setErrorMessage((errorMessage) => ({...errorMessage, message: res.message, variant: "success"}));
            setErrorMessageSnackOpen(true);
            // setTimeout(() => {
            //   window.location.pathname = `/tournaments/${tournamentId}`
            // }, 2000)
          }
        })
  }
}



