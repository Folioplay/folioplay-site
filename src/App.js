import './App.css';
import LoginPage from './components/LoginPage/src';
import Tournaments from './components/Tournaments/src';
import {
    BrowserRouter,
    Switch,
    Routes,
    Route,
    Link
} from "react-router-dom";



function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/tournaments" element={<Tournaments />} />
            </Routes>
        </BrowserRouter>
      {/* <LoginPage />*/}
      {/*/!*<Tournaments />*!/*/}
    </div>
  );
}

export default App;
