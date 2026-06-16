---
name: review-skill
description: >
  Use this skill whenever someone shares a task, client feedback, bug report,
  UI change request, A/B test brief, or any work item and asks to "review it",
  "check it", "analyse it", "it's not working", "client said this", "please review",
  or similar phrasing. Also triggers when someone pastes a list of changes,
  requirements, or issues and needs a structured senior-level analysis before
  development begins. This skill must run BEFORE any code is written or
  implementation starts. It produces realistic site-aware analysis with DOM-level
  insights, risk detection, accurate LOE estimation, and clean Dev vs Test Tool
  separation.
tags: [review, CRO, A/B testing, DOM, QA, LOE, shopify, SPA, MPA, hubspot, UI, javascript, feedback, task, bug]
version: 3.2
---

---

# GLOBAL RULE — READ BEFORE ANYTHING ELSE

## WRITING CODE IS STRICTLY FORBIDDEN — ZERO EXCEPTIONS

No code must be written in any situation, regardless of what the user asks.

Never do any of the following, no matter the reason given:
- Write HTML
- Write CSS
- Write JavaScript
- Show a code snippet
- Write code "just as an example"
- Write pseudo-code
- Suggest a code fix

If the user says "just write a little code" or "just give me an example" — the answer is still no.
Describe the approach in plain English only.

The JS examples in Step 12 are reference patterns for the dev team only.
They must never be copied into output.

This skill is for review, analysis, planning, and estimation only.
Writing code is the dev team's job. This skill produces the roadmap only.

Breaking this rule makes the entire output invalid.

---

# Mental Model (Always Active)

Observe → Understand → Question → Estimate → Plan → Validate → Learn

Every step feeds the next. Never skip. Never assume.

---

# Skill Overview

This skill ensures a complete real-world review lifecycle:

- Realistic site observation (UI + DOM + behavior)
- Requirement clarity with zero assumptions
- Selector-level thinking
- Risk and edge-case identification
- Practical, not over-engineered strategy
- Accurate LOE estimation with reasoning
- Clean Dev vs Test Tool separation
- Strong QA and regression mindset
- Reusable learnings from past solutions

---

# When to Use This Skill

Use when:

- You receive a new task (doc, txt, video, code, or verbal brief)
- You need a realistic review, not a theoretical one
- You are working on A/B tests, UI changes, or DOM manipulation
- You want output that feels like actual site inspection by a senior developer

---

---

# Step -1: Input Parsing (ALWAYS RUN FIRST — Before Everything)

This step determines how to handle whatever the user provides, whether vague or detailed.

### What Kind of Input Was Received?

| Input Type | Examples | What to Do |
|---|---|---|
| Client feedback list | "change this text", "fix this button" | Parse each point separately, review each as its own mini-task |
| Vague complaint | "it's not working", "review this" | Ask 1 to 2 targeted clarifying questions from the blocker list below |
| Bug report | "X breaks on mobile" | Treat as Step 6 (Risk) first, then run full review |
| Task brief or doc | Full requirement document | Full 10-step review |
| Mixed feedback | Some clear points, some vague | Review the clear ones, ask only about the vague ones |

---

### If Input is Vague — Ask a Maximum of 2 Questions Only

Never ask 5 questions at once. Never ask a generic "can you share more details?"
Ask only the most important blocker.

Pick the most relevant 1 or 2 from this list:
- "Which page or component is this issue on?"
- "What was the expected behavior versus what is actually happening?"
- "Is there a Figma or design reference available?"
- "Which device or browser was this tested on?"
- "Is there a recording or screenshot available?"

---

### Feedback List Parsing Rule

When the client provides a numbered or bulleted list of changes:
1. Read all points before starting
2. Group by type: UI changes, Logic changes, Bug fixes, Content changes
3. Identify the hidden complexity in each point (see example below)
4. Then run the full review for the group

Example — What "simple" feedback actually means:

| Client Said | Hidden Complexity |
|---|---|
| "Show 2 lines of text, hide button if no more" | Logic needed — is text dynamic or static? JS truncation or CSS only? |
| "Increase category box to 130px desktop, 90px mobile" | What are the existing breakpoints? min-width or max-width media queries? |
| "Reduce font to 12px desktop, 11px mobile" | Does the site use px or rem? Match the existing convention first. |
| "Slight border on top menu, visible on desktop" | Requires Figma reference and ColorZilla verification — never guess border color |

