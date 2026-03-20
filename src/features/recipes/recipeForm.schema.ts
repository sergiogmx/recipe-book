import { z } from "zod";

export const recipeFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1, "El ingrediente no puede estar vacío"),
      })
    )
    .min(1, "Debe haber al menos un ingrediente"),
  steps: z
    .array(
      z.object({
        value: z.string().min(1, "El paso no puede estar vacío"),
      })
    )
    .min(1, "Debe haber al menos un paso"),
  category: z.string().min(1, "La categoría es obligatoria"),
  difficulty: z.enum(["Fácil", "Media", "Difícil"], {
    error: "La dificultad es obligatoria",
  }),
  prepTime: z
    .number({ error: "El tiempo debe ser un número" })
    .positive("El tiempo de preparación debe ser mayor a 0"),
  imageUrl: z
    .string()
    .min(1, "La URL de imagen es obligatoria")
    .url("La URL de imagen no tiene un formato válido"),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;
