interface CreateOrdersResponse {
  _id: string;
}

interface CreateOrdersRequest {
  client: string;
  paidAmount: number;
  breadsInfo: BreadsInfo[];
  commit: string;
  deliveryTime: string;
  address: string;
  phone: string;
}

interface CreateOrdersResponse {
  message : string;
}

interface PaymentHistory {
  _id: string;
  amount: number;
  fromUser: {
    _id: string;
    role: string;
    fullName: string;
  };
  paymentDate: Date;
}

interface BreadsInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}

interface GetOrdersResponse {
  _id: string;
  client: string;
  branch?: string;
  status?: string;
  commit: string;
  address?: string;
  paidAmount: string;
  totalAmount: string;
  debtAmount: number;
  phone: string;
  breadCount: number;
  deliveryTime: Date | string;
  approval: string;
  deliveryStatus: string;
  paymentHistory: PaymentHistory[];
  breadsInfo: BreadsInfo[];
  isClient: boolean;
  isChangePrice: boolean;
  type: string;
  fromStaff: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GetOrdersRequest {
  status: string[];
}

interface EditOrderRequest {
  id: string;
  body: {
    paidAmount : number
    breadsInfo : BreadsInfo[]
  }
}