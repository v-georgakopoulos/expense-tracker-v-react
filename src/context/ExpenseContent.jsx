import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalstorage"

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

    const categories = ["Bills", "Food", "Transport", "Fun", "Health"];

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]); // YYYY-MM-DD

    // Key στο localStorage με βάση τον μήνα
    const storageKey = selectedDate.slice(0, 7); // "YYYY-MM"
    const {
        storedValue: expenses,
        addItem,
        removeItem,
        updateItem,
    } = useLocalStorage(storageKey, []);

    // Add new Expense
    const addExpense = (category, amount, note) => {
        if (!category || isNaN(amount) || amount <= 0) return;

        const newExpense = {
            id: uuidv4(),
            category,
            amount: Number(amount),
            note,
            date: selectedDate
        }

        addItem(newExpense);
    };

    // Delete Expense
    const deleteExpense = (id) => removeItem(id);

    // Edit Expense
    const editExpense = (id, updatedData) => updateItem(id, updatedData);

    // Filtered expenses for the selected month
    const filteredExpenses = expenses.filter(exp =>
        exp.date.startsWith(selectedDate.slice(0, 7))
    );

    // Totals for chart
    const totalsByCategory = categories.map(cat =>
        filteredExpenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => sum + exp.amount, 0)
    );

    // Total Monthly Expenses
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const value = {
        categories,
        selectedDate,
        setSelectedDate,
        addExpense,
        expenses: filteredExpenses,
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
