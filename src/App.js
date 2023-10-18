// // NAman working wala auth
// import LoginPage from "./components/LoginPage/src";
// import React, { useContext } from "react";
// import Tournaments from "./components/Tournaments/src";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TournamentView from "./components/TournamentView/src";
// import "./App.css";
// import { TeamCreation } from "./components/TeamCreation/src";
// import { AssignRole } from "./components/AssignRole/src";
// import OpenChart from "./components/Charts/src";
// import { useMoralis } from "react-moralis";
// import { useState, useEffect } from "react";
// import { AuthContext} from "./Context/AuthContext";
// import { tournaments } from "./components/Tournaments/common/demoTournaments";
// import MyTeams from "./components/MyTeams/src";
// import UserProfile from "./components/UserProfile/src";
// import TeamPreview from "./components/TeamPreview/src";
// import AddMoney from "./components/AddMoney/src";
// import CurrentTeamPreview from "./components/CurrentTeam/src";
// import CurrentTeamTable from "./components/CurrentTeamTable/src";
// import ComingSoon from "./components/AddMoney/src/ComingSoon";
// import {CircularProgress} from "@mui/material";
// import AccordionComponent from "./Common/Accordion";
// import TransactionHistory from "./components/TransactionHistory/src";
// import LoginGif from "./components/LoginPage/common/LoginGif";
// import ReactLoading from "react-loading";
// import ReactGA from 'react-ga';
// import LoginVerify from "./components/LoginPage/src/LoginVerify";


// ReactGA.initialize(`${process.env.REACT_APP_GA_ID}`);
// function App() {
//   const SERVER = process.env.REACT_APP_API_SERVER;
//   // const [isLoading, setIsLoading] = useState(true);
//   const [loginInitiated, setLoginInitiated] =useState("");
  

// const [isAuthenticated, setIsAuthenticated] =useState("");
// const [token, setToken] =useState("");
  


// const localStoritems = async () => {

  
//   const userr = await localStorage.getItem("user");

//   const login = await localStorage.getItem("loginInitiated");
//   await setLoginInitiated(login);
//   const tokenn = await localStorage.getItem("authtoken");
//   const Loggedinn = await  localStorage.getItem("isLoggedIn");
//   const didTokenn = await localStorage.getItem("authtoken");

//   await setToken(didTokenn);
// }
 

//   function AuthenticatedRoute({children}) {

//       const {presentAuthToken, loggedIn, user} = useContext(AuthContext);
    
//       return loggedIn ? children : <div className={"loadingReactScreen"}><ReactLoading /> </div>;
//   }

//   function Con({children}){
   
    
//       const {user} = useContext(AuthContext);
  
   
  
//   };

//   function LoginRoute({ children }) {
//     // const { isAuthenticated, isInitialized } = useMoralis();
//     const { isLoading, presentAuthToken } = useContext(AuthContext);

//     // if ((isAuthenticated && isInitialized && presentAuthToken)) {
//     //     window.location.pathname  = "/tournaments";
//     // }
//     return children;
//       }
      

//       useEffect(()=>{
  
//         localStoritems();
  
//         ReactGA.pageview(window.location.pathname + window.location.search);
//     },[])
//   const steps = [
//     {
//       target: "#folioplay-hamburger",
//       disableBeacon: true,
//       content: "Explore here",
//     },
//     {
//       target: "#folioplay-wallet",
//       disableBeacon: true,
//       content: "World step",
//     },
//     {
//       target: "#image-slider-wrapper",
//       // position: "middle-bottom",
//       disableBeacon: true,
//       content: "Hello step 1",
//     },
//   ];



//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route
//             exact
//             path="/"
//             element={
//               <LoginRoute>
//                 <LoginPage />
//               </LoginRoute>
//             }
//           />

// <Route
//             exact
//             path="/loginverify"
//             element={
//               <LoginRoute>
//                <LoginVerify />
//                </LoginRoute>
                
             
//             }
//           />
//           <Route
//             exact
//             path="/tournaments"
//             element={
             
//                 <Tournaments />
             
//             }
//           />
//           <Route
//             exact
//             path="/tournament/:tournamentId"
//             element={
             
//                   <TournamentView />
             
