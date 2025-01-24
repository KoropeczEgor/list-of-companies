import React from "react";
import CompanyTable from "./components/CompanyTable";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List company</h1>
      <CompanyTable />
    </div>
  );
};

export default App;
