import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
  id: string;
  name: string;
  address: string;
  selected: boolean;
}

interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: CompaniesState = {
  companies: Array.from({ length: 10000 }, (_, index) => ({
    id: `${index}`,
    name: `Company ${index}`,
    address: `Address ${index}`,
    selected: false,
  })),
  loading: false,
  error: null,
  hasMore: true,
};

interface UpdateCompanyPayload {
  id: string;
  field: keyof Company;
  value: Company[keyof Company];
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    toggleSelectAll(state, action: PayloadAction<boolean>) {
      state.companies.forEach((company) => (company.selected = action.payload));
    },

    toggleSelect(state, action: PayloadAction<string>) {
      const company = state.companies.find((c) => c.id === action.payload);
      if (company) {
        company.selected = !company.selected;
      }
    },

    updateCompany(state, action: PayloadAction<UpdateCompanyPayload>) {
      const { id, field, value } = action.payload;
      const company = state.companies.find((c) => c.id === id);
      if (company) {
        company[field] = value;
      }
    },

    addCompany(state, action: PayloadAction<Company>) {
      state.companies = [action.payload, ...state.companies];
    },

    removeSelectedCompanies(state) {
      state.companies = state.companies.filter((company) => !company.selected);
    },

    deleteCompany(state, action: PayloadAction<string>) {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload,
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
  },
});

export const {
  toggleSelectAll,
  toggleSelect,
  updateCompany,
  addCompany,
  removeSelectedCompanies,
  deleteCompany,
  setLoading,
  setError,
  setHasMore,
} = companiesSlice.actions;

export default companiesSlice.reducer;
