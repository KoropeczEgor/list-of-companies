import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Company,
  addCompany,
} from "../../features/companies/companiesSlice/companiesSlice";

import styles from "../CompanyTable/CompanyTable.module.scss";

const AddCompanyFrom: React.FC = () => {
  const dispatch = useDispatch();

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyAddress, setNewCompanyAddress] = useState("");

  const handleAddCompany = () => {
    if (newCompanyName.trim() && newCompanyAddress.trim()) {
      const newCompany: Company = {
        id: String(Date.now()),
        name: newCompanyName,
        address: newCompanyAddress,
        selected: false,
      };
      dispatch(addCompany(newCompany));

      setNewCompanyName("");
      setNewCompanyAddress("");
    }
  };

  return (
    <div className={styles.addCompanyForm}>
      <input
        type="text"
        placeholder="Name company"
        className={styles.inputText}
        value={newCompanyName}
        onChange={(e) => setNewCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address company"
        className={styles.inputText}
        value={newCompanyAddress}
        onChange={(e) => setNewCompanyAddress(e.target.value)}
      />
      <button onClick={handleAddCompany} className={styles.btnDelete}>
        Create company
      </button>
    </div>
  );
};

export default AddCompanyFrom;
