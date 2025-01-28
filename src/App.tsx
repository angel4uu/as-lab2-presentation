import { useState } from "react";
import { CountStudents, MainQuery } from "./components";

function App() {
  const [component, setComponent] = useState<string>("mainquery");

  return (
    <>
      <h1>Lab02</h1>
      <div>
        <button onClick={() => setComponent("mainquery")}>Main Query</button> |{" "}
        <button onClick={() => setComponent("countstudents")}>Count Students</button>
      </div>
      {component === "mainquery" && <MainQuery />}
      {component === "countstudents" && <CountStudents />}
    </>
  );
}

export default App;
