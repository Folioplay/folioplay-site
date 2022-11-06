import React from 'react';
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import LeftTransactionHistoryComponent from "./LeftTransactionHistoryComponent";
import RightTransactionHistoryComponent from "./RightTransactionHistoryComponent";
import "../style/index.css";

const TransactionHistory = () => {
    return (
        <FolioPlayLayout
            LeftComponent={LeftTransactionHistoryComponent}
            RightComponent={RightTransactionHistoryComponent}
        />
    );
};

export default TransactionHistory;