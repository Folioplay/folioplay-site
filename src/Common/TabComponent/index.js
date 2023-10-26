import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { motion } from "framer-motion/dist/framer-motion";
import "../../components/MyTeams/style/index.css";
import { Box, Button } from "@mui/material";
import "./style.css";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ContestTabs({
  tournamentUpdatedOpen,
  tournamentUpdatedRunning,
  tournamentUpdatedCompleted,
}) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var navigate = useNavigate();
  const [valueContest, setValueContest] = React.useState("2");

  const handleChangeContest = (event, newValue) => {
    setValueContest(newValue);
  };
  function updateView(clickedChip) {}
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        fontFamily: "poppins",
        fontSize: "25px",
      }}
    >
      <Chip
        className="active-chip"
        style={{ marginRight: "10px", fontFamily: "poppins" }}
        label="Upcoming"
        variant="outlined"
        onClick={() => {
          var open = document.getElementsByClassName("open-tournament")[0];
          var running =
            document.getElementsByClassName("running-tournament")[0];
          var closed = document.getElementsByClassName(
            "completed-tournament"
          )[0];
          open.classList.add("display-none");
          running.classList.add("display-none");
          closed.classList.add("display-none");
          document
            .getElementsByClassName("MuiChip-root")[0]
            .classList.add("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[1]
            .classList.remove("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[2]
            .classList.remove("active-chip");
          open.classList.remove("display-none");
        }}
      />
      <Chip
        className=""
        style={{ marginRight: "10px", fontFamily: "poppins" }}
        label="Running"
        variant="outlined"
        onClick={() => {
          var open = document.getElementsByClassName("open-tournament")[0];
          var running =
            document.getElementsByClassName("running-tournament")[0];
          var closed = document.getElementsByClassName(
            "completed-tournament"
          )[0];
          open.classList.add("display-none");
          running.classList.add("display-none");
          closed.classList.add("display-none");
          document
            .getElementsByClassName("MuiChip-root")[0]
            .classList.remove("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[1]
            .classList.add("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[2]
            .classList.remove("active-chip");
          running.classList.remove("display-none");
        }}
      />
      <Chip
        className=""
        style={{ fontFamily: "poppins" }}
        label="Completed"
        variant="outlined"
        onClick={() => {
          var open = document.getElementsByClassName("open-tournament")[0];
          var running =
            document.getElementsByClassName("running-tournament")[0];
          var closed = document.getElementsByClassName(
            "completed-tournament"
          )[0];
          open.classList.add("display-none");
          running.classList.add("display-none");
          closed.classList.add("display-none");
          document
            .getElementsByClassName("MuiChip-root")[0]
            .classList.remove("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[1]
            .classList.remove("active-chip");
          document
            .getElementsByClassName("MuiChip-root")[2]
            .classList.add("active-chip");
          closed.classList.remove("display-none");
        }}
      />
      <div className="mt-20 open-tournament">
        {tournamentUpdatedOpen.length ? (
          <>
            {tournamentUpdatedOpen.map((tournament, index) => {
              const disabledTournament = tournament.status === 4;
              const startDate = new Date(tournament.tournament.start_time);
              const finishDate = new Date(tournament.tournament.end_time);
              const status = {
                3: { value: "Completed", color: "#ff000096" },
                1: { value: "Closed", color: "#FFCC00" },
                0: { value: "Open", color: "#00ff00d6" },
                2: { value: "Running", color: "#FFCC00" },
              };

              return (
                <motion.div
                  id={"tournament-" + tournament._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 * (index + 1) }}
                  key={"tournament__" + index}
                  className="tournament"
                  style={{
                    minHeight: "100px",
                    padding: "20px 20px 0px 20px",
                    width: "90%",
                  }}
                  onClick={() => {
                    navigate(`/tournament/${tournament.tournament._id}`, {
                      state: {
                        transactionId: tournament.transaction_hash,
                      },
                    });
                  }}
                >
                  <div className="tournament-info">
                    <span
                      className="tournament-image"
                      style={{ borderRadius: "100%" }}
                    >
                      <img
                        style={{ borderRadius: "100%" }}
                        src={tournament.tournament.imageURL}
                        width="60px"
                        height={"60px"}
                      />
                    </span>
                    <span style={{ textAlign: "left" }}>
                      <span
                        className="font-size-20"
                        style={{ color: "#071F36", fontWeight: "700" }}
                      >
                        {tournament.tournament.name}
                      </span>
                      {/*<span style={{ color: "#071F36", fontWeight: "700" }}>*/}
                      {/*  {tournament.name}*/}
                      {/*</span>*/}
                      <br />
                      <span className="tournaments-spots">
                        <div className="tournamentPage__startTime">
                          {startDate.getDate()}{" "}
                          {monthNames[startDate.getMonth()]}'
                          {startDate.getFullYear() % 100} |{" "}
                          {startDate.getHours() / 10 < 1
                            ? "0" + startDate.getHours()
                            : startDate.getHours()}
                          :
                          {startDate.getMinutes() / 10 < 1
                            ? "0" + startDate.getMinutes()
                            : startDate.getMinutes()}{" "}
                          GMT <br />
                          Duration : {(finishDate - startDate) / 60000} mins
                        </div>
                      </span>
                    </span>
                  </div>
                  <div>
                    {/*<div className="tournamentPage__transactionHash">*/}
                    {/*  {tournament.transaction_hash !== undefined && (*/}
                    {/*    <span*/}
                    {/*      className="font-size-12 tournamentPage__transactionHashLink"*/}
                    {/*      onClick={() => {*/}
                    {/*        window.location.href = `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`;*/}
                    {/*      }}*/}
                    {/*    >*/}
                    {/*      Transaction Hash(Polygon):{" "}*/}
                    {/*      {tournament.transaction_hash.substring(0, 10)}XXXX*/}
                    {/*      {tournament.transaction_hash.slice(-10)}*/}
                    {/*    </span>*/}
                    {/*  )}*/}
                    {/*</div>*/}
                  </div>
                  <div
                    className="tournament-reward"
                    style={{ marginTop: "10px" }}
                  >
                    <span
                      className="font-size-12"
                      style={{
                        color: status[tournament.tournament.status].color,
                        padding: "0 10px",
                        border:
                          "1px solid " +
                          status[tournament.tournament.status].color,
                        borderRadius: "30px",
                      }}
                    >
                      {status[tournament.tournament.status].value}
                    </span>
                    <span className={"activityTabs__teamLength"}>
                      {tournament.teams.length} Teams
                    </span>
                    <span className="font-size-12">
                      <EmojiEventsOutlinedIcon />
                      <span>{tournament.amount_won} FPC</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </>
        ) : (
          <div
            className="contestTab__valueItem"
            style={{ display: "flex", flexDirection: "column" }}
          >
            You haven't joined any tournaments that are yet to start
            {/* <img
              src={require("../../images/activityPage1.jpg").default}
              width="100%"
            /> */}
            <Button
            className="mt-20"
              variant="contained"
              style={{
                backgroundColor: "var(--violet-blue)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop:"20px",
                textTransform:"capitalize",
                fontFamily:"poppins"
              }}
              onClick={() => navigate("/tournaments")}
            >
              View Tournaments
            </Button>
          </div>
        )}
      </div>
      <div className="mt-20 running-tournament display-none">
        {tournamentUpdatedRunning.length ? (
          <>
            {tournamentUpdatedRunning.map((tournament, index) => {
              const disabledTournament = tournament.status === 4;
              const startDate = new Date(tournament.tournament.start_time);
              const finishDate = new Date(tournament.tournament.end_time);
              const status = {
                3: { value: "Completed", color: "#ff000096" },
                1: { value: "Closed", color: "#FFCC00" },
                0: { value: "Open", color: "#00ff00d6" },
                2: { value: "Running", color: "#FFCC00" },
              };

              return (
                <motion.div
                  id={"tournament-" + tournament._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 * (index + 1) }}
                  key={"tournament__" + index}
                  className="tournament"
                  style={{
                    minHeight: "100px",
                    padding: "20px 20px 0px 20px",
                    width: "90%",
                  }}
                  onClick={() => {
                    navigate(`/tournament/${tournament.tournament._id}`, {
                      state: {
                        transactionId: tournament.transaction_hash,
                      },
                    });
                  }}
                >
                  <div className="tournament-info">
                    <span
                      className="tournament-image"
                      style={{ borderRadius: "100%" }}
                    >
                      <img
                        style={{ borderRadius: "100%" }}
                        src={tournament.tournament.imageURL}
                        width="60px"
                        height={"60px"}
                      />
                    </span>
                    <span style={{ textAlign: "left" }}>
                      <span
                        className="font-size-20"
                        style={{ color: "#071F36", fontWeight: "700" }}
                      >
                        {tournament.tournament.name}
                      </span>
                      {/*<span style={{ color: "#071F36", fontWeight: "700" }}>*/}
                      {/*  {tournament.name}*/}
                      {/*</span>*/}
                      <br />
                      <span className="tournaments-spots">
                      <div className="tournamentPage__startTime">
                          {startDate.getDate()}{" "}
                          {monthNames[startDate.getMonth()]}'
                          {startDate.getFullYear() % 100} |{" "}
                          {startDate.getHours() / 10 < 1
                            ? "0" + startDate.getHours()
                            : startDate.getHours()}
                          :
                          {startDate.getMinutes() / 10 < 1
                            ? "0" + startDate.getMinutes()
                            : startDate.getMinutes()}{" "}
                          GMT <br />
                          Duration : {(finishDate - startDate) / 60000} mins
                        </div>
                      </span>
                    </span>
                  </div>
                  <div>
                    {/*<div className="tournamentPage__transactionHash">*/}
                    {/*  {tournament.transaction_hash !== undefined && (*/}
                    {/*    <span*/}
                    {/*      className="font-size-12 tournamentPage__transactionHashLink"*/}
                    {/*      onClick={() => {*/}
                    {/*        window.location.href = `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`;*/}
                    {/*      }}*/}
                    {/*    >*/}
                    {/*      Transaction Hash(Polygon):{" "}*/}
                    {/*      {tournament.transaction_hash.substring(0, 10)}XXXX*/}
                    {/*      {tournament.transaction_hash.slice(-10)}*/}
                    {/*    </span>*/}
                    {/*  )}*/}
                    {/*</div>*/}
                  </div>
                  <div
                    className="tournament-reward"
                    style={{ marginTop: "10px" }}
                  >
                    <span
                      className="font-size-12"
                      style={{
                        color: status[tournament.tournament.status].color,
                        padding: "0 10px",
                        border:
                          "1px solid " +
                          status[tournament.tournament.status].color,
                        borderRadius: "30px",
                      }}
                    >
                      {status[tournament.tournament.status].value}
                    </span>
                    <span className={"activityTabs__teamLength"}>
                      {tournament.teams.length} Teams
                    </span>
                    <span className="font-size-12">
                      <EmojiEventsOutlinedIcon />
                      <span>{tournament.amount_won} FPC</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </>
        ) : (
          <div
            className="contestTab__valueItem"
            style={{ margin: "0px", display: "flex", flexDirection: "column" }}
          >
            You haven't joined any tournaments that are running
            {/* <img
              src={require("../../images/activityPage1.jpg").default}
              width="100%"
            /> */}
            <Button
            className="mt-20"
              variant="contained"
              style={{
                backgroundColor: "var(--violet-blue)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop:"20px",
                textTransform:"capitalize",
                fontFamily:"poppins"
              }}
              onClick={() => navigate("/tournaments")}
            >
              View Tournaments
            </Button>
          </div>
        )}
      </div>
      <div className="mt-20 completed-tournament display-none">
        {tournamentUpdatedCompleted.length ? (
          <>
            {tournamentUpdatedCompleted.map((tournament, index) => {
              const startDate = new Date(tournament.tournament.start_time);
              const finishDate = new Date(tournament.tournament.end_time);
              const disabledTournament = tournament.status === 4;
              const status = {
                3: { value: "Completed", color: "#ff000096" },
                1: { value: "Closed", color: "#FFCC00" },
                0: { value: "Open", color: "#00ff00d6" },
                2: { value: "Running", color: "#FFCC00" },
              };
              return (
                <motion.div
                  id={"tournament-" + tournament._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 * (index + 1) }}
                  key={"tournament__" + index}
                  className="tournament"
                  style={{
                    minHeight: "100px",
                    padding: "20px 20px 0px 20px",
                    width: "90%",
                  }}
                  onClick={() => {
                    navigate(`/tournament/${tournament.tournament._id}`, {
                      state: {
                        transactionId: tournament.transaction_hash,
                      },
                    });
                  }}
                >
                  <div className="tournament-info">
                    <span
                      className="tournament-image"
                      style={{ borderRadius: "100%" }}
                    >
                      <img
                        style={{ borderRadius: "100%" }}
                        src={tournament.tournament.imageURL}
                        width="60px"
                        height={"60px"}
                      />
                    </span>
                    <span style={{ textAlign: "left" }}>
                      <span
                        className="font-size-20"
                        style={{ color: "#071F36", fontWeight: "700" }}
                      >
                        {tournament.tournament.name}
                      </span>
                      {/*<span style={{ color: "#071F36", fontWeight: "700" }}>*/}
                      {/*  {tournament.name}*/}
                      {/*</span>*/}
                      <br />
                      <span className="tournaments-spots">
                      <div className="tournamentPage__startTime">
                          {startDate.getDate()}{" "}
                          {monthNames[startDate.getMonth()]}'
                          {startDate.getFullYear() % 100} |{" "}
                          {startDate.getHours() / 10 < 1
                            ? "0" + startDate.getHours()
                            : startDate.getHours()}
                          :
                          {startDate.getMinutes() / 10 < 1
                            ? "0" + startDate.getMinutes()
                            : startDate.getMinutes()}{" "}
                          GMT <br />
                          Duration : {(finishDate - startDate) / 60000} mins
                        </div>
                      </span>
                    </span>
                  </div>
                  <div>
                    {/*<div className="tournamentPage__transactionHash">*/}
                    {/*  {tournament.transaction_hash !== undefined && (*/}
                    {/*    <span*/}
                    {/*      className="font-size-12 tournamentPage__transactionHashLink"*/}
                    {/*      onClick={() => {*/}
                    {/*        window.location.href = `https://mumbai.polygonscan.com/tx/${tournament.transaction_hash}`;*/}
                    {/*      }}*/}
                    {/*    >*/}
                    {/*      Transaction Hash(Polygon):{" "}*/}
                    {/*      {tournament.transaction_hash.substring(0, 10)}XXXX*/}
                    {/*      {tournament.transaction_hash.slice(-10)}*/}
                    {/*    </span>*/}
                    {/*  )}*/}
                    {/*</div>*/}
                  </div>
                  <div
                    className="tournament-reward"
                    style={{ marginTop: "10px" }}
                  >
                    <span
                      className="font-size-12"
                      style={{
                        color: status[tournament.tournament.status].color,
                        padding: "0 10px",
                        border:
                          "1px solid " +
                          status[tournament.tournament.status].color,
                        borderRadius: "30px",
                      }}
                    >
                      {status[tournament.tournament.status].value}
                    </span>
                    <span className={"activityTabs__teamLength"}>
                      {tournament.teams.length} Teams
                    </span>
                    <span className="font-size-12">
                      <EmojiEventsOutlinedIcon />
                      <span>{tournament.amount_won} FPC</span>
                    </span>
                  </div>
                </motion.div>
              );
              return (
                <div>
                  <motion.div
                    // id={"tournament-" + tournament._id}
                    // initial={{y: "100vh"}}
                    animate={{ y: 0 }}
                    transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                    key={"tournament__" + index}
                    className="activity-tournament"
                    onClick={() => {
                      navigate(`/tournament/${tournament.tournament._id}`);
                    }}
                  >
                    <div className="tournament-info">
                      <span
                        className="tournament-image"
                        style={{ borderRadius: "100%" }}
                      >
                        <img
                          style={{ borderRadius: "100%" }}
                          src={tournament.tournament.imageURL}
                          width="60px"
                          height={"60px"}
                        />
                      </span>
                      <div className="activityPage__contentWrapper">
                        <div className={"activityTabs__tournamentNameDiv"}>
                          <span
                            className="activityTab__tournamentName"
                            style={{ color: "#071F36", fontWeight: "700" }}
                          >
                            {tournament.tournament.name}
                          </span>
                          <span className="reward_amount">
                            <EmojiEventsOutlinedIcon />
                            {tournament.amount_won} FPC
                          </span>
                        </div>

                        <div className="tournaments-spots">
                          <span className="activityTab__Amount">
                            <span className={"activityTabs__teamLength"}>
                              {tournament.teams.length} Teams
                            </span>
                            <span
                              className="activityTab__tournamentStatus font-size-12"
                              style={{
                                color:
                                  status[tournament.tournament.status].color,
                                padding: "0 10px",
                                border:
                                  "1px solid " +
                                  status[tournament.tournament.status].color,
                                borderRadius: "30px",
                              }}
                            >
                              {status[tournament.tournament.status].value}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </>
        ) : (
          <div
            className="contestTab__valueItem"
            style={{ display: "flex", flexDirection: "column" }}
          >
            You haven't joined any tournaments that are completed
            {/* <img
              src={require("../../images/activityPage1.jpg").default}
              width="100%"
            /> */}
            <Button
            className="mt-20"
              variant="contained"
              style={{
                backgroundColor: "var(--violet-blue)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop:"20px",
                textTransform:"capitalize",
                fontFamily:"poppins"
              }}
              onClick={() => navigate("/tournaments")}
            >
              View Tournaments
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
  return (
    // <div className="activityPage__content">
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        fontFamily: "poppins",
        fontSize: "25px",
      }}
    >
      <TabContext value={valueContest}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChangeContest}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Open"
              value="1"
              style={{
                textTransform: "capitalize",
                fontFamily: "poppins",
                fontSize: "12px",
              }}
              tabItemContainerStyle={{ width: "100px" }}
            />
            <Tab
              label="Running"
              value="2"
              style={{
                textTransform: "capitalize",
                fontFamily: "poppins",
                fontSize: "12px",
              }}
              tabItemContainerStyle={{ width: "100px" }}
            />
            <Tab
              label="Completed"
              value="3"
              style={{
                textTransform: "capitalize",
                fontFamily: "poppins",
                fontSize: "12px",
              }}
              tabItemContainerStyle={{ width: "100px" }}
            />
          </TabList>
        </Box>
        <TabPanel className="contestTab__valueItem" value="1">
          {tournamentUpdatedOpen.length ? (
            <>
              {tournamentUpdatedOpen.map((tournament, index) => {
                const disabledTournament = tournament.status === 4;
                const status = {
                  3: { value: "Completed", color: "#ff000096" },
                  1: { value: "Closed", color: "#FFCC00" },
                  0: { value: "Open", color: "#00ff00d6" },
                  2: { value: "Running", color: "#FFCC00" },
                };

                return (
                  <div>
                    <motion.div
                      // id={"tournament-" + tournament._id}
                      // initial={{y: "100vh"}}
                      animate={{ y: 0 }}
                      transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                      key={"tournament__" + index}
                      className="activity-tournament"
                      onClick={() => {
                        navigate(`/tournament/${tournament.tournament._id}`);
                      }}
                    >
                      <div className="tournament-info">
                        <span
                          className="tournament-image"
                          style={{ borderRadius: "100%" }}
                        >
                          <img
                            style={{ borderRadius: "100%" }}
                            src={tournament.tournament.imageURL}
                            width="60px"
                            height={"60px"}
                          />
                        </span>
                        <div className="activityPage__contentWrapper">
                          <div className={"activityTabs__tournamentNameDiv"}>
                            <span
                              className="activityTab__tournamentName"
                              style={{ color: "#071F36", fontWeight: "700" }}
                            >
                              {tournament.tournament.name}
                            </span>
                            <span className="reward_amount">
                              <EmojiEventsOutlinedIcon />
                              {tournament.amount_won} FPC
                            </span>
                          </div>

                          <div className="tournaments-spots">
                            <span className="activityTab__Amount">
                              <span className={"activityTabs__teamLength"}>
                                {tournament.teams.length} Teams
                              </span>
                              <span
                                className="activityTab__tournamentStatus font-size-12"
                                style={{
                                  color:
                                    status[tournament.tournament.status].color,
                                  padding: "0 10px",
                                  border:
                                    "1px solid " +
                                    status[tournament.tournament.status].color,
                                  borderRadius: "30px",
                                }}
                              >
                                {status[tournament.tournament.status].value}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="contestTab__valueItem">No Open Tournament</div>
          )}
        </TabPanel>
        <TabPanel className="contestTab__valueItem" value="2">
          {tournamentUpdatedRunning.length ? (
            <>
              {tournamentUpdatedRunning.map((tournament, index) => {
                const disabledTournament = tournament.status === 4;
                const status = {
                  3: { value: "Completed", color: "#ff000096" },
                  1: { value: "Closed", color: "#FFCC00" },
                  0: { value: "Open", color: "#00ff00d6" },
                  2: { value: "Running", color: "#FFCC00" },
                };

                return (
                  <div>
                    <motion.div
                      // id={"tournament-" + tournament._id}
                      // initial={{y: "100vh"}}
                      animate={{ y: 0 }}
                      transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                      key={"tournament__" + index}
                      className="activity-tournament"
                      onClick={() => {
                        navigate(`/tournament/${tournament.tournament._id}`);
                      }}
                    >
                      <div className="tournament-info">
                        <span
                          className="tournament-image"
                          style={{ borderRadius: "100%" }}
                        >
                          <img
                            style={{ borderRadius: "100%" }}
                            src={tournament.tournament.imageURL}
                            width="60px"
                            height={"60px"}
                          />
                        </span>
                        <div className="activityPage__contentWrapper">
                          <div className={"activityTabs__tournamentNameDiv"}>
                            <span
                              className="activityTab__tournamentName"
                              style={{ color: "#071F36", fontWeight: "700" }}
                            >
                              {tournament.tournament.name}
                            </span>
                            <span className="reward_amount">
                              <EmojiEventsOutlinedIcon />
                              {tournament.amount_won} FPC
                            </span>
                          </div>

                          <div className="tournaments-spots">
                            <span className="activityTab__Amount">
                              <span className={"activityTabs__teamLength"}>
                                {tournament.teams.length} Teams
                              </span>
                              <span
                                className="activityTab__tournamentStatus font-size-12"
                                style={{
                                  color:
                                    status[tournament.tournament.status].color,
                                  padding: "0 10px",
                                  border:
                                    "1px solid " +
                                    status[tournament.tournament.status].color,
                                  borderRadius: "30px",
                                }}
                              >
                                {status[tournament.tournament.status].value}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="contestTab__valueItem">No Running Tournament</div>
          )}
        </TabPanel>
        <TabPanel className="contestTab__valueItem" value="3">
          {tournamentUpdatedCompleted.length ? (
            <>
              {tournamentUpdatedCompleted.map((tournament, index) => {
                const disabledTournament = tournament.status === 4;
                const status = {
                  3: { value: "Completed", color: "#ff000096" },
                  1: { value: "Closed", color: "#FFCC00" },
                  0: { value: "Open", color: "#00ff00d6" },
                  2: { value: "Running", color: "#FFCC00" },
                };

                return (
                  <div>
                    <motion.div
                      // id={"tournament-" + tournament._id}
                      // initial={{y: "100vh"}}
                      animate={{ y: 0 }}
                      transition={{ delay: 0 + 0.08 * index, duration: 0.35 }}
                      key={"tournament__" + index}
                      className="activity-tournament"
                      onClick={() => {
                        navigate(`/tournament/${tournament.tournament._id}`);
                      }}
                    >
                      <div className="tournament-info">
                        <span
                          className="tournament-image"
                          style={{ borderRadius: "100%" }}
                        >
                          <img
                            style={{ borderRadius: "100%" }}
                            src={tournament.tournament.imageURL}
                            width="60px"
                            height={"60px"}
                          />
                        </span>
                        <div className="activityPage__contentWrapper">
                          <div className={"activityTabs__tournamentNameDiv"}>
                            <span
                              className="activityTab__tournamentName"
                              style={{ color: "#071F36", fontWeight: "700" }}
                            >
                              {tournament.tournament.name}
                            </span>
                            <span className="reward_amount">
                              <EmojiEventsOutlinedIcon />
                              {tournament.amount_won} FPC
                            </span>
                          </div>

                          <div className="tournaments-spots">
                            <span className="activityTab__Amount">
                              <span className={"activityTabs__teamLength"}>
                                {tournament.teams.length} Teams
                              </span>
                              <span
                                className="activityTab__tournamentStatus font-size-12"
                                style={{
                                  color:
                                    status[tournament.tournament.status].color,
                                  padding: "0 10px",
                                  border:
                                    "1px solid " +
                                    status[tournament.tournament.status].color,
                                  borderRadius: "30px",
                                }}
                              >
                                {status[tournament.tournament.status].value}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="contestTab__valueItem">No Completed Tournament</div>
          )}
        </TabPanel>

        {/*{tournamentList.map((item, indexInner)=>{*/}
        {/*    console.log("item", item, "index", indexInner)*/}
        {/*    return(*/}
        {/*        <TabPanel  className="contestTab__valueItem"  value={indexInner+1}>*/}
        {/*            {item.map( (tournament, index) => {*/}
        {/*                const disabledTournament = tournament.status === 4;*/}
        {/*                const status = {*/}
        {/*                    3: { value: "Completed", color: "#ff000096" },*/}
        {/*                    1: { value: "Closed", color: "#FFCC00" },*/}
        {/*                    0: { value: "Open", color: "#00ff00d6" },*/}
        {/*                    2: { value: "Running", color: "#FFCC00" },*/}
        {/*                };*/}

        {/*                return (*/}
        {/*                    <div>*/}
        {/*                        <motion.div*/}
        {/*                            // id={"tournament-" + tournament._id}*/}
        {/*                            // initial={{y: "100vh"}}*/}
        {/*                            animate={{y: 0}}*/}
        {/*                            transition={{delay: 0 + 0.08 * index, duration: 0.35}}*/}
        {/*                            key={"tournament__" + index}*/}
        {/*                            className="activity-tournament"*/}
        {/*                            onClick={() => {*/}
        {/*                                navigate(`/tournament/${tournament.tournament._id}`);*/}
        {/*                            }}*/}
        {/*                        >*/}
        {/*                            <div className="tournament-info">*/}
        {/*                        <span className="tournament-image" style={{borderRadius: "100%"}}>*/}
        {/*                            <img*/}
        {/*                                style={{ borderRadius: "100%" }}*/}
        {/*                                src={tournament.tournament.imageURL}*/}
        {/*                                width="60px"*/}
        {/*                                height={"60px"}*/}
        {/*                            />*/}
        {/*                        </span>*/}
        {/*                                        <div className="activityPage__contentWrapper">*/}
        {/*                                            <div className={"activityTabs__tournamentNameDiv"}>*/}
        {/*                      <span className="activityTab__tournamentName" style={{color: "#071F36", fontWeight: "700"}}>*/}
        {/*                        {tournament.tournament.name}*/}
        {/*                      </span>*/}
        {/*                                <span className="reward_amount"><EmojiEventsOutlinedIcon/>{tournament.amount_won} MGT</span>*/}
        {/*                            </div>*/}

        {/*                            <div className="tournaments-spots">*/}
        {/*                              <span className="activityTab__Amount">*/}
        {/*                                <span className={"activityTabs__teamLength"}>{tournament.teams.length} Teams</span>*/}
        {/*                                  <span*/}
        {/*                                      className="activityTab__tournamentStatus font-size-12"*/}
        {/*                                      style={{*/}
        {/*                                          color: status[tournament.tournament.status].color,*/}
        {/*                                          padding: "0 10px",*/}
        {/*                                          border: "1px solid " + status[tournament.tournament.status].color,*/}
        {/*                                          borderRadius: "30px",*/}
        {/*                                      }}*/}
        {/*                                  >*/}
        {/*                                {status[tournament.tournament.status].value}*/}
        {/*                                </span>*/}
        {/*                                  </span>*/}
        {/*                                </div>*/}
        {/*                            </div>*/}
        {/*                        </div>*/}
        {/*                        </motion.div>*/}
        {/*                    </div>*/}
        {/*                );*/}
        {/*            })}*/}

        {/*        </TabPanel>*/}
        {/*    )*/}
        {/*})}*/}

        {/*</Box>*/}
      </TabContext>
    </Box>
  );
}
