import { useContext } from "react";
import ExpenseChart from "../components/ExpenseChart/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm"
import ExpenseList from "../components/ExpenseList/ExpenseList";

import { ExpenseContext } from "../context/ExpenseContent";

import "./ExpenseTracker.scss";

const ExpenseTracker = () => {
    
    const { totalExpenses } = useContext(ExpenseContext);

    return (
        <div className="expense-tracker-container">
            <div className="title">
                <h2>Expense Tracker</h2>
                <p>Total this month: €<strong>{totalExpenses} </strong></p>
            </div>

            <ExpenseForm/>
            <ExpenseChart/>
            <ExpenseList/>
        </div>
    )
};

export default ExpenseTracker;