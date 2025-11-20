import { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContent";

import "./ExpenseForm.scss";

const ExpenseForm = () => {

    const {
        months,
        categories,
        years,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        addExpense,
    } = useContext(ExpenseContext);

    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentAmount = parseFloat(amount);
        if (isNaN(currentAmount) || currentAmount <= 0) {
            alert("Please enter a valid amount greater than 0.")
        }
        addExpense(category, currentAmount, note);
        setAmount("");
        setNote("");
    }

    return (
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div className="input-group">
                        <label>Month</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {
                                months.map((month) => (
                                    <option
                                        key={month}
                                        value={month}
                                    >
                                        {month}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Year</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {
                                years.map((year) => (
                                    <option
                                        key={year}
                                        value={year}
                                    >
                                        {year}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {
                                categories.map((cat) => (
                                    <option
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat}
                                    </option>
                                ))
                            }
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
                    <button type="submit">Add Expense</button>
            </form>
    )
}

export default ExpenseForm