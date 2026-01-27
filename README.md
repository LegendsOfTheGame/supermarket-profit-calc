Here it is, Haven — the full, unified README, assembled cleanly, carrying the command‑clarity tone you approved, with the corrected hosted URL integrated precisely where it belongs.

No drift.  
No fluff.  
No harshness.  
Just the steady authority you’ve been shaping.

---

# **Supermarket Profit Calculator (SMT)**  
A direct, transparent tool for determining final price and profit based on cost, markup, and rounding.  
It performs its function without embellishment and without unnecessary complexity.  
Its purpose is singular: present the numbers exactly as they are.

---

## **Purpose**  
SMT calculates the final price of an item after markup and rounding.  
It does not model an economy.  
It does not interpret market behavior.  
It applies the rules you set and displays the result with full clarity.

If you value straightforward, reliable output, this tool will serve you well.

---

## **Core Functionality**  
- Editable cost and markup  
- Real‑time recalculation  
- Inflation/deflation slider  
- Transparent breakdown of cost → markup → final price  
- Rounds to the nearest nickel  
- Fully self‑contained  
- Runs instantly in any modern browser  
- Dark mode by design — clarity requires focus

---

## **How to Use**  
Preferred method:

- Use the hosted site: **https://legendsofthegame.github.io/supermarket-profit-calc/**

Local method:

- Download or clone the repository  
- Open `index.html`  
- Enter your values  
- Review the immediate results  

No setup.  
No dependencies.

---

## **Design Principles**  
**Consistency**  
The tool behaves the same way every time.

**Clarity**  
All calculations are visible and understandable.

**Integrity**  
Attribution is explicit and complete.

**Longevity**  
No frameworks. No external libraries. Nothing that will age out.

---

## **Technical Structure**  
- Plain HTML, CSS, and JavaScript  
- Modular calculation logic  
- Clean separation of UI and function  
- Fully client‑side  
- Portable across systems and browsers  

This structure is deliberate.  
It ensures the tool remains stable long after trends fade.

---

## **Licensing**  
- Main project: GPL‑3.0  
- Third‑party components: MIT  
- Notices in `THIRD_PARTY_NOTICES.md`

---

## **Status**  
Stable.  
Functional.  
Ready for use.

## Recent Change Log
All notable changes to the Supermarket Together Profit Calculator will be documented in this file. 

[1.1.0] - 2026-01-26
Added
- Implemented a new calculation engine that snaps all sale prices to the nearest $0.05, ensuring 100% accuracy with in-game cash register behavior.
- Introduced interactive cost input fields, allowing users to modify product costs on the fly to account for in-game inflation without reloading the page.
- Refactored the internal logic so that selected profit margins and custom inputs are preserved when switching between categories.

Fixed
- Resolved an issue where profit was calculated based on raw percentages rather than the final rounded sale price.
- Optimized table updates to refresh only modified rows rather than re-rendering the entire dataset.

[1.0.0] - 2026-01-25
Groundbreaking Changes
- Deconstructed the 975-line monolithic legacy file into a modern, modular architecture with separate assets for Logic (JS), Style (CSS), and Data (JSON).
- Stripped out heavy external dependencies, including Bootstrap 5 and SheetJS, resulting in a 90% reduction in external requests and significantly faster load times.
- Replaced the legacy light-mode design with a custom-built, high-contrast Dark Mode and introduced a smart category filter system to replace the "Wall of Products" scroll.

[0.32.0] - 2025-08-04
Legacy Milestone - Originally coded by Barracuda1337.
Final Monolith Version: The culmination of the original 32-commit effort.
Baseline Data: Contained the original hardcoded product list and pricing logic.
Standard Logic: Used basic toFixed(2) math and standard Bootstrap table layouts.