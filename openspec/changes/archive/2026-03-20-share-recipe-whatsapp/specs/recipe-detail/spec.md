## MODIFIED Requirements

### Requirement: Display full recipe information
The recipe detail page SHALL display all recipe fields in a structured layout: hero image, name, description, metadata badges (category, difficulty, preparation time), a share button for WhatsApp, ingredient list, and numbered preparation steps.

#### Scenario: Hero image
- **GIVEN** the recipe detail page is displayed
- **WHEN** the recipe data has loaded
- **THEN** a large image from `imageUrl` SHALL be displayed at the top of the page

#### Scenario: Hero image failure
- **GIVEN** the recipe image fails to load
- **WHEN** the page attempts to render the image
- **THEN** a fallback placeholder SHALL be displayed instead of a broken image

#### Scenario: Recipe metadata
- **GIVEN** the recipe detail page is displayed
- **WHEN** the recipe data has loaded
- **THEN** the page SHALL show the recipe name as heading, its description as body text, and badges for category, difficulty, and preparation time (human-readable format)

#### Scenario: Share button placement
- **GIVEN** the recipe detail page is displayed
- **WHEN** the recipe data has loaded
- **THEN** a "Compartir por WhatsApp" button SHALL be visible near the metadata badges

#### Scenario: Ingredients list
- **GIVEN** the recipe detail page is displayed
- **WHEN** the recipe data has loaded
- **THEN** all items from `ingredients` SHALL be displayed as a bulleted list under an "Ingredientes" heading

#### Scenario: Preparation steps
- **GIVEN** the recipe detail page is displayed
- **WHEN** the recipe data has loaded
- **THEN** all items from `steps` SHALL be displayed as a numbered ordered list under a "Preparación" heading
