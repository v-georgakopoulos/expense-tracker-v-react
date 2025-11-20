import { createContext, useState, } from "react";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../hooks/useLocalstorage"

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const categories = [
        "Bills",
        "Food",
        "Transport",
        "Fun",
        "Health"
    ];

    const now = new Date();
    const years = Array.from({ length: 6 }, (_, index) => now.getFullYear() + index);
    const [selectedMonth, setSelectedMonth] = useState(now.toLocaleString("default", { month: "long" }));
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    const {
        storedValue: expenses,
        addItem,
        removeItem,
        updateItem,
    } = useLocalStorage(`${selectedMonth}_${selectedYear}`, []);
    
    // Add new Expense
    const addExpense = (category, amount, note) => {
        if (!category || isNaN(amount) || amount <= 0) return;

        const newExpense = {
            id: uuidv4(),
            category,
            amount: Number(amount),
            note,
            date: new Date().toLocaleDateString()
        }

        addItem(newExpense);
    };

    // Delete Expense
    const deleteExpense = (id) => removeItem(id);

    // Edit Expense
    const editExpense = (id,updatedData) => updateItem(id, updatedData)

    // Totals for chart
    const totalsByCategory = categories.map(cat =>
        expenses
        .filter(exp => exp.category === cat)
        .reduce((sum,exp) => sum + exp.amount, 0)
    )

    // Total Monthly Expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const value = {
        months,
        categories,
        years,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        addExpense,
        expenses,
        totalsByCategory,
        totalExpenses,
        deleteExpense,
        editExpense
    }
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}