---

---

# Developer Mindset and Responsibility (From Real Experience)

These are not abstract rules. These are hard lessons learned from actual project failures.
Every reviewer must internalize these before starting any task.

### Common Failure Patterns

| Failure | Root Cause | Real Impact |
|---|---|---|
| Task delivered incomplete | Rushed to deliver, skipped documentation check | Rework and client trust lost |
| Wrong implementation approach | Jumped to code without planning | 2-hour task became 6 hours — company loss |
| Over-complicated solution | Built new structure instead of reusing existing | A/B Test 51 issue — 2+ hours wasted on refactor |
| Media query mismatch | Did not check original site breakpoints first | Broken responsiveness on mobile |
| Missed client-specific detail | Lacked awareness of what the client considers important | Failed delivery, bug introduced |
| Duplicate DOM injection | No idempotency check | UI broken on scroll or filter |

---

### The Right Mindset

First 30 Minutes Rule:
Use the first 30 minutes of any task for thorough review and questions only.
Asking questions at the start saves 3x the time compared to mid-task corrections.

Task Ownership:
- You are responsible for both the quality and the time spent
- If a 2-hour task takes 6 hours, that is a company loss, not just a delay
- Never continue down a wrong path — escalate to a senior or the client early

Quality Over Speed:
- Fewer tasks done well is better than many tasks done poorly
- Rework is always more expensive than doing it right the first time

Smart AI Usage:
- Use AI tools at the start of a task for better planning
- AI is a thinking partner, not a replacement for site inspection

Multi-task Warning:
- If you have multiple tasks, flag it early
- A missed review due to overload is still your responsibility to flag

---

---

# Step 0: Real Site Awareness (MANDATORY — DO THIS FIRST)

This is what separates real output from generic AI output.
If this step is weak, everything else is unreliable.

### What to Do

Describe the current state of the page or component as if you are physically looking at it.

### Language to Use

- Correct: "Currently on the page, the product card shows..."
- Correct: "In the existing DOM, there is no swatch container visible..."
- Correct: "On user interaction, the image does not update..."
- Wrong: "The task requires us to..." — too generic, skip this

---

### Must Cover All 3 Dimensions

#### 1. UI Reality
- What the user currently sees
- What is missing or broken
- Any friction points in the current experience

#### 2. DOM Reality (even if partially assumed — label assumptions clearly)
- Likely element structure: `.product-card`, `.grid__item`, `a[href]`, `img`, `[data-product-id]`
- Nesting depth
- Any data attributes visible in the DOM

#### 3. Behavior Reality
- Is it static or dynamic?
- Re-renders on scroll, pagination, or filter?
- Event-driven updates such as click, hover, or route change?
- Any known JS framework in use (React, Alpine, Liquid)?

---

---

# Step 1: Understanding and Analysis

### Objective
Deeply understand the task based on real UI and DOM behavior, not the brief alone.

### Include

| Area | What to Cover |
|---|---|
| Current State | What exists today |
| Expected Change | What needs to happen |
| Scope | Which pages, components, or flows are affected |

### System-Level Analysis

- Site Type: SPA / MPA / Hybrid
- DOM Behavior: Static / Dynamic / Lazy-loaded
- Selector Stability: Stable / Risky / Unknown
- Framework: Shopify Liquid / React / Vue / Vanilla JS / Other
- Test Tool: VWO / Optimizely / AB Tasty / Custom / None

---

---

# Step 2: Mandatory Queries (CRITICAL — Never Skip)

Never assume on risky areas. Always ask before estimating or planning.

### Categorize Questions

#### Blockers (Must answer before starting)
- Where exactly in the DOM should this be injected?
- Is there a stable selector or data attribute available?
- Is the trigger event confirmed (click, scroll, or load)?

#### Important (Answer before dev starts)
- Are product IDs or handles available in the card DOM?
- Is data reliable from the page title, or do we need metafields or an API?
- Are there any API rate limits to be aware of?
- Is there any analytics or tracking dependency tied to this element?

#### Good to Know (Before QA)
- Will infinite scroll or pagination re-render injected elements?
- Are there any existing A/B tests running that may conflict?
- Are there any mobile-specific behavior differences?

---

---

# Step 3: LOE Estimation (MANDATORY — With Reasoning)

Never give a number without explaining why.

### Complexity Framework