//             }
//           />
//           <Route
//             exact
//             path="/teams/createteam"
//             element={
             
//                   <TeamCreation />
             
//             }
//           />
//           <Route
//             exact
//             path="/teams/createteam/assignrole"
//             element={
             
//                   <AssignRole />

             
//             }
//           />
//           <Route
//             exact
//             path="/activity"
//             element={
             
//                   <MyTeams />

             
//             }
//           />
//           <Route
//             exact
//             path="/user/profile"
//             element={
             
//                   <UserProfile />

             
//             }
//           />
//           <Route
//             exact
//             path="/activity/team/:teamId"
//             element={
             
//                   <TeamPreview />

             
//             }
//           />
//           <Route
//             exact
//             path="/activity/team/currentStatus"
//             element={
             
//                   <CurrentTeamPreview />

             
//             }
//           />
//           <Route
//             exact
//             path="/activity/team/currentStatus/currentCoinTable"
//             element={
             
//                   <CurrentTeamTable />

             
//             }
//           />
//           <Route
//             exact
//             path="/chart"
//             element={
             
//                   <OpenChart />

             
//             }
//           />
//           <Route
//             exact
//             path="/add_money"
//             element={
             
//                   <AddMoney />

             
//             }
//           />
//           <Route
//               exact
//               path="/coming_soon"
//               element={
               
//                     <ComingSoon />

               
//               }
//           />
//             <Route
//                 exact
//                 path="/transaction_history"
//                 element={
                   
//                         <TransactionHistory />
                   
//                 }
//             />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import LoginPage from "./components/LoginPage/src";
import React, { useContext } from "react";
import Tournaments from "./components/Tournaments/src";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TournamentView from "./components/TournamentView/src";
import "./App.css";
import { TeamCreation } from "./components/TeamCreation/src";
import { AssignRole } from "./components/AssignRole/src";
import OpenChart from "./components/Charts/src";
// import { useMoralis } from "react-moralis";
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
import GlobalLeaderboard from "./components/GlobalLeaderboard/src";
import {CircularProgress} from "@mui/material";
import AccordionComponent from "./Common/Accordion";
import TransactionHistory from "./components/TransactionHistory/src";
import LoginGif from "./components/LoginPage/common/LoginGif";
import ReactLoading from "react-loading";
import LoginVerify from "./components/LoginPage/src/LoginVerify";
import ReactGA from "react-ga4";
import SelectedCoinTeamPreview from "./components/SelectedCoinTeamPreview/src";



function App() {
  const TRACKING_ID = "G-KZQWCKX4JP";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
    title: window.location.pathname
  });

  const [isLoading, setIsLoading] = useState(true);
 

  const [loginInitiated, setLoginInitiated] =useState("");
  

const [isAuthenticated, setIsAuthenticated] =useState("");
const [token, setToken] =useState("");
  
  
  
  const localStoritems = async () => {
  
    
    const userr = await localStorage.getItem("user");
  
    const login = await localStorage.getItem("loginInitiated");
    await setLoginInitiated(login);
    const tokenn = await localStorage.getItem("authtoken");
    const Loggedinn = await  localStorage.getItem("isLoggedIn");
    const didTokenn = await localStorage.getItem("authtoken");
  
    await setToken(didTokenn);
  }





  function AuthenticatedRoute({children}) {

      const {presentAuthToken, loggedIn} = useContext(AuthContext);
      return loggedIn ? children : <div className={"loadingReactScreen"}><ReactLoading /> </div>;
  }

  function LoginRoute({ children }) {
    
    const { isLoading, presentAuthToken } = useContext(AuthContext);

    // if ((isAuthenticated && isInitialized && presentAuthToken)) {
    //     window.location.pathname  = "/tournaments";
    // }
    return children;
  }

  useEffect(()=>{
    
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search
    });
},[])
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
            path="/loginverify"
            element={
              <LoginRoute>
                 <LoginVerify />
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
            path="/tournament/:tournamentId"
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
            path="/teams/createteam/selectedCoins"
            element={
              <AuthenticatedRoute>
                  <SelectedCoinTeamPreview />
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
            path="/globalleaderboard"
            element={
              <AuthenticatedRoute>
                  <GlobalLeaderboard />

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
