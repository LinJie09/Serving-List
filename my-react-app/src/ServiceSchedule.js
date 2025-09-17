import React, { useState, useEffect } from "react";
import "./serviceSchedule.css";

function ServiceSchedule() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ date: "", name: "", task: "" });
  const [showTable, setShowTable] = useState(false);
  const [errorDate,setErrorDate] = useState('');
  const [errorName,setErrorName] = useState('');
  const [errorTask,setErrorTask] = useState('');

  // 排序設定
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!form.date){
      setErrorDate("請點選日期");
      hasError = true;
    }else{
      setErrorDate('');
    }

    if (!form.name){
      setErrorName("請入姓名");
      hasError = true;
    }else{
      setErrorName('');
    }

    if (!form.task){
      setErrorTask("請入工作內容");
      hasError = true;
    }else{
      setErrorTask('');
    }
    if (hasError) return;
    setTasks([...tasks, { ...form, id: Date.now() }]);
    setForm({ date: "", name: "", task: "" });
    setShowTable(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 排序函數
  const sortedTasks = [...tasks].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // 如果排序欄位是日期，轉成 Date 比較
    if (sortConfig.key === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <h2>工作服事表</h2>

      <form onSubmit={addTask} className="form">
        <div className="input-container">
          <input
            type="date"
            value={form.date}
            onChange={(e) => {
              setForm({ ...form, date: e.target.value });
              if (e.target.value) setErrorDate('');
            }}
          />
          {errorDate && <div className="error">{errorDate}</div> }
          <input
            type="text"
            placeholder="姓名"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if(e.target.value) setErrorName('');
            }}
          />
          {errorName && <div className="error">{errorName}</div> }
          <input
            type="text"
            placeholder="工作內容"
            value={form.task}
            onChange={(e) => {
              setForm({ ...form, task: e.target.value });
              if(e.target.value) setErrorTask('');
            }}
          />
          {errorTask && <div className="error">{errorTask}</div> }
        </div>
        <div className="form-row">
          <button type="submit" className="btn-orange">
            新增任務
          </button>
          <button
            onClick={() => setShowTable(!showTable)}
            className="btn-orange"
          >
            {showTable ? "隱藏表格" : "產生表格"}
          </button>
        </div>
      </form>

      {showTable && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("date")}>
                日期
                <span>
                  {sortConfig.key === "date"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </span>
              </th>
              <th onClick={() => requestSort("name")}>
                姓名
                <span>
                  {sortConfig.key === "name"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </span>
              </th>

              <th>工作內容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.date}</td>
                <td>{task.name}</td>
                <td>{task.task}</td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServiceSchedule;
