import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAPI } from '../api';

export const userApi = createApi({
    reducerPath: 'contactAPI',
    baseQuery: baseAPI,
    endpoints: (builder) => ({
        getAllContact: builder.query({
            query: () => "/contact",
        }),
        addContact: builder.mutation({
            query: ({bodyRequest}) => ({
                url: '/contact',
                method: 'POST',
                body: bodyRequest
            })
        }),
        updateContact: builder.mutation({
            query: ({id,updateBody}) => ({
                url: `/contact/${id}`,
                method: 'PUT',
                body: updateBody
            })
        }),
        deleteContact: builder.mutation({
            query: ({id}) => ({
                url: `/contact/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetAllContactQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } = userApi;