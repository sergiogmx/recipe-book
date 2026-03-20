## ADDED Requirements

### Requirement: Share recipe via WhatsApp button
The recipe detail page SHALL display a "Compartir por WhatsApp" button that allows users to share the recipe through WhatsApp.

#### Scenario: Button visible on recipe detail
- **GIVEN** the user is viewing a recipe detail page
- **WHEN** the recipe data has loaded successfully
- **THEN** a "Compartir por WhatsApp" button SHALL be visible

#### Scenario: Button not visible during loading or error
- **GIVEN** the recipe is loading or an error occurred
- **WHEN** the user views the page
- **THEN** the share button SHALL NOT be displayed

### Requirement: Pre-formatted WhatsApp message
The share button SHALL open WhatsApp with a pre-formatted message containing the recipe name, category, and a link to the recipe detail page.

#### Scenario: Message content
- **GIVEN** the user is viewing a recipe with name "Tacos al Pastor" and category "Plato Fuerte"
- **WHEN** the user clicks the share button
- **THEN** the system SHALL open a WhatsApp share URL with a message that includes the recipe name, the category, and the full URL to the recipe detail page

#### Scenario: Special characters in recipe name
- **GIVEN** the recipe name or category contains special characters (accents, ñ, etc.)
- **WHEN** the user clicks the share button
- **THEN** the message SHALL be properly URL-encoded so that all characters display correctly in WhatsApp

### Requirement: Cross-platform WhatsApp sharing
The share button SHALL work on both desktop and mobile devices, opening the appropriate WhatsApp client.

#### Scenario: Desktop sharing
- **GIVEN** the user is on a desktop browser
- **WHEN** the user clicks the share button
- **THEN** the system SHALL open WhatsApp Web in a new tab via `https://wa.me/?text=...`

#### Scenario: Mobile sharing
- **GIVEN** the user is on a mobile device with WhatsApp installed
- **WHEN** the user clicks the share button
- **THEN** the system SHALL open the WhatsApp app via the same `https://wa.me/?text=...` URL
