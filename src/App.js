import LoginPage from './components/LoginPage/src';
import Tournaments from './components/Tournaments/src';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from './components/TournamentView/src';
import './App.css';
import { TeamCreation } from './components/TeamCreation/src';
import { AssignRole } from './components/AssignRole/src';
import OpenChart from './components/Charts/src';
import { useMoralis } from "react-moralis";
import { Navigate, useLocation } from "react-router";
import TickerWidget from './components/TickerWidget/src';
import { validUser } from "./APIS/apis";
import { useState, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import { tournaments } from "./components/Tournaments/common/demoTournaments";
import Joyride from 'react-joyride';
import MyTeams from './components/MyTeams/src';
import UserProfile from './components/UserProfile/src';
import TeamPreview from './components/TeamPreview/src';
import AddMoney from "./components/AddMoney/src";
// import React, { useEffect, useState } from "react";
function App() {
  function AuthenticatedRoute({ children }) {
    const { isAuthenticated, isWeb3Enabled, user, isInitialized} = useMoralis();
    console.log("authenticated route ", isAuthenticated, isWeb3Enabled, user, isInitialized);
    if (!isAuthenticated && isInitialized) {
      return <Navigate to="/" />;
    }
    return children;
  }

  function LoginRoute({ children }) {
    const { isAuthenticated, isInitialized } = useMoralis();
    console.log("login route ", isAuthenticated);
    if (isAuthenticated && isInitialized) {
      return <Navigate to="/tournaments" />;
    }
    return children;
  }
  const steps = [
    {
      target: "#folioplay-hamburger",
      disableBeacon: true,
      content: "Explore here"
    },
    {
      target: "#folioplay-wallet",
      disableBeacon: true,
      content: "World step"
    },
    {
      target: "#image-slider-wrapper",
      // position: "middle-bottom",
      disableBeacon: true,
      content: "Hello step 1"
    }
  ];
  return (
    <div className="App">
      {/* <Joyride
        run={true}
        steps={steps}
        showProgress={true}
        styles={{
          options: {
            arrowColor: 'var(--dim-white)',
            backgroundColor: 'var(--dim-white)',
            overlayColor: 'rgba(0, 0, 0, 0.7)',
            primaryColor: '#000',
            textColor: 'var(--dark-grey)',
            width: 300,
            zIndex: 1000,
          }
        }}
      /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginRoute><LoginPage /></LoginRoute>} />
          <Route exact path="/tournaments" element={
            <AuthenticatedRoute>
              {/* <AuthContextProvider> */}
              <Tournaments />
              {/* </AuthContextProvider> */}
            </AuthenticatedRoute>
          } />
          <Route exact path="/tournaments/:tournamentId" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <TournamentView />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/teams/createteam" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <TeamCreation />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/teams/createteam/assignrole" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <AssignRole />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/activity" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <MyTeams />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/user/profile" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <UserProfile />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/activity/team/:teamId" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <TeamPreview />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
          <Route exact path="/chart" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <OpenChart />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
        <Route exact path="/add_money" element={
            <AuthenticatedRoute>
              <AuthContextProvider>
                <AddMoney />
              </AuthContextProvider>
            </AuthenticatedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;