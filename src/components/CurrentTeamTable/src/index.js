import React, { useEffect, useState } from "react";
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import { Button, Grid } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import "../css/index.css";
import { useLocation, useNavigate } from "react-router";
import {
  getCoinsTableData,
  getTeamByid,
  getTournamentById,
} from "../../../APIS/apis";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
function CurrentTeamTable() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { leaderBoardData } = state;
  const tournamentId = state.leaderBoardData.tournamentId;
  const teamId = state.leaderBoardData.team.id;

  const [coinsData, setCoinsData] = useState({});
  const [tournamentDetails, setTournamentDetails] = useState([]);
  useEffect(() => {
    console.log("current view")
    const fetchData = async () => {
      const response = await getCoinsTableData(tournamentId, teamId).then(
        (response) => {
          setCoinsData(response);
          console.log("coin data")
          console.log(response)
        }
      );
    };
    const fetchTournament = async () => {
      const responseTournament = await getTournamentById({
        _id: tournamentId,
      }).then((response) => {
        setTournamentDetails(response);
        console.log("tournament details data")
        console.log(response)

      });
    };
    fetchData();
    fetchTournament();
    console.log("tournament_id"+tournamentId+"teamId"+ teamId)
    console.log("tournament_id"+ fetchData())
    console.log("tournament_id"+tournamentId+ fetchTournament())
  }, []);

  const coinsFlattendedData = coinsData.coins_data;

  // DATA TABLE IMPLEMENTATION
  const rows = [];
  const runningRows = [];
  coinsFlattendedData?.forEach((element) => {
    var parser = {
      id: rows.length + 1,
      coinName: element.coin_name,
      coinCategory: element.coin_category,
      initialAllocation: element.coin_allocation,
      priceStart: element.coin_price_start,
      priceEnd: element.coin_price_end,
      allocatedCoins: element.coin_start_allocation,
      price: element.coin_price,
      points: element.coin_current_points,
    };
    rows.push(parser);
  });
  coinsFlattendedData?.forEach((element) => {
    var parser = {
      id: runningRows.length + 1,
      coinName: element.coin_name,
      coinCategory:element.coin_category,
      allocatedCoins: element.coin_allocation,
    };
    runningRows.push(parser);
  });

  const columns = [
    { field: "id", headerName: "Id", width: 20, headerAlign: "center" },
    {
      field: "coinName",
      headerName: "Coin Name",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "coinCategory",
      headerName: "Coin Category",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "initialAllocation",
      headerName: "Initial Allocation",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "priceStart",
      headerName: "Price at start",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "priceEnd",
      headerName: "Price at end",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "allocatedCoins",
      headerName: "Allocated Coins",
      width: 100,
      headerAlign: "center",
    },
    { field: "price", headerName: "Price", width: 100, headerAlign: "center" },
    {
      field: "points",
      headerName: "Points",
      width: 100,
      headerAlign: "center",
    },
  ];

  const runningColumns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "coinName",
      headerName: "Coin Name",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "coinCategory",
      headerName: "Category",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "allocatedCoins",
      headerName: "Allocated Coins",
      width: 150,
      headerAlign: "center",
    },
  ];

  

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
          Total Points:&nbsp;<b>{leaderBoardData.portfolio}</b>
        </div>
        <div className="team-preview-wrapper1 mt-20">
          {tournamentDetails.status === 3 || tournamentDetails.status === 2  ? (
            <DataGrid rows={rows} columns={columns} pageSize={12}            
            />
          ) : (
            <DataGrid
              rows={runningRows}
              columns={runningColumns}
              pageSize={12}
            />
          )}

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
