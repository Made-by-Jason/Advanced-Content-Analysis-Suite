// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the global object exists
    if (typeof SEO_APP === 'undefined') {
        console.error('SEO_APP is not loaded. Make sure all scripts are included and loaded in the correct order.');
        return;
    }

    // Tab switching
    document.getElementById('core-analysis-tab').addEventListener('click', () => SEO_APP.switchTab('core-analysis'));
    document.getElementById('seo-analysis-tab').addEventListener('click', () => SEO_APP.switchTab('seo-analysis'));

    // Analyze buttons
    document.getElementById('analyze-content-btn').addEventListener('click', () => {
        const text = document.getElementById('content-input').value;
        const results = SEO_APP.analyzeContent(text);
        SEO_APP.updateCoreAnalysisResults(results);
    });

    document.getElementById('analyze-seo-btn').addEventListener('click', () => {
        const html = document.getElementById('seo-content').value;
        const urlInput = document.getElementById('target-url').value;
        let hostname = '';
        try {
            hostname = new URL(urlInput).hostname;
        } catch (e) {
            alert('Invalid URL provided. Link analysis will be skipped.');
        }
        const results = SEO_APP.analyzeSEO(html, hostname);
        SEO_APP.updateSeoAnalysisResults(results);
    });

    // Initialize the view
    SEO_APP.switchTab('core-analysis');
});
