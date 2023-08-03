import LoginPage from "./components/LoginPage/src";
import React, { useContext } from "react";
import Tournaments from "./components/Tournaments/src";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from "./components/TournamentView/src";
import "./App.css";
import { TeamCreation } from "./components/TeamCreation/src";
import { AssignRole } from "./components/AssignRole/src";
import OpenChart from "./components/Charts/src";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { AuthContext} from "./Context/AuthContext";
import { tournaments } from "./components/Tournaments/common/demoTournaments";
import MyTeams from "./components/MyTeams/src";
import UserProfile from "./components/UserProfile/src";
import TeamPreview from "./components/TeamPreview/src";
import AddMoney from "./components/AddMoney/src";
import CurrentTeamPreview from "./components/CurrentTeam/src";
import CurrentTeamTable from "./components/CurrentTeamTable/src";
import ComingSoon from "./components/AddMoney/src/ComingSoon";
import {CircularProgress} from "@mui/material";
import AccordionComponent from "./Common/Accordion";
import TransactionHistory from "./components/TransactionHistory/src";
import LoginGif from "./components/LoginPage/common/LoginGif";
import ReactLoading from "react-loading";
import ReactGA from 'react-ga';
ReactGA.initialize(`${process.env.REACT_APP_GA_ID}`);
function App() {
  const SERVER = process.env.REACT_APP_API_SERVER;
  useEffect(()=>{
      ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  const [isLoading, setIsLoading] = useState(true);

  function AuthenticatedRoute({children}) {

      const {presentAuthToken, loggedIn} = useContext(AuthContext);
      return loggedIn ? children : <div className={"loadingReactScreen"}><ReactLoading /> </div>;
  }

  function LoginRoute({ children }) {
    const { isAuthenticated, isInitialized } = useMoralis();
    const { isLoading, presentAuthToken } = useContext(AuthContext);

    // if ((isAuthenticated && isInitialized && presentAuthToken)) {
    //     window.location.pathname  = "/tournaments";
    // }
    return children;
  }
  const steps = [
    {
      target: "#folioplay-hamburger",
      disableBeacon: true,
      content: "Explore here",
    },
    {
      target: "#folioplay-wallet",
      disableBeacon: true,
      content: "World step",
    },
    {
      target: "#image-slider-wrapper",
      // position: "middle-bottom",
      disableBeacon: true,
      content: "Hello step 1",
    },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginRoute>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            exact
            path="/tournaments"
            element={
              <AuthenticatedRoute>
                <Tournaments />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/tournaments/:tournamentId"
            element={
              <AuthenticatedRoute>
                  <TournamentView />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/teams/createteam"
            element={
              <AuthenticatedRoute>
                  <TeamCreation />
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/teams/createteam/assignrole"
            element={
              <AuthenticatedRoute>
                  <AssignRole />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity"
            element={
              <AuthenticatedRoute>
                  <MyTeams />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/user/profile"
            element={
              <AuthenticatedRoute>
                  <UserProfile />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/:teamId"
            element={
              <AuthenticatedRoute>
                  <TeamPreview />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/currentStatus"
            element={
              <AuthenticatedRoute>
                  <CurrentTeamPreview />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/currentStatus/currentCoinTable"
            element={
              <AuthenticatedRoute>
                  <CurrentTeamTable />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/chart"
            element={
              <AuthenticatedRoute>
                  <OpenChart />

              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/add_money"
            element={
              <AuthenticatedRoute>
                  <AddMoney />

              </AuthenticatedRoute>
            }
          />
          <Route
              exact
              path="/coming_soon"
              element={
                <AuthenticatedRoute>
                    <ComingSoon />

                </AuthenticatedRoute>
              }
          />
            <Route
                exact
                path="/transaction_history"
                element={
                    <AuthenticatedRoute>
                        <TransactionHistory />
                    </AuthenticatedRoute>
                }
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
