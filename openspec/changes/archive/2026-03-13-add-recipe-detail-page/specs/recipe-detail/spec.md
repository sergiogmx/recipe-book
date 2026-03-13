## ADDED Requirements

### Requirement: Fetch recipe by ID
The system SHALL fetch a single recipe from `GET /recipes/:id` using RTK Query when the recipe detail page loads.

#### Scenario: Successful fetch
- **WHEN** the user navigates to `/recipes/:id`
- **THEN** the system fetches the recipe from `http://localhost:3001/recipes/:id` and displays its full details

#### Scenario: Loading state
- **WHEN** the recipe request is in progress
- **THEN** the system SHALL display a loading indicator

#### Scenario: Error state
- **WHEN** the recipe request fails
- **THEN** the system SHALL display an error message indicating the recipe could not be loaded

#### Scenario: Recipe not found
- **WHEN** the recipe ID does not exist in the API
- **THEN** the system SHALL display a "recipe not found" message

### Requirement: Display full recipe information
The recipe detail page SHALL display all recipe fields in a structured layout: hero image, name, description, metadata badges (category, difficulty, preparation time), ingredient list, and numbered preparation steps.

#### Scenario: Hero image
- **WHEN** the recipe detail page is displayed
- **THEN** a large image from `imageUrl` SHALL be displayed at the top of the page

#### Scenario: Hero image failure
- **WHEN** the recipe image fails to load
- **THEN** a fallback placeholder SHALL be displayed instead of a broken image

#### Scenario: Recipe metadata
- **WHEN** the recipe detail page is displayed
- **THEN** the page SHALL show the recipe name as heading, its description as body text, and badges for category, difficulty, and preparation time (human-readable format)

#### Scenario: Ingredients list
- **WHEN** the recipe detail page is displayed
- **THEN** all items from `ingredients` SHALL be displayed as a bulleted list under an "Ingredientes" heading

#### Scenario: Preparation steps
- **WHEN** the recipe detail page is displayed
- **THEN** all items from `steps` SHALL be displayed as a numbered ordered list under a "Preparación" heading

### Requirement: Back navigation
The recipe detail page SHALL include a button to navigate back to the recipe listing.

#### Scenario: Back button navigates to listing
- **WHEN** the user clicks the back button on the recipe detail page
- **THEN** the system SHALL navigate to the recipe listing page (`/`)

#### Scenario: Back button is always visible
- **WHEN** the recipe detail page is displayed (including loading and error states)
- **THEN** the back button SHALL be visible
