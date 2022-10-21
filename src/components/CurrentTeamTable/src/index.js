import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { Button, Grid } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import "../css/index.css";
import { useLocation, useNavigate } from "react-router";
import { getCoinsTableData, getTeamByid } from "../../../APIS/apis";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
function CurrentTeamTable() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { leaderBoardData } = state;
  console.log("team Data", leaderBoardData);
  const tournamentId = leaderBoardData.tournamentId;
  const teamId = leaderBoardData.team.id;

  console.log(tournamentId, teamId);

  const [coinsData, setCoinsData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCoinsTableData(tournamentId, teamId).then(
        (response) => setCoinsData(response)
      );
    };
    fetchData();
  }, []);

  const coinsFlattendedData = coinsData.coins_data;

  console.log(coinsFlattendedData);
  // DATA TABLE IMPLEMENTATION
  const rows = [];

  coinsFlattendedData?.forEach((element) => {
    console.log(element.coin_current_price);
    var parser = {
      id: rows.length + 1,
      coinName: element.coin_name,
      allotedCoins: element.coin_allocation,
      price: element.coin_price.toFixed(2),
      points: element.coin_current_points.toFixed(2),
    };
    rows.push(parser);
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 50 },
    { field: "coinName", headerName: "Coin Name", width: 100 },
    { field: "allotedCoins", headerName: "Alloted Coins", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "points",
      headerName: "Points",
      width: 100,
    },
  ];

  /////////////////

  const LeftComponent = () => {
    return (
      <div className="fullpage">
        <div className="tournament-view-bar">
          <ArrowBackIosIcon
            fontSize="medium"
            className="go-back-button"
            onClick={() => navigate(-1)}
          />
          <span className="ml-20 font-size-20 font-weight-700">
            {leaderBoardData.team !== undefined ? (
              <>{leaderBoardData.team.name}</>
            ) : (
              <>Loading</>
            )}
          </span>
        </div>
        <br />
        <div className="totalPoints">
          Total Points:&nbsp;<b>{leaderBoardData.portfolio.toFixed(2)}</b>
        </div>
        <div className="team-preview-wrapper1 mt-20">
          <DataGrid rows={rows} columns={columns} pageSize={12} />
        </div>
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <div id="login-page-image">
        <img
          alt="folioplay-logo"
          src={require("../../../images/folioplayLogo.png").default}
        />
        <img src={require("../../../images/white_folioplay.svg").default} />
        <h3 style={{ letterSpacing: "2px" }}>
          Decentralized fantasy gaming platform
        </h3>
      </div>
    );
  };
  return (
    <FolioPlayLayout
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
}

export default CurrentTeamTable;
