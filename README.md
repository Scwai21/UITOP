QA Automation Test Task | Playwright & TypeScript
This repository contains the automated test suite for the Alynea Staging application (UI) and Automation Exercise (API). The framework is built from scratch using Playwright, TypeScript, and the Page Object Model (POM) architectural pattern.

Tech Stack & Features
Framework: Playwright Test
Language: TypeScript
Architecture: Page Object Model (POM) + Custom Fixtures
State Management: Global Setup (auth.setup.ts) for session sharing (reusing user.json cookies) with strict isolation for authentication tests.
Cross-browser & Mobile: Configured for Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), and Mobile Safari (iPhone 12).
CI/CD: GitHub Actions integration with automated HTML Report deployment to GitHub Pages.
Containerization: Docker & Docker Compose support.

How to Run Locally
1. Clone the repository and install dependencies:
Bash
npm install
npx playwright install --with-deps

2. Execute the tests:
Run all tests (UI & API) in headless mode:
Bash
npx playwright test
Run tests with UI mode (for debugging):
Bash
npx playwright test --ui
View the HTML report after execution:
Bash
npx playwright show-report

How to Run via Docker (Bonus)
To run the test suite inside an isolated Docker container without relying on a local Node.js environment:
Bash
docker-compose up --build
Note: Once the execution is complete, the HTML report will be automatically saved to your local playwright-report folder via volumes.

Test Documentation
Task 1: UI Scenarios Executed
1. Authentication (login.spec.ts)
Pre-condition: Cleared storage state (storageState: {cookies: [], origins: []}) to ensure a clean session.
Positive: Validated successful login with valid credentials and verified the presence of the welcome title and success message.
Negative: Validated error states and validation messages for:
Invalid password.
Empty fields (email & password).
Missing email or missing password.
Invalid email format (validating built-in browser/form hints).

2. Project Creation (project.spec.ts)
Pre-condition: Uses global auth.setup.ts to inject valid session cookies, skipping the login step for faster execution.
Flow Validated: * Navigated to the "Projects" tab.
Clicked "Create Project" and filled in required and optional fields (Name, Jurisdiction, Address, Unit).
Verified successful creation by asserting the URL redirection.
Asserts the presence of the newly created project with a unique timestamped name in the Projects list (findProject custom locator).
Validated Mobile UI specific behaviors (e.g., interacting with the burger menu before navigation).

Task 2: API Test Cases (api.spec.ts)
Tested against https://automationexercise.com/api using Playwright's native request context.
Test Case 1 (Positive): Get All Products List
Endpoint: GET /productsList
Validation: Asserted HTTP Status 200, parsed JSON response, verified responseCode: 200, and ensured the products array is defined and not empty.
Test Case 2 (Negative): Verify Login without parameters
Endpoint: POST /verifyLogin
Payload: Empty form {}
Validation: Asserted responseCode: 400 and validated the exact error message: "Bad request, email or password parameter is missing in POST request."

Bug Report
Bug 1: Login modal opens behind the active burger menu
Environment: Mobile Safari (iPhone) & Mobile Chrome (Pixel)
Steps to Reproduce:
Open the application on a mobile viewport.
Tap the Hamburger (Burger) menu to open it.
Tap the "Log In" button inside the menu.
Expected Result: The burger menu should automatically close, and the Login modal should appear in the foreground, ready for user input.
Actual Result: The Login modal appears behind the active burger menu. The burger menu does not close, effectively blocking the user from interacting with the login form.

Bug 2: "More" button is unresponsive
Environment: Mobile Safari (iPhone) & Mobile Chrome (Pixel)
Steps to Reproduce:
Open the application on a mobile viewport.
Locate and tap the "More" button in the navigation.
Expected Result: A dropdown menu or additional navigation options should expand/appear.
Actual Result: The button is completely unresponsive. No action occurs upon tapping.

Bug 3: UI crashes when toggling between Auth modals
Environment: Mobile/Desktop Viewports
Steps to Reproduce:
Open the application.
Click/Tap the "Log In" button.
Close the modal or directly switch to the "Sign Up" button.
Click/Tap the "Log In" button again.
Expected Result: The application should handle modal toggling smoothly, displaying the correct form each time.
Actual Result: The UI completely breaks/freezes, making it impossible to continue the authentication flow.


Test Summary
Total Tests Executed: All functional UI, Mobile, and API tests.
Pass Rate: 60% .
Artifacts: Full traces, screenshots (on failure), and detailed HTML reports are generated automatically on CI.