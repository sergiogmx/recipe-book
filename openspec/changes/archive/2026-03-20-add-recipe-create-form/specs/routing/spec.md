## MODIFIED Requirements

### Requirement: Client-side routing
The application SHALL use React Router to handle client-side navigation between the recipe listing, recipe detail, and recipe creation pages without full page reloads.

#### Scenario: Listing route
- **GIVEN** the application is running
- **WHEN** the user navigates to `/`
- **THEN** the system SHALL render the recipe listing page

#### Scenario: Create route
- **GIVEN** the application is running
- **WHEN** the user navigates to `/recipes/new`
- **THEN** the system SHALL render the recipe creation page

#### Scenario: Detail route
- **GIVEN** the application is running
- **WHEN** the user navigates to `/recipes/:id`
- **THEN** the system SHALL render the recipe detail page with the corresponding recipe ID

#### Scenario: Create route takes precedence over detail
- **GIVEN** the application is running
- **WHEN** the user navigates to `/recipes/new`
- **THEN** the system SHALL NOT interpret "new" as a recipe ID

#### Scenario: Unknown route
- **GIVEN** the application is running
- **WHEN** the user navigates to an undefined route
- **THEN** the system SHALL redirect to `/`
