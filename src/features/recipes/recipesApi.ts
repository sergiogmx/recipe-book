import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Recipe } from "./types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipes"],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    createRecipe: builder.mutation<Recipe, Omit<Recipe, "id">>({
      query: (newRecipe) => ({
        url: "/recipes",
        method: "POST",
        body: newRecipe,
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useCreateRecipeMutation,
} = recipesApi;
