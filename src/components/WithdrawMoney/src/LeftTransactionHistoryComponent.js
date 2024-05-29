import React, { useEffect, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getTransactionHistory } from "../../../APIS/apis";
import moment from "moment";
import AccordionComponent from "../../../Common/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { SERVER } from "../../../APIS/apis";
import { Button, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import transactionSlice, {
  getTransactionsAsync,
} from "../../../Redux/Transaction/TransactionSlice";

const LeftTransactionWithdrawMoney = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [sucess, setSucess] = useState(false);
  const [sucessMessage, setSucessMessage] = useState("");

  let walletBalanceRedux = useSelector(
    (state) => state.transactionSlice.balance
  );
  const SERVER = process.env.REACT_APP_API_SERVER;
  async function checkState() {
    if (state && state.comingFrom == "/tournament") {
      navigate("/tournaments", { state: { comingFrom: "" } });
    } else {
      navigate(-1);
    }
  }

  const handleSubmit = async () => {
    if (walletBalanceRedux > amount) {
      if (parseInt(amount) >= 10) {
        // Make a POST request to the API
        try {
          const response = await fetch(`${SERVER}/wallet/withdraw`, {
            method: "POST",
            headers: {
              "x-access-token": localStorage.getItem("authtoken"),
            },
            body: JSON.stringify({ amount: amount }),
          });
          const data = await response.json();
          console.log(data);

          if(response.status===200){
            setSucess(true);
            setSucessMessage("Request Submitted Successfully");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setErrorMessage("Ammount should be greater then 10FPC");
        setError(true);
      }
    } else {
      setErrorMessage("Not enough balance");
      setError(true);
    }

    setTimeout(() => {
      setErrorMessage("");
      setError(true);
      setSucess(false);
      setSucessMessage("");
      setAmount("")
    }, 2000);
  };

  return (
    <div className="withdrawMoney__fullPage">
      <div className="transactionHistory__header">
        <ArrowBackIosIcon
          fontSize="medium"
          className="go-back-button"
          onClick={() => checkState()}
        />
        <span className="ml-20 font-size-20 font-weight-700">
          {"Withdraw Money"}
        </span>
      </div>
      {/* <div style={{width:"99.5%", height:"fit-content", border:"2px solid red",color:"red"}}>
asdsaddddddddddasdsdassad
            </div> */}
      <div className="withdrawMoney__body">
        <div className="withdrawMoney__body_Container">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "700",
              textAlign: "start",
            }}
          >
            Current Balance :{" "}
            <span style={{ color: walletBalanceRedux < 10 ? "red" : "green" }}>
              {walletBalanceRedux} FPC
            </span>
          </Typography>
          <div className="withdrawMoney__body_Container_Content">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                type="number"
                label="FPC Ammount"
                placeholder="Please enter the amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  width: "100%",
                  "&.Mui-focused": {
                    color: "goldenrod", // Change color to golden on focus
                  },
                }}
              />
            </div>
            {error && (
              <Typography variant="body1" sx={{ color: "red" }}>
                {errorMessage}
              </Typography>
            )}
             {sucess && (
              <Typography variant="body1" sx={{ color: "green" }}>
                {sucessMessage}
              </Typography>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "grey", // Set button background color to grey
                  color: "white", // Set button text color to white
                  transition: "background-color 0.3s", // Add transition for smooth hover effect
                  "&:hover": {
                    backgroundColor: "goldenrod", // Change button background color to golden on hover
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftTransactionWithdrawMoney;
