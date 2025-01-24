import React, { forwardRef } from "react";
import { Company } from "../../features/companies/companiesSlice/companiesSlice";

import styles from "../CompanyTable/CompanyTable.module.scss";

interface CompanyRowProps {
  company: Company;
  onSelect: (id: string) => void;
  onUpdate: (id: string, field: keyof Company, value: string) => void;
  onDelete: (id: string) => void;
}

const CompanyRow = forwardRef<HTMLDivElement, CompanyRowProps>(
  ({ company, onSelect, onUpdate, onDelete }, ref) => {
    return (
      <div className={styles.company} ref={ref}>
        <tr
          className={`${styles.companyTr} ${
            company.selected ? styles.selected : ""
          }`}
        >
          <td>
            <input
              type="checkbox"
              checked={company.selected}
              onChange={() => onSelect(company.id)}
            />
          </td>
          <td>
            <input
              value={company.name}
              className={styles.inputText}
              onChange={(event) =>
                onUpdate(company.id, "name", event.target.value)
              }
            />
          </td>
          <td>
            <input
              value={company.address}
              className={styles.inputText}
              onChange={(event) =>
                onUpdate(company.id, "address", event.target.value)
              }
            />
          </td>
          <button
            className={styles.btnDelete}
            onClick={() => onDelete(company.id)}
          >
            Х
          </button>
        </tr>
      </div>
    );
  },
);

export default CompanyRow;