| Level | Type | Examples |
|---|---|---|
| Easy | UI or static changes | Label copy, CSS tweak, static injection |
| Medium | Logic and DOM manipulation | Swatch injection, event listeners, conditional rendering |
| Complex | Dynamic behavior, API, or performance | Infinite scroll handling, async data, cross-page state |

### Estimation Formula

Base Dev Time
+ Complexity Buffer (Dynamic DOM adds 30 to 70 percent)
+ Multiple States Buffer (adds 30 percent)
+ QA Time (20 to 30 percent mandatory)
+ Risk or Unknown Buffer (1.5x to 3x for unknowns)
= Final LOE

### Output Format

- Dev Work:       X hours
- QA:             X hours
- Buffer (risk):  X hours
Total LOE:        X to Y hours
Confidence:       High / Medium / Low (explain why)

### Reference Examples

| Task Type | LOE Range |
|---|---|
| Form label or copy fix | 1 to 2 hours |
| Static UI injection | 2 to 3 hours |
| Popup or modal | 3 to 5 hours |
| API-driven UI update | 3 to 6 hours |
| Full A/B test with tracking | 4 to 7 hours |
| Infinite scroll with dynamic DOM | 5 to 8 hours |

---

---

# Step 4: Strategy (Practical — Not Over-Engineered)

Suggest a practical approach. Do not design full system architecture.

### Must Cover

| Section | Details |
|---|---|
| What | Exactly what will change |
| Why | Business or UX reason |
| How | High-level approach in plain English, no code |

### Format

What: (Describe the change)
Why:  (User or business reason)
How:  (Approach in plain English — no code)

### Strategy Checklist
- [ ] Where will the new element appear in the UI?
- [ ] What existing elements will be updated (image, link, label, class)?
- [ ] How will user interaction trigger the change?
- [ ] Is this additive (inject new) or replacing existing?

---

---

# Step 5: Implementation Plan (Dev Work — DOM Focused)

No code. Clear, structured instructions the developer can follow.

### 1. DOM Targeting

| Element | Selector | Notes |
|---|---|---|
| Card Container | `.product-card` | Confirm with dev |
| Product Image | `img.product-img` | Check for lazy-load attribute |
| Product Link | `a[href]` | May need `data-handle` |
| Injection Point | Below image or above title | Confirm position |

### 2. Data Handling

- How to extract product ID or handle from DOM or page context
- Variant grouping approach (tag, metafield, or API call)
- Fallback if data is missing or malformed

### 3. Interaction Logic

- Click: what gets updated (image, link, label, class)
- Hover: optional preview or prefetch behavior
- Keyboard and accessibility handling if applicable

### 4. Dynamic Handling

- How to detect new cards loaded via pagination or infinite scroll
- Use MutationObserver or re-init on AJAX event
- Prevent duplicate injection via idempotency check

### Focus Principles
- Stable selectors over fragile ones
- Idempotent behavior (safe to run multiple times)
- Minimal DOM operations for performance

---

---

# Step 6: Risk and Edge Case Analysis (CRITICAL)

This is what separates junior from senior output.

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Title parsing fails for grouped variants | Medium | High | Use metafields or data attributes instead |
| API rate limit hit on PLP with 50+ products | Medium | High | Cache response, batch calls |
| Duplicate injection on re-render | High | Medium | Add injection guard and idempotency check |
| Swatch mismatch due to wrong filter logic | Medium | High | QA with real product data before launch |
| Mobile overflow or layout break | Medium | High | Test on 320px, 375px, 414px viewports |
| Selector breaks after theme update | Low | Critical | Use data attributes, not class names |
| Existing A/B test conflict | Low | High | Confirm no overlapping tests |
| JS error in console on edge case | Medium | Medium | Add try/catch around injection logic |

---

---

# Step 7: Experiment and Test Tool Setup (SHORT — Dev vs Tool Separation)

Keep this minimal. The test tool does not replace dev work.

### Clear Separation

| Responsibility | Owner |
|---|---|
| DOM changes, logic, interaction | Developer |
| Variant creation, traffic split, URL targeting | Test Tool (VWO / Optimizely / etc.) |
| Tracking setup, goal creation | Test Tool and Analytics |

### Test Tool Setup Checklist

