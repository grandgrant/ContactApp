import { createApi } from '@reduxjs/toolkit/query/react'
import { baseAPI } from '../api';
import { Contact, deleteContact } from '../../../state/contact/contactSlices';

export type BodyRequest = {
    firstName:string,
    lastName:string,
    age:number,
    photo:string
}

export type GetResponseData = {
    message:string,
    data: Contact[]
}

export type PostResponseData = {
    message:string
}

export const contactAPI = {
    getContact: () => baseAPI.get("/contact"),
    addContact: (body:BodyRequest) => baseAPI.post("/contact", body),
    updateContact: (id:string, body:BodyRequest) => baseAPI.put(`/contact/${id}`, body),
    deleteContact: (id:string) => baseAPI.delete(`/contact/${id}`),
}

// export const userApi = createApi({
//     reducerPath: 'contactAPI',
//     baseQuery: baseAPI,
//     endpoints: (builder) => ({
//         getAllContact: builder.query({
//             query: () => "/contact",
//         }),
//         addContact: builder.mutation({
//             query: ({bodyRequest}) => ({
//                 url: '/contact',
//                 method: 'POST',
//                 body: bodyRequest
//             })
//         }),
//         updateContact: builder.mutation({
//             query: ({id,updateBody}) => ({
//                 url: `/contact/${id}`,
//                 method: 'PUT',
//                 body: updateBody
//             })
//         }),
//         deleteContact: builder.mutation({
//             query: ({id}) => ({
//                 url: `/contact/${id}`,
//                 method: 'DELETE'
//             })
//         })
//     })
// })

// export const { useGetAllContactQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } = userApi;