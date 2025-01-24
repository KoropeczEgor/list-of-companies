import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./CompanyTable.module.scss";
import {
  toggleSelectAll,
  toggleSelect,
  updateCompany,
  removeSelectedCompanies,
  deleteCompany,
  setLoading,
  setHasMore,
  Company,
} from "../../features/companies/companiesSlice/companiesSlice";
import AddCompanyForm from "../AddCompanyFrom/AddCompanyFrom";
import CompanyRow from "../CompanyRow/CompanyRow";
import TableHeader from "../TableHeader/TableHeader";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const CompanyTable: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.companies.loading);
  const hasMore = useSelector((state: RootState) => state.companies.hasMore);
  const companies = useSelector(
    (state: RootState) => state.companies.companies,
  );

  const [displayCompanies, setDisplayedCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const endIndex = page * itemsPerPage;
    setDisplayedCompanies(companies.slice(0, endIndex));
  }, [companies, page, itemsPerPage]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleSelectAll(event.target.checked));
  };

  const handleRowSelect = (id: string) => {
    dispatch(toggleSelect(id));
  };

  const handleUpdateCompany = (
    id: string,
    field: keyof Company,
    value: string,
  ) => {
    dispatch(updateCompany({ id, field, value }));
  };

  const handleDeleteСompanies = () => {
    dispatch(removeSelectedCompanies());
  };

  const handleDeleteCompany = (id: string) => {
    dispatch(deleteCompany(id));
  };

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    dispatch(setLoading(true));

    setTimeout(() => {
      const nextPage = page + 1;
      const endIndex = nextPage * itemsPerPage;

      if (endIndex >= companies.length) {
        dispatch(setHasMore(false));
      } else {
        setPage(nextPage);
      }

      dispatch(setLoading(false));
    }, 1000);
  }, [companies, hasMore, loading, page, itemsPerPage, dispatch]);

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreData],
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <TableHeader
          onSelectAll={handleSelectAll}
          onDeleteSelected={handleDeleteСompanies}
        />
        <AddCompanyForm />
        <tbody className={styles.tbody}>
          {displayCompanies.map((company, index) => (
            <CompanyRow
              key={company.id}
              company={company}
              onSelect={handleRowSelect}
              onUpdate={handleUpdateCompany}
              onDelete={handleDeleteCompany}
              ref={
                index === displayCompanies.length - 1 ? lastElementRef : null
              }
            />
          ))}
        </tbody>
      </table>
      <LoadingIndicator loading={loading} hasMore={hasMore} />
    </div>
  );
};

export default CompanyTable;
