import React from 'react';
import FolioPlayLayout from "../../../layout/FolioPlayLayout";
import RightTransactionHistoryComponent from "./RightTransactionHistoryComponent";
import "../style/index.css";
import LeftTransactionWithdrawMoney from './LeftTransactionHistoryComponent';

const WidthdrawMoney = () => {
    return (
        <FolioPlayLayout
            LeftComponent={LeftTransactionWithdrawMoney}
            RightComponent={RightTransactionHistoryComponent}
        />
    );
};

export default WidthdrawMoney;