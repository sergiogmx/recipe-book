## MODIFIED Requirements

### Requirement: Recipe card displays key information
Each recipe card SHALL display the recipe image, name, category, difficulty, and preparation time. Each card SHALL be a clickable link that navigates to the recipe detail page.

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

#### Scenario: Card navigates to detail
- **WHEN** the user clicks on a recipe card
- **THEN** the system SHALL navigate to `/recipes/:id` where `:id` is the recipe's ID
