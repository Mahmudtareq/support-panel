import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // sends httpOnly cookie
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    // unwrap { status, statusCode, message, data } → return data only
    responseHandler: async (response) => {
      const json = await response.json();
      if (json?.status === "success") return json.data;
      throw new Error(json?.message ?? "Request failed");
    },
  }),
  tagTypes: ["Admin", "Manager", "User"],
  endpoints: () => ({}),
});
