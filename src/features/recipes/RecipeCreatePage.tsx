import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { recipeFormSchema, type RecipeFormData } from "./recipeForm.schema";
import { useCreateRecipeMutation, useGetCategoriesQuery } from "./recipesApi";

export function RecipeCreatePage() {
  const navigate = useNavigate();
  const { data: categories, error: categoriesError } =
    useGetCategoriesQuery();
  const [createRecipe, { isLoading: isSubmitting, error: submitError }] =
    useCreateRecipeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
      category: "",
      difficulty: undefined,
      prepTime: undefined as unknown as number,
      imageUrl: "",
    },
  });

  const ingredients = useFieldArray({ control, name: "ingredients" });
  const steps = useFieldArray({ control, name: "steps" });

  const onSubmit = async (data: RecipeFormData) => {
    try {
      await createRecipe({
        name: data.name,
        description: data.description,
        ingredients: data.ingredients.map((i) => i.value),
        steps: data.steps.map((s) => s.value),
        category: data.category,
        difficulty: data.difficulty,
        prepTime: data.prepTime,
        imageUrl: data.imageUrl,
      }).unwrap();
      navigate("/");
    } catch {
      // Error is handled via submitError from the mutation hook
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "mt-1 text-sm text-red-600";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-sm text-amber-600 hover:text-amber-700"
          >
            &larr; Volver al listado
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Nueva Receta
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {submitError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            No se pudo guardar la receta. Inténtalo de nuevo.
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
        >
          {/* Nombre */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Nombre
            </label>
            <input id="name" type="text" className={inputClass} {...register("name")} />
            {errors.name && (
              <p className={errorClass}>{errors.name.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Descripción
            </label>
            <textarea
              id="description"
              rows={3}
              className={inputClass}
              {...register("description")}
            />
            {errors.description && (
              <p className={errorClass}>{errors.description.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Categoría
            </label>
            {categoriesError ? (
              <p className="text-sm text-gray-500">
                No se pudieron cargar las categorías.
              </p>
            ) : (
              <select id="category" className={inputClass} {...register("category")}>
                <option value="">Selecciona una categoría</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.category && (
              <p className={errorClass}>{errors.category.message}</p>
            )}
          </div>

          {/* Dificultad */}
          <div>
            <label htmlFor="difficulty" className={labelClass}>
              Dificultad
            </label>
            <select id="difficulty" className={inputClass} {...register("difficulty")}>
              <option value="">Selecciona la dificultad</option>
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
            {errors.difficulty && (
              <p className={errorClass}>{errors.difficulty.message}</p>
            )}
          </div>

          {/* Tiempo de preparación */}
          <div>
            <label htmlFor="prepTime" className={labelClass}>
              Tiempo de preparación (minutos)
            </label>
            <input
              id="prepTime"
              type="number"
              min={1}
              className={inputClass}
              {...register("prepTime", { valueAsNumber: true })}
            />
            {errors.prepTime && (
              <p className={errorClass}>{errors.prepTime.message}</p>
            )}
          </div>

          {/* URL de imagen */}
          <div>
            <label htmlFor="imageUrl" className={labelClass}>
              URL de imagen
            </label>
            <input id="imageUrl" type="text" className={inputClass} {...register("imageUrl")} />
            {errors.imageUrl && (
              <p className={errorClass}>{errors.imageUrl.message}</p>
            )}
          </div>

          {/* Ingredientes */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">
              Ingredientes
            </legend>
            {errors.ingredients?.root && (
              <p className={errorClass}>{errors.ingredients.root.message}</p>
            )}
            <div className="mt-2 space-y-2">
              {ingredients.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Ingrediente ${index + 1}`}
                      className={inputClass}
                      {...register(`ingredients.${index}.value`)}
                    />
                    {errors.ingredients?.[index]?.value && (
                      <p className={errorClass}>
                        {errors.ingredients[index].value.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => ingredients.remove(index)}
                    disabled={ingredients.fields.length <= 1}
                    className="mt-1 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Quitar ingrediente ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => ingredients.append({ value: "" })}
              className="mt-2 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              + Agregar ingrediente
            </button>
          </fieldset>

          {/* Pasos */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">
              Pasos de preparación
            </legend>
            {errors.steps?.root && (
              <p className={errorClass}>{errors.steps.root.message}</p>
            )}
            <div className="mt-2 space-y-2">
              {steps.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      placeholder={`Paso ${index + 1}`}
                      className={inputClass}
                      {...register(`steps.${index}.value`)}
                    />
                    {errors.steps?.[index]?.value && (
                      <p className={errorClass}>
                        {errors.steps[index].value.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => steps.move(index, index - 1)}
                      disabled={index === 0}
                      className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label={`Mover paso ${index + 1} arriba`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => steps.move(index, index + 1)}
                      disabled={index === steps.fields.length - 1}
                      className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label={`Mover paso ${index + 1} abajo`}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => steps.remove(index)}
                      disabled={steps.fields.length <= 1}
                      className="rounded px-2 py-1 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label={`Quitar paso ${index + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => steps.append({ value: "" })}
              className="mt-2 text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              + Agregar paso
            </button>
          </fieldset>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-amber-600 px-6 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Guardando...
                </span>
              ) : (
                "Guardar receta"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
