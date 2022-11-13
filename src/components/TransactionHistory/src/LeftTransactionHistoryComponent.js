import React, {useEffect, useState} from 'react';
import FolioplayBar from "../../FolioplayBar/src";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";
import {getTransactionHistory} from "../../../APIS/apis";
import moment from "moment";
import AccordionComponent from "../../../Common/Accordion";
import {AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const LeftTransactionHistoryComponent = () => {

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
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
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    const navigate = useNavigate();

    const [transactionHistory, setTransactionHistory] = useState([]);

    function parseTransactionData (data){
        let parsedData = {};
        for (let i=0; i < data.length; i++){
            let dateKey = moment(data[i].date).format('Do MMMM YYYY');
            if(!parsedData.hasOwnProperty(`${dateKey}`)){
                parsedData[`${dateKey}`]=[data[i]];
            }
            else{
                parsedData[`${dateKey}`].push(data[i]);
            }
        }
        const keyArray = Object.keys(parsedData);
        let arr = []
        for(let i=0; i< keyArray.length ; i++){
            arr.push({
                "date": keyArray[i],
                "data": parsedData[keyArray[i]]
            })
        }
        setTransactionHistory(arr);
    }

    useEffect(()=>{
        async function setTransactionHistoryFunction() {
            const data = await getTransactionHistory();
            parseTransactionData(data);
        }
        setTransactionHistoryFunction();
    },[])

    const localAccordionComponent = (item) => {
        return(
            <AccordionComponent>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="dateBlock__accordionList__summaryTab">
                        <div className="summaryTab__amount">{item.type==="PAID"? "-" : "+"}{item.data.amount}</div>
                        <div className={"summaryTab__helperText"}>Joined Tournament</div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={"summaryTab__extendedDetails"}>
                        <div className={"summaryTab__dataHeading"}>
                            Transaction ID
                        </div>
                        <div  className={"summaryTab__dataBody"}>
                            {item._id}
                        </div>
                        <div className={"summaryTab__dataHeading"}>
                            Transaction Date
                        </div>
                        <div  className={"summaryTab__dataBody"}>
                            {moment(item.date).format('Do MMMM YYYY, h:mm:ss a')}
                        </div>
                        <div className={"summaryTab__dataHeading"}>
                            Team Name
                        </div>
                        <div  className={"summaryTab__dataBody"}>
                            {item.data.teamName}
                        </div>
                    </div>
                </AccordionDetails>
            </AccordionComponent>
        )
    }

    return (
        <div className="transactionHistory__fullPage">
            <div className="transactionHistory__header">
                <ArrowBackIosIcon
                    fontSize="medium"
                    className="go-back-button"
                    onClick={() => navigate(-1)}
                />
                <span className="ml-20 font-size-20 font-weight-700">
                    {"Transaction History"}
                </span>
            </div>
            <div className="transactionHistory__body">
                {transactionHistory.length!==0 &&
                    transactionHistory.map((data, index)=>{
                        return(
                            <div className="transactionHistory__dateBlock">
                                <div className="dateBlock__date">
                                    {data.date}
                                </div>
                                <div className="dateBlock__transactionAccordion">
                                    {data.data.map((item, innerIndex)=>{
                                        return(
                                            <div className={"dateBlock__accordionList"}>
                                                {localAccordionComponent(item)}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                })}
            </div>
        </div>
    );
};

export default LeftTransactionHistoryComponent;