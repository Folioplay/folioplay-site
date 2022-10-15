import React, { useEffect } from "react";
import { joinTournamentAPI, deleteTeam } from "../../../APIS/apis";
import { Button, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteClickedTeam from "../common/deleteClickedTeam";
import joinTournament from "../common/joinTournament";
import selectTeam from "../common/selectTeam";
import "../style/index.css";
import {
  chooseTeamClose,
  chooseTeamOpen,
} from "../common/chooseTeamAnimations";
export default function JoinTournamentDrawer({
  teams,
  tournamentId,
  tournament,
  user,
  setErrorMessage,
  setErrorMessageSnackOpen,
  navigate,
  tournaments,
  changeTournament,
  account,
}) {
  useEffect(() => {
    document
      .getElementsByClassName("overlay-div")[0]
      .addEventListener("mouseup", function (event) {
        var pol = document.getElementById("choose-team-div");
        if (event.target !== pol && event.target.parentNode !== pol) {
          chooseTeamClose();
          return;
        }
      });
  }, []);
  return (
    <div key={"enter-tournament"} id="choose-team-div" className="display-none">
      <div className="choose-team-bar"></div>
      <div id="all-teams-info">
        <div>
          <span
            className="font-size-25 font-weight-700 mb-10"
            style={{ color: "var(--black)" }}
          >
            Choose Team
          </span>
          <br />
          <span
            className="font-size-15 font-weight-500"
            style={{ color: "var(--grey-shade)" }}
          >
            Select a team that you think should represent you in this contest.
          </span>
        </div>
        <div className="all-teams">
          <div style={{ padding: "0" }}>
            {teams.map((team, index) => {
              var clickedId = "team-" + index;
              return (
                <div
                  id={"team-" + index}
                  className="mb-15"
                  style={{ padding: "0", borderRadius: "12px" }}
                >
                  <div className="team">
                    <span
                      className="font-size-18 font-weight-600"
                      style={{ color: "var(--grey-shade)" }}
                    >
                      {team.name}
                    </span>
                    <span id="visible-coins" style={{ marginLeft: "auto" }}>
                      <CheckCircleIcon
                        className="select-team-button team-buttons"
                        onClick={() => selectTeam(clickedId, teams)}
                        fontSize="large"
                      />
                      <PreviewIcon
                        className="preview-team-button team-buttons ml-5"
                        fontSize="large"
                        onClick={() => {
                          document.querySelector(
                            "#" + clickedId + " .select-team-button"
                          ).style.display = "none";
                          var allTeams =
                            document.getElementsByClassName("team");
                          for (var i = 0; i < allTeams.length; i++) {
                            if (clickedId !== "team-" + i)
                              allTeams[i].classList.add("display-none");
                          }
                          document
                            .getElementById(clickedId)
                            .classList.remove("display-none");
                          document
                            .getElementById(
                              "team-coins-" + clickedId.split("-")[1]
                            )
                            .classList.remove("display-none");
                          document.getElementById(
                            "back-from-teamview-button"
                          ).style.display = "block";
                        }}
                      />
                      <DeleteIcon
                        className="delete-team-button team-buttons ml-5"
                        onClick={(event) =>
                          deleteClickedTeam(event, teams, deleteTeam)
                        }
                        fontSize="large"
                      />
                    </span>
                  </div>
                  <div
                    id={"team-coins-" + index}
                    className="display-none team-coins"
                  >
                    {team.selectedCoins.map((coin, index) => {
                      let selected_coin_css = coin.category==="Superstar" ? "team-view-coin-card-superstar": coin.category==="Mooning" ? "team-view-coin-card-mooning" : "team-view-coin-card-rekt"
                      return (
                        <div className={"teamview-coin-card mr-10 "+ selected_coin_css}>
                          {
                              coin.rank !== -1 &&
                              <div className="ribbon-team-view">
                                <span className="ribbon2-team-view">{coin.rank}</span>
                              </div>
                          }
                          <img
                            src={
                              require("../../../images/coinLogos/" +
                                coin.symbol.toLowerCase() +
                                ".png").default
                            }
                            width="40"
                            height="40"
                          />
                          <span className="font-size-12 font-weight-500">
                            {coin.name}
                          </span>
                          <span className="font-size-12 font-weight-500">
                            {coin.category}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10" id="create-new-button-div-drawer">
          <Button
            variant="filled"
            id="jointournament-button"
            style={{
              backgroundColor: "var(--golden)",
              fontWeight: "600",
              fontSize: "17px",
            }}
            onClick={() =>
              joinTournament(
                user,
                tournamentId,
                teams,
                joinTournamentAPI,
                setErrorMessage,
                setErrorMessageSnackOpen,
                tournament,
                tournaments,
                changeTournament,
                account
              )
            }
          >
            Continue
          </Button>
          <Button
            variant="filled"
            id="back-from-teamview-button"
            style={{
              backgroundColor: "var(--golden)",
              fontWeight: "600",
              fontSize: "17px",
            }}
            onClick={(event) => {
              var allSelectButtons =
                document.getElementsByClassName("select-team-button");
              var allTeams = document.getElementsByClassName("team");
              for (var i = 0; i < allSelectButtons.length; i++) {
                allSelectButtons[i].style.display = "inline-block";
              }
              console.log(allTeams);
              for (var i = 0; i < allTeams.length; i++) {
                allTeams[i].classList.remove("display-none");
                console.log("team-coins-" + i);
                document
                  .getElementById("team-coins-" + i)
                  .classList.add("display-none");
              }
              event.target.style.display = "none";
            }}
          >
            Back
          </Button>
          {teams.length === 0 ? (
            <Button
              variant="contained"
              id="new-team-type1"
              style={{}}
              onClick={() => navigate("/teams/createteam")}
            >
              Create New Team
            </Button>
          ) : (
            <Button
              id="new-team-type2"
              style={{
                color: "var(--golden)",
                fontWeight: "600",
                fontSize: "15px",
                textTransform: "capitalize",
              }}
              onClick={() => navigate("/teams/createteam")}
            >
              Create New Team
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
