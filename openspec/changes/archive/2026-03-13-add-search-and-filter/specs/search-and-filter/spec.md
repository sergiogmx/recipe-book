## ADDED Requirements

### Requirement: Text search filters recipes by name and description
The system SHALL filter the displayed recipes based on a text search input. The search MUST match against recipe `name` and `description` fields, case-insensitive.

#### Scenario: Search matches by name
- **WHEN** the user types "chilaquiles" in the search field
- **THEN** only recipes whose name contains "chilaquiles" (case-insensitive) are displayed

#### Scenario: Search matches by description
- **WHEN** the user types "cerdo" in the search field
- **THEN** recipes whose description contains "cerdo" (case-insensitive) are displayed

#### Scenario: Search with no matches
- **WHEN** the user types a search term that matches no recipes
- **THEN** no recipe cards are displayed and an empty state is shown

#### Scenario: Empty search shows all recipes
- **WHEN** the search field is empty
- **THEN** all recipes are displayed (subject to category filter)

### Requirement: Category filter via dropdown
The system SHALL provide a dropdown populated with categories from `GET /categories` that filters recipes by their `category` field.

#### Scenario: All categories option
- **WHEN** the category dropdown shows the default "Todas las categorías" option
- **THEN** all recipes are displayed (subject to search filter)

#### Scenario: Filter by specific category
- **WHEN** the user selects "Desayuno" from the category dropdown
- **THEN** only recipes with `category` equal to "Desayuno" are displayed

#### Scenario: Categories fetch failure
- **WHEN** the categories API request fails
- **THEN** the category dropdown SHALL be hidden and text search remains functional

### Requirement: Combined filters
The search and category filter SHALL work in combination. A recipe MUST match both the text search AND the selected category to be displayed.

#### Scenario: Search within a category
- **WHEN** the user selects "Postre" category AND types "arroz" in the search field
- **THEN** only recipes matching both criteria are displayed

### Requirement: Results counter
The system SHALL display a counter showing how many recipes match the current filters in the format "X recetas encontradas".

#### Scenario: Counter reflects filtered results
- **WHEN** filters are active and 3 recipes match
- **THEN** the counter displays "3 recetas encontradas"

#### Scenario: Counter with all results
- **WHEN** no filters are active and 10 recipes exist
- **THEN** the counter displays "10 recetas encontradas"

### Requirement: Empty state
The system SHALL display an empty state message when no recipes match the current filters.

#### Scenario: No results message
- **WHEN** the combination of search and category filter produces zero results
- **THEN** the system displays a message indicating no recipes were found and suggesting to adjust the filters
