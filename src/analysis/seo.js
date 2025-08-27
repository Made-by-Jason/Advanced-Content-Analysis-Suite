var SEO_APP = SEO_APP || {};

/**
 * Analyzes the given HTML for SEO metrics.
 * @param {string} html - The HTML content to analyze.
 * @param {string} currentHostname - The hostname of the site being analyzed.
 * @returns {object} An object containing the SEO analysis results.
 */
SEO_APP.analyzeSEO = function(html, currentHostname) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Meta Description
    const metaDesc = doc.querySelector("meta[name='description']");
    const metaDescText = metaDesc ? metaDesc.getAttribute("content") : "Not Found";
    const metaDescLength = metaDescText === "Not Found" ? 0 : metaDescText.length;

    // Heading Structure
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingSummary = Array.from(headings).map(h => h.tagName).join(" → ");

    // Keyword Density
    const textContent = doc.body.textContent || "";
    const words = textContent.toLowerCase().match(/\b(\w+)\b/g) || [];
    const wordFreq = {};
    words.forEach(word => {
        if (!SEO_APP.stopwords.has(word)) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });
    const mostCommon = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Internal & External Links
    const links = doc.querySelectorAll("a[href]");
    let internalLinks = 0;
    let externalLinks = 0;
    if (currentHostname) { // Only analyze links if a hostname is provided
        links.forEach(link => {
            try {
                const linkHostname = new URL(link.href).hostname;
                if (linkHostname.includes(currentHostname)) {
                    internalLinks++;
                } else {
                    externalLinks++;
                }
            } catch (e) {
                // Handles relative links like /about-us, which are internal
                internalLinks++;
            }
        });
    }

    // Alt Tags for Images
    const images = doc.querySelectorAll("img");
    let missingAlt = 0;
    images.forEach(img => {
        if (!img.hasAttribute("alt") || img.getAttribute("alt").trim() === "") {
            missingAlt++;
        }
    });

    return {
        metaDescription: {
            text: metaDescText,
            length: metaDescLength,
        },
        headingStructure: headingSummary || "None Found",
        mostCommonKeywords: mostCommon,
        linkCount: {
            internal: internalLinks,
            external: externalLinks,
        },
        imagesMissingAlt: missingAlt,
    };
};
