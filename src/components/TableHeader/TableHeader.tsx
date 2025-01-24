import React from "react";
import styles from "../CompanyTable/CompanyTable.module.scss";

interface TableHeaderProps {
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSelected: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onSelectAll,
  onDeleteSelected,
}) => {
  return (
    <thead>
      <tr className={styles.wrapperTr}>
        <th>Name Company</th>
        <th>
          Select all: <input type="checkbox" onChange={onSelectAll} />
        </th>
        <button onClick={onDeleteSelected} className={styles.btnDelete}>
          Delete
        </button>
      </tr>
    </thead>
  );
};

export default TableHeader;
