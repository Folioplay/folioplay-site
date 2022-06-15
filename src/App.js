import LoginPage from './components/LoginPage/src';
import Tournaments from './components/Tournaments/src';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from './components/TournamentView/src';
import './App.css';
import { TeamCreation } from './components/TeamCreation/src';
import { AssignRole } from './components/AssignRole/src';
import OpenChart from './components/Charts/src';
import {useMoralis} from "react-moralis";
import {Navigate, useLocation} from "react-router";
import TickerWidget from './components/TickerWidget/src';

function App() {

  function AuthenticatedRoute({ children }) {
    const {isAuthenticated } = useMoralis();

    console.log("authntiated route ", isAuthenticated);
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  }

  function LoginRoute({ children }) {
    const {isAuthenticated } = useMoralis();
    console.log("login route ", isAuthenticated);
    if (isAuthenticated) {
      return <Navigate to="/tournaments" />;
    }
    return children;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginRoute><LoginPage /></LoginRoute>} />
          <Route exact path="/tournaments" element={<AuthenticatedRoute><Tournaments /></AuthenticatedRoute>} />
          <Route exact path="/tournaments/:tournamentId" element={<AuthenticatedRoute><TournamentView /></AuthenticatedRoute>} />
          <Route exact path="/teams/createteam" element={<AuthenticatedRoute><TeamCreation /></AuthenticatedRoute>} />
          <Route exact path="/assignrole" element={<AuthenticatedRoute><AssignRole /></AuthenticatedRoute>} />
          <Route exact path="/chart" element={<AuthenticatedRoute><OpenChart /></AuthenticatedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;