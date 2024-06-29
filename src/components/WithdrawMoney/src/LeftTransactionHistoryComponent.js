import React, { useEffect, useMemo, useState } from "react";
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getWithdrawalHistory } from "../../../APIS/apis";
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
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import transactionSlice, {
  getTransactionsAsync,
} from "../../../Redux/Transaction/TransactionSlice";
import SnackbarComponent from "../../../Common/Snackbar";
const LeftTransactionWithdrawMoney = () => {
  const [aleartStatus, setAleartStatus] = useState(false);
  const { state } = useLocation();
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [aleartMessage, setAleartMessage] = useState("");
  const [severityType, setSeverityType] = useState("success");
  const [amount, setAmount] = useState("");  

  const navigate = useNavigate();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === 'dark'
    //         ? 'rgba(255, 255, 255, .05)'
    //         : 'rgba(0, 0, 0, .03)',
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

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

  function parseTransactionData(data) {
    let parsedData = {};
    for (let i = 0; i < data.length; i++) {
      let dateKey = moment(data[i].date).format("Do MMMM YYYY");
      if (!parsedData.hasOwnProperty(`${dateKey}`)) {
        parsedData[`${dateKey}`] = [data[i]];
      } else {
        parsedData[`${dateKey}`].push(data[i]);
      }
    }
    const keyArray = Object.keys(parsedData);
    let arr = [];
    for (let i = 0; i < keyArray.length; i++) {
      arr.push({
        date: keyArray[i],
        data: parsedData[keyArray[i]],
      });
    }
    setWithdrawalHistory(arr);
  }
  async function setWithdrawalHistoryFunction() {
    const data = await getWithdrawalHistory();
    parseTransactionData(data);
    console.log(data);
  }

  async function CancleWithdrawal() {
    const authToken = localStorage.getItem("authtoken");
    try {
      const response = await fetch(`${SERVER}/wallet/withdrawal-cancel`, {
        method: "POST",
        headers: {
          "x-access-token": authToken,
        },
      });
      if (response.status === 200) {
        setSeverityType("success");
        setAleartMessage("Withdrawal request cancelled");
        setAleartStatus(true);
        setWithdrawalHistoryFunction();
      }
    } catch (error) {
      setSeverityType("error");
      setAleartMessage("Please try again");
      setAleartStatus(true);
    }
    setTimeout(() => {
      setSeverityType("success");
      setAleartMessage("");
      setAleartStatus(false);
    }, 2000);
  }
  const localAccordionComponent = (item) => {
    return (
      <AccordionComponent>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="dateBlock__accordionList__summaryTab">
            {parseFloat(
              item.type === "WITHDRAWAL_REJECTED" ? 0 : item.data.amount
            ) ? (
              <div className="summaryTab__amount">
                {item.type === "WITHDRAWAL_PENDING" ||
                "WITHDRAWAL" ||
                "WITHDRAWAL_REJECTED" ||
                "WITHDRAWAL"
                  ? "-"
                  : "+"}
                
                {item.type === "WITHDRAWAL_REJECTED"
                  ? "0 FPC"
                  : item.data.amount}{" "}
                FPC{" "}
              </div>
            ) : (
              <div className="summaryTab__amount">
                {item.type === "PAID" ? "-" : "+"}
                {item.type === "WITHDRAWAL_REJECTED"
                  ? "0 FPC"
                  : item.data.amount}{" "}
              </div>
            )}

            <div
              className={"summaryTab__helperText"}
              style={{ marginLeft: "20px", marginRight: "auto" }}
            >
              {item.type === "WITHDRAWAL_CANCELLED" && "CANCELLED"}
              {item.type === "WITHDRAWAL_PENDING" && "PENDING"}
              {item.type === "WITHDRAWAL_REJECTED" && "REJECTED"}
              {item.type === "WITHDRAWAL" && "WITHDRAWAL"}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={"summaryTab__extendedDetails"}>
            <div className={"summaryTab__dataHeading"}>
              {item.type === "WITHDRAWAL_REJECTED" && "WITHDRAWAL REJECTED"}
              {item.type === "WITHDRAWAL" && "WITHDRAWAL"}
            </div>

            {item.type === "WITHDRAWAL_REJECTED" || ("WITHDRAWAL" && "")}

         

            {item.type === "WITHDRAWAL_PENDING" ? null : (
              <div className={"summaryTab__dataHeading"}>Transaction ID</div>
            )}

            <div className={"summaryTab__dataBody"}>{item._id}</div>
            <div className={"summaryTab__dataHeading"}>Transaction Date</div>
            <div className={"summaryTab__dataBody"}>
              {moment(item.date).format("Do MMMM YYYY, h:mm:ss a")}
            </div>
            <div className={"summaryTab__dataHeading"}>
              {" "}
              {item.type === "WITHDRAWAL_REJECTED" || "WITHDRAWAL"
                ? ""
                : "Team Name"}
            </div>
            <div className={"summaryTab__dataBody"}>
              {item.type === "WITHDRAWAL_REJECTED" || "WITHDRAWAL"
                ? ""
                : item.data.teamName}
            </div>
            {item.type === "WITHDRAWAL_PENDING" ? (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => CancleWithdrawal()}
                    sx={{
                      backgroundColor: "grey", // Set button background color to grey
                      color: "white", // Set button text color to white
                      transition: "background-color 0.3s", // Add transition for smooth hover effect
                      "&:hover": {
                        backgroundColor: "red", // Change button background color to golden on hover
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </AccordionDetails>
      </AccordionComponent>
    );
  };

  const handleSubmit = async () => {
    if (walletBalanceRedux > amount) {
      if (parseInt(amount) >= 10) {
        // Make a POST request to the API
        try {
          const token = localStorage.getItem("authtoken");
          const response = await fetch(`${SERVER}/wallet/withdraw`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "x-access-token": token,
            },

            body: JSON.stringify({ amount: parseInt(amount) }),
          });
          const data = await response.json();
          // console.log(data);

          if (response.status === 200) {
            setSeverityType("success");
            setAleartMessage("Withdrawal request submitted");
            setAleartStatus(true);

            setWithdrawalHistoryFunction();
          }
          if (response.status === 400) {
            console.log(response);
            setSeverityType("error");
            setAleartMessage("Only one request is allowed");
            setAleartStatus(true);
          }
        } catch (error) {
          setSeverityType("error");
          setAleartMessage("Only one request is allowed");
          setAleartStatus(true);
          console.log("Error msg:", error.message);
        }
      } else {
        setSeverityType("error");
        setAleartMessage("Ammount should be greater then 10FPC");
        setAleartStatus(true);
      }
    } else {
      setSeverityType("error");
      setAleartMessage("Not enough balance");
      setAleartStatus(true);
    }

    setTimeout(() => {
      setAleartStatus(false);
      setSeverityType("success");
      setAleartMessage("");

      setAmount("");
    }, 2000);
  };

  const handleNameSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAleartStatus(false);
  };

  useEffect(() => {
    dispatch(getTransactionsAsync());
    setWithdrawalHistoryFunction();
  }, []);

  // useMemo(() => {
  //   // dispatch(getTransactionsAsync());
  //   // setWithdrawalHistoryFunction();
  //   functionc();
  // }, [CancleWithdrawal]);

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
        <div style={{ paddingBottom: "20px" }}>
          <span className="font-size-20 font-weight-700">
            Withdrawal Histroy
          </span>
        </div>
        <div>
          {withdrawalHistory.length !== 0 ? (
            withdrawalHistory.map((data, index) => {
              return (
                <div className="transactionHistory__dateBlock">
                  <div className="dateBlock__date">{data.date}</div>
                  <div className="dateBlock__transactionAccordion">
                    {data.data.map((item, innerIndex) => {
                      return (
                        <div className={"dateBlock__accordionList"}>
                          {localAccordionComponent(item)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No transactions yet.</h3>
          )}
        </div>
      </div>

      {aleartStatus && (
        <>
          <div style={{ position: "absolute", zIndex: "999", bottom: "5%" }}>
            {" "}
            <Alert
              id="team-creation-message"
              onClose={handleNameSnackClose}
              severity={severityType}
              sx={{ width: "100%", color: "white" }}
            >
              {aleartMessage}
            </Alert>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftTransactionWithdrawMoney;
