import React, { useState, useEffect } from "react";
import "./expenseTrackr.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    note: "",
  });
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!form.date || !form.category || !form.amount) return;
    setExpenses([...expenses, { ...form, id: Date.now() }]);
    setForm({ date: "", category: "", amount: "", note: "" });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // 篩選按月份
  const filteredExpenses = monthFilter
    ? expenses.filter((exp) => exp.date.startsWith(monthFilter))
    : expenses;

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div className="expense-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>記帳功能</h2>
      </div>
      <div className="track-container">
        <div className="filter">
          <label>選擇月份: </label>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          />
        </div>

        <form onSubmit={addExpense} className="form">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="類別"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="金額"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="備註"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <button type="submit">新增</button>
        </form>
      </div>

      <div className="cards">
        {filteredExpenses.map((exp) => (
          <div key={exp.id} className="card">
            <div>
              <strong>{exp.date}</strong>
            </div>
            <div>類別: {exp.category}</div>
            <div>金額: ${exp.amount}</div>
            <div>備註: {exp.note}</div>
            <button onClick={() => deleteExpense(exp.id)}>刪除</button>
          </div>
        ))}
      </div>
      <h3 className="h3-text">總計: ${total}</h3>
      
    </div>
  );
}

export default ExpenseTracker;
