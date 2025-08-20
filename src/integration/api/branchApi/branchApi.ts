import { baseApi } from "../baseApi";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBranch: build.query<GetSingleBranch, { id: string }>({
      query: ({ id }) => "/branch/" + id,
    }),
  }),
});

export const { useGetBranchQuery } = branchApi;
