interface BreadsInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}

export interface BakerRoomBreadSaleResponse {
  _id: string;
  client: {
    _id: string;
    branch: string;
    phone: string;
    address: {
      lat: number;
      lng: number;
    };
    fullName: string;
  };
  branch: string;
  bakerRoom: string;
  status: number;
  commit: string;
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  breadCount: number;
  approval: string;
  breadsInfo: BreadsInfo[];
  isDebt: boolean;
  isChangePrice: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
}

export interface addBakerRoomBreadSaleRequest {
  id: string;
  body: {
    client?: string;
    paidAmount: number;
    isDebt?: boolean;
    breadsInfo?: {
        _id: string;
        title: string;
        breadPrice: number;
        breadSoldPrice: number;
        amount: number;
      }[];
    commit?: string;
    phone?: string;
  };
}

export interface breadInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}