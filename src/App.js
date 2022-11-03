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
import {getAuthToken, SERVER, validUser} from "./APIS/apis";
import { useState, useEffect } from "react";
import { AuthContext} from "./Context/AuthContext";
import { tournaments } from "./components/Tournaments/common/demoTournaments";
import Joyride from "react-joyride";
import MyTeams from "./components/MyTeams/src";
import UserProfile from "./components/UserProfile/src";
import TeamPreview from "./components/TeamPreview/src";
import AddMoney from "./components/AddMoney/src";
import CurrentTeamPreview from "./components/CurrentTeam/src";
import CurrentTeamTable from "./components/CurrentTeamTable/src";
import ComingSoon from "./components/AddMoney/src/ComingSoon";
import {CircularProgress} from "@mui/material";
// import React, { useEffect, useState } from "react";
function App() {
  const SERVER = process.env.REACT_APP_API_SERVER;

  const [isLoading, setIsLoading] = useState(true);

  function AuthenticatedRoute({children}) {

      const callLogin = async() => {
          if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
              setTimeout(callLogin, 2000);
          }
          else{
              fetch(`${SERVER}/user/is-valid`, {
                  method: "GET",
                  headers: {
                      "x-access-token": localStorage.getItem("authtoken"),
                  },
              })
                  .then((res) => {
                      if (!res.ok) {
                          console.log("reserr", res.body)
                          if (res.status === 403)
                              throw new Error();

                      }
                      else{
                          fetch(`${SERVER}/user/`, {
                              method: "GET",
                              headers: {
                                  "x-access-token": localStorage.getItem("authtoken"),
                              },
                          })
                              .then((res) => res.json())
                              .then((data)=> {
                                  localStorage.setItem("folioUsername", data.username);
                                  localStorage.setItem("folioWalletAddress", data.walletAddress);
                                  localStorage.setItem("folioReferralCode", data.referralCode);
                              })
                              .catch((err) => err)
                              .finally(() => setIsLoading(false));
                          setIsLoading(false);
                      }
                  })
                  .catch(err => {
                      // debugger
                      localStorage.clear();
                      window.location.pathname = "/";
                  })
              setIsLoading(false);
              // clearTimeout(id);
          }

      }

      const {isAuthenticated, isWeb3Enabled, user, isInitialized, isAuthenticating, logout} =
          useMoralis();

      if(isAuthenticated){

          fetch(`${SERVER}/user/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  walletAddress: user.attributes.ethAddress,
                  signature: user.attributes.authData.moralisEth.signature,
                  // email: user.email
              }),
          })
              .then((res) => {
                  if (!res.ok) throw "Invalid user";
                  else return res.json();
              })
              .then((data) => {
                  localStorage.removeItem("authtoken");
                  localStorage.setItem("authtoken", data.accessToken);
                  return {
                      "userdata": data.user,
                      "new_user": data.newUser
                  };
              });

          if(localStorage.getItem("authtoken")===null ||localStorage.getItem("authtoken")===undefined || localStorage.getItem("authtoken")===""){
              callLogin();
          }
          else{
              fetch(`${SERVER}/user/is-valid`, {
                  method: "GET",
                  headers: {
                      "x-access-token": localStorage.getItem("authtoken"),
                  },
              })
                  .then((res) => {
                      if (!res.ok) {
                          console.log("reserr", res.body)
                          if (res.status === 403)
                              throw new Error();

                      }
                      else{
                          setIsLoading(false);
                      }
                  })
                  .catch(err => {
                      localStorage.clear();
                      window.location.pathname = "/";
                  })
          }
      }
      if (!isAuthenticated && isInitialized) {
          return window.location.pathname = "/";
      }
      return isLoading ? <CircularProgress /> : children;
  }

  function LoginRoute({ children }) {
    const { isAuthenticated, isInitialized } = useMoralis();
    const { isLoading } = useContext(AuthContext);
    console.log("login route ", isAuthenticated, isInitialized, isLoading);
    console.log("isLoading login",isLoading);

    if ((isAuthenticated && isInitialized)) {
        return window.location.pathname  = "/tournaments";
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
                {/* */}
                <Tournaments />
                {/*  */}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
