# FUTURE_FS_03
# SkyFit Gym Website

A modern, responsive multi-page fitness website for SkyFit Gym (Peddapuram), built with plain HTML, CSS, and JavaScript.

## Overview

This project includes:
- A landing page with gym services, plans, trainers, gallery, testimonials, BMI calculator, contact section, and a free-trial modal.
- A dedicated Diet & Nutrition page with goal-based meal plans, calorie lookup, daily calorie calculator, and smart food suggestions.
- A registration page with membership plan selection and client-side form validation.

## Tech Stack

- HTML5
- CSS3 (custom properties, responsive layouts, animations)
- Vanilla JavaScript (DOM interactions, form validation, calculators)
- Font Awesome (icons)
- Google Fonts (Outfit)

## Project Structure

```text
skyfit-gym/
  index.html        # Main landing page
  diet.html         # Diet and nutrition tools
  register.html     # Membership registration form
  style.css         # Shared styling for all pages
  script.js         # Shared client-side interactions and logic
  images/           # Project images and assets
```

## Key Features

### Main Page (`index.html`)
- Sticky responsive navigation with mobile hamburger menu
- Hero section with animated counters and particle effects
- Services, membership plans, trainers, gallery, and testimonials carousel
- BMI calculator with categorized result feedback
- Free trial booking modal and contact form interactions
- Back-to-top button and smooth scrolling

### Diet Page (`diet.html`)
- Tabbed meal plans (Weight Loss, Weight Gain, Maintenance)
- Food calorie finder with search suggestions
- Daily calorie target calculator (BMR/TDEE based)
- Goal-based smart food suggestions

### Registration Page (`register.html`)
- Plan selection (Monthly, Quarterly, Yearly)
- Personal details, emergency contact, and health notes fields
- Client-side validation for required inputs, email, terms acceptance
- Inline success state after submission

## How to Run

1. Open the `skyfit-gym` folder in VS Code.
2. Open `index.html` in a browser.
3. Navigate to `diet.html` and `register.html` using the navbar.

No build step or package installation is required.

## Notes

- This is a static frontend project.
- Forms currently provide UI-level validation and success feedback only (no backend submission).
- External resources (Google Fonts and Font Awesome CDN) require internet access.

## Future Improvements

- Connect forms to a backend API
- Persist registrations in a database
- Add admin dashboard for lead management
- Improve accessibility (ARIA labels, keyboard focus states, contrast checks)
- Add automated tests for core calculator logic
