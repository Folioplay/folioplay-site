import LoginPage from './components/LoginPage/src';
import Tournaments from './components/Tournaments/src';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from './components/TournamentView/src';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/tournaments" element={<Tournaments />} />
          <Route exact path="/tournaments/:tournamentId" element={<TournamentView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
