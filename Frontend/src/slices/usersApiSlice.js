import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users'; 

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUserProfile: builder.query({
      query: () => `${USERS_URL}/profile`
    })
  })
});

export const { 
  useLoginMutation, 
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserProfileQuery  // Added this line to export the query hook
} = usersApiSlice;
