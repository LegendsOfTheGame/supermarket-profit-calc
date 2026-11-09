## Entire Changelog
All notable changes to the Supermarket Together Profit Calculator will be documented in this file. 

[Unreleased]
Changed
- Improved table rendering and image loading to reduce startup and update costs.
- Added starting-location shortcuts for Produce I, Basic Products I, Cleaning Products I, Sweets and Snacks I, and Soda Drinks I.

[1.1.5] - 2026-01-27
Added
- Immersive mobile onboarding modal with backdrop blur and session-aware dismissal
- Header restored with h1/h5 ritual layout (title centered, subtitle right-aligned)

Changed
- Rebranded project from *Supermarket Together Profit Calculator* to  
  *Legends of the Game's Supermarket Together Calculator (SMC)*
- Floating utility box stabilized for desktop
- Minor styling adjustments for modal readability

Known Issues
- Mobile layout quirks (phantom block, header spacing) deferred to v1.2



[1.1.0] - 2026-01-26
Added
- Precision Nickel-Rounding: Implemented a new calculation engine that snaps all sale prices to the nearest $0.05, ensuring 100% accuracy with in-game cash register behavior.
- Dynamic Cost Adjustment: Introduced interactive cost input fields, allowing users to modify product costs on the fly to account for in-game inflation without reloading the page.
- State Persistence: Refactored the internal logic so that selected profit margins and custom inputs are preserved when switching between categories.

Fixed
- Rounding Drift: Resolved an issue where profit was calculated based on raw percentages rather than the final rounded sale price.
- Rendering Efficiency: Optimized table updates to refresh only modified rows rather than re-rendering the entire dataset.

[1.0.0] - 2026-01-25
Groundbreaking Changes
- The Great Refactor: Deconstructed the 975-line monolithic legacy file into a modern, modular architecture with separate assets for Logic (JS), Style (CSS), and Data (JSON).
- Framework Liberation: Stripped out heavy external dependencies, including Bootstrap 5 and SheetJS, resulting in a 90% reduction in external requests and significantly faster load times.
- Legends Branding & UI: Replaced the legacy light-mode design with a custom-built, high-contrast Dark Mode and introduced a smart category filter system to replace the "Wall of Products" scroll.

[0.32.0] - 2025-08-04
Legacy Milestone
- Final Monolith Version: The culmination of the original 32-commit effort.
- Baseline Data: Contained the original hardcoded product list and pricing logic.
- Standard Logic: Used basic toFixed(2) math and standard Bootstrap table layouts.