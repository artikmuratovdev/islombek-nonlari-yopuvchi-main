import { ProfileResponse } from "../authApi/types";
import { GetExpensesResponse } from "../expenseApi/types";
import { GetReportResponse } from "../reportApi/types";

export interface GetNotification {
    _id: string;
    users: string[];
    status: string;
    type: string;
    from: ProfileResponse;
    expense?: GetExpensesResponse;
    order?: OrderResponse;
    report?: GetReportResponse;
    doughroom?: DoughroomResponse;
    warehouse?: string;
    bakery?: BakeryResponse;
    doughs?: DoughsReponse[];
    delivery?: {
        breads: number
    };
    createdAt: string;
    updatedAt: string;
}


interface NotificationSubscribeRequest {
    endpoint: string
    keys: {
        auth: string
        p256dh: string
    }
}

interface NotificationPushRequest {
    id: string
    body: {
        title: string
        body?: string
    }
}