import { ProfileResponse } from "../authApi/types";

interface BakeryResponse {
  bakerRoom: {
    _id: string;
    title: string;
    images: string;
    branch: string;
    status: number;
    balance: number;
    doughsCount: number;
    roundsCount: number;
    inOvenCount: number;
    breadsCount: number;
    deliveredCount: number;
    soldCount: number;
    baker: string;
    divider: string;
    createdAt: string;
    updatedAt: string;
    breadsWithType: {
      "651b23db-f2ec-459e-a6fb-daea386252ac": 11;
      "02c88306-7f9c-469d-9838-2e6e7bb96f20": 17;
    };
    breadsToday: {
      "651b23db-f2ec-459e-a6fb-daea386252ac": 9;
      "02c88306-7f9c-469d-9838-2e6e7bb96f20": 10;
    };
    breadsYesterday: {
      "651b23db-f2ec-459e-a6fb-daea386252ac": 0;
      "02c88306-7f9c-469d-9838-2e6e7bb96f20": 7;
    };
  };
}

interface BakeryDoughResponse {
  _id: string;
  doughroom: DoughroomResponse;
  status: DoughStatus;
  driver?: ProfileResponse;
  bakery?: BakeryResponse;
  dividers?: ProfileResponse[];
  rounds?: number;
  baker?: ProfileResponse;
  baked?: number;
  left?: number;
  createdAt: string;
  updatedAt: string;
}

interface BakeryDoughsRequest {
  bakeryId: string;
  status: string[];
}

interface Breads {
  _id: string;
  driver: string;
  bakery: string;
  breads: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  toBakery: {
    title: string;
  };
}

interface BakeryBreadsResponse {
  doughs: BakeryDoughResponse[];
  breads: Breads[];
}

interface BakeryBreadsRequest {
  bakeryId: string;
  breadStatus?: string[];
  doughStatus?: string[];
}

interface BakeryDivideResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface BakeryDivideRequest {
  bakery: string;
  dough: string;
  rounds: number;
  dividers: string[];
}

interface BakeryBakeResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface BakeryBakeRequest {
  dough: string;
  baked: number;
  baker?: string;
}

interface BakeryRedirectResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
  redirect: string;
}

interface BakeryRedirectRequest {
  dough: string;
  driver: string;
}

export interface BakerRoomIdInOvenBreadsResponse {
  inOvenBreads: [
    {
      _id: string;
      doughBallId: string;
      doughType: {
        _id: string;
        title: string;
      };
      count: number;
      branch: string;
      bakerRoom: string;
      createdAt: string;
    }
  ];
}

export interface BakerRoomIdTayyorBreadsResponse {
  data: [
    {
      doughType: string;
      breadTitle: string;
      count: number;
    }
  ];
}

export interface BakerRoomIdQolganBreadsResponse {
  data: [
    {
      doughType: string;
      breadTitle: string;
      count: number;
    }
  ];
}
