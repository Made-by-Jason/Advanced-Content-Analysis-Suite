# Content & SEO Analyzer

This project is a simple, client-side web application for performing content and SEO analysis. It allows users to paste text or HTML and receive instant feedback on metrics like word count, readability, keyword density, and various on-page SEO factors.

This codebase is the result of a significant refactoring effort to move from a single, monolithic HTML file to a modular, more maintainable JavaScript structure.

## Before vs. After Comparison

### Before
-   **Architecture:** A single `index.html` file containing all HTML, CSS (via CDN), and JavaScript.
-   **Modularity:** None. All functions were in the global scope and tightly coupled with the UI.
-   **Maintainability:** Very poor. Adding new features or fixing bugs was difficult and risky.
-   **Issues:** Contained a critical bug where link analysis used a hardcoded placeholder domain (`example.com`). Keyword analysis did not filter common stopwords.

### After
-   **Architecture:** A modular, "no build step" client-side application.
    -   `public/`: Contains the main `index.html` and the "main" JavaScript file that orchestrates the app.
    -   `src/`: Contains the core logic separated by concern.
        -   `src/analysis`: Pure JavaScript modules for performing analysis.
        -   `src/ui`: A module for handling all DOM updates.
        -   `src/utils`: Shared utilities, such as a list of stopwords.
-   **Modularity:** High. Logic is separated from presentation. The analysis modules can be tested and improved independently of the UI.
-   **Maintainability:** Greatly improved. The code is organized, commented, and easier to understand.
-   **Fixes & Enhancements:**
    -   The hardcoded domain issue is fixed; users can now provide a target URL.
    -   Keyword analysis is more accurate thanks to stopword filtering.
    -   The UI includes placeholders for future features (Schema & Core Web Vitals).

## Getting Started

No build process or server is required to run this application.

1.  Clone this repository.
2.  Open the `public/index.html` file directly in a modern web browser (like Chrome, Firefox, or Edge).

That's it! The application runs entirely in the browser.

## Developer Notes

This project was intentionally designed to have no server-side dependency and no required build step (e.g., Webpack, esbuild). This decision was made to ensure maximum portability and to work around specific environmental constraints encountered during development.

### Code Structure
-   **Global Namespace:** To avoid a build step for ES Modules, the application uses a single global object, `SEO_APP`, to act as a namespace for all its functions and data.
-   **Dependency Management:** Dependencies between scripts are managed by the order they are loaded in `public/index.html`. The load order is: `utils` -> `analysis` modules -> `ui` module -> `main.js`.
-   **Adding New Features:**
    1.  Create a new JavaScript file for your feature's logic (e.g., `src/analysis/schema.js`).
    2.  Attach your functions to the `SEO_APP` global object (e.g., `SEO_APP.analyzeSchema = function(...)`).
    3.  Add a new `<script>` tag for your file in `public/index.html` in the correct order.
    4.  Update the UI module (`src/ui/updater.js`) to display your new results.
    5.  Call your new functions from `public/js/main.js`.

### Testing
Automated testing infrastructure (like Jest) could not be installed due to environmental constraints. A detailed manual testing plan has been created in `TESTING.md`. Please refer to it to validate any changes.
