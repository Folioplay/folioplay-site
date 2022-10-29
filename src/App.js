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
import { Navigate, useLocation } from "react-router";
import TickerWidget from "./components/TickerWidget/src";
import { validUser } from "./APIS/apis";
import { useState, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import { tournaments } from "./components/Tournaments/common/demoTournaments";
import Joyride from "react-joyride";
import MyTeams from "./components/MyTeams/src";
import UserProfile from "./components/UserProfile/src";
import TeamPreview from "./components/TeamPreview/src";
import AddMoney from "./components/AddMoney/src";
import CurrentTeamPreview from "./components/CurrentTeam/src";
import CurrentTeamTable from "./components/CurrentTeamTable/src";
// import React, { useEffect, useState } from "react";
function App() {
  function AuthenticatedRoute({ children }) {
    const { isAuthenticated, isWeb3Enabled, user, isInitialized } =
      useMoralis();
    const { isLoading } = useContext(AuthContext);
    console.log(
      "isAuth",
      "isInit",
      "isLoad",
      isAuthenticated,
      isInitialized,
      isLoading
    );
    // const { isLoading } = useContext(AuthContext);
    console.log("isLoading logout",isLoading);
    if (!isAuthenticated && isInitialized && isLoading) {
      return window.location.pathname="/";
    }
    return children;
  }

  function LoginRoute({ children }) {
    const { isAuthenticated, isInitialized } = useMoralis();
    const { isLoading } = useContext(AuthContext);
    console.log("login route ", isAuthenticated, isInitialized, isLoading);
    console.log("isLoading login",isLoading);
    if (isAuthenticated && isInitialized && isLoading) {
      return window.location.pathname="/tournament";
    }
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
                {/* <AuthContextProvider> */}
                <Tournaments />
                {/* </AuthContextProvider> */}
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/tournaments/:tournamentId"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <TournamentView />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/teams/createteam"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <TeamCreation />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/teams/createteam/assignrole"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <AssignRole />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <MyTeams />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/user/profile"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <UserProfile />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/:teamId"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <TeamPreview />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/currentStatus"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <CurrentTeamPreview />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/activity/team/currentStatus/currentCoinTable"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <CurrentTeamTable />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/chart"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <OpenChart />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
          <Route
            exact
            path="/add_money"
            element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                  <AddMoney />
                </AuthContextProvider>
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
