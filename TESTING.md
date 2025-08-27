# Manual Testing Plan

This document outlines the manual test cases for the Content & SEO Analyzer application. Given the environmental constraints preventing automated testing, these steps should be followed to ensure the application is working correctly.

## Prerequisites

1.  Open the `public/index.html` file in a modern web browser.
2.  Open the browser's developer console (F12) to check for any errors.

## Test Suite 1: Core Analysis

| Test Case ID | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **CA-01** | **Empty Input** | 1. Go to the "Core Analysis" tab. <br> 2. Click "Analyze Content" with the textarea empty. | - Word Count: 0 <br> - Readability: Easy (or N/A) <br> - Top Keywords: N/A <br> - No console errors. |
| **CA-02** | **Simple Text** | 1. Go to the "Core Analysis" tab. <br> 2. Paste: "The quick brown fox jumps over the lazy dog." <br> 3. Click "Analyze Content". | - Word Count: 9 <br> - Readability: Easy <br> - Top Keywords: (e.g., quick, brown, fox...) <br> - No console errors. |
| **CA-03** | **Keyword Calculation** | 1. Go to the "Core Analysis" tab. <br> 2. Paste: "seo is important. good seo helps ranking. bad seo hurts." <br> 3. Click "Analyze Content". | - Word Count: 10 <br> - Top Keywords should include "seo (3)". Common stopwords like "is" should not be present. |
| **CA-04** | **Tab Switching** | 1. Click on the "SEO Analysis" tab. <br> 2. Click back to the "Core Analysis" tab. | - The correct content for each tab is shown/hidden appropriately. |

## Test Suite 2: SEO Analysis

| Test Case ID | Description | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **SEO-01** | **Empty Input** | 1. Go to the "SEO Analysis" tab. <br> 2. Leave all fields empty. <br> 3. Click "Analyze SEO". | - All results should show "N/A", "0", or "Not Found". <br> - Link analysis should be skipped. <br> - No console errors. |
| **SEO-02** | **Valid URL & HTML** | 1. Go to the "SEO Analysis" tab. <br> 2. URL: `https://www.example.com` <br> 3. HTML: `<!DOCTYPE html><html><head><meta name="description" content="A test page."></head><body><h1>Title</h1><a href="/internal">Internal</a><a href="https://google.com">External</a><img src="img.jpg" alt="An image"></body></html>` <br> 4. Click "Analyze SEO". | - Meta Description: "A test page." (13 characters) <br> - Heading Structure: H1 <br> - Links: Internal: 1, External: 1 <br> - Images Missing Alt: 0 |
| **SEO-03** | **Invalid URL** | 1. Go to the "SEO Analysis" tab. <br> 2. URL: `not-a-url` <br> 3. Paste any HTML. <br> 4. Click "Analyze SEO". | - An `alert` should appear: "Invalid URL provided. Link analysis will be skipped." <br> - Link counts should be 0. Other analyses should run correctly. |
| **SEO-04** | **Missing Alt Tags** | 1. Go to the "SEO Analysis" tab. <br> 2. URL: `https://www.example.com` <br> 3. HTML: `<!DOCTYPE html><html><body><img src="img1.jpg"><img src="img2.jpg" alt=""></body></html>` <br> 4. Click "Analyze SEO". | - Images Missing Alt Tags: 2 (in red) |
| **SEO-05** | **Long Meta Description** | 1. Go to the "SEO Analysis" tab. <br> 2. URL: `https://www.example.com` <br> 3. HTML: `<!DOCTYPE html><html><head><meta name="description" content="This is a very long meta description that is designed to be well over the recommended one hundred and sixty character limit to properly test the validation and warning system."></head><body></body></html>` <br> 4. Click "Analyze SEO". | - Meta description length should be > 160 and displayed in red. |
| **SEO-06** | **Placeholder Visibility** | 1. Go to the "SEO Analysis" tab. | - The "Schema Markup" and "Core Web Vitals" sections should be visible and marked as "(Coming Soon)". |
