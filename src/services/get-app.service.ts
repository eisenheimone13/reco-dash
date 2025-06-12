import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../env/staging";
import { IQueryModel, IQueryResponse } from "./query.model";

export const getAppsApi = createApi({
  reducerPath: "getAppsApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.apiRoot }),
  endpoints: (builder) => ({
    putAppData: builder.mutation<IQueryResponse, IQueryModel>({
      query: (body) => ({
        url: `api/v1/app-service/get-apps`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { usePutAppDataMutation } = getAppsApi;
