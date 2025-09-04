# Content & SEO Analyzer

This is a simple, single-page web application designed for content creators and SEO analysts. It provides two main tools: a Core Content Analyzer and an SEO Content Analyzer.

## Purpose

The primary purpose of this tool is to offer quick, client-side analysis of text content and on-page SEO metrics.

*   **Core Analysis:** Helps writers and editors quickly assess their content for readability, word count, and keyword density.
*   **SEO Analysis:** Allows web developers and SEO specialists to check a webpage's HTML for basic on-page SEO elements like meta descriptions, heading structure, link distribution, and image alt tags.

## Setup

There is no complex setup or installation required. Since this is a self-contained HTML file with embedded CSS and JavaScript, you only need a modern web browser.

1.  Clone or download the repository.
2.  Open the `index.html` file directly in your web browser (e.g., Chrome, Firefox, Safari, Edge).

## Usage

The application is divided into two tabs.

### Core Analysis Tab

1.  Paste the text you want to analyze into the text area.
2.  Click the "Analyze Content" button.
3.  The tool will display:
    *   **Word Count:** The total number of words in the text.
    *   **Readability:** A simple score (Easy, Moderate, Difficult) based on the average number of words per sentence.
    *   **Top Keywords:** The three most frequently used words in the text, along with their counts.

### SEO Analysis Tab

1.  Paste the full HTML source code of a webpage into the text area.
2.  Click the "Analyze SEO" button.
3.  The tool will display:
    *   **Meta Description:** The content of the `<meta name="description">` tag and its length.
    *   **Heading Structure:** The sequence of heading tags (H1, H2, etc.) found on the page.
    *   **Top Keywords:** The three most frequent words found within the `<body>` of the HTML.
    *   **Link Count:** The number of internal and external links.
    *   **Images Missing Alt Tags:** A count of `<img>` tags that are missing the `alt` attribute.

---

This tool runs entirely in your browser. No data is sent to any server.
