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

// import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { useMoralis } from "react-moralis";
//
// function App() {
//
//     const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
//
//     const login = async () => {
//         if (!isAuthenticated) {
//
//             await authenticate({ provider: "walletconnect", chainId: 137 })
//                 .then(function (user) {
//                     console.log(user.get("ethAddress"));
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 });
//         }
//     }
//
//     const metamaskLogin = async () => {
//         if (!isAuthenticated) {
//
//             await authenticate()
//                 .then(function (user) {
//                     console.log(user.get("ethAddress"));
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 });
//         }
//     }
//
//
//     const logOut = async () => {
//         await logout();
//         console.log("logged out");
//     }
//
//     return (
//         <div>
//             <h1>Moralis Hello World!</h1>
//             <button onClick={login}>Moralis Metamask Login</button>
//             <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
//         </div>
//     );
// }
//
// export default App;
