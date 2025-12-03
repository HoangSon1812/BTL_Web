export interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  inventoryCount: number;
}

export interface InventoryTransaction {
  id: number;
  branchId: number;
  type: 'import' | 'export';
  productName: string;
  quantity: number;
  date: string;
  status: 'completed' | 'pending';
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  branchId: number;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchaseDate: string;
  status: 'active' | 'inactive';
}

export const branches: Branch[] = [
  { id: 1, name: 'Main Branch', address: '123 Central St', manager: 'Alice Smith', inventoryCount: 1500 },
  { id: 2, name: 'North Branch', address: '456 North Ave', manager: 'Bob Jones', inventoryCount: 850 },
  { id: 3, name: 'South Branch', address: '789 South Blvd', manager: 'Charlie Brown', inventoryCount: 1200 },
];

export const inventoryTransactions: InventoryTransaction[] = [
  { id: 1, branchId: 1, type: 'import', productName: 'Minimalist Watch', quantity: 50, date: '2023-10-25', status: 'completed' },
  { id: 2, branchId: 1, type: 'export', productName: 'Travel Backpack', quantity: 10, date: '2023-10-26', status: 'completed' },
  { id: 3, branchId: 2, type: 'import', productName: 'Wireless Headphones', quantity: 30, date: '2023-10-27', status: 'pending' },
  { id: 4, branchId: 3, type: 'export', productName: 'Classic Sunglasses', quantity: 5, date: '2023-10-28', status: 'completed' },
];

export const employees: Employee[] = [
  { id: 1, name: 'Alice Smith', position: 'Manager', branchId: 1, email: 'alice@example.com', phone: '555-0101', status: 'active' },
  { id: 2, name: 'Bob Jones', position: 'Manager', branchId: 2, email: 'bob@example.com', phone: '555-0102', status: 'active' },
  { id: 3, name: 'Charlie Brown', position: 'Manager', branchId: 3, email: 'charlie@example.com', phone: '555-0103', status: 'active' },
  { id: 4, name: 'David Wilson', position: 'Sales Staff', branchId: 1, email: 'david@example.com', phone: '555-0104', status: 'active' },
  { id: 5, name: 'Eva Davis', position: 'Warehouse Staff', branchId: 1, email: 'eva@example.com', phone: '555-0105', status: 'inactive' },
];

export const customers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', totalOrders: 5, totalSpent: 450.00, lastPurchaseDate: '2023-10-20', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalOrders: 3, totalSpent: 210.50, lastPurchaseDate: '2023-10-15', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', totalOrders: 1, totalSpent: 59.99, lastPurchaseDate: '2023-09-30', status: 'inactive' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', totalOrders: 8, totalSpent: 890.00, lastPurchaseDate: '2023-10-28', status: 'active' },
];
