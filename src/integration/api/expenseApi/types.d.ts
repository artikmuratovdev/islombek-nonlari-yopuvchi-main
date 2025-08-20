interface User {
  _id: string;
  fullName: string;
}

export interface GetExpensesResponse {
  _id: string;
  amount: number;
  branch: string;
  status: number;
  approval: 'PENDING' | 'APPROVED' | 'REJECTED';
  type: string;
  bakerRoomId: string;
  expense_type: 'for_work' | 'for_salary';
  fromUser: User | null;
  reason: {
    _id: string;
    content: string;
  } | null;
  toUser: User | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateExpenseResponse {
  message: string;
  data: {
    amount: number;
    branch: string;
    status: number;
    approval: 'PENDING' | 'APPROVED' | 'REJECTED';
    type: string;
    bakerRoomId: string;
    expense_type: 'for_work' | 'for_salary';
    fromUser: string;
    toUser: string;
    reason: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface CreateExpenseRequest {
  bakerRoomId: string;
  expense_type: 'for_work' | 'for_salary';
  amount: number;
  fromUser: string;
  toUser?: string;
  reason?: string;
}

interface EditExpensesRequest {
  id: string;
  body: {
    expense_type: 'for_work' | 'for_salary';
    amount: number;
    fromUser: string;
    toUser?: string;
    reason?: string;
  };
}

interface CloseCash {
  bakerRoomId: string;
  amount: number;
  fromUser: string;
  toUser: string;
  reason: string;
}

interface CloseCashRes {
  message: string;
  data: {
    _id: string;
    amount: number;
    isCanceled: boolean;
    totalAmount: number;
    branch: string;
    type: string;
    bakerRoomId: string;
    fromUser: {
      _id: string;
      fullName: string;
    };
    toUser: {
      _id: string;
      fullName: string;
    };
    reason: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
