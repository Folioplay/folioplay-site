import LoginPage from './components/LoginPage/src';
import Tournaments from './components/Tournaments/src';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from './components/TournamentView/src';
import './App.css';
import { TeamCreation } from './components/TeamCreation/src';
import { AssignRole } from './components/AssignRole/src';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/tournaments" element={<Tournaments />} />
          <Route exact path="/tournaments/:tournamentId" element={<TournamentView />} />
          <Route exact path="/teams/createteam" element={<TeamCreation />} />
          <Route exact path="/assignrole" element={<AssignRole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
