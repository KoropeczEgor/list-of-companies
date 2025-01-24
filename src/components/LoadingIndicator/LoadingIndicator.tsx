import React from "react";
import styles from "../CompanyTable/CompanyTable.module.scss";

interface LoadingIndicatorProps {
  loading: boolean;
  hasMore: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  loading,
  hasMore,
}) => {
  return (
    <>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {!hasMore && <div className={styles.noMoreData}>Данные закончились</div>}
    </>
  );
};

export default LoadingIndicator;
