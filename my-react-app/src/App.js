import React, { useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import ServiceSchedule from "./ServiceSchedule";
import "./App.css";

function App() {
  const [tab, setTab] = useState("expense");

  return (
    <div className="container">
      <h1>Ledger & Light</h1>
      <p>
        <a
          href="https://twilight-lute-6a9.notion.site/DJ-1a086409d6038079beb9f2de9469304f"
          target="_blank"
          rel="noopener noreferrer"
          className="link-text"
        >
          DJ學生區幸福小組
        </a>
      </p>
      <div className="btn-container">
        <button className="btn" onClick={() => setTab("expense")}>
          記帳
        </button>
        <button className="btn" onClick={() => setTab("schedule")}>
          工作服事表
        </button>
      </div>
      {tab === "expense" ? <ExpenseTracker /> : <ServiceSchedule />}
    </div>
  );
}

export default App;
