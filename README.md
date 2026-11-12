# Map Plotter: COVID-19 Patients Map View

A single-page web tool that plots many locations on Google Maps at once. Paste a list of latitude/longitude points with optional comments, and each one appears as a numbered marker with an info window. It was built to visualise COVID-19 patient locations.

## Features

- Paste or type many geo points (`lat,lng,comment`) into a text area and click **Update Map**
- Numbered markers, with clickable info windows showing the comment and coordinates
- Latitude and longitude validation with friendly error messages
- **Center Map At** a given coordinate

## Tech stack

HTML, CSS, JavaScript (jQuery), Bootstrap and the Google Maps JavaScript API

## Running

1. Replace the Google Maps JavaScript API key in the `<script>` tag in `index.html` with your own, restricted to your domain.
2. Open `index.html` in a browser, or serve the folder with any static server:
   ```bash
   npx serve .
   ```
