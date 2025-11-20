import { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContent";

import "./ExpenseForm.scss";

const ExpenseForm = () => {

    const {
        categories,
        selectedDate,
        setSelectedDate,
        addExpense,
    } = useContext(ExpenseContext);

    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [isAdding, setIsAdding] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentAmount = parseFloat(amount);
        if (isNaN(currentAmount) || currentAmount <= 0) {
            alert("Please enter a valid amount greater than 0.");
            return;
        }
        setIsAdding(true)
        addExpense(category, currentAmount, note);
        setAmount("");
        setNote("");
        setTimeout(() =>  setIsAdding(false),2000)      
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-inputs">
                <div className="input-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        min={0}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Note</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Optional Note"
                    />
                </div>
            </div>
            <button className={isAdding ? "adding" : ""} type="submit">{ isAdding ? "Adding..." : "Add Expense" }</button>
        </form>
    )
}

export default ExpenseForm;
