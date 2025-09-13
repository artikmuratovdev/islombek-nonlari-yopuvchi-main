interface MyComplaintsTo {
  _id: string;
  role: string;
  fullName: string;
}

export interface MyComplaintsResponse {
  _id: string;
  from: string;
  to: MyComplaintsTo;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ReceivedComplaintsFrom {
  _id: string;
  role: string;
  fullName: string;
}

export interface ReceivedComplaintsResponse {
  _id: string;
  from: ReceivedComplaintsFrom;
  to: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintRequest {
  content: string;
  to: string;
}

export interface ComplaintResponse {
  from: string;
  to: string;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
