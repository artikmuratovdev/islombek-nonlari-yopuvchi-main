export interface BakerRoomSalaryResponse {
  bakerInfo: {
    totalCount: number;
    totalMoney: number;
    bakers: [
      {
        _id: string;
        salary: number;
        user: {
          _id: string;
          role: string;
          status: number;
          branch: string;
          fullName: string;
          username: string;
        };
      },
      {
        _id: string;
        salary: number;
        user: {
          _id: string;
          role: string;
          status: number;
          branch: string;
          fullName: string;
          username: string;
        };
      }
    ];
    doughs: [];
    remainingMoney: number;
  };
  dividerInfo: {
    totalCount: number;
    totalMoney: number;
    dividers: [
      {
        _id: string;
        salary: number;
        user: {
          _id: string;
          role: string;
          status: number;
          branch: string;
          fullName: string;
          username: string;
        };
      }
    ];
    doughs: [];
    transferredCount: number;
    remainingMoney: number;
  };
  _id: string;
  bakerRoomId: string;
  date: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
}
