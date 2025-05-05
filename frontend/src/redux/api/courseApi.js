import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.MODE === "development"?"http://localhost:5001/api/generate":"https://coachingmate-backend.onrender.com/api/generate"


export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    generateTopics: builder.mutation({
      query: ({ heading, level }) => ({
        url: '/topics',
        method: 'POST',
        body: { heading, level }
      })
    }),
    generateCourse: builder.mutation({
      query: ({ topics }) => ({
        url: '/course',
        method: 'POST',
        body: { topics }
      })
    }),
    getAllCourses: builder.query({
      query: () => '/all-course'
    }),
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`
    })
  })
});

export const {
  useGenerateTopicsMutation,
  useGenerateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery
} = courseApi;
