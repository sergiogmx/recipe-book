## MODIFIED Requirements

### Requirement: Page header
The recipes page SHALL display a header with the application title "Recipe Book", a brief description, and a button to navigate to the recipe creation form.

#### Scenario: Page header visible
- **GIVEN** the user is on the recipes listing
- **WHEN** the page is displayed
- **THEN** a header with "Recipe Book" title SHALL be visible at the top of the page

#### Scenario: Create recipe button
- **GIVEN** the user is on the recipes listing
- **WHEN** the page is displayed
- **THEN** a "Nueva Receta" button SHALL be visible in the page header that navigates to `/recipes/new`

#### Scenario: Create button navigates correctly
- **GIVEN** the user is on the recipes listing
- **WHEN** the user clicks the "Nueva Receta" button
- **THEN** the system SHALL navigate to `/recipes/new`
