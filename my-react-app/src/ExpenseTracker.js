import React, { useState, useEffect } from "react";
import ExpenseList from "./Expense/ExpenseList";
import DeleteModal from "./Expense/DeleteModal";

import "./expenseTrackr.css";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    type: "收入",
    category: "",
    amount: "",
    note: "",
  });

  const [monthFilter, setMonthFilter] = useState("");
  const [errorDate, setErrorDate] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorAmount, setErrorAmount] = useState("");

  // Modal 狀態
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!form.date) { setErrorDate("請點選日期"); hasError = true; } else { setErrorDate(""); }
    if (!form.category) { setErrorCategory("請填寫類別"); hasError = true; } else { setErrorCategory(""); }
    if (!form.amount) { setErrorAmount("請填寫金額"); hasError = true; } else { setErrorAmount(""); }

    if (hasError) return;

    setExpenses([...expenses, { ...form, id: Date.now() }]);
    setForm({ date: "", type: "支出", category: "", amount: "", note: "" });
  };

  // 打開刪除 Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setExpenses(expenses.filter((exp) => exp.id !== deleteId));
    setShowModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  const filteredExpenses = monthFilter
    ? expenses.filter((exp) => exp.date.startsWith(monthFilter))
    : expenses;

  const total = filteredExpenses.reduce(
    (sum, exp) =>
      exp.type === "收入" ? sum + Number(exp.amount) : sum - Number(exp.amount),
    0
  );

  return (
    <div className="expense-container">
      <h2 style={{ textAlign: "center" }}>記帳功能</h2>

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
            onChange={(e) => { setForm({ ...form, date: e.target.value }); setErrorDate(""); }}
          />
          {errorDate && <p style={{ color: "red", margin: "2px 0" }}>{errorDate}</p>}

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
            onChange={(e) => { setForm({ ...form, category: e.target.value }); setErrorCategory(""); }}
          />
          {errorCategory && <p style={{ color: "red", margin: "2px 0" }}>{errorCategory}</p>}

          <div className="number-input">
            <button
              className="number-btn"
              type="button"
              onClick={() => setForm({ ...form, amount: Math.max(Number(form.amount)-1,0) })}
            >➖</button>
            <input
              type="number"
              placeholder="金額"
              value={form.amount}
              onChange={(e) => { setForm({ ...form, amount: e.target.value }); setErrorAmount(""); }}
            />
            <button
              className="number-btn"
              type="button"
              onClick={() => setForm({ ...form, amount: Number(form.amount)+1 })}
            >➕</button>
          </div>
          {errorAmount && <p style={{ color: "red", margin: "2px 0" }}>{errorAmount}</p>}

          <input
            type="text"
            placeholder="備註"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />

          <button className="orange-btn" type="submit">新增</button>
        </form>
      </div>

      {/* 卡片列表 */}
      <ExpenseList
        filteredExpenses={filteredExpenses}
        deleteExpense={handleDeleteClick} // 點擊打開 Modal
      />

      {/* 刪除確認 Modal */}
      <DeleteModal
        show={showModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      <h3 className="h3-text">總計: ${total}</h3>
    </div>
  );
}

export default ExpenseTracker;
