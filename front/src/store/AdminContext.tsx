import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Giữ mock cho các phần khác (employee, customer, transaction)
import {
  Branch,
  InventoryTransaction,
  Employee,
  Customer,
  inventoryTransactions as initialTransactions,
  employees as initialEmployees,
  customers as initialCustomers,
} from "../data/adminMock";

interface AdminContextType {
  branches: Branch[];
  transactions: InventoryTransaction[];
  employees: Employee[];
  customers: Customer[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: number, emp: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 🔥 Chi nhánh LẤY TỪ DATABASE chứ không dùng mock
  const [branches, setBranches] = useState<Branch[]>([]);

  const [transactions] =
    useState<InventoryTransaction[]>(initialTransactions);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [customers] = useState<Customer[]>(initialCustomers);

  /** 🔥 FETCH CHI NHÁNH TỪ BACKEND */
  const fetchBranches = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/branch/all");
      const data = await res.json();
      setBranches(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách chi nhánh:", err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Mock functions for employee management
  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp = { ...emp, id: Math.max(...employees.map(e => e.id), 0) + 1 };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id: number, emp: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...emp } : e));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        branches,
        transactions,
        employees,
        customers,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
