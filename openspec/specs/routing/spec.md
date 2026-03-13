## ADDED Requirements

### Requirement: Client-side routing
The application SHALL use React Router to handle client-side navigation between the recipe listing and recipe detail pages without full page reloads.

#### Scenario: Listing route
- **WHEN** the user navigates to `/`
- **THEN** the system SHALL render the recipe listing page (`RecipesPage`)

#### Scenario: Detail route
- **WHEN** the user navigates to `/recipes/:id`
- **THEN** the system SHALL render the recipe detail page (`RecipeDetailPage`) with the corresponding recipe ID

#### Scenario: Unknown route
- **WHEN** the user navigates to an undefined route
- **THEN** the system SHALL redirect to `/`

### Requirement: Router configuration
The router SHALL be configured in a dedicated `src/router.tsx` file using `createBrowserRouter` and rendered via `<RouterProvider>` in `App.tsx`.

#### Scenario: Router setup
- **WHEN** the application initializes
- **THEN** `App.tsx` SHALL render `<RouterProvider>` with the router defined in `src/router.tsx`