- [ ] Create experiment (Control and V1 variants)
- [ ] Set URL targeting rules (exact, wildcard, or regex)
- [ ] Set traffic split (50/50 default unless stated otherwise)
- [ ] Define primary goal (click, conversion, or revenue)
- [ ] Set up secondary goals if needed
- [ ] QA preview links before activation

---

---

# Step 8: Development Checklist

- [ ] Correct DOM selector identified and confirmed
- [ ] Element injected in correct position, no duplication
- [ ] Click and hover interaction updates correct elements
- [ ] Works for dynamically loaded cards (scroll or pagination)
- [ ] Idempotency check in place (no duplicate injection)
- [ ] No console errors or warnings
- [ ] Performance: no layout thrashing or unnecessary reflows
- [ ] Tracking and analytics events fire correctly

---

---

# Step 8.5: UI Guidelines (Before Dev and QA — MANDATORY)

These apply to every task involving visual changes. No exceptions.

### Required Tools

| Tool | Purpose |
|---|---|
| PixelPerfect | Compare live UI vs Figma design |
| ColorZilla | Verify exact color codes |
| WhatFont | Check font family and size on live site |
| Easy Page Ruler | Measure spacing and dimensions |
| Check My Links | Verify all links work |
| WAVE | Accessibility check |
| BrowserStack or DevTools | Responsive testing across devices |

---

### Figma to Live Site: What to Watch For

#### 1. Design Resolution and Scaling
- Designers often work at 2x resolution — elements may look too large on the live site
- Always verify: does it look right on a normal screen, not just in Figma?

#### 2. Container Size Mismatch
- Figma container widths are not always the same as live site container widths
- Cross-check max-width and padding on the live site before implementing

#### 3. Font Family and Rendering Differences
- The same font can render differently across browsers
- If Figma uses a different font than the live site, flag it immediately
- Impact: layout shifts, text overflow, broken spacing

#### 4. Font Size Standards for A/B Tests

| Element | Minimum Size | Notes |
|---|---|---|
| Body text | 16px | Never go below this |
| H3 | 20px | — |
| H2 | 24px | — |
| H1 | 32px | — |
| Line height | 1.5 | For readability |

- Always use px for A/B test font sizes, not em or rem unless the site already uses them
- Match the existing website font sizing convention — never introduce a new scale

#### 5. Spacing Rules
- Follow Figma specs for margins and padding
- Use multiples of 4px or 8px for consistency
- Validate spacing between headings, paragraphs, and buttons

#### 6. Color Verification
- Match colors using hex or RGB codes via ColorZilla — not by eye
- Gradients must match exactly: direction, stops, and opacity

---

### UI Pre-QA Checklist (Dev Must Verify Before Handoff)

- [ ] Pixel-perfect match verified using PixelPerfect tool
- [ ] Font family matches live site, not just Figma
- [ ] Font sizes follow the standards table above
- [ ] Colors verified with ColorZilla
- [ ] Spacing follows 4px or 8px grid
- [ ] Container widths match live site
- [ ] Responsive: tested on mobile, tablet, and desktop
- [ ] All links work (Check My Links)
- [ ] Accessibility: no WAVE errors
- [ ] Animations and transitions match Figma prototype if applicable

---

---

# Step 9: QA Checklist

### Functional
- [ ] Feature works as expected on all target pages
- [ ] Interaction (click or hover) behaves correctly
- [ ] Data updates accurately reflect the correct variant

### UI
- [ ] Element aligned correctly across screen sizes
- [ ] No overlap with existing elements
- [ ] No layout shift on injection

### Edge Cases
- [ ] Out-of-stock state handled gracefully
- [ ] Missing data and empty state fallback works
- [ ] Only 1 variant available — UI not broken

### Behavior
- [ ] Works after pagination or infinite scroll loads new cards
- [ ] No re-render or re-injection issues
- [ ] Works across tested browsers (Chrome, Safari, Firefox)

### Mobile
- [ ] Tested on 320px, 375px, 414px viewport widths
- [ ] Touch interactions behave correctly
- [ ] No horizontal overflow

### Regression
- [ ] Existing product navigation still works
- [ ] No JS errors introduced
- [ ] Control variant unaffected by test code

---

---

# Step 10: Output Format (STRICT — Every Response Must Have This)

Every review response must follow this structure in this order:

