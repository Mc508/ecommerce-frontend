import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCouponsResponse, DeleteCouponRequest, MessageResponse, NewCouponRequest } from "../../types/api-types";
export const couponAPI = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/`
  }),
  tagTypes: ["coupon"],
  endpoints: (builder) => ({
    allCoupons: builder.query<AllCouponsResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["coupon"]
    }),

    newCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ data, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
  body: data
      }),
      invalidatesTags: ["coupon"]
    }),
    deleteCoupon: builder.mutation<MessageResponse, DeleteCouponRequest>({
      query: ({ userId, couponId }) => ({
        url: `${couponId}?id=${userId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["coupon"]
  })                                        
  })                                        
});
export const { useNewCouponMutation,useAllCouponsQuery,useDeleteCouponMutation } = couponAPI;
