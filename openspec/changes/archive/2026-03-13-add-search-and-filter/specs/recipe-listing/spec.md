## MODIFIED Requirements

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
