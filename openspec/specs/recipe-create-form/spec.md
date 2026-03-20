## ADDED Requirements

### Requirement: Recipe creation form fields
The system SHALL display a form with fields for: nombre, descripción, ingredientes (dynamic list), pasos de preparación (dynamic list with reorder), categoría (dropdown), dificultad (Fácil/Media/Difícil), tiempo de preparación (minutes), and URL de imagen.

#### Scenario: Form renders all fields
- **GIVEN** the user wants to create a new recipe
- **WHEN** the user navigates to `/recipes/new`
- **THEN** the form SHALL display all fields: nombre, descripción, ingredientes, pasos, categoría, dificultad, tiempo de preparación, and URL de imagen

#### Scenario: Category dropdown populated from API
- **GIVEN** the categories endpoint is available
- **WHEN** the form loads
- **THEN** the categoría dropdown SHALL be populated with the available categories

#### Scenario: Category fetch error
- **GIVEN** the categories endpoint is unavailable
- **WHEN** the form loads
- **THEN** the categoría dropdown SHALL display a placeholder message indicating categories could not be loaded

#### Scenario: Difficulty options
- **GIVEN** the form is displayed
- **WHEN** the user opens the dificultad dropdown
- **THEN** the options SHALL be exactly: "Fácil", "Media", "Difícil"

### Requirement: Dynamic ingredient list
The system SHALL allow users to add and remove ingredients dynamically. The form MUST start with one empty ingredient field.

#### Scenario: Add ingredient
- **GIVEN** the ingredient list is displayed
- **WHEN** the user clicks the "Agregar ingrediente" button
- **THEN** a new empty ingredient text field SHALL be appended to the list

#### Scenario: Remove ingredient
- **GIVEN** the ingredient list has more than one item
- **WHEN** the user clicks the remove button on an ingredient
- **THEN** that ingredient field SHALL be removed from the list

#### Scenario: Minimum one ingredient field
- **GIVEN** the user opens the creation form
- **WHEN** the form loads
- **THEN** exactly one empty ingredient field SHALL be displayed

#### Scenario: Cannot remove last ingredient
- **GIVEN** only one ingredient field remains
- **WHEN** the user views the ingredient list
- **THEN** the remove button for that field SHALL be disabled or hidden

### Requirement: Dynamic steps list with reorder
The system SHALL allow users to add, remove, and reorder preparation steps. The form MUST start with one empty step field. Steps SHALL be displayed with sequential numbering.

#### Scenario: Add step
- **GIVEN** the steps list is displayed
- **WHEN** the user clicks the "Agregar paso" button
- **THEN** a new empty step text field SHALL be appended to the list

#### Scenario: Remove step
- **GIVEN** the steps list has more than one item
- **WHEN** the user clicks the remove button on a step
- **THEN** that step SHALL be removed and remaining steps SHALL be renumbered sequentially

#### Scenario: Move step up
- **GIVEN** a step is not the first in the list
- **WHEN** the user clicks the "move up" button on that step
- **THEN** that step SHALL swap positions with the step above it

#### Scenario: Move step down
- **GIVEN** a step is not the last in the list
- **WHEN** the user clicks the "move down" button on that step
- **THEN** that step SHALL swap positions with the step below it

#### Scenario: Minimum one step field
- **GIVEN** the user opens the creation form
- **WHEN** the form loads
- **THEN** exactly one empty step field SHALL be displayed

#### Scenario: Cannot remove last step
- **GIVEN** only one step field remains
- **WHEN** the user views the steps list
- **THEN** the remove button for that step SHALL be disabled or hidden

#### Scenario: First step has no move up
- **GIVEN** a step is the first in the list
- **WHEN** the user views the step controls
- **THEN** the "move up" button SHALL be disabled or hidden

#### Scenario: Last step has no move down
- **GIVEN** a step is the last in the list
- **WHEN** the user views the step controls
- **THEN** the "move down" button SHALL be disabled or hidden

### Requirement: Form validation
The system SHALL validate all fields before submission and display clear error messages in Spanish for each invalid field.

#### Scenario: Required fields validation
- **GIVEN** the user has left one or more required fields empty
- **WHEN** the user submits the form
- **THEN** the system SHALL display an error message next to each empty required field indicating it is required

#### Scenario: Empty ingredient validation
- **GIVEN** the user has added an ingredient field but left it blank
- **WHEN** the user submits the form
- **THEN** the system SHALL display an error message next to that ingredient field

#### Scenario: Empty step validation
- **GIVEN** the user has added a step field but left it blank
- **WHEN** the user submits the form
- **THEN** the system SHALL display an error message next to that step field

#### Scenario: Prep time must be positive number
- **GIVEN** the user has entered a prep time value that is zero or negative
- **WHEN** the user submits the form
- **THEN** the system SHALL display an error message indicating prep time must be a positive number

#### Scenario: Image URL format validation
- **GIVEN** the user has entered a value in the image URL field that is not a valid URL
- **WHEN** the user submits the form
- **THEN** the system SHALL display an error message indicating the URL format is invalid

#### Scenario: Error messages in Spanish
- **GIVEN** the form has validation errors
- **WHEN** the error messages are displayed
- **THEN** all error messages SHALL be written in Spanish

### Requirement: Recipe submission
The system SHALL send the completed form data to the API when the form is valid, and provide feedback on the result.

#### Scenario: Successful submission
- **GIVEN** all form fields are valid
- **WHEN** the user clicks the submit button
- **THEN** the system SHALL send the form data to the API and navigate to the recipes listing page upon success

#### Scenario: Submission error
- **GIVEN** all form fields are valid
- **WHEN** the user submits the form and the API request fails
- **THEN** the system SHALL display an error message indicating the recipe could not be saved

#### Scenario: Submission loading state
- **GIVEN** the form has been submitted
- **WHEN** the API request is in progress
- **THEN** the submit button SHALL be disabled and display a loading indicator

#### Scenario: New recipe appears in listing after creation
- **GIVEN** a recipe was successfully created
- **WHEN** the user is redirected to the recipes listing page
- **THEN** the newly created recipe SHALL appear in the listing

### Requirement: Form navigation
The form page SHALL include a way to cancel and return to the recipes listing.

#### Scenario: Cancel returns to listing
- **GIVEN** the user is on the recipe creation form
- **WHEN** the user clicks the "Cancelar" link/button
- **THEN** the system SHALL navigate back to the recipes listing page

#### Scenario: Page header shows context
- **GIVEN** the user is on the recipe creation form
- **WHEN** the page loads
- **THEN** a header with "Nueva Receta" title and a back/cancel link SHALL be visible