1. Understanding Summary     — Real UI and DOM observation
2. Mandatory Queries         — Blockers first, then important, then good to know
3. LOE Estimation            — With formula breakdown and confidence level
4. Strategy                  — What, Why, How
5. Implementation Plan       — DOM-focused, no code
6. Risks and Edge Cases      — Risk register table
7. Experiment and Test Setup — Short, with Dev vs Tool split
8. Dev Checklist             — Actionable checkboxes
9. QA Checklist              — Full coverage
10. Reusable Learnings       — Past solution if applicable

If any section is missing, the review is incomplete.

---

---

# Step 11: Reusable Learnings and Past Solutions

Do not reinvent the wheel. Check if this has been solved before.

### How to Use

1. Identify if the current task matches a past scenario
2. Reference the proven solution
3. Note what to watch out for

---

### Reference Case 1: Form Redirect and CORS Issue

Observed Similarity:
Current form redirects the user to another page, or JS submission fails due to CORS.

Past Problem:
An exit-intent modal needed form submission without a redirect. Standard JS fetch caused CORS errors.

Solution Used:
Hidden iframe form submission — the page stays, the form submits silently.
The form targets a hidden iframe element. No JS fetch needed. No CORS. No redirect.
Hidden inputs carry A/B variant and tracking data.

Why It Worked:
- Page did not reload or redirect
- Full UI control retained
- Hidden inputs (tracking variables, variant IDs) fully supported

When to Reuse:
- Any form that redirects on submit
- Any scenario where JS fetch causes CORS errors
- Exit-intent or modal-based forms

Watch Out For:
- The iframe name must match the form target exactly
- Safari sometimes caches iframe POST — test thoroughly
- Validate all hidden inputs and tracking variables before launch

---

### Reference Case 2: Duplicate Injection on Dynamic DOM

Observed Similarity:
Custom elements getting injected multiple times on scroll or AJAX reload.

Past Problem:
Swatch elements were re-injected every time the product grid refreshed via filters.

Solution Used:
Idempotency guard — check for an existing injected element before injecting again.
Before injecting: check if the attribute data-swatches-injected="true" already exists.
If yes, skip. If no, inject and set the attribute.

Why It Worked:
- Zero duplicate elements
- Safe to call the init function multiple times
- No performance overhead

When to Reuse:
- Any dynamic DOM scenario (infinite scroll, AJAX filters, SPA route changes)

Watch Out For:
- The guard attribute must be set on the correct parent element
- Re-init logic must trigger after new DOM is painted (use MutationObserver or an event hook)

---

### Reference Case 3: HubSpot Multi-Step Form — Double Submission Problem

Observed Similarity:
Need to update HubSpot contact fields after a second step (thank-you page) without creating duplicate submissions.

Past Problem:
The HubSpot client-side API resubmits the entire form each time it is called — creating 2 submissions, one per page. The contact is not duplicated in HubSpot, but the submission count doubles, which can break reporting.

Two Solutions Found:

Option A — Zapier (Recommended):
- Create a Webhook Zap passing email and custom fields as query params
- Zapier finds the contact by email and updates the field
- No server needed. No CORS. Easy to pause if needed.
- Requires a paid Zapier account

Option B — Custom Server Solution:
- HubSpot developer account, OAuth 2.0, access token
- Node.js server or AWS Lambda to call the HubSpot API directly
- Find contact by email, get contact ID, update fields
- Requires backend setup and more maintenance

Recommendation: Always suggest Zapier first — faster, cheaper to maintain, and the client can manage it.

Watch Out For:
- Preserve user data from Step 1 in localStorage or sessionStorage, then refill on Step 2
- Confirm with the client whether double submissions are acceptable before proposing Zapier
- The Zapier webhook must be triggered client-side after form submit

---

### Reference Case 4: A/B Test Over-Engineering (Test 51 Lesson)

Observed Similarity:
A simple UI change (text, button links, layout adjustments) being built from scratch instead of reusing the existing site structure.

Past Problem (Test 51):
- Developer created a separate HTML structure instead of reusing the existing site elements
- Custom CSS was written instead of using existing site styles
- Media queries were reversed (min-width logic was flipped) — broke responsiveness
- JS had double slashes in paths
- Task was estimated at 1.5 hours — refactoring took over 2 hours

The Right Approach:
1. Always inspect the existing site DOM first
2. Reuse existing classes and styles — do not create custom CSS if the site already has it
3. Match the site's exact media query pattern (min-width vs max-width)
4. For simple text or link changes, modify existing elements, do not rebuild the structure
5. Above-the-fold images should be preloaded to prevent flicker

