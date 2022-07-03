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
import {validUser} from "./APIS/apis";
import {useContext} from "react";
import {AuthContext, AuthContextProvider} from "./Context/AuthContext";
import {tournaments} from "./components/Tournaments/common/demoTournaments";

function App() {

  function AuthenticatedRoute({children}) {
    const {isAuthenticated, isWeb3Enabled, user, isInitialized, logout} = useMoralis();
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
          const redirectBuffer = () =>{
              window.location.pathname="tournaments";
          }
          setTimeout(redirectBuffer, 1500);
        // return <Navigate to="/tournaments" />;
      }
      else{
          return children;
      }
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginRoute><LoginPage /></LoginRoute>} />
            <Route exact path="/tournaments" element={
                <AuthenticatedRoute>
                    <AuthContextProvider>
                        <Tournaments />
                    </AuthContextProvider>
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
          <Route exact path="/chart" element={
              <AuthenticatedRoute>
                <AuthContextProvider>
                    <OpenChart />
                </AuthContextProvider>
              </AuthenticatedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;