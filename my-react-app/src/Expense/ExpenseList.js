import React from "react";

const ExpenseList = ({ filteredExpenses, deleteExpense }) => {
  return (
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
  );
};

export default ExpenseList;
