var SEO_APP = SEO_APP || {};

/**
 * Analyzes the given text for word count, readability, and keyword density.
 * @param {string} text - The text to analyze.
 * @returns {object} An object containing the analysis results.
 */
SEO_APP.analyzeContent = function(text) {
    // Word Count
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

    // Readability Score
    const sentenceCount = text.split(/[.!?]/).filter(s => s.trim().length > 0).length || 1;
    const avgWordsPerSentence = wordCount / sentenceCount;
    const readability = avgWordsPerSentence > 20 ? "Difficult" : avgWordsPerSentence > 15 ? "Moderate" : "Easy";

    // Keyword Density
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    const wordFreq = {};
    words.forEach(word => {
        if (!SEO_APP.stopwords.has(word)) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });
    const mostCommon = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return {
        wordCount,
        readability,
        avgWordsPerSentence,
        mostCommonKeywords: mostCommon,
    };
};
