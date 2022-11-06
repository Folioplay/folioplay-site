import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";




const AccordionComponent = ({children}) => {
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props}  children={children}/>
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "5px",
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));
    return (
        <div>
            <Accordion elevation={0} className={"accordionDiv"}>
                {children}
            </Accordion>
        </div>
    );
};

export default AccordionComponent;