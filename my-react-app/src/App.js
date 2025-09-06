import React, { useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import ServiceSchedule from "./ServiceSchedule";
import "./App.css";

function App() {
  const [tab, setTab] = useState("expense");

  return (
    <div className="container">
        <h1>我的管理工具</h1>
        <div className="btn-container">
          <button className="btn" onClick={() => setTab("expense")}>記帳</button>
          <button className="btn" onClick={() => setTab("schedule")}>工作服事表</button>
        </div>
        {tab === "expense" ? <ExpenseTracker /> : <ServiceSchedule />}
    </div>
  );
}

export default App;
