import { baseApi } from "../baseApi";
import { PATHS } from "./paths";

export const reasonApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getReasons: build.query<GetReasonsResponse[], object>({
            query: () => ({
                url: PATHS.ALL_REASON,
                method: "GET",
            }),
        }),
        getSingleReasons: build.query<GetReasonsResponse, object>({
            query: (id) => ({
                url: `${PATHS.REASON}/${id}`,
                method: "GET",
            }),
        })
    })
})

export const { useGetReasonsQuery} = reasonApi