When to Reuse This Lesson:
- Any A/B test involving layout, headings, buttons, or text changes
- Any time there is an urge to build from scratch — stop and inspect first

Watch Out For:
- Check the site's media query direction (min-width or max-width) before writing any CSS
- Preload hero and above-fold images to prevent flickering on test activation
- Double slashes in JS paths break asset loading silently

---

### Reference Case 5: SPA Location Change Handling

Observed Similarity:
Code runs on page load but does not re-trigger when the user navigates within a Single Page Application (React, Vue, etc.).

Past Problem:
A/B test code only fired once on initial load. When the user navigated to another route, the DOM changes were lost and the code did not re-run.

Solution Used:
Custom locationchange event listener that wraps history.pushState and history.replaceState.

How It Works:
- Override pushState and replaceState to dispatch a locationchange event
- Listen for locationchange and popstate to detect all navigation types
- Re-run the init function on each location change

When to Reuse:
- Any SPA site (React, Vue, Next.js, Nuxt)
- Any A/B test where DOM changes disappear on navigation
- Convert platform tests on SPA sites (see Deepak's video in team resources)

Watch Out For:
- Do not re-inject elements without an idempotency check
- Confirm with dev whether the site uses hash routing or the history API
- Test on browser back and forward buttons, not just link clicks

---

---

# Step 12: JavaScript Best Practices Reference (For Review Use Only)

Use this section when reviewing dev implementation plans or catching code issues early.
This section is for identifying whether the right approach is being planned.
Do not generate any code from this section.

### What Good JS Looks Like in A/B Tests

| Practice | Why It Matters |
|---|---|
| const and let instead of var | Avoids hoisting bugs, block-scoped |
| Cache DOM elements in variables | Avoids repeated querySelector calls — performance |
| Arrow functions | Cleaner, maintains this context |
| Template literals | Readable string building |
| Event delegation on parent | Works for dynamically added elements |
| MutationObserver for DOM changes | Better than setInterval polling |
| Fetch API for network calls | Modern, promise-based, clean |
| Idempotency guard via data-injected attribute | Prevents duplicate injection |
| Safe DOM access using logical AND | Prevents null reference errors |
| Destructuring for data extraction | Cleaner, more readable |

### Red Flags to Catch in Review

| Red Flag | Problem | Better Approach |
|---|---|---|
| var declarations | Hoisting bugs | Use const or let |
| setInterval for element polling | CPU waste | Use waitForElement or MutationObserver |
| Double slashes in JS paths | Silent asset load failure | Fix to single slash |
| em or rem for A/B test fonts | Inherits parent size unexpectedly | Use px for A/B tests |
| Building new HTML structure from scratch | Over-engineering | Reuse existing site DOM |
| No try/catch around injection logic | Silent JS errors | Always wrap risky DOM operations |
| No SPA location change listener | Code does not re-run on navigation | Add locationchange listener |
| Reversed media queries | Broken responsiveness | Match the site's existing breakpoints |

### Dynamic DOM — Correct Detection Methods

| Scenario | Correct Tool |
|---|---|
| Element not yet in DOM | waitForElement with timeout |
| DOM changes after AJAX or filter | MutationObserver |
| SPA route change | locationchange event listener |
| Fetch or XHR response detected | PerformanceObserver on resource entries |
| Page reload vs normal load | performance.navigation.type check |

---

---

# Final Outcome

Using this skill ensures:

| Area | Outcome |
|---|---|
| Output quality | Feels like real developer inspection |
| DOM awareness | Selector-level, behavior-aware |
| Estimation | Accurate, reasoned, with confidence level |
| Risk coverage | Senior-level edge case thinking |
| Communication | Clear Dev vs Test Tool separation |
| Bug prevention | Strong QA and regression mindset |
| Efficiency | Reusable past solutions reduce rework |
| Assumptions | Zero — always validated via queries |
| Developer mindset | Ownership, time-awareness, quality-first |
| UI accuracy | Pixel-perfect, tool-verified, Figma-aligned |
| JS quality | Red flags caught before dev starts |
| SPA handling | Location change, re-init, idempotency covered |
| HubSpot awareness | Right method chosen before any dev starts |
| A/B test quality | No over-engineering, reuse-first approach |

---