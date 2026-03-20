import { createBrowserRouter, Navigate } from "react-router-dom";
import { RecipesPage } from "./features/recipes/RecipesPage";
import { RecipeCreatePage } from "./features/recipes/RecipeCreatePage";
import { RecipeDetailPage } from "./features/recipes/RecipeDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RecipesPage />,
  },
  {
    path: "/recipes/new",
    element: <RecipeCreatePage />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeDetailPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
