import React, { useState, useEffect } from "react";
import "./expenseTrackr.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    type: "收入", // 預設收入
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
    setForm({ date: "", type: "支出", category: "", amount: "", note: "" });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // 篩選按月份
  const filteredExpenses = monthFilter
    ? expenses.filter((exp) => exp.date.startsWith(monthFilter))
    : expenses;

  // 總計（收入加總，支出扣除）
  const total = filteredExpenses.reduce(
    (sum, exp) =>
      exp.type === "收入" ? sum + Number(exp.amount) : sum - Number(exp.amount),
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
            className="filter-month"
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

          {/* 收入 / 支出 */}
          <select
            className="select-btn"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="支出">支出</option>
            <option value="收入">收入</option>
          </select>

          <input
            type="text"
            placeholder="類別"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          {/* <input
            type="number"
            placeholder="金額"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          /> */}
          <div className="number-input">
            <button
              className="number-btn"
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  amount: Math.max(Number(form.amount) - 1, 0), // 避免小於 0
                })
              }
            >
              ➖
            </button>
            <input
              type="number"
              placeholder="金額"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <button
               className="number-btn"
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  amount: Number(form.amount) + 1,
                })
              }
            >
              ➕
            </button>
          </div>

          <input
            type="text"
            placeholder="備註"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
          <button className="orange-btn" type="submit">新增</button>
        </form>
      </div>

      <div className="cards">
        {filteredExpenses.map((exp) => (
          <div
            key={exp.id}
            className={`card ${exp.type === "收入" ? "income" : "expense"}`}
          >
            <div>
              <strong>{exp.date}</strong>
            </div>
            <div>種類: {exp.type}</div>
            <div>類別: {exp.category}</div>
            <div className="amount">
              {exp.type === "收入" ? "+" : "-"}${exp.amount}
            </div>
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
