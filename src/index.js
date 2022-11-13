 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import {AuthContextProvider} from "./Context/AuthContext";
import {Provider as ReduxProvider} from "react-redux";
import store from "./Redux/Store";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <MoralisProvider serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL} appId={process.env.REACT_APP_MORALIS_APP_ID}>
          <AuthContextProvider>
              <ReduxProvider store={store} >
                  <App />
              </ReduxProvider>
          </AuthContextProvider>
      </MoralisProvider>
  // </React.StrictMode>
);
reportWebVitals();
