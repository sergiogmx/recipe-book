## ADDED Requirements

### Requirement: Fetch recipes from API
The system SHALL fetch all recipes from `GET /recipes` using RTK Query when the recipes page loads.

#### Scenario: Successful fetch
- **WHEN** the recipes page mounts
- **THEN** the system fetches all recipes from `http://localhost:3001/recipes` and displays them

#### Scenario: Loading state
- **WHEN** the recipes request is in progress
- **THEN** the system SHALL display a loading indicator

#### Scenario: Error state
- **WHEN** the recipes request fails
- **THEN** the system SHALL display an error message indicating the recipes could not be loaded

### Requirement: Display recipe cards in a grid
The system SHALL display filtered recipes in a responsive grid layout: 1 column on mobile, 2 columns on tablet (md), and 3 columns on desktop (lg). A filter bar with search input and category dropdown SHALL be displayed between the page header and the recipe grid.

#### Scenario: Desktop layout
- **WHEN** the viewport is >= 1024px wide
- **THEN** recipes are displayed in a 3-column grid

#### Scenario: Tablet layout
- **WHEN** the viewport is >= 768px and < 1024px wide
- **THEN** recipes are displayed in a 2-column grid

#### Scenario: Mobile layout
- **WHEN** the viewport is < 768px wide
- **THEN** recipes are displayed in a single column

#### Scenario: Filter bar placement
- **WHEN** the recipes page is displayed
- **THEN** a filter bar with search input and category dropdown is visible between the header and the grid

### Requirement: Recipe card displays key information
Each recipe card SHALL display the recipe image, name, category, difficulty, and preparation time.

#### Scenario: Card content
- **WHEN** a recipe is rendered as a card
- **THEN** the card displays:
  - The recipe image (from `imageUrl`)
  - The recipe name (`name`)
  - The category label (`category`)
  - The difficulty level (`difficulty`)
  - The preparation time in a human-readable format (e.g., "25 min", "1h 30min")

#### Scenario: Image load failure
- **WHEN** a recipe image fails to load
- **THEN** the card SHALL display a fallback placeholder instead of a broken image

### Requirement: Page header
The recipes page SHALL display a header with the application title "Recipe Book" and a brief description.

#### Scenario: Page header visible
- **WHEN** the recipes page is displayed
- **THEN** a header with "Recipe Book" title is visible at the top of the page
