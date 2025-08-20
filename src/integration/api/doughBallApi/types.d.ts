export interface DoughBallResponse {
  doughBallInfo: {
    dough_ball_count: number;
    divided_by_workers: [];
  };
  _id: string;
  branch: string;
  dough_type: {
    _id: string;
    title: string;
    price_for_baker: number;
    price_for_divider: number;
    bread_selling_price: number;
  };
  doughroomId: string;
  status: number;
  send_to_baker_room: string;
  type: string;
  isReady: boolean;
  current_location: string;
  transferred_driver: null;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
}
