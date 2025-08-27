var SEO_APP = SEO_APP || {};

/**
 * Updates the Core Analysis results in the DOM.
 * @param {object} results - The analysis results from analyzeContent.
 */
SEO_APP.updateCoreAnalysisResults = function(results) {
    document.getElementById("word-count").innerHTML = `<strong>Word Count:</strong> ${results.wordCount}`;
    document.getElementById("readability-score").innerHTML = `<strong>Readability:</strong> ${results.readability} (Avg. ${results.avgWordsPerSentence.toFixed(1)} words/sentence)`;
    document.getElementById("keyword-density").innerHTML = `<strong>Top Keywords:</strong> ${results.mostCommonKeywords.map(k => `${k[0]} (${k[1]})`).join(", ") || "N/A"}`;
};

/**
 * Updates the SEO Analysis results in the DOM.
 * @param {object} results - The analysis results from analyzeSEO.
 */
SEO_APP.updateSeoAnalysisResults = function(results) {
    const metaDesc = results.metaDescription;
    const metaDescColor = metaDesc.length > 160 ? "text-red-500" : "text-green-600";
    const truncatedText = metaDesc.text.length > 100 ? metaDesc.text.substring(0, 97) + "..." : metaDesc.text;
    document.getElementById("meta-description").innerHTML = `<strong>Meta Description:</strong> ${truncatedText} <span class="${metaDescColor}">(${metaDesc.length} characters)</span>`;

    document.getElementById("heading-structure").innerHTML = `<strong>Heading Structure:</strong> ${results.headingStructure}`;
    document.getElementById("seo-keyword-density").innerHTML = `<strong>Top Keywords:</strong> ${results.mostCommonKeywords.map(k => `${k[0]} (${k[1]})`).join(", ") || "N/A"}`;
    document.getElementById("link-count").innerHTML = `<strong>Internal Links:</strong> ${results.linkCount.internal} | <strong>External Links:</strong> ${results.linkCount.external}`;

    const missingAltColor = results.imagesMissingAlt > 0 ? "text-red-500" : "text-green-600";
    document.getElementById("alt-tag-check").innerHTML = `<strong>Images Missing Alt Tags:</strong> <span class="${missingAltColor}">${results.imagesMissingAlt}</span>`;
};

/**
 * Handles switching between tabs.
 * @param {string} tabId - The ID of the tab content to show.
 */
SEO_APP.switchTab = function(tabId) {
    // Deactivate all tabs
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active", "text-primary", "border-primary");
        tab.classList.add("text-on-surface-variant", "border-transparent");
    });

    // Hide all content
    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.add("hidden");
    });

    // Activate the clicked tab button
    const tabButton = document.getElementById(`${tabId}-tab`);
    if (tabButton) {
        tabButton.classList.add("active", "text-primary", "border-primary");
        tabButton.classList.remove("text-on-surface-variant", "border-transparent");
    }

    // Show the corresponding content
    document.getElementById(tabId).classList.remove("hidden");
};
