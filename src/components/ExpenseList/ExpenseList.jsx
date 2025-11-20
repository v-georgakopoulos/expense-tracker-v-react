import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContent";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave, faEdit, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./ExpenseList.scss";

const ExpenseList = () => {

    const { expenses, categories, deleteExpense, editExpense } = useContext(ExpenseContext)

    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null)
    const [editCategory, setEditCategory] = useState("")
    const [editAmount, setEditAmount] = useState("")
    const [editNote, setEditNote] = useState("")
    const [editDate, setEditDate] = useState("")

    const handleEdit = (exp) => {
        setEditingId(exp.id)
        setEditDate(exp.date);
        setEditCategory(exp.category)
        setEditAmount(exp.amount)
        setEditNote(exp.note || "")
    }

    const handleSave = (id) => {

        const currentAmount = parseFloat(editAmount)
        if (isNaN(currentAmount) || editAmount <= 0) {
            alert("Please enter a valid amount greater than 0")
            return;
        }
        editExpense(id, { amount: Number(currentAmount), category: editCategory, note: editNote, date: editDate });
        setEditingId(null)
    }

    const filteredExpenses = expenses.filter(
        exp =>
            exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (exp.note?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            exp.amount.toString().includes(searchTerm) ||
            exp.date.includes(searchTerm)
    );

    return (
        <div className="expense-list-container">
            <h2>Expenses</h2>
            <div className="expense-search">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by category, note, amount or date...."
                />
            </div>
            <ul>
                {
                    filteredExpenses.map(exp => (
                        <li key={exp.id} className="expense-item">
                            {editingId === exp.id ? (
                                <div className="expense-inputs">
                                    <div className="expense-field">
                                        <input
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="expense-field">
                                        <select
                                            value={editCategory}
                                            onChange={(e) => setEditCategory(e.target.value)}
                                        >
                                            {
                                                categories.map(cat => (
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
                                    <div className="expense-field">
                                        <input
                                            type="number"
                                            value={editAmount}
                                            onChange={(e) => setEditAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="expense-field">
                                        <input
                                            type="text"
                                            value={editNote || ""}
                                            onChange={(e) => setEditNote(e.target.value)}
                                            placeholder="Optional Note"
                                        />
                                    </div>
                                    <div className="list-btns">
                                        <button title="save" onClick={() => handleSave(exp.id)}><FontAwesomeIcon icon={faSave} className="icons" /></button>
                                        <button title="exit" onClick={() => setEditingId(null)}><FontAwesomeIcon icon={faCircleXmark} className="icons" /></button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="expense-field"><span className="date">{exp.date}</span></div>
                                    <div className="expense-field"><span>{exp.category}</span></div>
                                    <div className="expense-field"><span>€{exp.amount}</span></div>
                                    <div className="expense-field"><span>{exp.note || ""}</span></div>
                                    <div className="list-btns">
                                        <button title="edit" onClick={() => handleEdit(exp)}><FontAwesomeIcon icon={faEdit} className="icons"/></button>
                                        <button title="delete" onClick={() => deleteExpense(exp.id)}><FontAwesomeIcon icon={faTrash} className="icons" /></button>
                                    </div>
                                </>
                            )}

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ExpenseList;