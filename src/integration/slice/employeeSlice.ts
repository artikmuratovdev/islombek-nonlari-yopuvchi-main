import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeData {
  id: string;
  name: string;
  amount: string;
}

interface EmployeeState {
  employees: EmployeeData[];
  lastResetDate: string;
}

const initialState: EmployeeState = {
  employees: [],
  lastResetDate: new Date().toISOString().split("T")[0],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<EmployeeData>) => {
      // Check if employee already exists
      const existingIndex = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (existingIndex === -1) {
        // Add new employee
        state.employees.push(action.payload);
      }
    },
    updateEmployeeAmount: (
      state,
      action: PayloadAction<{ id: string; amount: string }>
    ) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index].amount = action.payload.amount;
      }
    },
    resetEmployees: (state) => {
      state.employees = [];
      state.lastResetDate = new Date().toISOString().split("T")[0];
    },
    checkAndResetIfNewDay: (state) => {
      const today = new Date().toISOString().split("T")[0];
      if (state.lastResetDate !== today) {
        state.employees = [];
        state.lastResetDate = today;
      }
    },
  },
});

export const {
  addEmployee,
  updateEmployeeAmount,
  resetEmployees,
  checkAndResetIfNewDay,
} = employeeSlice.actions;
export default employeeSlice.reducer;
