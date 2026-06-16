---
name: ab-testing-development-skill
description: >
  Use this skill whenever developing, reviewing, refactoring, debugging,
  or optimizing A/B testing experiments. Applies to JavaScript, CSS,
  Shopify, HubSpot, custom websites, SPA/MPA architectures, personalization,
  CRO implementations, QA validation, and production-ready experiment
  development.

  All generated code MUST follow the team's approved experiment template.
  The existing template structure must never be modified, replaced, or
  rewritten unless explicitly requested. New functionality should be added
  only within the designated implementation sections of the template.

  The template contains approved utility functions such as observers,
  waitForElement, liveClick, location change detection, debouncing,
  mutation handling, and other shared helpers. Whenever a required utility
  already exists in the template, developers must reuse the existing helper
  instead of creating new implementations or importing alternative solutions.

  Priority order:
  1. Reuse existing template utilities.
  2. Extend existing helper functions when appropriate.
  3. Create new helpers only when no approved utility exists.

  This skill enforces performance optimization, clean code standards,
  experiment isolation, accessibility compliance, DOM efficiency,
  maintainability, observer management, and scalable development practices.

  All generated code should:
  - Preserve the approved experiment template structure.
  - Use existing template helper functions whenever possible.
  - Avoid duplicate utility implementations.
  - Minimize DOM queries and mutations.
  - Prevent duplicate injections.
  - Follow accessibility best practices.
  - Maintain clean QA and debugging standards.
  - Be production-ready and easy to maintain.

tags:
  [
    A/B testing,
    CRO,
    javascript,
    performance,
    DOM,
    optimization,
    QA,
    accessibility,
    shopify,
    hubspot,
    SPA,
    MPA,
    frontend,
    experimentation,
    code-review,
    best-practices,
    template,
    observers,
    waitForElement,
    liveClick,
    conversion-rate-optimization,
  ]
---

template_rules: |
IMPORTANT:

All experiment code must be generated inside the following approved
template structure. This template must not be rewritten, replaced,
simplified, or reorganized unless explicitly requested.

Existing helper functions provided by the template must always be
reused when applicable. Do not create duplicate versions of utilities
such as observers, waitForElement, liveClick, location change detection,
debounce, throttle, or similar helpers if they already exist in the
template.

Approved Template:

(function () {
try {
/_ main variables _/
var debug = 1;
var variation_name = "Variation Name";

      /* all Pure helper functions */

      function waitForElement(selector, trigger, delayInterval = 50, delayTimeout = 15000) {
        var interval = setInterval(function () {
          if (
            document &&
            document.querySelector(selector) &&
            document.querySelectorAll(selector).length > 0
          ) {
            clearInterval(interval);
            trigger();
          }
        }, delayInterval);

        setTimeout(function () {
          clearInterval(interval);
        }, delayTimeout);
      }

      /* Variation functions */

      /* Variation Init */
      function init() {
        /* start your code here */
      }

      /* Initialise variation */
      waitForElement("body", init, 50, 15000);

    } catch (e) {
      if (debug) console.log(e, "error in Test " + variation_name);
    }

})();

generation_rules:

- Never change the template structure.
- Never replace existing helper functions.
- Reuse existing template utilities whenever possible.
- Add new functionality only inside Variation Functions or init().
- Prevent duplicate DOM injections.
- Keep all selectors scoped to the experiment.
- Follow existing project coding patterns.

### 1. **Event Handling Optimization**

- **Bad Practice**: Directly attaching event listeners to frequently triggered events like `scroll`, `resize`, or `mousemove` without throttling or debouncing can overwhelm the browser and degrade performance.
- **Good Practice**: Use `debounce` or `throttle` to control the frequency of function executions. This reduces the number of executions and improves performance.

**Example (Bad Practice)**:

```jsx
window.addEventListener("scroll", function () {
  console.log("Scroll event triggered");
});
```

**Example (Good Practice - Throttle)**:

```jsx
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
};

window.addEventListener(
  "scroll",
  throttle(function () {
    console.log("Scroll event triggered");
  }, 200),
); // Executes at most once every 200ms
```

**Example (Good Practice - Debounce)**:

```jsx
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

window.addEventListener(
  "scroll",
  debounce(function () {
    console.log("Scroll event triggered");
  }, 200),
); // Executes only after 200ms of inactivity
```

---

### 2. **Avoid Inline Styles or Heavy CSS Computation**

- **Bad Practice**: Setting styles inline for each element individually can slow down performance, as it may require recalculating styles frequently.
- **Good Practice**: Use CSS classes instead of inline styles for better performance.

**Example (Bad Practice)**:

```jsx
element.style.color = "red"; // Recomputes the layout every time
```

**Example (Good Practice)**:

```jsx
element.classList.add("highlight"); // Toggle a class instead of inline styles
```

---

### 3. **Use RequestAnimationFrame for Smooth Animations**

- **Bad Practice**: Using `setInterval` or `setTimeout` for animations can result in performance issues, as it doesn't sync well with the browser's rendering cycles.
- **Good Practice**: Use `requestAnimationFrame` for smooth animations and to avoid unnecessary repaints.

**Example (Bad Practice)**:

```jsx
setInterval(function () {
  element.style.transform = `translateX(${x}px)`;
}, 16); // Will trigger every 16ms (60fps), but not aligned with the browser's repaint cycle.
```

**Example (Good Practice)**:

```jsx
function animate() {
  element.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate); // Syncs with the browser's repaint cycle
}

requestAnimationFrame(animate);
```

---

### 4. **Minimize Network Requests**

- **Bad Practice**: Making multiple network requests for data that can be batched together or cached can hurt performance, especially in A/B tests.
- **Good Practice**: Optimize network requests by combining them, using caching, or leveraging techniques like lazy-loading.

**Example (Bad Practice)**:

```jsx
// Serialized request (One after the other.)
// Total time = First Request + Second Request
fetch("/api/data1")
  .then((response) => response.json())
  .then((data) => processData(data));

fetch("/api/data2")
  .then((response) => response.json())
  .then((data) => processData(data));
```

**Example (Good Practice)**:

```jsx
// Parallel request
// Total Time < Total Time Taken by first approach
Promise.all([
  fetch("/api/data1").then((response) => response.json()),
  fetch("/api/data2").then((response) => response.json()),
]).then(([data1, data2]) => {
  processData(data1);
  processData(data2);
});
```

---

### 5. **Optimize Loops and Iterations**

- **Bad Practice**: Using slow methods like `forEach()` on large data sets in performance-critical code.
- **Good Practice**: Use optimized loops like `for` or `while`.

**Example (Bad Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
data.forEach((item) => {
  processItem(item);
});
```

**Example (Good Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
for (let i = 0; i < data.length; i++) {
  processItem(data[i]);
}
```

---

### 6. **Use `map()` Instead of `forEach()` for Transformations**

- **Bad Practice**: Using `forEach()` when you need to transform an array, as it doesn't return a new array, leading to inefficient code.
- **Good Practice**: Use `map()` for array transformations, as it returns a new array and makes the code cleaner.

**Example (Bad Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
const result = [];
data.forEach((item) => {
  result.push(item * 2); // Manual array transformation
});
```

**Example (Good Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
const result = data.map((item) => item * 2); // Efficient transformation
```

---

### 7. **Use `find()` Instead of `forEach()` or `map()` When You Need to Search for One Item**

- **Bad Practice**: Using `forEach()` or `map()` when you only need to find a single item in an array, which unnecessarily iterates through the entire array.
- **Good Practice**: Use `find()` when you need to search for the first matching item in an array.

**Example (Bad Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
let result = null;
data.forEach((item) => {
  if (item === 3) {
    result = item; // Loops through entire array even after the match is found
  }
});
```

**Example (Good Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
const result = data.find((item) => item === 3); // Efficient search for one item
```

- **Why It's Good**: The `find()` method stops iterating once it finds the matching element, improving performance over `forEach()` or `map()`.

---

### 8. **Avoid Using `+=` for String Concatenation in Loops**

- **Bad Practice**: Using `+=` for string concatenation inside loops, which can lead to performance issues due to repeated string allocations.
- **Good Practice**: Use an array and then join it with `.join()`, which is more efficient.

**Example (Bad Practice)**:

```jsx
let str = "";
for (let i = 0; i < 1000; i++) {
  str += "item " + i; // Inefficient string concatenation
}
```

**Example (Good Practice)**:

```jsx
let arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push("item " + i); // Collect strings in an array
}
let str = arr.join(""); // Efficient string joining
```

- **Why It's Good**: Repeated string concatenation with `+=` causes the browser to allocate a new string every time. Using `join()` on an array is much more efficient, as it performs the concatenation in one operation.

---

### 9. **Use `for` Loops Instead of `map()`, `filter()`, or `reduce()` for Performance-Critical Operations**

- **Bad Practice**: Using `map()`, `filter()`, or `reduce()` when you don’t need the returned arrays, especially in performance-critical code, because they create intermediate arrays.
- **Good Practice**: Use `for` loops for more control over iteration, especially when you don’t need to return new arrays.

**Example (Bad Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
const result = data.map((item) => {
  return item * 2; // Unnecessary array creation for transformations
});
```

**Example (Good Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
const result = [];
for (let i = 0; i < data.length; i++) {
  result.push(data[i] * 2); // Efficient iteration without creating intermediate arrays
}
```

- **Why It's Good**: `map()`, `filter()`, and `reduce()` create new arrays which might be unnecessary. A simple `for` loop avoids this overhead.

---

### 10. **Use `Object.entries()` or `Object.keys()` Instead of `for...in` for Objects**

- **Bad Practice**: Using `for...in` to loop through object properties, which includes inherited properties and might not behave as expected.
- **Good Practice**: Use `Object.entries()`, `Object.keys()`, or `Object.values()` to safely loop through object properties.

**Example (Bad Practice)**:

```jsx
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

**Example (Good Practice)**:

```jsx
const obj = { a: 1, b: 2, c: 3 };
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value); // Safer and cleaner
});
```

- **Why It's Good**: `Object.entries()` and `Object.keys()` provide a safer way to iterate over object properties without worrying about inherited properties, ensuring more predictable behavior.

---

### 11. **Use `includes()` Instead of `indexOf()` for Checking Array Existence**

- **Bad Practice**: Using `indexOf()` to check if an item exists in an array.
- **Good Practice**: Use `includes()` to check if an item is present in an array, as it's more semantically correct and easier to read.

**Example (Bad Practice)**:

```jsx
const arr = [1, 2, 3, 4, 5];
if (arr.indexOf(3) !== -1) {
  console.log("Found 3");
}
```

**Example (Good Practice)**:

```jsx
const arr = [1, 2, 3, 4, 5];
if (arr.includes(3)) {
  console.log("Found 3");
}
```

- **Why It's Good**: `includes()` is cleaner and more expressive, and it makes the intent of checking for an element more obvious. `indexOf()` is meant for finding the index, not just existence.

---

### 12. **Use `Set` for Unique Values Instead of `indexOf()` in Arrays**

- **Bad Practice**: Using `indexOf()` or other array methods to filter out duplicates, which involves searching the entire array multiple times.
- **Good Practice**: Use `Set` for ensuring unique values, as it automatically handles duplicates.

**Example (Bad Practice)**:

```jsx
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [];
arr.forEach((item) => {
  if (uniqueArr.indexOf(item) === -1) {
    uniqueArr.push(item);
  }
});
```

**Example (Good Practice)**:

```jsx
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)]; // Efficient way to get unique values
```

- **Why It's Good**: Using a `Set` automatically removes duplicates and is more efficient than repeatedly calling `indexOf()`.

---

### 13. **Avoid Binding Functions in Loops (Bad Practice)**

- **Bad Practice**: Binding functions inside loops, especially when used as event handlers, which can result in unnecessary function re-creations.

**Example (Bad Practice)**:

```jsx
const data = [1, 2, 3, 4, 5];
data.forEach(function (item) {
  button.addEventListener("click", this.handleClick.bind(this)); // Binding inside a loop
});
```

- **Why It's Bad**:
  - Binding inside loops creates new function instances on each iteration, which is inefficient and can lead to memory leaks.

**Good Practice**: Bind the function outside the loop.

**Example (Good Practice)**:

```jsx
const handleClick = this.handleClick.bind(this); // Bind once
data.forEach(function (item) {
  button.addEventListener("click", handleClick); // Use the bound function
});
```

---

Here are some more **good vs. bad practices** along the same lines as the examples you provided. These focus on improving efficiency, readability, and performance in JavaScript.

---

### 14. **Use `Object.assign()` or Spread Operator for Object Cloning Instead of Loops**

- **Bad Practice**: Using a loop to clone or copy properties from one object to another.
- **Good Practice**: Use `Object.assign()` or the spread operator for cloning objects, as they are cleaner and more efficient.

**Example (Bad Practice)**:

```jsx
const original = { a: 1, b: 2, c: 3 };
const copy = {};
for (let key in original) {
  if (original.hasOwnProperty(key)) {
    copy[key] = original[key];
  }
}
```

```jsx
const original = { a: 1, b: 2, c: 3 };
const copy = {};
for (let key in original) {
  if (original.hasOwnProperty(key)) {
    copy[key] = original[key];
  }
}
```

**Example (Good Practice)**:

```jsx
const original = { a: 1, b: 2, c: 3 };
const copy = { ...original }; // Spread operator for cloning
// Or
const copy = Object.assign({}, original); // Using Object.assign()
```

- **Why It's Good**: The spread operator and `Object.assign()` are cleaner and more efficient ways to clone an object or create shallow copies. The loop-based approach is verbose and prone to errors.

---

### 15. **Avoid Modifying Arrays While Iterating Over Them**

- **Bad Practice**: Modifying the array you're iterating over, which can lead to unexpected behavior and errors.

**Example (Bad Practice)**:

```jsx
const arr = [1, 2, 3, 4, 5];
arr.forEach((item) => {
  if (item === 3) {
    arr.splice(arr.indexOf(item), 1); // Modifying the array while iterating
  }
});
console.log(arr); // Output might be unexpected due to mutation
```

**Example (Good Practice)**:

```jsx
const arr = [1, 2, 3, 4, 5];
const filteredArr = arr.filter((item) => item !== 3); // Avoid modifying the array
console.log(filteredArr); // Output: [1, 2, 4, 5]
```

- **Why It's Good**: Modifying an array while iterating over it can cause unexpected behavior because the array's size and structure change during iteration. **Immutable operations** (like using `filter()` or `map()`) prevent side effects and improve code reliability.

---

## 📄 HTML Best Practices for A/B Testing (With Examples)

When creating A/B test variants, keeping the HTML structure modular, scoped, and clean is key to avoid conflicts and simplify testing and debugging.

---

### ✅ 1. **Use Semantic Tags When Appropriate**

Use semantic tags like `<section>`, `<article>`, or `<nav>` when the structure logically supports it. However, use `<div>` when needed—**just avoid unnecessary nesting**.

> ✅ Correct Practice:

```html
<section class="cre-t-101-hero">
  <h1 class="cre-t-101-title">Welcome to Our Test</h1>
</section>
```

> ⚠️ Note:
>
> Don’t avoid `<div>` altogether—**just don’t add extra, meaningless divs**.

---

### ✅ 2. **Use Only Necessary `<div>`s — No Over-Nesting**

Structure only what’s needed. Don’t wrap everything in multiple useless containers. Stick to what the design/layout needs.

> ✅ Good Practice:

```html
<div class="cre-t-101-form-container">
  <form class="cre-t-101-form">
    <input type="text" class="cre-t-101-input" />
  </form>
</div>
```

> ❌ Avoid This (Too Many Layers):

```html
<div>
  <div>
    <div>
      <div class="cre-t-101-form-container">...</div>
    </div>
  </div>
</div>
```

---

### ✅ 3. **Wrap Images with an Image Wrapper**

If using an image, wrap it inside a `.img-wrapper` or similar class. This makes it easier to apply layout/styling without touching the `<img>` directly.

> ✅ Example:

```html
<div class="cre-t-102-banner-img-wrapper">
  <img src="banner.jpg" alt="Banner" class="cre-t-102-banner-img" />
</div>
```

---

### ✅ 4. **Always Class Each `<li>` & Add a Unique Class Per `<li>`**

Whenever using a list, give a general class to each `<li>` and also assign a unique one for individual control.

> ✅ Example:

```html
<ul class="cre-t-103-feature-list">
  <li class="cre-t-103-feature-item feature1">Free Shipping</li>
  <li class="cre-t-103-feature-item feature2">24/7 Support</li>
  <li class="cre-t-103-feature-item feature3">Money-back Guarantee</li>
</ul>
```

This allows styling or scripting specific items easily (`.feature2`, for example).

---

### ✅ 5. **For Cards in a Row, Assign a Unique Class to Each**

When creating multiple cards inside a grid/row, wrap each in a parent with a unique class (or ID if needed) for precise control during test manipulation.

> ✅ Example:

```html
<div class="cre-t-104-cards-container">
  <div class="cre-t-104-card card1">
    <h3>Card Title 1</h3>
  </div>
  <div class="cre-t-104-card card2">
    <h3>Card Title 2</h3>
  </div>
  <div class="cre-t-104-card card3">
    <h3>Card Title 3</h3>
  </div>
</div>
```

This helps target `.card2` specifically without affecting others.

---

### ✅ 6. **General Naming Convention**

Always follow this format:

```
cre-t-{testNumber}-{component/section-name}

```

> Example:

```html
<div class="cre-t-105-banner-container">...</div>
```

It helps keep styles and test logic scoped, organized, and easy to trace.

---

### ✅ 7. **Component Structure Pattern:**

Use a consistent layout like this:

```
[Container] → [Wrapper] → [Component]

```

> Example:

```html
<div class="cre-t-106-dropdown-container">
  <div class="cre-t-106-dropdown-wrapper">
    <div class="cre-t-106-dropdown">
      <!-- dropdown content -->
    </div>
  </div>
</div>
```

---

## ✅ Summary Checklist

| Scenario                      | Best Practice                                  |
| ----------------------------- | ---------------------------------------------- |
| Image usage                   | Wrap with `.img-wrapper`                       |
| `<ul> <li>` usage             | Add general + unique class to each `<li>`      |
| Multiple cards in a row       | Give each card a unique class or ID            |
| Component structure           | Follow container > wrapper > component         |
| Naming convention             | `cre-t-{testNumber}-{component}` format        |
| Avoiding unnecessary `<div>`s | Use only what structure needs, no over-nesting |
| Semantic where possible       | Use semantic tags when appropriate             |

# How I Learned to Move and Reuse an Existing Form

I needed to **take an existing form from the page**, wrap it in a new container, and insert it in a different location also redesign the Form Using CSS

## What I Learned

1. **Selecting the correct parent element is key**
   - I learned that to safely move a form, I must **grab its proper parent** rather than the form itself.
   - Example from code:

   ```jsx
   var nationalForm = document.querySelector("#nationalFormOfferBlock");
   var wrapper = document.createElement("div");
   wrapper.className = "cre-t-88-form-wrapper cre-t-88-consult-form-offer";
   wrapper.appendChild(nationalForm);
   heroArea.insertAdjacentElement("afterend", wrapper);
   ```

   - By targeting the wrapper and parent properly, I ensure that **all child elements remain intact** and the form functions correctly.

2. **Handling dynamic visibility**
   - Some fields, like the name field, may **load asynchronously** or be hidden initially.
   - I used an interval to check for visibility before adding styles:

   ```jsx
   var intervalId = setInterval(function () {
     if (nameField.offsetParent !== null) {
       creFormInner.classList.add("cre-t-88-consult-name-field");
       clearInterval(intervalId);
     }
   }, 200);
   ```

   - This avoids **errors from manipulating elements that aren’t visible yet**.

3. **Order of operations matters**
   - I call `formInsertion();` **before inserting the new HTML container** to ensure all elements are moved and wrapped properly.
   - This prevents **layout issues or duplicated forms** when the page renders.
4. **Why not hide using a generic arrow selector**
   - Initially, I hid the arrow using a generic `.arrow` class.
   - On an AB test or future updates, this could hide **all arrows across the site**, breaking unrelated UI.
   - Better approach: **target the exact parent or container** of the element to hide only what’s necessary:

   ```jsx
   var targetArrow = document.querySelector(".cre-t-88-form-wrapper .arrow");
   targetArrow.style.display = "none";
   ```

---

## 🔹 Obstacles I Anticipated on Live Sites

- **Asynchronous loading issues**
  - Forms may not be immediately present, causing `null` errors if not waited for with `waitForElement`.
- **CSS or JS conflicts**
  - Moving the form might affect styling or scripts that rely on its original position.
- **Future AB tests**
  - Generic selectors like `.arrow` can interfere with other features. Using the exact parent prevents accidental changes elsewhere.
- **Duplicate form insertion**
  - Without checking if the wrapper already exists, multiple copies could appear on page reload or SPAs.

  ***

Test: **WinkBeds - WIN161 - Sitewide - Exit Modal V2**
In this test, I implemented a system that **fetches estimated delivery time from WinkBeds’ Fenix API** and shows it **dynamically inside a modal**. The message inside the modal changes **based on the customer’s cart status**:

### **1️⃣ If the cart is empty → I calculate how much time is left until midnight**

This is used to show:

> “Order within Xh Xm to be in today’s production run.”

### **2️⃣ If the cart has items → I send cart SKUs to the Fenix Delivery API**

This returns personalized delivery data like:

- delivery hours
- delivery minutes
- formatted delivery date

I then inject this into the modal:

> “Order in the next 2h 15m for FREE delivery by Tuesday, Dec 3rd.”

This makes the modal truly **dynamic**, **personalized**, and **context-aware**.

---

# 🧠 **What I Learned From This Work**

### ✔ **1. How to work with third-party delivery APIs**

I learned how to:

- send POST requests with payloads including SKUs, quantities, monetary values, zip code, session IDs
- read the API response structure
- validate missing fields
- update UI based on asynchronous response

This helped me understand **real-world eCommerce delivery-time logic**.

---

### ✔ **2. How to detect cart state and show different UIs**

I learned how to use:

```jsx
fetch("/cart.js");
```

to get cart data and then separate logic into two flows:

- one for empty cart
- one for cart with items

---

### ✔ **3. How to calculate time until midnight using Luxon**

I learned how to:

- load Luxon dynamically only when needed
- set timezone (`America/New_York`)
- calculate `endOf("day")`
- convert duration into hours and minutes

This taught me the importance of handling **user timezones** properly.

---

### ✔ **4. How to dynamically update the DOM without reloading**

I learned to insert new UI elements like:

```jsx
insertAdjacentHTML('afterend', ...)
```

This helps in building flexible UI components inside modals.

---

### ✔ **5. How to manage modal events & cookies**

I learned how to:

- show/hide modals
- avoid showing the modal again by setting cookies
- listen for clicks inside the modal using delegated events

The cookie logic prevents re-triggering the modal repeatedly.

---

### ✔ **6. How to structure large experiment code cleanly**

This project taught me how to:

- organize helper functions
- initialize modals
- use `waitForElement`
- keep event listeners separate from main logic
- avoid multiple event-bindings with flags like `window.CRE161EVENT`

This is important for scalable A/B testing code.

---

# ⚙️ **How the Code Works (Step-by-Step)**

## **A. Modal Injection**

The modal HTML is inserted once when the experiment initializes.

## **B. modalTimer() – Main Logic**

This function decides which delivery message to show.

---

## **1️⃣ If cart is empty**

- Load Luxon (only if missing)
- Get current time in NY timezone
- Get midnight by `endOf("day")`
- Calculate the difference
- Inject countdown text under CTA

---

## **2️⃣ If cart has items**

- Extract SKUs from cart.js
- Prepare API payload with SKUs, zip code, session ID, monetary value
- Send request to the WinkBeds Fenix delivery endpoint
- If API responds → call `updateDeliveryCountdown(data)`

---

## **C. updateDeliveryCountdown(data)**

This function:

- Validates API response
- Extracts hours, minutes, deliveryDate
- Injects the dynamic text right under CTA

---

## **D. Modal Events**

Uses event delegation to:

- close modal (overlay, close button)
- trigger Convert events
- scroll to top if needed

---

## **E. Cookie Handling**

`setBmCookie()` ensures the modal doesn't show again in the same session.

---

# **Obstacles I Faced**

### ❌ **1. Fenix API returns inconsistent data**

Sometimes:

- hours = null
- minutes = null
- deliveryDate = null

I had to add defensive checks:

```jsx
if (!hours || !minutes || !deliveryDate) return console.warn(...)

```

---

### ❌ **2. Cart.js fetch fails if Shopify blocks it**

I handled:

```jsx
if (!res.ok) throw new Error("Failed to fetch cart data");
```

---

### ❌ **3. Luxon not available globally**

On some pages Luxon is missing, so I learned to dynamically load it:

```jsx
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/luxon...";
```

---

### ❌ **4. DOM element not ready**

The CTA button (`#cre-t-161-timedModalCta`) isn’t always ready immediately.

I had to use `waitForElement` to ensure correct insertion timing.

---

### ❌ **5. Modal triggering multiple times**

I fixed it using:

```jsx
if (!window.CRE161EVENT) { ... }
```

---

- Code Example

  ```jsx
  (function () {
    try {
      var debug = 1;
      var variation_name = "cre-t-161";

      var _$;
      !(function (factory) {
        _$ = factory();
      })(function () {
        var bm = function (s) {
          if (typeof s === "string")
            this.value = Array.prototype.slice.call(
              document.querySelectorAll(s),
            );
          if (typeof s === "object") this.value = [s];
        };
        bm.prototype = {
          eq: function (n) {
            this.value = [this.value[n]];
            return this;
          },
          each: function (fn) {
            [].forEach.call(this.value, fn);
            return this;
          },
          log: function () {
            var items = [];
            for (var index = 0; index < arguments.length; index++) {
              items.push(arguments[index]);
            }
            console && console.log(variation_name, items);
          },
          addClass: function (v) {
            var a = v.split(" ");
            return this.each(function (i) {
              for (var x = 0; x < a.length; x++) {
                if (i.classList) i.classList.add(a[x]);
                else i.className += " " + a[x];
              }
            });
          },
          waitForElement: function (
            selector,
            trigger,
            delayInterval,
            delayTimeout,
          ) {
            // console.log("testWaiting for " + selector);
            var interval = setInterval(function () {
              if (_$(selector).value.length) {
                clearInterval(interval);
                trigger();
              }
            }, delayInterval);
            setTimeout(function () {
              clearInterval(interval);
            }, delayTimeout);
          },
          live: function (selector, event, callback, context) {
            function addEvent(el, type, handler) {
              if (el.attachEvent) el.attachEvent("on" + type, handler);
              else el.addEventListener(type, handler);
            }
            this.Element &&
              (function (ElementPrototype) {
                ElementPrototype.matches =
                  ElementPrototype.matches ||
                  ElementPrototype.matchesSelector ||
                  ElementPrototype.webkitMatchesSelector ||
                  ElementPrototype.msMatchesSelector ||
                  function (selector) {
                    var node = this,
                      nodes = (
                        node.parentNode || node.document
                      ).querySelectorAll(selector),
                      i = -1;
                    while (nodes[++i] && nodes[i] != node);
                    return !!nodes[i];
                  };
              })(Element.prototype);
            function live(selector, event, callback, context) {
              addEvent(context || document, event, function (e) {
                var found,
                  el = e.target || e.srcElement;
                while (
                  el &&
                  el.matches &&
                  el !== context &&
                  !(found = el.matches(selector))
                )
                  el = el.parentElement;
                if (found) callback.call(el, e);
              });
            }
            live(selector, event, callback, context);
          },
        };
        return function (selector) {
          return new bm(selector);
        };
      });

      var helper = _$();

      function setBmCookie() {
        document.cookie = "cre-t-161=cre-t-161-modal-triggered; path=/";
      }

      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      }

      const updateDeliveryCountdown = (data) => {
        if (!Array.isArray(data) || data.length === 0)
          return console.warn("No delivery data available");

        const info = data[0];
        if (!info) return console.warn("Delivery info missing");

        const hours = info.hours || null;
        const minutes = info.minutes || null;
        const deliveryDate = info.formattedDeliveryDate || null;
        if (!hours || !minutes || !deliveryDate)
          return console.warn("Incomplete delivery info", {
            hours,
            minutes,
            deliveryDate,
          });
        document.querySelector("#cre-t-161-timedModalCta").insertAdjacentHTML(
          "afterend",
          `
          <div class="cre-t-161-dynamic-timeText">
              Order in the next <span class="time">${hours}h ${minutes}m</span> for FREE delivery by <span class="date">${deliveryDate}</span>
          </div>
          `,
        );
      };

      function modalTimer() {
        const tenantId = "317ca30698d74c21b080bb2552d6854a";
        fetch("/cart.js")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch cart data");
            return res.json();
          })
          .then(async (cartData) => {
            const itemCount = cartData?.item_count || 0;

            if (itemCount === 0) {
              if (typeof window.luxon === "undefined") {
                await new Promise((resolve) => {
                  const script = document.createElement("script");
                  script.src =
                    "https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js";
                  script.onload = resolve;
                  document.head.appendChild(script);
                });
              }

              const { DateTime, Duration } = window.luxon;
              const now = DateTime.now().setZone("America/New_York");
              const midnight = now.endOf("day");
              const diff = midnight
                .diff(now, ["hours", "minutes", "seconds"])
                .toObject();
              document
                .querySelector("#cre-t-161-timedModalCta")
                .insertAdjacentHTML(
                  "afterend",
                  `    
          <div class="cre-t-161-dynamic-timeText">
             Order within <span class="time">${diff.hours}h ${diff.minutes}m</span> to be in <span class="date">today's production run.</span>
          </div>
            `,
                );
              return;
            }

            const cartItems = cartData.items || [];
            const skus = cartItems.map((item) => ({
              sku: item.sku || item.title,
              quantity: item.quantity,
              skuInventories: [
                {
                  locationId: "manual",
                  quantity: item.quantity,
                },
              ],
            }));

            // const buyerZipCode = getCookie("location") || "10001";
            const buyerZipCode = "10001";
            const sessionTrackId =
              localStorage.getItem("fenix-sessionId") ||
              Math.random().toString(36).substring(2, 15);
            const pageType =
              window.location.href.indexOf("cart") > -1 ? "Cart" : "PDP";
            const monetaryValue = cartData?.total_price
              ? cartData.total_price / 100
              : 0;

            const payload = {
              sessionTrackId,
              buyerZipCode,
              monetaryValue,
              pageType,
              responseFormat: "json",
              skus,
            };
            return fetch(
              "https://api-002.delest.fenixcommerce.com/winkbeds/fenixdelest/api/v2/deliveryestimates",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  tenantId,
                },
                body: JSON.stringify(payload),
              },
            )
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((text) => {
                    throw new Error("Estimate request failed: " + text);
                  });
                }
                return response.json();
              })
              .then((data) => {
                updateDeliveryCountdown(data);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      function modalEvent() {
        helper.live(
          "#cre-t-161-timedModalCloseBtn, #cre-t-161-timedModalOverlay, #cre-t-161-timedModalCta, .cre-t-161-link",
          "click",
          function (e) {
            if (
              e.target.innerText.trim() === "SHOP NOW" &&
              window.location.pathname === "/pages/shop-winkbed"
            ) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }

            hideModal();
          },
        );

        helper.live("#cre-t-161-timedModalCta", "click", function (e) {
          window._conv_q = window._conv_q || [];
          _conv_q.push(["triggerConversion", "100332347"]);
        });
      }

      var modalHTML = `<div class="cre-t-161-modal-main">
      <div id="cre-t-161-timedModalOverlay" class="cre-t-161-overlay"></div>
  
      <div id="cre-t-161-popupContent" class="cre-t-161-popup">
          <div class="cre-t-161-badge"><img
                  src="https://www.winkbeds.com/cdn/shop/t/236/assets/offer-sticker-landing.svg?v=26493139930568156891697221926">
          </div>
          <div id="cre-t-161-timedModalCloseBtn" class="cre-t-161-cross">✖</div>
          <div class="review-stars"> <img src="https://www.winkbeds.com/cdn/shop/files/stars_200x.png?v=1668855616"> </div>
          <h1 class="cre-t-161-title first">Sleep now, pay later with <br> 0% APR financing </h1>
          <div class="cre-t-161-subtitle">Own a handcrafted WinkBed for less. Take $300 off now and pay over time with 0% APR (if qualified).
          </div>
          <p class="bm-divider"></p>
          <div class="cre-t-161-tabs-wrapper">
              <div class="cre-t-161-tabs-inner">
                  <div class="cre-t-161-tab">
                      <span class="circle"><img class="key"
                              src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/keyring_68ff0285002be.png"></span>
                      <p><b>Order now & save $300</b> on your choice of WinkBed—rated 4.8 stars from 9,200+ reviews.</p>
                  </div>
                  <div class="cre-t-161-tab">
                      <span class="circle"><img class="wallet"
                              src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/card_68ff02ab85913.png"></span>
                      <p><b>From as low as $46.15/month </b> with <a class="cre-t-161-link" href="https://www.winkbeds.com/pages/financing"> 0% APR financing</a>. Apply in seconds at checkout with no
                          credit impact.</p>
                  </div>
                  <div class="cre-t-161-tab">
                      <span class="circle"><img class="guard"
                              src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/shieldnew_68ff029817282.png"></span>
                      <p><b>Try it 120 nights, risk-free—</b>includes FREE shipping, FREE returns (including pickup), and a
                          Lifetime Warranty.</p>
                  </div>
              </div>
          </div>
          <a href="https://www.winkbeds.com/pages/shop-winkbed" id="cre-t-161-timedModalCta" class="cre-t-161-cta">
              <p>SHOP NOW</p>
          </a>
  </div>
  </div>`;

      function showModal() {
        if (!getCookie("cre-t-161")) {
          helper.waitForElement(
            ".cre-t-161-modal-main",
            function () {
              document
                .querySelector(".cre-t-161-modal-main")
                .classList.add("activeModal");
              // Trigger the modal to open
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "100332346"]);
            },
            25,
            25000,
          );
        }
      }
      function hideModal() {
        document
          .querySelector(".cre-t-161-modal-main")
          .classList.remove("activeModal");
        setBmCookie();
      }

      function init() {
        _$("body").addClass(variation_name);
        if (!document.querySelector(".cre-t-161-modal-main")) {
          document.body.insertAdjacentHTML("afterbegin", modalHTML);
          modalTimer();
        }

        showModal();

        if (!window.CRE161EVENT) {
          modalEvent();
          window.CRE161EVENT = true;
        }
      }

      helper.waitForElement("body", init, 50, 15000);
    } catch (e) {
      if (debug) console.log(e, "error in Test " + variation_name);
    }
  })();
  ```

  While building the slider for the A/B test, I learned the full lifecycle of implementing a stable, conflict-free Swiper slider inside a production website.

---

# 🔹 **1. Load Swiper Script and CSS Safely (Avoid Double Injection)**

In A/B testing, the same variation code may run multiple times due to:

- re-rendering,
- route changes,
- dynamic elements.

So I learned that I must **guard the script injection**:

```jsx
if (!window.CRE_107_SLIDER) {
  addScript();
  window.CRE_107_SLIDER = true;
}
```

### ✔ Why this matters

Without this guard:

- Swiper JS loads multiple times,
- Slider breaks or restarts,
- Performance gets worse.

---

# 🔹 **2. Wait Until Swiper Is Fully Available**

I learned how important it is to wait for `window.Swiper` before initializing the slider.

```jsx
function waitForSwiper(trigger) {
  var interval = setInterval(function () {
    if (typeof window.Swiper != "undefined") {
      clearInterval(interval);
      trigger();
    }
  }, 50);

  // Safety timeout
  setTimeout(() => clearInterval(interval), 15000);
}
```

### ✔ Why this matters

If I initialize the slider **before** the script loads, the entire slider fails silently.

---

# 🔹 **3. Use Unique Slider Class Names to Avoid Conflicts**

For A/B testing, multiple sliders can appear on the same page or within other components.

I learned that **slider class names must be unique**:

```
.mainSwiper107.${sliderRegion}
```

Using `sliderRegion` makes each slider instance completely isolated.

### ✔ Why this matters

Without unique classes:

- two sliders might merge together,
- navigation buttons control the wrong slider,
- styles conflict.

---

# 🔹 **4. Bind Navigation Buttons to the Correct Slider Parent**

This was one of the biggest things I learned.

When multiple sliders exist, clicking next/prev must ONLY control its own slider.

So the navigation must target the parent region:

```jsx
navigation: {
  nextEl: `.mainSwiper107.${sliderRegion} ~ .swiper-button-next.cre-t-107-swiper-button-next`,
  prevEl: `.mainSwiper107.${sliderRegion} ~ .swiper-button-prev.cre-t-107-swiper-button-prev`,
}
```

### ✔ Why this matters

If I use generic `.swiper-button-next`,

then ONE button controls ALL sliders — a critical AB test bug.

---

# 🔹 **5. Create One Reusable Function for Slider Initialization**

I learned to create a clean initialization function:

```jsx
function sliderInit(sliderRegion) {
  waitForSwiper(function () {
    var creSwiper107 = new Swiper(`.swiper.mainSwiper107.${sliderRegion}`, {
      slidesPerView: 5,
      spaceBetween: 10,
      speed: 600,
      allowTouchMove: true,
      navigation: { … },
      breakpoints: { … }
    });
  });
}
```

### ✔ Why this matters

One function lets me:

- reuse sliders,
- pass dynamic selectors,
- avoid code duplication.

---

# 🔹 **6. Keep Swiper Instance in a Variable**

I learned that storing the instance is necessary:

```jsx
var creSwiper107 = new Swiper(…)
```

### ✔ Why?

Because:

- later I can destroy or re-init it,
- avoid memory leaks,
- avoid multiple Swiper instances stacking on top of each other.

```jsx
/* wait for swiper js */
function waitForSwiper(trigger) {
  var interval = setInterval(function () {
    if (typeof window.Swiper != "undefined") {
      clearInterval(interval);
      trigger();
    }
  }, 50);
  setTimeout(function () {
    clearInterval(interval);
  }, 15000);
}

function addScript() {
  var scriptOne = document.createElement("script");
  scriptOne.src = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";
  document.querySelector("head").appendChild(scriptOne);

  var swiperCss =
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css" />';
  document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
}

// Adding Script to the DOM 1st Step
if (!window.CRE_107_SLIDER) {
  addScript();
  window.CRE_107_SLIDER = true;
}

function sliderInit(sliderRegion) {
  waitForSwiper(function () {
    var creSwiper107 = new Swiper(`.swiper.mainSwiper107.${sliderRegion}`, {
      slidesPerView: 5, // default (mobile first)
      spaceBetween: 10,
      speed: 600,
      loop: false,
      allowTouchMove: true,
      slideToClickedSlide: false,
      navigation: {
        nextEl: `.mainSwiper107.${sliderRegion} ~ .swiper-button-next.cre-t-107-swiper-button-next`,
        prevEl: `.mainSwiper107.${sliderRegion} ~ .swiper-button-prev.cre-t-107-swiper-button-prev`,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.75,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });
  });
}

function addRegionSlider(formattedRestaurants, regionName) {
  // Prevent adding duplicate sliders
  if (
    document.querySelector(`[data-region="${regionName.split(" ").join("-")}"]`)
  ) {
    return;
  }
  var prevRegion =
    regionName === "auckland"
      ? '[data-attribe="booking_details_section"]'
      : regionName === "wellington"
        ? '[data-region="auckland"]'
        : regionName === "christchurch"
          ? '[data-region="wellington"]'
          : '[data-region="christchurch"]';

  helper.waitForElement(
    prevRegion,
    function () {
      document
        .querySelector(prevRegion)
        .insertAdjacentHTML(
          "afterend",
          generateCardsHTML(formattedRestaurants, regionName),
        );
      sliderInit(regionName);
    },
    50,
    15000,
  );
}
```

Sometimes, when wrapping an element with a

```
<a>
```

tag that does not redirect to a specific restaurant's item, we observe an issue related to the Swiper version. In such cases, we need to change the slider version. Previously, we were using

Swiper version 8.3.2 👈🏻👈🏻

However, in most cases, this slider version is stable.

---

Test: Radwell - Test 14 - Checkout - Remove Account Creation Step

# 📘 **Documentation: How to Implement Google reCAPTCHA (v2) in a Custom JavaScript Form**

This document explains how I implemented **Google reCAPTCHA** inside a dynamically inserted sign-in form.

The goal was to protect the form from bots by rendering Google reCAPTCHA only after it is fully loaded.

---

## ✅ **1. What I Learned**

### ✔ How to dynamically insert a form into the DOM using JavaScript

I learned to use:

```jsx
target.insertAdjacentHTML("beforebegin", signinFormHTML);
```

This allows adding HTML into any page location **without rewriting the page’s HTML file**.

---

### ✔ How to detect when Google reCAPTCHA has loaded

Since reCAPTCHA loads asynchronously, I learned to use an interval check:

```jsx
if (window.grecaptcha && grecaptcha.render)

```

This ensures reCAPTCHA only renders **after the grecaptcha library is fully ready**.

---

### ✔ How to render reCAPTCHA using JavaScript

I learned to use:

```jsx
grecaptcha.render("recaptcha-box", { sitekey: "..." });
```

This attaches reCAPTCHA to any element by ID.

---

---

## 🚧 **2. Obstacles I Faced & How I Solved Them**

### ❗ Problem 1: reCAPTCHA didn't load sometimes

Because reCAPTCHA loads slowly, calling `grecaptcha.render()` immediately caused an error.

**Solution:**

Use a repeating interval to wait until Google API is ready.

---

### ❗ Problem 2: Form was loading before the target element existed

If `.benefits` wasn’t available yet, inserting the form failed.

**Solution:**

First check:

```jsx
if (!target) return;
```

This prevents errors when the page structure changes.

---

### ❗ Problem 3: reCAPTCHA required a valid DOM container

If the `recaptcha-box` div didn’t exist or wasn’t inserted yet, reCAPTCHA broke.

**Solution:**

Insert the form **before** rendering reCAPTCHA.

---

## 🧩 **3. The Final Working Code Explained**

### 📌 **Step 1: Create the form HTML**

```jsx
var signinFormHTML = `
  <form id="signin-form" style="padding: 20px 0;">
    <h2>Sign In</h2>

    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>

    <div style="margin-top: 10px;">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
    </div>

    <div id="recaptcha-box" style="margin: 20px 0;"></div>

    <button type="submit">Sign In</button>
  </form>
`;
```

This contains:

- email input
- password input
- an empty box where reCAPTCHA will be rendered
- a submit button

---

### 📌 **Step 2: Insert the form into the webpage**

```jsx
var target = document.querySelector("html .benefits");
target.insertAdjacentHTML("beforebegin", signinFormHTML);
```

This finds `.benefits` section and adds the form **before** it.

---

### 📌 **Step 3: Wait for reCAPTCHA to load before rendering it**

```jsx
const interval = setInterval(() => {
  if (window.grecaptcha && grecaptcha.render) {
    clearInterval(interval);

    grecaptcha.render("recaptcha-box", {
      sitekey: "6LcL54sUAAAAAHeQKb4bsCnjNZIwWgtZ3rKlrT64",
    });
  }
}, 200);
```

- Checks every 200 ms
- When Google API is ready → renders reCAPTCHA

---

### 📌 **Step 4: Call the function**

```jsx
insertAndRenderRecaptcha();
```

This runs the entire process.

---

---

Test: First Table - FST153 - Selected Pages - Black Friday Modal

# Using Luxon to Check Time and Fire a Test on First Table Pages

### Requirement

We want to run a test only on certain First Table pages and only on a specific date (28th November).

This note explains, in simple steps, how the script uses **Luxon** to get the current time for each region (NZ, AU, UK) and how it checks the page type before running a conversion/test.

Show an experiment only when:

1. The current date in that region is **28 November**, and
2. The user is on the correct site origin (NZ / AU / UK), and
3. The page type is **home**, **list**, or **restaurant**.

## What I learned

- I learned how to load Luxon dynamically only when needed.
- I learned how to get the current local time for different regions with `DateTime.now().setZone()`.
- I learned how to check a specific calendar date in each region separately.
- I learned how to combine date checks with page-type checks to avoid firing tests in the wrong place.

Luxon Date Time How its Works

```jsx
const start = dt.set({
year: dt.year,   // current year 2025
month: 11,       // November
day: 28,         // 28th
hour: 0,         // 00
minute: 0,       // 00
second: 0        // 00
});

hour: 0, minute: 0, second: 0
force the time to midnight of that day.

hour = 0 → 12:00 AM (start of the day)

hour = 12 → 12:00 PM (noon)

hour = 23 → 11:00 PM
```

## Obstacles I faced and how I solved them

### 1. Time-zone differences

**Problem:** 28 Nov in one region can be 27 or 29 in another region.

**Fix:** Use zone-aware times with Luxon (`setZone`) so each region is checked in its local time.

## How to Do Step By Step

### Step 1: Load Luxon

Luxon is a library for working with dates and times.

We first load Luxon using a script:

```jsx
const LUXON_URL =
  "https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js";
```

If Luxon is already loaded, we just use it. Otherwise, we create a `<script>` tag to load it.

### Step 2: Get Current Time for Each Region

We define time zones for New Zealand, Australia, and the UK:

```jsx
const zones = {
  NZ: "Pacific/Auckland",
  AU: "Australia/Sydney",
  UK: "Europe/London",
};
```

Then we get the current time in each region using Luxon:

```jsx
const regionTimes = {
  NZ: DateTime.now().setZone(zones.NZ),
  AU: DateTime.now().setZone(zones.AU),
  UK: DateTime.now().setZone(zones.UK),
};
```

### Step 3: Check the Date

We only want to run the test on 28th November.

We create a function `isWithin28Nov(dt)` that returns `true` if the given date is 28th November:

```jsx
function isWithin28Nov(dt) {
  const start = dt.set({
    year: dt.year,
    month: 11,
    day: 28,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const end = start.plus({ days: 1 });
  return dt >= start && dt < end;
}
```

---

### Step 4: Check Page Type

We check if the user is on a First Table page (`/`, list page, or restaurant page) using:

```jsx
currentOrigin === "https://www.firsttable.co.nz"; // for NZ
currentPath === "/" ||
  window._conv_page_type === "list" ||
  window._conv_page_type === "restaurant";
```

---

### Step 5: Fire the Test

If the date and page conditions match, we run the experiment:

```jsx
window._conv_q = window._conv_q || [];
window._conv_q.push(["executeExperiment", "100050711"]);
window.creT153TestActivated = 1;
console.log("NZ Modal Test 153 Fired");
```

We do this separately for NZ, AU, and UK, using their respective time zones.

```jsx
// 153 Modal Test - Black Friday
(function () {
  const LUXON_URL =
    "https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js";

  function loadLuxon(callback) {
    if (window.luxon && window.luxon.DateTime) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = LUXON_URL;
    script.onload = callback;
    document.head.appendChild(script);
  }

  loadLuxon(() => {
    const { DateTime } = window.luxon;

    const regionMap = {
      "https://www.firsttable.co.nz": "Pacific/Auckland",
      "https://www.firsttable.com.au": "Australia/Sydney",
      "https://www.firsttable.co.uk": "Europe/London",
    };

    const currentOrigin = window.location.origin;
    const currentPath = window.location.pathname;

    const zones = {
      NZ: regionMap["https://www.firsttable.co.nz"],
      AU: regionMap["https://www.firsttable.com.au"],
      UK: regionMap["https://www.firsttable.co.uk"],
    };

    const regionTimes = {
      NZ: DateTime.now().setZone(zones.NZ),
      AU: DateTime.now().setZone(zones.AU),
      UK: DateTime.now().setZone(zones.UK),
    };

    function isWithin28Nov(dt) {
      const start = dt.set({
        year: dt.year,
        month: 11,
        day: 26,
        hour: 0,
        minute: 0,
        second: 0,
      });
      const end = start.plus({ days: 1 });
      return dt >= start && dt < end;
    }

    // NZ check
    if (
      isWithin28Nov(regionTimes.NZ) &&
      currentOrigin === "https://www.firsttable.co.nz" &&
      (currentPath === "/" ||
        window._conv_page_type === "list" ||
        window._conv_page_type === "restaurant")
    ) {
      window.creT153TestActivated = 1;
      window._conv_q = window._conv_q || [];
      window._conv_q.push(["executeExperiment", "100050711"]);
      console.log("NZ Modal Test 153 Fired");
    }

    // AU check
    if (
      isWithin28Nov(regionTimes.AU) &&
      currentOrigin === "https://www.firsttable.com.au" &&
      (currentPath === "/" ||
        window._conv_page_type === "list" ||
        window._conv_page_type === "restaurant")
    ) {
      window.creT153TestActivated = 1;
      window._conv_q = window._conv_q || [];
      window._conv_q.push(["executeExperiment", "100050711"]);
      console.log("AU Modal Test 153 fired");
    }

    // UK check
    if (
      isWithin28Nov(regionTimes.UK) &&
      currentOrigin === "https://www.firsttable.co.uk" &&
      (currentPath === "/" ||
        window._conv_page_type === "list" ||
        window._conv_page_type === "restaurant")
    ) {
      window.creT153TestActivated = 1;
      window._conv_q = window._conv_q || [];
      window._conv_q.push(["executeExperiment", "100050711"]);
      console.log("UK Modal Test 153 Test");
    }
  });
})();
```

Task: All About Learning Press - ALL08 - Sitewide - Entry Modal
This script dynamically loads the **YouTube Iframe API** and initializes a **YouTube player**. It handles play state changes and allows custom settings for the video.

---

## **1️⃣ Load YouTube API Dynamically**

```jsx
/**
 * Loads the YouTube Iframe API dynamically if it is not already loaded.
 * Returns a Promise that resolves when the API is ready.
 */
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    // If API is already loaded, resolve immediately
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Callback for when YouTube API is ready
    window.onYouTubeIframeAPIReady = () => resolve();

    // Dynamically insert <script> tag to load YouTube API
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  });
}
```

**Explanation:**

- Checks if the API is already available.
- If not, it injects the official YouTube API script.
- Uses a `Promise` so initialization waits until the API is ready.

---

## **2️⃣ Initialize YouTube Player**

```jsx
/**
 * Initializes a YouTube player in a given container.
 * @param {string} containerId - The ID of the div where the player should appear.
 * @param {string} videoId - YouTube video ID to play.
 * @returns {YT.Player} - The initialized YouTube player instance.
 */
async function initYouTubePlayer(containerId, videoId) {
  await loadYouTubeAPI();

  const player = new YT.Player(containerId, {
    height: "100%",
    width: "100%",
    videoId: videoId,
    playerVars: {
      autoplay: 0, // Don't autoplay
      controls: 1, // Show player controls
      rel: 0, // Disable related videos at the end
      modestbranding: 1, // Minimal YouTube branding
      playsinline: 1, // Play inline on mobile
      fs: 1, // Enable fullscreen button
      iv_load_policy: 3, // Disable annotations
    },
    events: {
      onReady: (event) => {
        console.log("YouTube player is ready");
      },
      onStateChange: (event) => {
        handleVideoStateChange(event.data);
      },
    },
  });

  return player;
}
```

**Explanation:**

- Initializes the player in the specified container div.
- `playerVars` allows full control over how the video behaves.
- Events like `onReady` and `onStateChange` can be used to trigger custom actions.

---

## **3️⃣ Handle Video State Changes**

```jsx
/**
 * Handles different YouTube player states.
 * @param {number} state - Current player state from YT.PlayerState
 */
function handleVideoStateChange(state) {
  if (state === YT.PlayerState.PLAYING) {
    console.log("Video is playing");
  } else if (state === YT.PlayerState.ENDED) {
    console.log("Video ended");
  } else if (state === YT.PlayerState.PAUSED) {
    console.log("Video paused");
  }
}
```

**Explanation:**

- `YT.PlayerState.PLAYING` → Video started.
- `YT.PlayerState.ENDED` → Video ended.
- `YT.PlayerState.PAUSED` → Video paused.
- You can use this to show/hide custom UI, track analytics, etc.

---

## **4️⃣ Example Usage**

```html
<!-- Container where YouTube video will appear -->
<div id="my-youtube-player" style="width:560px; height:315px;"></div>

<script>
  (async function () {
    // Initialize player
    const player = await initYouTubePlayer("my-youtube-player", "pi5mQ4zjzLY");
  })();
</script>
```

**Explanation:**

- Create a div with an `id` where the player will render.
- Call `initYouTubePlayer` with that div ID and the desired YouTube `videoId`.
- The API loads automatically if needed.

---

### ✅ **Key Features**

1. **Dynamic API load** → avoids multiple script inclusions.
2. **Customizable player options** → autoplay, controls, branding, annotations, fullscreen.
3. **State tracking** → play, pause, ended.
4. **Reusable** → just call `initYouTubePlayer()` with any container and video ID.

Test: WinkBeds - WIN171 - Shop Page - Animated Cooling Section

In this example, the goal was to **activate an experiment** only when the user scrolls to a specific section on the page (here, the review section). This approach ensures the test doesn’t run immediately on page load, which is more realistic for user interactions.

---

## 🔹 **1. Wait for the Element to Exist**

Sometimes the section might not be rendered immediately (due to lazy-loading or SPA behavior), so first, I use a **waitForElement** helper:

```jsx
function waitForElement(selector, trigger) {
  var interval = setInterval(function () {
    if (
      document &&
      document.querySelector(selector) &&
      document.querySelectorAll(selector).length > 0
    ) {
      clearInterval(interval);
      trigger();
    }
  }, 50);

  setTimeout(function () {
    clearInterval(interval);
  }, 15000);
}
```

**Key points:**

- Checks the DOM repeatedly until the element exists.
- Times out after 15 seconds to prevent infinite loops.

---

## 🔹 **2. Use IntersectionObserver to Detect When the Section Comes Into View**

`IntersectionObserver` allows us to **detect when a DOM element enters the viewport**, without using scroll listeners that run on every pixel scroll (which is inefficient).

```jsx
var observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Section is visible
        if (!window.experiment114AlreadyActivated) {
          window.experiment114AlreadyActivated = true;

          // Activate the experiment
          activateExperiment();

          // Fire a goal for tracking
          fireGoalCode();
        }

        // Stop observing once triggered
        observer.disconnect();
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the section is visible
  },
);
```

**Key points:**

- `entries` contains all observed elements’ intersection states.
- `entry.isIntersecting` becomes `true` when the section enters the viewport.
- `threshold: 0.1` means the callback triggers when 10% of the section is visible.
- `observer.disconnect()` stops further observation after triggering.

---

## 🔹 **3. Activate the Test and Fire Goals**

Once the section is visible:

```jsx
function activateExperiment() {
  window.test_114_Experiment = 1;
  window._conv_q = window._conv_q || [];
  window._conv_q.push(["executeExperiment", "100344982"]);
  console.log("test 114 activated");
}

function fireGoalCode() {
  window._conv_q = window._conv_q || [];
  _conv_q.push(["triggerConversion", "100329757"]);
}
```

**Key points:**

- Activates the experiment dynamically.
- Fires a tracking goal when the user reaches the section.
- Ensures the experiment only runs **once per session** using `window.experiment114AlreadyActivated`.

---

## 🔹 **4. Put It All Together**

```jsx
if (
  window.location.href.includes("https://www.winkbeds.com") &&
  window.location.pathname == "/pages/shop-winkbed"
) {
  waitForElement("#shopify-section-testimonials", init);
}
```

**Key points:**

- Only runs the experiment on the specific page.
- Waits for the review section to exist, then observes it.

---

## 🔹 **Why This Approach is Perfect for A/B Testing**

1. **Lazy-load safe:** Works even if the section appears late in the DOM.
2. **Efficient:** IntersectionObserver is optimized by the browser — no heavy scroll event handlers.
3. **Single trigger:** Ensures the experiment runs **only once** when the user reaches the target section.
4. **Accurate engagement:** Tracks meaningful interaction (scrolling to the section) instead of page load.
5. **Safe for multiple experiments:** Guards like `window.experiment114AlreadyActivated` prevent conflicts with other tests.

(function () {
try {
var debug = 1;
var variation_name = "cre-t-111";

    function waitForElement(selector, callback) {
      var interval = setInterval(function () {
        if (document.querySelector(selector)) {
          clearInterval(interval);
          callback();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    function live(selector, event, callback, context) {
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      this &&
        this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                i = -1;
              while (nodes[++i] && nodes[i] != node);
              return !!nodes[i];
            };
        })(Element.prototype);

      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }
    // Create Exit Intent functionality
    // Swiper JS
    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    async function fetchRegionAndRestaurants() {
      var originID;
      const slug = window.location.pathname;
      if (window.location.origin === "https://www.firsttable.co.nz") {
        originID = 1;
      }
      if (window.location.origin === "https://www.firsttable.com.au") {
        originID = 2;
      }
      if (window.location.origin === "https://www.firsttable.co.uk") {
        originID = 8;
      }

      // 1. Fetch regionId using City query
      const regionResponse = await fetch("https://stellate.firsttable.net/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "x-graphql-client-name": "Website",
          "x-graphql-client-version": "https://www.firsttable.co.nz/",
          stage: "Live",
        },
        body: JSON.stringify({
          query: `
        query City($siteId: Int, $slug: String) {
          City(siteId: $siteId, slug: $slug) {
            regionId
            id
          }
        }
      `,
          variables: {
            siteId: originID,
            slug: slug,
          },
        }),
      });

      const regionData = await regionResponse.json();
      const regionId = regionData?.data?.City?.regionId;
      const suburb = regionData?.data?.City?.id;

      if (!regionId) {
        console.error("Region ID not found");
        return;
      }

      if (regionId === suburb) {
        var restaurantResponse = await fetch("https://stellate.firsttable.net/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "x-graphql-client-name": "Website",
            "x-graphql-client-version": "https://www.firsttable.co.nz/",
            stage: "Live",
          },
          body: JSON.stringify({
            query: `
        query PaginatedRestaurants(

$regionId: Int,
$suburbs: [Int],
$tags: [Int],
$sort: RestaurantSortTypes,
$features: [RestaurantFilterTypes],
$sessions: [SessionTypes],
$dates: [String],
$nearTo: NearToInput,
$limit: Int,
$offset: Int,
$ids: [Int],
$sortSeed: String,
$offersSession: [SessionTypes]
) {
paginatedRestaurants(
input: {
prioritiseByAvailability: {forSession: $sessions, onDate: $dates},
status: [LIVE, ON_HOLD],
regionId: $regionId,
suburbs: $suburbs,
tags: $tags,
sort: $sort,
features: $features,
nearTo: $nearTo,
id: $ids,
sortSeed: $sortSeed,
offersSession: $offersSession
}
limit: $limit
offset: $offset
) {
pageInfo {
totalCount
hasNextPage
hasPreviousPage
}
nodes {
...RestaurantFragment
}
}
}

fragment RestaurantFragment on Restaurant {
**typename
id
configurationJSON
firstTableSessionTypes
regularTableSessionTypes
title
menuTitle
rating
approvedReviewsCount
acceptsAmex
bookingPricesBySession {
**typename
title
price
rrp
isSpecial
}
showBookingPriceLabel
regionRanking
specialConditions
isNew
featuredText
timeZone
status
onHoldText
additionalPeopleAllowed
lat
lng
offersFirstTable
offersRegularTable
potentialPoints {
**typename
key
value
}
slug
configurationJSON
suburb {
...RestaurantLocationFragment
}
region {
...RestaurantLocationFragment
}
tags {
**typename
nodes {
...RestaurantTagFragment
}
}
cuisines {
edges {
node {
...RestaurantCuisineFragment
}
}
}
gallery
firstTableSessionTypes
regularTableSessionTypes
sessionTypes
}

fragment RestaurantLocationFragment on City {
\_\_typename
id
menuTitle
slug
}

fragment RestaurantTagFragment on RestaurantTag {
\_\_typename
id
title
category
}

fragment RestaurantCuisineFragment on RestaurantCuisine {
id
title
}

`,
            variables: {
              regionId: regionId,
              suburbs: [],
              tags: [],
              features: [],
              offersSession: ["DINNER", "DINNER2"],
              sort: `RANKING`,
              limit: 10,
              offset: 0,
              sortSeed: "121789",
            },
          }),
        });
      } else {
        var restaurantResponse = await fetch("https://stellate.firsttable.net/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "x-graphql-client-name": "Website",
            "x-graphql-client-version": "https://www.firsttable.co.nz/",
            stage: "Live",
          },
          body: JSON.stringify({
            query: `
query PaginatedRestaurants(
$regionId: Int,
$suburbs: [Int],
$tags: [Int],
$sort: RestaurantSortTypes,
$features: [RestaurantFilterTypes],
$sessions: [SessionTypes],
$dates: [String],
$nearTo: NearToInput,
$limit: Int,
$offset: Int,
$ids: [Int],
$sortSeed: String,
$offersSession: [SessionTypes]
) {
paginatedRestaurants(
input: {
prioritiseByAvailability: {forSession: $sessions, onDate: $dates},
status: [LIVE, ON_HOLD],
regionId: $regionId,
suburbs: $suburbs,
tags: $tags,
sort: $sort,
features: $features,
nearTo: $nearTo,
id: $ids,
sortSeed: $sortSeed,
offersSession: $offersSession
}
limit: $limit
offset: $offset
) {
pageInfo {
totalCount
hasNextPage
hasPreviousPage
}
nodes {
...RestaurantFragment
}
}
}

fragment RestaurantFragment on Restaurant {
**typename
id
configurationJSON
firstTableSessionTypes
regularTableSessionTypes
title
menuTitle
rating
approvedReviewsCount
acceptsAmex
bookingPricesBySession {
**typename
title
price
rrp
isSpecial
}
showBookingPriceLabel
regionRanking
specialConditions
isNew
featuredText
timeZone
status
onHoldText
additionalPeopleAllowed
lat
lng
offersFirstTable
offersRegularTable
potentialPoints {
**typename
key
value
}
slug
configurationJSON
suburb {
...RestaurantLocationFragment
}
region {
...RestaurantLocationFragment
}
tags {
**typename
nodes {
...RestaurantTagFragment
}
}
cuisines {
edges {
node {
...RestaurantCuisineFragment
}
}
}
gallery
firstTableSessionTypes
regularTableSessionTypes
sessionTypes
}

fragment RestaurantLocationFragment on City {
\_\_typename
id
menuTitle
slug
}

fragment RestaurantTagFragment on RestaurantTag {
\_\_typename
id
title
category
}

fragment RestaurantCuisineFragment on RestaurantCuisine {
id
title
}

`,
            variables: {
              regionId: regionId,
              suburbs: [suburb],
              tags: [],
              features: [],
              offersSession: ["DINNER", "DINNER2"],
              sort: `RANKING`,
limit: 10,
offset: 0,
sortSeed: "121789",
},
}),
});
}

      const restaurantData = await restaurantResponse.json();

      const restaurantList = restaurantData.data.paginatedRestaurants.nodes;

      return restaurantList;
    }

    function setBmCookie() {
      document.cookie = "cre-t-111=cre-t-111-modal-triggered; path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }

    function removeContentSetCookie() {
      document.querySelector(".cre-t-111-modal-CRE111").remove();
      setBmCookie();
    }

    /* load swiper library */
    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }

    if (!window.CRE111_SLIDER_SCRIPT) {
      addScript();
      window.CRE111_SLIDER_SCRIPT = true;
    }

    function sliderInitCRE111() {
      waitForSwiper(function () {
        var creSwiper111 = new Swiper(`.swiper.mainSwiper111`, {
          slidesPerView: 3, // default
          spaceBetween: 20,
          allowTouchMove: true,
          slideToClickedSlide: false,
          speed: 600,
          loop: false,
          navigation: {
            nextEl: `.swiper-button-next.cre-t-111-swiper-button-next`,
            prevEl: `.swiper-button-prev.cre-t-111-swiper-button-prev`,
          },
          breakpoints: {
            0: {
              // ex small device
              slidesPerView: 1.5,
              spaceBetween: 8,
            },
            360: {
              // 360px+ device
              slidesPerView: 1.75,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          },
        });
      });
    }

    var modalLoader = `<div class="cre-t-111-modal-loader-wrapper">
    <div class="cre-t-111-modal-header">
        <div class="cre-t-111-modal-heading">

            <span class="cre-t-111-menuTitle">Loading Restaurants</span>…
        </div>
        <div class="cre-t-111-modal-subheading">
            <div class="cre-t-111-modal-heading-1">
                Book now to <span class="cre-t-111-modal-boldText">save 50% on food</span> at these popular restaurants.
            </div>
            <div class="cre-t-111-modal-heading-2">Be quick, as they won’t last.</div>
        </div>
    </div>

    <div class="cre-t-111-modal-loader">
        ${Array(3)
          .fill(0)
          .map(
            () => `
        <div class="cre-t-111-top-restaurants-card loader-card">
            <div class="cre-t-111-top-restaurants-card-image-wrapper skeleton"></div>
            <div class="cre-t-111-top-restaurants-card-content">
                <div class="skeleton skeleton-text" style="width: 70%; height: 14px;"></div>
                <div class="skeleton skeleton-text" style="width: 50%; height: 12px; margin-top:6px;">
                </div>
                <div class="skeleton skeleton-text" style="width: 40%; height: 12px; margin-top:6px;">
                </div>
            </div>
        </div>
        `
          )
          .join("")}
    </div>

</div>`;

    async function createModal() {
      // Show restaurant cards immediately with a loading message, while hiding modal heading
      var modalHTML = `<div class="cre-t-111-modal-CRE111" style="display: none;">
    <div class="cre-t-111-modal-overlay"></div>
    <div class="cre-t-111-modal-container">
        <div class="cre-t-111-modal-wrapper">
            <div class="cre-t-111-cross">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                        d="M2.1868 18L0.452148 16.2L7.39074 9L0.452148 1.8L2.1868 0L9.12538 7.2L16.064 0L17.7986 1.8L10.86 9L17.7986 16.2L16.064 18L9.12538 10.8L2.1868 18Z"
                        fill="#D8DBDF" />
                </svg>
            </div>

            <div class="cre-t-111-modal-main">
                <div class="cre-t-111-modal-content">

                    <!-- Initially show loader -->
                    ${modalLoader}

                </div>
            </div>
        </div>
    </div>

</div>`;

      var existModal = document.querySelector(".cre-t-111-modal-CRE111");
      if (!existModal && window.top === window.self) {
        document.body.insertAdjacentHTML("beforeend", modalHTML);
      }

      // Fetch the restaurant data in the background
      var restaurants = await fetchRegionAndRestaurants();

      // Once the restaurant data is ready, hide the loader and update the content
      if (restaurants?.length > 0) {
        // Hide the loader
          var loader = document.querySelector(".cre-t-111-modal-loader-wrapper");
          if (loader) loader.classList.add("loader-hide");

        // Now populate the modal content with the actual data
        var modalContent = `<div class="cre-t-111-modal-header">
      <div class="cre-t-111-modal-heading">
        <span class="cre-t-111-modal-highlight">Most popular</span> in
        <span class="cre-t-111-menuTitle">${restaurants[0]?.region?.menuTitle}</span>…
      </div>
      <div class="cre-t-111-modal-subheading">
        <div class="cre-t-111-modal-heading-1">
          Book now to <span class="cre-t-111-modal-boldText">save 50% on food</span> at these popular restaurants.
        </div>
        <div class="cre-t-111-modal-heading-2">Be quick, as they won’t last.</div>
      </div>
    </div>
    <div class="cre-t-111-top-restaurants-slider-container">
      <div class="swiper cre-t-111-swiper mainSwiper111">
        <div class="swiper-wrapper ${restaurants?.length <= 2 ? "swiper-wrapper-center" : ""}">
          ${restaurants
            .map(
              (restaurant, index) => `
              <div class="cre-t-111-top-restaurants-card card${index + 1} swiper-slide">
                <a href="${restaurant?.slug}">
                  <div class="cre-t-111-top-restaurants-card-image-wrapper">
                    <img class="cre-t-111-top-restaurants-card-image" src="https://images.firsttable.net/${restaurant?.gallery}" alt="${restaurant?.title}" />
                  </div>
                  <div class="cre-t-111-top-restaurants-card-content">
                    <div class="cre-t-111-top-restaurants-card-restaurant-name">${restaurant?.title}</div>
                    <div class="cre-t-111-top-restaurants-card-restaurant-rating ${restaurant?.rating < 1 ? "notShow" : ""}">
                      <span class="cre-t-111-top-restaurants-card-restaurant-rating-value">${restaurant?.rating.toFixed(1)}</span>
                      <div class="cre-t-111-top-restaurants-card-restaurant-rating-stars">
                        <img class="cre-t-111-star-img" src="${getStarImage(restaurant?.rating.toFixed(1))}" alt="star" />
                      </div>
                      <span class="cre-t-111-top-restaurants-card-restaurant-rating-count">(${restaurant?.approvedReviewsCount})</span>
                    </div>
                    <div class="cre-t-111-top-restaurants-card-restaurant-location">
                      <div class="cre-t-111-top-restaurants-card-restaurant-location-icon">
                        <img class="cre-t-111-location-img" src="https://cdn-3.convertexperiments.com/uf/10007679/10007713/location-icon_68bab09f93336.svg" alt="location" />
                      </div>
                      <div class="cre-t-111-top-restaurants-card-restaurant-location-text">${restaurant?.suburb?.menuTitle}</div>

                    </div>
                    <div class="cre-t-111-top-restaurants-card-restaurant-cuisines">
    <div class="cre-t-111-top-restaurants-card-restaurant-cuisine-icon">
        <img class="cre-t-111-cuisine-img"
            src="https://cdn-3.convertexperiments.com/uf/10007679/10007713/resturant-icon_68bab0ba19146.svg"
            alt="cuisine" />
    </div>
    <div class="cre-t-111-top-restaurants-card-restaurant-cuisine-text">
        ${restaurant?.cuisines?.edges[0]?.node?.title}</div>

</div>
                  </div>

                </a>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
      <div class="cre-t-111-modal-footer">
            <a
            href="${window.location.origin}${restaurants[0].region.slug}/?sort=RANKING"
            class="cre-t-111-modal-cta"
          >

          See all of ${restaurants[0]?.region?.menuTitle} most popular <span class="cre-t-111-modal-arrowtext">restaurants</span>

          </a>
                </div>
      <div class="swiper-button-prev cre-t-111-swiper-button-prev"></div>
      <div class="swiper-button-next cre-t-111-swiper-button-next"></div>
    </div>

    `;

        // Update modal content without inserting it again
        waitForElement(".cre-t-111-modal-content", function () {
          var SliderWrapper = document.querySelector(".cre-t-111-modal-content");
          if (SliderWrapper) {
            SliderWrapper.insertAdjacentHTML("beforeend", modalContent);
          }
        });

        // Initialize the swiper slider
        sliderInitCRE111();
      }
    }

    var starImagesJSON = [
      { id: 0, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/0-star_68baafeaf13b1.svg" },
      { id: 1, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/1-star_68baaff7d241f.svg" },
      { id: 2, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/15-star_68bab002b32e6.svg" },
      { id: 3, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/2-star_68bab014a170e.svg" },
      { id: 4, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/25-star_68bab022e1360.svg" },
      { id: 5, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/3-star_68bab0331cf55.svg" },
      { id: 6, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/35-star_68bab0404fe66.svg" },
      { id: 7, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/35-star_68bab0404fe66.svg" },
      { id: 8, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/45-star_68bab06576691.svg" },
      { id: 9, src: "https://cdn-3.convertexperiments.com/uf/10007679/10007713/5-star_68bab07a159c1.svg" },
    ];

    function getStarImage(rating) {
      if (rating <= 0) return starImagesJSON[0].src;
      if (rating >= 5) return starImagesJSON[9].src;

      if (rating >= 1 && rating <= 1.2) return starImagesJSON[1].src;
      if (rating >= 1.3 && rating <= 1.7) return starImagesJSON[2].src;
      if (rating >= 1.8 && rating <= 2.2) return starImagesJSON[3].src;
      if (rating >= 2.3 && rating <= 2.7) return starImagesJSON[4].src;
      if (rating >= 2.8 && rating <= 3.2) return starImagesJSON[5].src;
      if (rating >= 3.3 && rating <= 3.7) return starImagesJSON[6].src;
      if (rating >= 3.8 && rating <= 4.2) return starImagesJSON[7].src;
      if (rating >= 4.3 && rating <= 4.7) return starImagesJSON[8].src;
      if (rating >= 4.8 && rating <= 4.9) return starImagesJSON[9].src;

      return starImagesJSON[0].src; // fallback
    }



    function initModal() {
      // Create modal if not exists
      if (!document.querySelector(".cre-t-111-modal-container")) {
        createModal();
        document.body.classList.add("cre-t-111-modal-open");
      }
    }

    function handleModalEvents() {
      live(".cre-t-111-cross, .cre-t-111-modal-overlay, .cre-t-111-top-restaurants-card, .cre-t-111-modal-cta", "click", function () {
        removeContentSetCookie();
      });
    }

    function init() {
      document.body.classList.add(variation_name);
      // initTest();

      var cookie = getCookie("cre-t-111");

      if (cookie != "cre-t-111-modal-triggered") {
        if (!window.CRE111_Goal) {
          live(".cre-t-111-modal-wrapper .cre-t-111-swiper-button-prev, .cre-t-111-modal-wrapper .cre-t-111-swiper-button-next", "click", function () {
            window._conv_q = window._conv_q || [];
            _conv_q.push(["triggerConversion", "100036593"]);

            window.CRE111_Goal = true;
          });
        }

        initModal();
        handleModalEvents();
      }
    }

    waitForElement("body", init);

} catch (e) {
if (debug) console.log(e, "Error in Test" + variation_name, e);
}
})();

Test: **Ode à la Rose - Test 48 - Product pages - Sticky footer**
A **dynamic sticky element** is an element (like a cart, CTA, or banner) that **sticks to the viewport** only when certain conditions are met. It adapts based on:

1. Scroll position
2. Element visibility
3. Device type (mobile vs desktop)
4. Thresholds (custom scroll values)

---

## **1. Key Concepts in the Code**

### **a) Threshold-based sticking (Mobile)**

```jsx
if (scrollTop >= mobileThreshold) {
  document.body.classList.add(stickyClass);
}
```

- On mobile, you often want the sticky behavior **after scrolling past a certain point**.
- Example: Sticky cart appears after user scrolls 850px down.

### **b) Element-out-of-view sticking (Desktop)**

```jsx
if (isOutOfViewport(element)) {
  document.body.classList.add(stickyClass);
}
```

- On desktop, the sticky element should appear **only when the original element scrolls out of the viewport**.
- Example: Sticky checkout appears when the default cart section is scrolled past.

### **c) Debouncing with `requestAnimationFrame`**

```jsx
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateSticky);
    ticking = true;
  }
}
```

- Prevents `updateSticky` from running too often on scroll events.
- Ensures smooth scrolling and avoids layout thrashing.

### **d) Device detection**

```jsx
function isMobile() {
  return window.innerWidth <= 767;
}
function isDesktop() {
  return window.innerWidth > 767;
}
```

- Mobile and desktop often need **different sticky logic**.
- Mobile: simple scroll threshold.
- Desktop: check element’s visibility in the viewport.

---

## **2. When to Use Dynamic Sticky**

1. **Sticky CTA / Cart / Checkout Buttons**
   - Use when you want a CTA to **follow the user only if they scroll past a key section**.
   - Ensures user always has access to the action without permanently obstructing content.
2. **Multi-section Pages**
   - Sticky behavior should only activate **once a section is left or a threshold is crossed**.
   - Example: “Book now” button appears after reading a product description.
3. **Responsive Designs**
   - Use different logic on mobile vs desktop.
   - On mobile, sticky behavior may be triggered by scroll depth.
   - On desktop, it’s safer to trigger sticky only when the original element is out of view.

---

## **3. Potential Obstacles / Gotchas**

### **a) SPA (Single Page Applications)**

- SPA pages don’t always reload, so you must **re-run sticky initialization when content updates**.
- Can solve by **observing DOM changes** (e.g., `MutationObserver`) to re-attach sticky behavior.

### **b) Multiple sticky elements**

- Applying a class to `<body>` is **safe if only one sticky element exists**.
- For multiple stickies, **apply the class directly to the element**.
- Always scope by unique class to avoid conflicts.

### **c) Dynamic content height**

- Sticky threshold or element position may **change dynamically** (e.g., images load, DOM changes).
- Solution: re-calculate on `resize` or after dynamic content loads.

```jsx
window.addEventListener("resize", updateSticky);
```

### **d) Performance**

- Continuous scroll checking can be heavy.
- `requestAnimationFrame` debouncing reduces CPU usage.

### **e) Mobile viewport quirks**

- Fixed/sticky elements may **overlap native UI** (like bottom navigation).
- Test on different devices and adjust offset/margin.

---

## **4. Best Practices**

1. **Use unique classes or IDs** for sticky triggers.
2. **Scope sticky logic to one element at a time** to prevent conflicts.
3. **Debounce scroll events** to avoid performance issues.
4. **Different behavior per device type** (mobile vs desktop).
5. **Recalculate on resize or dynamic content changes**.
6. **Test sticky offsets** carefully on different screen sizes.

Test: First Table - FST153 - Selected Pages - Black Friday Modal

### **Overview**

In this task, I learned **how to create a timed modal** that appears after a user stays on a page for a certain amount of time.

I also learned how to manage **modal visibility, cookies, sessionStorage, SPA behavior, event handling**, and prevent duplicate triggers.

---

# **Learned From This Task**

### **How to track user time on a page**

I learned that how can measure how long the user has been on a page using:

- `sessionStorage` → stores landing time
- `Date.now()` → gets current time
- A repeating **interval** → checks when time is up
- Compare Landing time & Current Time

### **How to show a modal at the perfect moment**

Instead of showing the modal immediately, I learned how to show it:

- After **20 seconds**
- Only **once per session**
- Only if the user did not see the modal before
- Only on specific pages (NZ / AU / UK regions)

This is a proper approach for CRO (Conversion Rate Optimization

### **How to use cookies and sessionStorage to control behavior**

I learned the difference:

- **Cookies** → prevent showing modal again even after refresh
- **sessionStorage** → prevent showing it again in the same tab

# **Obstacles I Faced and How I Solved Them**

### ❌ **Obstacle: Interval running again and again**

At first, the timer was running multiple times because I didn’t block it correctly.

### ✔ Solution:

Use sessionStorage:

```jsx
if (sessionStorage.getItem("cre_153_modalTriggered_already") === "true") {
  return;
}
```

This completely stops repeated triggers.

### **Obstacle: Modal appearing instantly on SPA pages**

Because SPA pages don’t reload, every route change could potentially insert the modal again.

### ✔ Solution:

- Keep modal HTML hidden by default (`display: none`)
- Insert HTML only once
- Just toggle CSS class when timer triggers
- Also I learned For SPA Sites when someone close the modal also remove it from the DOM

```jsx
function removeContentSetCookie() {
  document.querySelector(".cre-t-153-modal-main").remove();
  setBmCookie();
}
```

### How the Timed Modal Works

1. **Track User Landing Time**
   - When a user visits the page, we record the current time in **sessionStorage**.
   - Example:
     ```jsx
     var landingTime = Date.now();
     sessionStorage.setItem("cre_153_userLandingTime", landingTime);
     ```
2. **Set Trigger Time**
   - We define how many seconds to wait before showing the modal.
   - In this case, `trigger_seconds = 20` → modal will appear after 20 seconds.
   - Example:
     ```jsx
     var triggerTime = landingTime + trigger_seconds * 1000;
     ```
3. **Check Time Continuously**
   - We use a **1-second interval** to check if the current time has reached the trigger time.
   - Once the trigger time is reached, the modal is shown.
   - Example:
     ```jsx
     var intervalId = setInterval(() => {
       if (Date.now() >= triggerTime) {
         clearInterval(intervalId);
         modalInsertion();
       }
     }, 1000);
     ```
4. **Insert Modal HTML**
   - The modal HTML is added dynamically to the `<body>` using `insertAdjacentHTML`.
   - The modal includes overlay, content, images, text, and CTA buttons.

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-153";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (var index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },

        // Adding Class
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },

        // Waiting for element to load
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },

        live: function (selector, event, callback, context) {
          /****Helper Functions****/
          // helper for enabling IE 8 event bindings
          function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent("on" + type, handler);
            else el.addEventListener(type, handler);
          }
          // matches polyfill
          this.Element &&
            (function (ElementPrototype) {
              ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                  var node = this,
                    nodes = (node.parentNode || node.document).querySelectorAll(
                      selector,
                    ),
                    i = -1;
                  while (nodes[++i] && nodes[i] != node);
                  return !!nodes[i];
                };
            })(Element.prototype);
          // live binding helper using matchesSelector
          function live(selector, event, callback, context) {
            addEvent(context || document, event, function (e) {
              var found,
                el = e.target || e.srcElement;
              while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
              )
                el = el.parentElement;
              if (found) callback.call(el, e);
            });
          }
          live(selector, event, callback, context);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    function setBmCookie() {
      document.cookie = "cre-t-153=cre-t-153-modal-triggered; path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }

    function removeContentSetCookie() {
      document.querySelector(".cre-t-153-modal-main").remove();
      setBmCookie();
    }
    // Helper Library
    // Function to determine credit text based on domain
    function generateText(domain) {
      var twoDomainPara =
        "This Black Friday, score 50% off First Table dinner service fees, and treat yourself to good times and great food.";
      var singleDomainPara =
        "This Black Friday, score 50% off all First Table service fees, and treat yourself to good times and great food.";

      switch (domain) {
        case "www.firsttable.co.nz":
        case "firsttable.co.nz":
          return twoDomainPara; // NZ
        case "www.firsttable.com.au":
        case "firsttable.com.au":
          return twoDomainPara; // AU
        case "www.firsttable.co.uk":
        case "firsttable.co.uk":
          return singleDomainPara; // UK
        default:
          return twoDomainPara;
      }
    }

    function modalInsertion() {
      var getDomain = window.location.hostname;
      var modalParagraph = generateText(getDomain);
      var modalHTML = `<div class="cre-t-153-modal-main active" style="display: none;">
    <div id="cre-t-153-modal-overlay" class="cre-t-153-overlay"></div>
    <div class="cre-t-153-modal-content">
        <div class="cre-t-153-modal-badge-wrapper">
            <img src="https://v2.crocdn.com/FirstTable/blackFridayBadge.svg" alt="badge"
                class="cre-t-153-modal-badge">
        </div>
        <div class="cre-t-153-modal-cross-icon-wrapper">
            <img src="https://v2.crocdn.com/FirstTable/crossIcon.svg"
                alt="cross_icon" class="cre-t-153-cross-icon">
        </div>
        <div class="cre-t-153-modal-logo-wrapppr">
            <img src="https://v2.crocdn.com/FirstTable/logo.svg" alt=""
                class="cre-t-153-logo">
        </div>

        <div class="cre-t-153-main-title">
        <span class="cre-t-153-underLine">Get 50% off service fees</span>
        </div>
        <div class="cre-t-153-main-displayImage-wrapper">
            <img class="cre-t-153-displayImage"
                src="https://v2.crocdn.com/FirstTable/modalImage.png"
                alt="modalImage">
        </div>

        <div class="cre-t-153-text-area">
            <div class="cre-t-153-first-para">${modalParagraph}</div>
            <div class="cre-t-153-second-para">Applies only to bookings made on Friday 28 November 2025. Bookings can be for future dates.</div>
        </div>

        <div class="cre-t-153-modal-cta">
            <div class="cre-t-153-modal-cta-text">Book your 50% off table</div>
        </div>

    </div>
</div>`;
      if (!document.querySelector(".cre-t-153-modal-main")) {
        document.body.insertAdjacentHTML("afterbegin", modalHTML);
        window._conv_q = window._conv_q || [];
        _conv_q.push(["triggerConversion", "100037016"]);
      }
    }

    function modalHandler() {
      helper.live(
        ".cre-t-153-overlay, .cre-t-153-modal-cross-icon-wrapper, .cre-t-153-modal-cta",
        "click",
        function () {
          removeContentSetCookie();
        },
      );
    }

    var helper = _$();

    function startStayTimer() {
      if (sessionStorage.getItem("cre_153_modalTriggered_already") === "true") {
        return;
      }

      var session_key = "cre_153_userLandingTime";
      var trigger_seconds = 20;

      // Get landing time from sessionStorage or set new one
      var landingTime = parseInt(sessionStorage.getItem(session_key), 10);

      if (!landingTime) {
        landingTime = Date.now();
        sessionStorage.setItem(session_key, landingTime);
      }

      var triggerTime = landingTime + trigger_seconds * 1000;

      var intervalId = setInterval(() => {
        var now = Date.now();
        if (now >= triggerTime) {
          clearInterval(intervalId);
          var currentOrigin = window.location.origin;
          var currentPath = window.location.pathname;
          if (
            (currentOrigin === "https://www.firsttable.co.nz" &&
              (currentPath === "/" ||
                window._conv_page_type === "list" ||
                window._conv_page_type === "restaurant")) ||
            (currentOrigin === "https://www.firsttable.com.au" &&
              (currentPath === "/" ||
                window._conv_page_type === "list" ||
                window._conv_page_type === "restaurant")) ||
            (currentOrigin === "https://www.firsttable.co.uk" &&
              (currentPath === "/" ||
                window._conv_page_type === "list" ||
                window._conv_page_type === "restaurant"))
          ) {
            modalInsertion();
            sessionStorage.setItem("cre_153_modalTriggered_already", "true");
            document.body.classList.add("cre-t-153-modal-open");
          }
        }
      }, 1000);
    }

    /* Variation Init */
    function init() {
      _$("body").addClass(variation_name);
      if (!getCookie("cre-t-153")) {
        startStayTimer();
      }

      if (!window.EVENT_HANDLER_153) {
        modalHandler();
        window.EVENT_HANDLER_153 = true;
      }
    }

    /* Initialize variation */
    helper.waitForElement("html body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```

---

Test: Standard Scores - SSC32 - Payment Page - Complementary Review Checkbox

---

# 📘 Understanding Observer & Listener in SPA Sites

When I work on Single Page Applications (SPA), the page does **not fully reload**.

Instead:

- The URL changes using JavaScript (`pushState`, `replaceState`, hashchange)
- New elements appear dynamically
- Old elements get removed without a refresh

Because of this, I cannot rely on normal page-load events.

So I use two powerful tools:

✅ **Observer**

✅ **Listener**

Both solve different problems but work together.

---

# 🔍 1. What I Use Observer For

An **Observer** continuously watches the DOM and detects when a specific element appears.

### ✔ Code Example From My Script

```jsx
observeSelector("#negative-items-alert", function (el) {
  // Runs when the element appears
});
```

### ✔ How It Works (My Understanding)

- The SPA loads new elements after navigation
- The Observer keeps checking DOM changes
- When `#negative-items-alert` finally appears, the callback runs
- I can safely insert my custom content after that point

### ✔ When I Use Observer

I use an Observer when:

- The element **is added later** by JavaScript
- The SPA updates the DOM dynamically
- I need to modify or insert UI inside new components
- Page does NOT reload but content changes

### ✔ Observer Guard (Important)

To prevent **duplicate observers**:

```jsx
if (!window.creT32Observer) {
  window.creT32Observer = true;
  updateChanges();
}
```

- The first time, `window.creT32Observer` is undefined → I create the Observer
- Next runs see the flag → I skip creating a new Observer
- This prevents **duplicate DOM manipulations** and performance issues

### ✔ Example From This Test

I used the Observer for:

1. Detecting `#negative-items-alert` → injecting custom alert box
2. Detecting `#step-payments` → inserting a checkbox

Both elements do **not** exist on initial load, so Observer is the perfect solution.

---

# 🎧 2. What I Use Listener For

A **Listener** helps me detect SPA navigation changes.

SPA platforms often use:

- `history.pushState`
- `history.replaceState`
- URL hash (`#/dashboard`)

These do NOT trigger normal page-load events.

So I manually trigger a custom event: `locationchange`.

### ✔ Code Example From My Script

```jsx
window.addEventListener("locationchange", function () {
  // Runs on SPA navigation
});
```

Inside the listener, I also override pushState & replaceState:

```jsx
history.pushState = ((f) =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(history.pushState);
```

### ✔ When I Use Listener

I use a Listener when:

- The SPA changes “pages” without reload
- I need to add or remove UI on route change
- I want to reset or clean up changes when user navigates
- URL changes should trigger my script

### ✔ Listener Guard (Important)

I also prevent multiple listeners from being added:

```jsx
if (!window.creT32Listener) {
  window.creT32Listener = true;
  listener(); // Initialize listener only once
}
```

- First run → listener attached
- Next runs → flag is `true`, skip attaching again
- Prevents **duplicate events** and unnecessary processing

### ✔ Example From This Test

I used the Listener to:

- Remove the alert box when the user navigates to:
  `#/dashboard`, `#/`, `#/credit-report`

This prevents UI from staying on the wrong page.

---

# 🆚 Observer vs Listener — My Decision Guide

| Situation                               | I Use Observer | I Use Listener |
| --------------------------------------- | -------------- | -------------- |
| Element appears later in DOM            | ✅ Yes         | ❌ No          |
| SPA changes URL (pushState/hash)        | ❌ No          | ✅ Yes         |
| Component loads after AJAX request      | ✅ Yes         | ❌ No          |
| I must remove UI when navigating        | ❌ No          | ✅ Yes         |
| Detect dynamic content inside a section | ✅ Yes         | ❌ No          |
| Detect route change                     | ❌ No          | ✅ Yes         |

---

# 🧠 My Easy Rule

### ✔ For DOM changes → **Observer**

I use it when I need:

“Run code when an element appears.”

### ✔ For URL changes → **Listener**

I use it when I need:

“Run code when page navigation happens.”

Both are essential in SPA environments.

---

# 🧩 Why Guards Matter

Both Observer and Listener can accidentally run **multiple times** in SPAs.

To avoid:

- Duplicate Observers
- Duplicate event handlers
- Performance issues

I **always use a `window` flag** for both:

```jsx
window.creT32Observer = true;
window.creT32Listener = true;
```

This ensures my scripts run **only once per page session**.

---

---

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-32";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();

    function live(selector, event, callback, context) {
      /****Helper Functions****/
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(
                  selector,
                ),
                i = -1;
              while (nodes[++i] && nodes[i] != node);
              return !!nodes[i];
            };
        })(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (
            el &&
            el.matches &&
            el !== context &&
            !(found = el.matches(selector))
          )
            el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return false;
    }

    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    function observeSelector(selector, callback, options = {}) {
      const document = options.document || window.document;
      const processed = new Map();

      if (options.timeout || options.onTimeout) {
        throw `observeSelector options \`timeout\` and \`onTimeout\` are not yet implemented.`;
      }

      let obs;
      let isDone = false;

      const done = () => {
        if (obs) obs.disconnect();
        isDone = true;
      };

      const processElement = (el) => {
        if (!processed.has(el)) {
          processed.set(el, true);
          callback(el);
          if (options.once) {
            done();
            return true;
          }
        }
        return false;
      };

      const lookForSelector = () => {
        const elParent = document.documentElement;
        if (elParent.matches(selector) || elParent.querySelector(selector)) {
          const elements = elParent.querySelectorAll(selector);
          elements.forEach((el) => processElement(el));
        }
      };

      const debouncedLookForSelector = debounce(() => {
        lookForSelector();
      }, 100);

      // Initial check for the selector on page load
      lookForSelector();

      if (!isDone) {
        obs = new MutationObserver(() => {
          debouncedLookForSelector();
        });

        obs.observe(document, {
          attributes: false,
          childList: true,
          subtree: true,
        });
      }

      return done;
    }

    function listener() {
      window.addEventListener("locationchange", function () {
        const getPathName = window.location.hash;
        if (
          getPathName != "#/dashboard" &&
          getPathName != "#/" &&
          getPathName != "#/credit-report"
        ) {
          if (document.querySelector(".cre-t-32-alert-box-container")) {
            document.querySelector(".cre-t-32-alert-box-container").remove();
          }
        }
      });
      history.pushState = ((f) =>
        function pushState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("pushstate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        })(history.pushState);
      history.replaceState = ((f) =>
        function replaceState() {
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event("replacestate"));
          window.dispatchEvent(new Event("locationchange"));
          return ret;
        })(history.replaceState);
      window.addEventListener("popstate", function () {
        window.dispatchEvent(new Event("locationchange"));
      });
    }
    function updateChanges() {
      observeSelector("#negative-items-alert", function (el) {
        document.body.classList.add("cre-t-32-loaded");
        const newAlertBox = `<div class="cre-t-32-alert-box-container">
    <div class="cre-t-32-alert-box-wrapper">
        <div class="cre-t-32-alert-box-cross-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </div>
        <div class="cre-t-32-alert-box-main">
            <h3 class="cre-t-32-alert-title">Alert</h3>
            <div class="cre-t-32-alert-description">
                <div class="cre-t-32-alert-paragraph firstPara">
                    We’ve identified items that may be hurting your score.
                </div>
                <div class="cre-t-32-alert-paragraph secondPara">
                  Call now for your complimentary review—a credit specialist will walk you through each item and explain how it can be disputed and potentially removed.
                </div>
            </div>
            <a href=${document.querySelector("#negative-items-alert a").href} class="w-full block text-center px-3 py-4 text-[26px] leading:[38px] md:text-[34px] md:leading-[46px] shadow-sm text-base-60 font-medium bg-amber-500 hover:bg-amber-600 rounded-md cre-t-32-cta"> Tap To Call </a>
        </div>
    </div>
</div>`;
        document
          .querySelector(`.cre-t-32-loaded  #negative-items-alert`)
          .insertAdjacentHTML("afterend", newAlertBox);
      });

      observeSelector("#step-payments", function (el) {
        document.body.classList.add("cre-t-32-checkBox-added");
        var inputHTML = `<div class="cre-t-32-checkbox-container" style="display: none;">
    <input type="checkbox" id="cre-t-32-checkbox" class="cre-t-32-checkbox" checked>
    <label for="cre-t-32-checkbox" class="cre-t-32-checkbox-label">
        <span class="cre-t-32-custom-checkbox"></span>
        Highlight issues on my credit report that may be impacting my score, and enable my optional free specialist
        review (recommended)
    </label>
</div>`;

        var getForm = document.querySelector(
          `.cre-t-32-checkBox-added #step-payments form>div.w-full>div.mt-5>div.grid`,
        );
        getForm.insertAdjacentHTML("afterend", inputHTML);
      });
    }

    /* Variation Init */
    function init() {
      helper.log("Log inside from init");
      _$("body").addClass(variation_name);

      if (getCookie("negative_items_alert_dismissed")) {
        return;
      }

      if (!window.creT32Observer) {
        window.creT32Observer = true;
        setTimeout(function () {
          updateChanges();
          live(".cre-t-32-alert-box-cross-icon", "click", function () {
            document.querySelector(".cre-t-32-alert-box-container").remove();
            document.querySelector("#negative-items-alert button").click();
          });
        }, 500);
      }
    }

    if (window.creT32Listener) {
      window.creT32Listener = true;
      setTimeout(function () {
        listener();
      }, 500);
    }

    /* Initialise variation */
    helper.waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

Test: WinkBeds - WIN161 - Sitewide - Exit Modal V2

## How I Learned to Trigger Exit-Intent Modals Using a Plugin

When I needed to trigger a modal **only when a user intends to leave a page**, I realized that manually calculating mouse movements or scroll behavior is tricky.

Instead, I used a **standard Exit-Intent plugin** (`exit-intent-js`) to reliably detect exit behavior.

### Plugin Link: https://www.jsdelivr.com/package/npm/exit-intent-js

---

## 🔹 What I Learned

1. **Loading a Plugin Dynamically**

   I load the exit-intent plugin only when the DOM is ready, using a `<script>` tag:

   ```jsx
   var script = document.createElement("script");
   script.src =
     "https://cdn.jsdelivr.net/npm/exit-intent-js@1.2.0/src/exit-intent.min.js";
   document.head.appendChild(script);
   script.onload = function () {
     console.log("script loaded");
   };
   ```

   - This ensures the script loads asynchronously
   - I avoid errors if the plugin isn’t available initially

2. **Configuring the Exit-Intent Behavior**

   I use the plugin’s `observeExitIntent` function:

   ```jsx
   observeExitIntent({
     idleTime: 20000,
     mouseLeaveDelay: 50,
     tabChange: true,
     scrollUpThreshold: { mobile: 200, desktop: 400 },
     mobileBreakpoint: 768,
     scrollUpInterval: 50,
     eventName: "cre-t-8-exit-intent",
   });
   ```

   What I learned from this configuration:
   - **idleTime** → Waits 20s before checking exit intent
   - **mouseLeaveDelay** → Detects when mouse leaves viewport
   - **tabChange** → Detects switching browser tabs
   - **scrollUpThreshold** → Detects user scrolling back up (exit intent on mobile/desktop)
   - **eventName** → The custom event fired when exit intent is detected

   This made exit detection **robust for both desktop and mobile users**.

3. **Listening to the Custom Event**

   ```jsx
   window.addEventListener("cre-t-8-exit-intent", (e) => {
     if (!getCookie("cre-t-161")) {
       if (window.creT161V2Activated) return;
       window._conv_q = window._conv_q || [];
       window._conv_q.push(["executeExperiment", "100347474"]);
       console.log("Test 161 v2 activated");
       window.creT161V2Activated = true;
     }
   });
   ```

   - I learned how to **trigger my modal only once** using a flag (`window.creT161V2Activated`)
   - Cookies help ensure the modal **does not show again for the same user**

4. **Avoiding Multiple Script Loads**
   - I check if the modal or trigger class already exists:

   ```jsx
   if (document.querySelector(".cre-t-161-trigger")) return;
   ```

   This prevents **duplicate modal triggers** if the script runs multiple times.

---

## 🔹 Obstacles I Faced

- **Manual exit detection is unreliable**: calculating mouse leaving the viewport, scroll direction, and tab switches is error-prone.
- **SPA behavior**: In single-page apps, navigating without full page reloads could trigger multiple modals if guards are not used.
- **Ensuring single activation**: I needed to use both a **window flag** and **cookies** to avoid showing the modal multiple times.
- **Mobile vs desktop differences**: Mobile exit intent is harder to detect, so scroll thresholds and breakpoints were necessary.

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-161-trigger";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }

    function addScript() {
      var script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/exit-intent-js@1.2.0/src/exit-intent.min.js";
      document.head.appendChild(script);
      script.onload = function () {
        console.log("script loaded");

        observeExitIntent({
          idleTime: 20000,
          mouseLeaveDelay: 50,
          tabChange: true,
          // windowBlur: true,
          scrollUpThreshold: {
            mobile: 200,
            desktop: 400,
          },
          mobileBreakpoint: 768,
          scrollUpInterval: 50,
          eventName: "cre-t-8-exit-intent",
        });

        window.addEventListener("cre-t-8-exit-intent", (e) => {
          if (!getCookie("cre-t-161")) {
            if (window.creT161V2Activated) return;
            window.test_161V2Experiment = 1;
            window._conv_q = window._conv_q || [];
            window._conv_q.push(["executeExperiment", "100347474"]);
            console.log("Test 161 v2 activated");
            window.creT161V2Activated = true;
          }
        });
      };
    }

    /* Variation Init */
    function init() {
      if (document.querySelector(".cre-t-161-trigger")) return;
      _$("body").addClass(variation_name);
      addScript();
    }

    /* Initialise variation */
    helper.waitForElement("body", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

Note: Make sure that whenever this plugin is used, any issue or feature allowing scrolling to the top also works on the desktop version.

Test: Custody X Change - Test 207 - App (mobile) - Collapsed menu

---

In this test, I implemented a system that **dynamically swaps navigation menu items** in a global navigation bar. The goal was to **add new “Parenting Plan” and “Messages” menu items** while preserving existing links and **keeping the correct active states**.

---

## **1️⃣ Core Features**

1. **Hide old links and inject new items**
   - Hide the original `/a/messages` and `/a/parenting-plan` links.
   - Insert new `Messages` and `Parenting Plan` `<li>` elements in the navigation.
   - Ensure these new elements appear **right after the original items**.
2. **Maintain active state**
   - If the user is on the `/a/messages` page, the new `Messages` item gets `router-link-active`.
   - Similarly, if the user is on `/a/parenting-plan`, the new `Parenting Plan` item becomes active.
   - Clicking between these new items swaps the `router-link-active` class dynamically.
3. **Event handling and conversion tracking**
   - Every click on these new links triggers conversion events.
   - Clicks on other menu items clear the active state.
4. **Responsive handling**
   - New items adjust their position on **resize** or **DOM changes**.
   - Uses intervals and timeout logic to make sure items always stay in correct order.

---

## **2️⃣ How the Code Works (Step-by-Step)**

### **A. Helper Library**

- `_$(selector)` is a **mini DOM helper**:
  - `.waitForElement(selector, callback)` waits for elements to appear.
  - `.addClass(className)` adds classes safely.
  - `.each(fn)` and `.eq(index)` allow iteration and selection.

### **B. Event Binding Helper**

- `live(selector, event, callback)`:
  - Attaches delegated event listeners.
  - Works even for dynamically inserted elements.
  - Polyfills `.matches()` for older browsers.

---

### **C. Preparing New Menu Items**

```jsx
var newPlanItem = `<li class="cre-t-207-new-plan">...</li>`;
var newMessageItem = `<li class="cre-t-207-new-msg">...</li>`;
```

- These are the new menu items to insert dynamically.
- Initially hidden, shown only when the script executes.

---

### **D. Collapse Overflow Menu**

- `collapseMenu()`:
  - If the menu has a “more” button and overflow state is saved in session storage:
    - Automatically opens the overflow menu.
    - Triggers a conversion event when user clicks the “more” button.

---

### **E. Event Handlers**

- `eventHandler()`:
  1. Clicking **new Messages link** → activates it, triggers the old link click, and removes `router-link-active` from Parenting Plan.
  2. Clicking **new Parenting Plan link** → activates it, triggers the old link click, and removes `router-link-active` from Messages.
  3. Clicking **any other menu link** → removes active class from new items.
  4. Clicking any menu item triggers a **conversion tracking event**.

---

### **F. Sync Active Class on Page Load**

- `syncActiveClass()` ensures that if the user reloads on `/a/messages` or `/a/parenting-plan`, the **new menu items reflect the correct active state**.

---

### **G. Swap Menu Logic**

- `swapMenu()`:
  - Hides original links.
  - Inserts new menu items **right after the original ones**.
  - Calls `handLingPosition()` to adjust positions in the DOM.

---

### **H. Position Handling**

- `handLingPosition()`:
  - Repositions new items **next to hidden originals**.
  - Uses interval for the first 5 seconds after page load to account for late DOM rendering.
  - Adds **resize event listener** to reposition items on window resize.

---

### **I. Variation Init**

- `init()`:
  - Adds a body class for the variation.
  - Calls `collapseMenu()`, `swapMenu()`, `syncActiveClass()`.
  - Initializes event handlers (only once).
- Script starts when the **“more” button** in the nav is ready (`waitForElement`).

---

## **3️⃣ Obstacles I Learned to Handle**

1. **Dynamic DOM**
   - Menu items may not be immediately available → handled with `waitForElement`.
2. **Responsive Behavior**
   - DOM reflows on resize or late loading → fixed with `resize` listener and interval repositioning.
3. **Active State Sync**
   - Need to maintain `router-link-active` state correctly across clicks and page reloads.
4. **Old Link Compatibility**
   - Clicking new items triggers old link clicks to preserve routing logic.
5. **Avoid Multiple Event Bindings**
   - Flags like `window.creTHandlerAdded` and `window.creTHandlerAdded207` prevent multiple bindings.

### Code

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-207";
    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    function live(selector, event, callback, context) {
      // helper for enabling IE 8 event bindings
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      // matches polyfill
      this &&
        this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(
                  selector,
                ),
                i = -1;
              while (nodes[++i] && nodes[i] != node);
              return !!nodes[i];
            };
        })(Element.prototype);
      // live binding helper using matchesSelector
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (
            el &&
            el.matches &&
            el !== context &&
            !(found = el.matches(selector))
          )
            el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    var helper = _$();

    var newPlanItem = `<li class="global-nav-list-item  left-item cre-t-207-new-plan" style="display: none;">
            <a   class="module-link icon-document cre-link ">
                <span  class="hidden-xs-parenting cre-t-207-hidden-xs">Parenting Plan</span>
                <span  class="visible-xs-block-parenting cre-t-207-visible-xs">Plan</span>
            </a>
        </li>`;

    var newMessageItem = `<li class="global-nav-list-item left-item cre-t-207-new-msg" style="display: none;">
        <span>
            <a class="module-link icon-envelope cre-link">Messages</a>
        </span>
    </li>`;

    // ***************************************Collapse Menu********************************************
    function collapseMenu() {
      helper.waitForElement(
        `html [data-path^="/"] .global-nav-list-item.more-button a`,
        function () {
          var menuToggle = document.querySelector(
            'html [data-path^="/"] .global-nav-list-item.more-button a',
          );
          var overflowState = sessionStorage.getItem("overflowMenuOpen");
          if (
            overflowState === "true" &&
            !sessionStorage.getItem("cre-t-207-test")
          ) {
            menuToggle && menuToggle.click();
            helper.waitForElement(
              'html [data-path^="/"] .global-nav-list-item.more-button a',
              function () {
                console.log("more clicked");
                menuToggle.addEventListener("mousedown", function () {
                  window._conv_q = window._conv_q || [];
                  _conv_q.push(["triggerConversion", "100035619"]);
                });
              },
              25,
              25000,
            );

            sessionStorage.setItem("cre-t-207-test", true);
          }
        },
        25,
        25000,
      );
    }

    function eventHandler() {
      // live 1
      live(".global-nav-list-item.cre-t-207-new-msg a", "click", function (e) {
        e.stopPropagation();
        var oldMsgLink = document.querySelector(
          '.global-nav-list-item a.module-link.icon-envelope[href="/a/messages"]',
        );
        if (oldMsgLink) {
          oldMsgLink.click();
        }

        var newMsgLink = document.querySelector(
          ".global-nav-list-item.cre-t-207-new-msg a",
        );
        newMsgLink?.classList.add("router-link-active");
        var newPlanLink = document.querySelector(
          ".global-nav-list-item.cre-t-207-new-plan a",
        );
        newPlanLink?.classList.remove("router-link-active");
      });

      // live 2
      live(".global-nav-list-item.cre-t-207-new-plan a", "click", function (e) {
        e.stopPropagation();
        var oldPlanLink = document.querySelector(
          '.global-nav-list-item a.module-link.icon-document[href="/a/parenting-plan"]',
        );
        if (oldPlanLink) {
          oldPlanLink.click();
        }

        var newPlanLink = document.querySelector(
          ".global-nav-list-item.cre-t-207-new-plan a",
        );
        newPlanLink?.classList.add("router-link-active");
        var newMsgLink = document.querySelector(
          ".global-nav-list-item.cre-t-207-new-msg a",
        );
        newMsgLink?.classList.remove("router-link-active");
      });

      // Remove router-link-active if user clicks on other global-nav-list-item links except .more-button
      live(
        ".global-nav-list-item a:not(.cre-t-207-new-msg a):not(.cre-t-207-new-plan a):not(.more-button a.module-link)",
        "click",
        function (e) {
          var newMsgLink = document.querySelector(
            ".global-nav-list-item.cre-t-207-new-msg a",
          );
          var newPlanLink = document.querySelector(
            ".global-nav-list-item.cre-t-207-new-plan a",
          );
          newMsgLink?.classList.remove("router-link-active");
          newPlanLink?.classList.remove("router-link-active");
        },
      );

      helper.waitForElement(
        'html [data-path^="/"] .global-nav-list-item',
        function () {
          var allMenu = document.querySelectorAll(
            'html [data-path^="/"] .global-nav-list-item',
          );
          allMenu.forEach((item) => {
            item.addEventListener("mousedown", function () {
              console.log("Any Link");
              window._conv_q = window._conv_q || [];
              _conv_q.push(["triggerConversion", "100035620"]);
            });
          });
        },
        25,
        25000,
      );
    }

    function syncActiveClass() {
      helper.waitForElement(
        'html [data-path^="/"] .global-nav-list-item.cre-t-207-new-plan a',
        function () {
          var newPlanLink = document.querySelector(
            ".global-nav-list-item.cre-t-207-new-plan a",
          );
          helper.waitForElement(
            'a[href="/a/parenting-plan"].router-link-active',
            function () {
              newPlanLink?.classList.add("router-link-active");
            },
            25,
            15000,
          );
        },
        25,
        3000,
      );

      helper.waitForElement(
        'html [data-path^="/"] .global-nav-list-item.cre-t-207-new-msg a',
        function () {
          var newMsgLink = document.querySelector(
            ".global-nav-list-item.cre-t-207-new-msg a",
          );
          helper.waitForElement(
            'a[href="/a/messages"].router-link-active',
            function () {
              newMsgLink?.classList.add("router-link-active");
            },
            25,
            15000,
          );
        },
        25,
        3000,
      );
    }

    function swapMenu() {
      helper.waitForElement(
        `html [data-path^="/"] .global-nav a[href="/a/messages"]`,
        function () {
          var messagesLink = document.querySelector('a[href="/a/messages"]');
          messagesLink?.closest("li")?.classList.add("cre-t-207-hide-msg");

          var planLink = document.querySelector('a[href="/a/parenting-plan"]');
          planLink?.closest("li")?.classList.add("cre-t-207-hide-plan");

          helper.waitForElement(
            ".cre-t-207-hide-msg, .cre-t-207-hide-plan",
            function () {
              var msgListItem = document.querySelector(".cre-t-207-hide-msg");
              var planListItem = document.querySelector(".cre-t-207-hide-plan");

              if (
                msgListItem &&
                !document.querySelector(".cre-t-207-new-plan")
              ) {
                msgListItem.insertAdjacentHTML("afterend", newPlanItem);
              }

              if (
                planListItem &&
                !document.querySelector(".cre-t-207-new-msg")
              ) {
                planListItem.insertAdjacentHTML("afterend", newMessageItem);
              }
              handLingPosition();
            },
            25,
            25000,
          );
        },
        25,
        25000,
      );
    }

    function handLingPosition() {
      function repositionElements() {
        var originalPlanItem = document.querySelector(".cre-t-207-hide-plan");
        var newMsgItem = document.querySelector(".cre-t-207-new-msg");

        if (originalPlanItem && newMsgItem) {
          var planParent = originalPlanItem.parentNode;
          if (planParent && newMsgItem !== originalPlanItem.nextSibling) {
            planParent.insertBefore(newMsgItem, originalPlanItem.nextSibling);
          }
        }

        var originalMsgItem = document.querySelector(".cre-t-207-hide-msg");
        var newPlanItem = document.querySelector(".cre-t-207-new-plan");

        if (originalMsgItem && newPlanItem) {
          var msgParent = originalMsgItem.parentNode;
          if (msgParent && newPlanItem !== originalMsgItem.nextSibling) {
            msgParent.insertBefore(newPlanItem, originalMsgItem.nextSibling);
          }
        }
      }

      helper.waitForElement(
        'html [data-path^="/"] .global-nav-list-item.cre-t-207-new-msg a',
        function () {
          // run once immediately after load

          if (!window.creTHandlerAdded207) {
            window.creTHandlerAdded207 = true;
            var interval = setInterval(() => {
              repositionElements();
            }, 250);

            setTimeout(() => {
              clearInterval(interval);
            }, 5000);
          }

          var resizeTimeout;
          window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(repositionElements, 300);
          });
        },
        25,
        25000,
      );
    }

    /* Variation Init */
    function init() {
      _$("body").addClass(variation_name);
      // console.log("class added");
      collapseMenu();
      swapMenu();
      syncActiveClass();
      // handLingPosition();
      if (!window.creTHandlerAdded) {
        eventHandler();
        window.creTHandlerAdded = true;
      }
    }

    /* Init variation */
    helper.waitForElement(
      `html [data-path^="/"] .global-nav-list-item.more-button a`,
      init,
      50,
      15000,
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

---

---

Task: **WinkBeds - WIN154 - Sitewide - Welcome Back Modal**

**Custom attributes, filters or triggers**

- Only fire to returning users with an item in their cart

---

## **1️⃣ waitForReturning(trigger, delayInterval, delayTimeout)**

```jsx
function waitForReturning(trigger, delayInterval, delayTimeout) {
  var interval = setInterval(function () {
    if (
      typeof convert.getUserData().browsing.returning === "boolean" &&
      convert.getUserData().browsing.returning === true
    ) {
      clearInterval(interval);
      trigger();
    }
  }, delayInterval);

  setTimeout(function () {
    clearInterval(interval);
  }, delayTimeout);
}
```

**What I Learned:**

- Learned how to detect **returning users** on a site using Convert’s `getUserData()` API.
- Learned to **poll continuously** with `setInterval` until a condition is true.
- Learned to **stop polling** with `clearInterval` and a timeout to avoid infinite loops.

**How It Works:**

1. Polls every `delayInterval` milliseconds to check if the visitor is returning.
2. Once detected as returning, executes the `trigger` function.
3. Stops polling after `delayTimeout` milliseconds if condition isn’t met.

**Obstacles / Considerations:**

- Returning user flag may take time to initialize; need proper polling.
- Polling too frequently can impact performance; polling too slowly may delay test activation.
- Must handle cases where user never returns (timeout).

---

## **2️⃣ fetchCart()**

```jsx
function fetchCart() {
  fetch("/cart.js")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    })
    .then((cart) => {
      if (cart.item_count > 0) {
        localStorage.setItem("cre-t-154-cart-data", JSON.stringify(cart));
        window.test_154Experiment = 1;
        console.log("Test 154 activated");
        window._conv_q = window._conv_q || [];
        window._conv_q.push(["executeExperiment", "100346984"]);
      }
    })
    .catch((error) => {
      console.error("Error fetching Shopify cart:", error);
    });
}
```

**What I Learned:**

- Learned to **fetch Shopify cart data** programmatically.
- Learned to **store data in localStorage** to persist cart info for the session.
- Learned how to **activate a Convert experiment dynamically** via `_conv_q.push()`.

**How It Works:**

1. Fetches `/cart.js` from Shopify to get the current cart JSON.
2. Checks if there are items (`item_count > 0`).
3. If yes:
   - Saves cart in `localStorage`.
   - Marks the test as active with `window.test_154Experiment`.
   - Triggers the Convert experiment using `_conv_q.push()`.

**Obstacles / Considerations:**

- Cart may be empty; test should not run for empty carts.
- Fetch failures must be handled to avoid breaking the page.
- Experiment should not trigger multiple times; must track activation state.

---

## **3️⃣ init()**

```jsx
function init() {
  waitForReturning(
    function () {
      var isTestAlreadyActivatedtest_154 = false;
      if (!isTestAlreadyActivatedtest_154) {
        fetchCart();
        isTestAlreadyActivatedtest_154 = true;
      }
    },
    50,
    15000,
  );
}
```

**What I Learned:**

- Learned to **combine returning user detection with cart validation** before activating the test.
- Learned to **control experiment activation** with a flag (`isTestAlreadyActivatedtest_154`) to avoid repeated triggers.
- Learned about timing issues: returning user detection + cart fetch may need precise delays.

**How It Works:**

1. Waits for the user to be detected as returning.
2. Checks if the test has already been activated.
3. If not, fetches cart and activates the experiment.

**Obstacles / Considerations:**

- If flag isn’t used, the experiment could activate multiple times.
- Must ensure that `fetchCart` is executed **after** the returning user is confirmed.
- Timeout in `waitForReturning` ensures the function doesn’t wait forever.

---

## Code

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-154-customTrigger";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    // typeof convert.getUserData().browsing.returning;

    function waitForReturning(trigger, delayInterval, delayTimeout) {
      var interval = setInterval(function () {
        if (
          typeof convert.getUserData().browsing.returning === "boolean" &&
          convert.getUserData().browsing.returning === true
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }

    var helper = _$();

    function fetchCart() {
      fetch("/cart.js")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch cart");
          }
          return response.json();
        })
        .then((cart) => {
          if (cart.item_count > 0) {
            localStorage.setItem("cre-t-154-cart-data", JSON.stringify(cart));

            window.test_154Experiment = 1;
            console.log("Test 154 activated");

            window._conv_q = window._conv_q || [];
            window._conv_q.push(["executeExperiment", "100346984"]);
          }
        })
        .catch((error) => {
          console.error("Error fetching Shopify cart:", error);
        });
    }

    /* Variation Init */
    function init() {
      waitForReturning(
        function () {
          var isTestAlreadyActivatedtest_154 = false;
          if (!isTestAlreadyActivatedtest_154) {
            fetchCart();
            isTestAlreadyActivatedtest_154 = true;
          }
        },
        50,
        15000,
      );
    }

    /* Initialise variation */
    helper.waitForElement("body", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

---

---

## Task: \*\*WinkBeds - WIN154 - Sitewide - Welcome Back Modal

1️⃣ setBmCookie()\*\*

```jsx
function setBmCookie() {
  document.cookie = "cre-t-154=cre-t-154-modal-triggered; path=/";
}
```

**Purpose & How It Works:**

- Sets a **cookie** indicating that the modal has been triggered.
- Ensures the modal does **not repeatedly show** to the same returning user.

**What I Learned:**

- Simple cookie creation is effective for tracking **one-time events**.
- Must set the correct `path` (`/`) to make the cookie available site-wide.

**Obstacles:**

- If the cookie expires too soon or is not set properly, the modal could trigger **multiple times** unexpectedly.

---

## **2️⃣ generateProductHTML(product)**

```jsx
function generateProductHTML(product) { ... }

```

```jsx
function renderProducts() {
  helper.waitForElement(
    ".cre-t-154-modal-products-wrapper",
    function () {
      var tenantId = "317ca30698d74c21b080bb2552d6854a";
      const productsWrapper = document.querySelector(
        ".cre-t-154-modal-products-wrapper",
      );

      var cartData = JSON.parse(localStorage.getItem("cre-t-154-cart-data"));

      const cartItems = cartData.items || [];
      // // Prepare skus array for the cart items
      if (cartItems.length > 0) {
        products.length = 0; // Clear the products array before adding new items

        // Push cart items into the products array
        cartItems.forEach(function (item) {
          const product = {
            name: item?.title,
            image: item?.image || "default_image_url", // Use a default image if not available
            price: item.discounted_price / 100, // Format price
            wasPrice: item?.presentment_price,
            discountAmount: item?.line_level_total_discount / 100,
          };

          // Add each item as a product
          products.push(product);

          if (products.length > 0) {
            setBmCookie();
            productsWrapper.innerHTML = products
              .map(generateProductHTML)
              .join("");
            var modalMain = document.querySelector(".cre-t-154-modal-main");
            products.length <= 1
              ? modalMain.classList.add("less-scale")
              : modalMain.classList.remove("less-scale");
          }
        });
      }

      var skus = [];

      cartItems.forEach(function (item) {
        skus.push({
          sku: item.sku || item.title,
          quantity: item.quantity,
          skuInventories: [
            {
              locationId: "manual",
              quantity: item.quantity,
            },
          ],
        });
      });

      // if (!skus.length) {
      //   console.warn("❌ Cart is empty.");
      //   return;
      // }

      var buyerZipCode = "10001";
      var sessionTrackId =
        localStorage.getItem("fenix-sessionId") ||
        Math.random().toString(36).substring(2, 15);
      var pageType = window.location.href.indexOf("cart") > -1 ? "Cart" : "PDP";
      var monetaryValue = cartData.total_price / 100;

      var payload = {
        sessionTrackId: sessionTrackId,
        buyerZipCode: buyerZipCode,
        monetaryValue: monetaryValue,
        pageType: "cart",
        responseFormat: "json",
        skus: skus,
      };

      fetch(
        "https://api-002.delest.fenixcommerce.com/winkbeds/fenixdelest/api/v2/deliveryestimates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            tenantId: tenantId,
          },
          body: JSON.stringify(payload),
        },
      )
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error("❌ Estimate request failed: " + text);
            });
          }
          return response.json();
        })
        .then((data) => {
          var deliveryData = data[0].response;
          const footerHTML = generateFooterHTML(deliveryData);
          console.log("footerHTML", footerHTML);
          helper.waitForElement(
            ".cre-t-154-modal-footer-placeholder",
            function () {
              document.querySelector(
                ".cre-t-154-modal-footer-placeholder",
              ).innerHTML = footerHTML;
            },
            25,
            25000,
          );
        });
    },
    50,
    15000,
  );
}
```

**Purpose & How It Works:**

- Returns an **HTML string** for a single product in the modal.
- Dynamically shows product image, name, price, and discount.
- Handles conditional logic for **discount display**.

**What I Learned:**

- Using template literals makes **dynamic HTML generation** simple.
- Conditional rendering inside templates allows flexibility (e.g., showing savings only if `discountAmount > 0`).

**Obstacles:**

- Must ensure all product properties exist to avoid errors (`product.image`, `product.price`).
- Formatting currency consistently requires dividing by 100 for Shopify cents.

---

## **3️⃣ generateFooterHTML(deliveryData)**

```jsx
function generateFooterHTML(deliveryData) { ... }
```

**Purpose & How It Works:**

- Processes delivery estimate data and returns **footer HTML** for the modal.
- Highlights specific words like `"Today"` or times like `"0 Hours 49 Minutes"` for better UI visibility.
- Uses **regular expressions** for text replacements.

**What I Learned:**

- Regex can dynamically format text for UI enhancements.
- Preserves HTML structure while highlighting important info.

**Obstacles:**

- Regex needs to be precise; otherwise, it could break HTML or fail to highlight text.
- Must handle variations in text format for delivery estimates.

---

## **4️⃣ eventHandler()**

```jsx
function eventHandler() { ... }

```

**Purpose & How It Works:**

- Adds **event listeners** for:
  - Closing the modal (`click` on close icon or overlay)
  - Opening **Gorgias live chat**
  - Triggering conversion tracking when the CTA is clicked
- Uses the helper library `helper.live()` for **delegated event binding**.

**What I Learned:**

- Delegated events are safer for **dynamically added elements** like the modal.
- You can combine modal behavior with analytics and chat integrations cleanly.

**Obstacles:**

- Forgetting to remove the modal’s `frozen` class could **block scrolling** unintentionally.
- Must ensure event listeners are **added only once**, especially on repeated modal triggers.

---

## **5️⃣ hasMattressProduct(cartItems)**

```jsx
function hasMattressProduct(cartItems) { ... }

```

**Purpose & How It Works:**

- Checks if the cart contains any **mattress products**.
- Returns `true` if at least one product has `product_type === "Mattress"`.

**What I Learned:**

- Simple `.some()` array method is efficient for **condition checking**.
- Can conditionally modify modal UI (like subtitle or badge) based on cart content.

**Obstacles:**

- Must ensure `cartItems` is an array; otherwise, `.some()` can throw errors.

---

## **6️⃣ modalInsert()**

```jsx
function modalInsert() { ... }

```

**Purpose & How It Works:**

- Inserts the **modal HTML** into the page using `insertAdjacentHTML`.
- Updates modal subtitle based on **cart content**.
- Adds the `frozen` class to **disable background scrolling**.
- Calls `renderProducts()` to populate product listings.

**What I Learned:**

- Can combine **HTML insertion** with dynamic content updates using `querySelector` and helper functions.
- Waiting for elements ensures the modal is injected **after DOM is ready**.

**Obstacles:**

- Timing is crucial; must wait for the body and other elements to exist.
- Conditional UI updates require careful checking (e.g., badge removal if no mattress product).

---

## **7️⃣ getCookie(cname)**

```jsx
function getCookie(cname) { ... }

```

**Purpose & How It Works:**

- Reads a cookie value by name.
- Loops through `document.cookie` and returns the matching cookie value.

**What I Learned:**

- Useful for checking if the modal has **already been triggered**.
- Simple string parsing is enough for **one-time event cookies**.

**Obstacles:**

- Must handle spaces in cookie strings correctly.
- If cookie name is wrong, modal might **trigger unnecessarily**.

---

## **8️⃣ renderProducts()**

```jsx
function renderProducts() { ... }

```

**Purpose & How It Works:**

- Reads cart data from `localStorage`.
- Maps cart items to product objects for modal display.
- Populates `.cre-t-154-modal-products-wrapper` with HTML for each product.
- Prepares SKU payload for **delivery estimate API**.
- Fetches delivery estimates and renders modal footer.

**What I Learned:**

- Combining **cart data processing** with dynamic UI rendering and API calls is effective.
- Can handle both product rendering and footer content in one function.
- Using `localStorage` is convenient for **temporary cart persistence**.

**Obstacles:**

- Async operations (fetch API) require careful **waiting for DOM elements** before inserting footer HTML.
- Must handle **empty carts** gracefully.

---

## **9️⃣ getCartData()**

```jsx
function getCartData() { ... }

```

```jsx
function getCartData() {
  var interval = setInterval(() => {
    var cartData = localStorage.getItem("cre-t-154-cart-data");
    if (cartData !== null) {
      _$("body").addClass(variation_name);
      modalInsert();

      clearInterval(interval);
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
  }, 15000);
}
```

**Purpose & How It Works:**

- Polls `localStorage` for cart data.
- Once data is available, adds a variation class to the body and calls `modalInsert()`.
- Stops polling after a timeout.

**What I Learned:**

- Polling is sometimes necessary when **cart data loads asynchronously**.
- Adding variation classes helps in **CSS targeting**.

**Obstacles:**

- Interval timing must be balanced; too short → CPU usage, too long → delayed modal display.
- Timeout prevents infinite loops but requires careful adjustment.

---

## **10️⃣ init()**

```jsx
function init() { ... }

```

**Purpose & How It Works:**

- Entry point for the variation.
- Checks if the modal cookie exists; if not, calls `getCartData()` and triggers conversion.
- Ensures `eventHandler()` runs only once.

**What I Learned:**

- Central init function ensures modal **only triggers for eligible users**.
- Combining cookie check with cart polling and conversion tracking works seamlessly.

**Obstacles:**

- Must ensure cookies and localStorage are **in sync**.
- Improper checks can lead to repeated modals or missed triggers.

---

## Full code Example

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-154";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (var index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },

        // Adding Class
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },

        // Waiting for element to load
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);

          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },

        live: function (selector, event, callback, context) {
          /****Helper Functions****/
          // helper for enabling IE 8 event bindings
          function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent("on" + type, handler);
            else el.addEventListener(type, handler);
          }
          // matches polyfill
          this.Element &&
            (function (ElementPrototype) {
              ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                  var node = this,
                    nodes = (node.parentNode || node.document).querySelectorAll(
                      selector,
                    ),
                    i = -1;
                  while (nodes[++i] && nodes[i] != node);
                  return !!nodes[i];
                };
            })(Element.prototype);
          // live binding helper using matchesSelector
          function live(selector, event, callback, context) {
            addEvent(context || document, event, function (e) {
              var found,
                el = e.target || e.srcElement;
              while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
              )
                el = el.parentElement;
              if (found) callback.call(el, e);
            });
          }
          live(selector, event, callback, context);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();
    // Helper Library

    // Main Code

    var products = [];

    function setBmCookie() {
      document.cookie = "cre-t-154=cre-t-154-modal-triggered; path=/";
    }

    // function fetchCartData() {}

    // Product HTML template
    function generateProductHTML(product) {
      // Only show the savings div if discountAmount is greater than 0

      //  var savingsHTML =
      //    product.discountAmount > 0
      //      ? `<div class="cre-t-154-modal-product-savings-image-tag-wrapper">
      //     SAVE $${product.discountAmount.toLocaleString()}
      //   </div>`
      //      : "";

      var savingsHTML =
        product.discountAmount > 0
          ? `<div class="cre-t-154-modal-product-savings-image-tag-wrapper">
          SAVE $300
        </div>`
          : ""; // Empty string if no discount

      return `
    <div class="cre-t-154-modal-product">
        <div class="cre-t-154-modal-product-image-wrapper">
            <img class="cre-t-154-modal-product-image" src="${product.image}" alt="Product Image">
        </div>
        <div class="cre-t-154-modal-product-details">
            <div class="cre-t-154-modal-product-name">${product.name}</div>
            <div class="cre-t-154-modal-product-price-wrapper">
                <div class="cre-t-154-modal-product-price">
                    <div class="cre-t-154-modal-product-price-latest">$${product.price.toLocaleString()}</div>
                    <div class="cre-t-154-modal-product-was-cut">${product.price === product.wasPrice ? "" : `Was $${product.wasPrice.toLocaleString()}`}</div>
                    ${savingsHTML}
                </div>
            </div>
        </div>
    </div>`;
    }

    function generateFooterHTML(deliveryData) {
      var processedDeliveryData = deliveryData;

      // ✅ Highlight "Today" (preserving all HTML)
      processedDeliveryData = processedDeliveryData.replace(
        /\b(Today)\b/,
        '<span class="cre-t-154-modal-footer-time">$1</span>',
      );

      // ✅ Highlight content inside <b> if it matches time pattern like "0 Hours 49 Minutes"
      processedDeliveryData = processedDeliveryData.replace(
        /<b>(\d+\s*Hours?\s*\d+\s*Minutes?)<\/b>/i,
        '<b><span class="cre-t-154-modal-footer-time">$1</span></b>',
      );
      return `
    <div class="cre-t-154-modal-footer">
      ${processedDeliveryData}
    </div>`;
    }

    // Modal Exit HTML
    var modalHtml = `<div class="cre-t-154-overlay-and-modal active">
    <div class="cre-t-154-overlay"></div>
    <div class="cre-t-154-modal-main">
        <div class="cre-t-154-modal-badge-wrapper">
            <img class="cre-t-154-modal-badge"
                src="https://www.winkbeds.com/cdn/shop/t/236/assets/offer-sticker-landing.svg?v=26493139930568156891697221926" alt="badge">
        </div>
        <div class="cre-t-154-modal-container">
            <div class="cre-t-154-modal-wrapper">
                <div class="cre-t-154-modal-close-icon-wrapper">
                    <img class="cre-t-154-modal-close-icon"
                        src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/close_6889c95def616.svg"
                        alt="Close Icon">
                </div>
                <div class="cre-t-154-modal-content-area">
                    <div class="cre-t-154-modal-title">Your WinkBed is waiting...</div>
                    <div class="cre-t-154-modal-subtitle"></div>

                    <div class="cre-t-154-modal-products-wrapper"></div>

                    <div class="cre-t-154-modal-features-wrapper">
                        <div class="cre-t-154-modal-feature feature1">
                            <div class="cre-t-154-modal-features-icon-wrapper">
                                <img class="cre-t-154-modal-features-icon"
                                    src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/smstar_6889c91c42759.svg"
                                    alt="ratings icon">
                            </div>
                            <div class="cre-t-154-modal-features-text"><span
                                    class="cre-t-154-modal-features-text-bold">Rated 4.8 stars</span> by <span
                                    class="cre-t-154-modal-features-text-bold">9,200+</span> verified sleepers, and
                                recommended by top mattress comparison sites.</div>
                        </div>
                        <div class="cre-t-154-modal-feature feature2">
                            <div class="cre-t-154-modal-features-icon-wrapper">
                                <img class="cre-t-154-modal-features-icon"
                                    src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/moon_6889c944d8f3c.svg"
                                    alt="moon icon">
                            </div>
                            <div class="cre-t-154-modal-features-text"><span
                                    class="cre-t-154-modal-features-text-bold">Compares with $3,000+ beds</span> based
                                on independent
                                product comparisons.</div>
                        </div>
                        <div class="cre-t-154-modal-feature feature3">
                            <div class="cre-t-154-modal-features-icon-wrapper">
                                <img class="cre-t-154-modal-features-icon"
                                    src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/shield_6889c92d6cea7.svg"
                                    alt="shield icon">
                            </div>
                            <div class="cre-t-154-modal-features-text"><span
                                    class="cre-t-154-modal-features-text-bold">FREE and easy returns.</span> We’ll pick
                                it up (no
                                packing needed) and refund you within 5 days.</div>
                        </div>
                    </div>

                    <div class="cre-t-154-modal-divider"></div>

                    <div class="cre-t-154-modal-helpline-wrapper">
                        <span class="cre-t-154-modal-helpline-text-bold">Need help?</span> <span
                            class="cre-t-154-modal-helpline-text-link">Live chat</span> or call 1-855-946-5233
                    </div>

                    <a href="https://www.winkbeds.com/checkout" class="cre-t-154-modal-cta-wrapper">
                        <div class="cre-t-154-modal-cta">
                            <div class="cre-t-154-modal-cta-icon-wrapper">
                                <img class="cre-t-154-modal-cta-icon"
                                    src="https://cdn-3.convertexperiments.com/uf/1003415/1003290/lock_6889c9523b5da.svg"
                                    alt="Lock Icon">
                            </div>
                            <div class="cre-t-154-modal-cta-text">CONTINUE TO CHECKOUT</div>
                        </div>
                    </a>
                    <div class="cre-t-154-modal-footer-placeholder"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;

    function eventHandler() {
      helper.live(
        ".cre-t-154-modal-close-icon, .cre-t-154-overlay",
        "click",
        function () {
          // Close the modal when the close icon is clicked
          document.querySelector(".cre-t-154-overlay-and-modal").remove();
          document.querySelector("body").classList.remove("frozen");
          setBmCookie();
        },
      );
      helper.live(".cre-t-154-modal-helpline-text-link", "click", function () {
        setBmCookie();
        if (window.GorgiasChat) {
          GorgiasChat.open();
        }
        document.querySelector(".cre-t-154-overlay-and-modal").remove();
        document.querySelector("body").classList.remove("frozen");
      });
      helper.live(".cre-t-154-modal-cta-wrapper", "mousedown", function () {
        window._conv_q = window._conv_q || [];
        _conv_q.push(["triggerConversion", "100331992"]);

        setBmCookie();
      });
    }

    // Check if cart has mattress product
    function hasMattressProduct(cartItems) {
      return cartItems.some((item) => item.product_type === "Mattress"); // Fixed the return statement
    }

    function modalInsert() {
      helper.waitForElement(
        "body",
        function () {
          // Insert modal HTML into the body
          var grabBody = document.querySelector("body");
          document.body.insertAdjacentHTML("afterbegin", modalHtml);

          // Get cart data and update subtitle
          var cartData = JSON.parse(
            localStorage.getItem("cre-t-154-cart-data"),
          );
          var cartItems = cartData?.items || [];

          var subtitleText = hasMattressProduct(cartItems)
            ? "We’ve saved your cart—and your $300 discount is still active."
            : "We've saved your cart.";

          helper.waitForElement(
            ".cre-t-154-modal-badge-wrapper",
            function () {
              !hasMattressProduct(cartItems) &&
                document
                  .querySelector(".cre-t-154-modal-badge-wrapper")
                  .remove();
            },
            50,
            15000,
          );

          // Update subtitle text directly
          helper.waitForElement(
            ".cre-t-154-modal-subtitle",
            function () {
              document.querySelector(".cre-t-154-modal-subtitle").textContent =
                subtitleText;
            },
            50,
            15000,
          );

          helper.waitForElement(
            ".cre-t-154-overlay-and-modal",
            function () {
              // Add the 'frozen' class to the body
              grabBody.classList.add("frozen");
              renderProducts();
            },
            50,
            15000,
          );
        },
        50,
        15000,
      );
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }

    function renderProducts() {
      helper.waitForElement(
        ".cre-t-154-modal-products-wrapper",
        function () {
          var tenantId = "317ca30698d74c21b080bb2552d6854a";
          const productsWrapper = document.querySelector(
            ".cre-t-154-modal-products-wrapper",
          );

          var cartData = JSON.parse(
            localStorage.getItem("cre-t-154-cart-data"),
          );

          const cartItems = cartData.items || [];
          // // Prepare skus array for the cart items
          if (cartItems.length > 0) {
            products.length = 0; // Clear the products array before adding new items

            // Push cart items into the products array
            cartItems.forEach(function (item) {
              const product = {
                name: item?.title,
                image: item?.image || "default_image_url", // Use a default image if not available
                price: item.discounted_price / 100, // Format price
                wasPrice: item?.presentment_price,
                discountAmount: item?.line_level_total_discount / 100,
              };

              // Add each item as a product
              products.push(product);

              if (products.length > 0) {
                setBmCookie();
                productsWrapper.innerHTML = products
                  .map(generateProductHTML)
                  .join("");
                var modalMain = document.querySelector(".cre-t-154-modal-main");
                products.length <= 1
                  ? modalMain.classList.add("less-scale")
                  : modalMain.classList.remove("less-scale");
              }
            });
          }

          var skus = [];

          cartItems.forEach(function (item) {
            skus.push({
              sku: item.sku || item.title,
              quantity: item.quantity,
              skuInventories: [
                {
                  locationId: "manual",
                  quantity: item.quantity,
                },
              ],
            });
          });

          // if (!skus.length) {
          //   console.warn("❌ Cart is empty.");
          //   return;
          // }

          var buyerZipCode = "10001";
          var sessionTrackId =
            localStorage.getItem("fenix-sessionId") ||
            Math.random().toString(36).substring(2, 15);
          var pageType =
            window.location.href.indexOf("cart") > -1 ? "Cart" : "PDP";
          var monetaryValue = cartData.total_price / 100;

          var payload = {
            sessionTrackId: sessionTrackId,
            buyerZipCode: buyerZipCode,
            monetaryValue: monetaryValue,
            pageType: "cart",
            responseFormat: "json",
            skus: skus,
          };

          fetch(
            "https://api-002.delest.fenixcommerce.com/winkbeds/fenixdelest/api/v2/deliveryestimates",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                tenantId: tenantId,
              },
              body: JSON.stringify(payload),
            },
          )
            .then((response) => {
              if (!response.ok) {
                return response.text().then((text) => {
                  throw new Error("❌ Estimate request failed: " + text);
                });
              }
              return response.json();
            })
            .then((data) => {
              var deliveryData = data[0].response;
              const footerHTML = generateFooterHTML(deliveryData);
              console.log("footerHTML", footerHTML);
              helper.waitForElement(
                ".cre-t-154-modal-footer-placeholder",
                function () {
                  document.querySelector(
                    ".cre-t-154-modal-footer-placeholder",
                  ).innerHTML = footerHTML;
                },
                25,
                25000,
              );
            });
        },
        50,
        15000,
      );
    }

    function getCartData() {
      var interval = setInterval(() => {
        var cartData = localStorage.getItem("cre-t-154-cart-data");
        if (cartData !== null) {
          _$("body").addClass(variation_name);
          modalInsert();

          clearInterval(interval);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, 15000);
    }

    /* Variation Init */
    function init() {
      var cookieName = getCookie("cre-t-154");
      if (cookieName != "cre-t-154-modal-triggered") {
        getCartData();

        window._conv_q = window._conv_q || [];
        _conv_q.push(["triggerConversion", "100331991"]);
      }
    }

    if (!window.creHandler154) {
      eventHandler();
      window.creHandler154 = true;
    }

    helper.waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```

---

**Task: Custody X Change - Test 219 - App - Plan selection modal
Detailed description of the changes for each variation**

When users enter the welcome page, please gray out the background and make a modal appear with the plan options from the pricing page.

Use the headline “Choose a plan to get started”.

Add a “Starter” price card as shown with the content shown in the wireframe.

If the user clicks the CTA button on the free price card or any of the “Try it free before subscribing” text links, please close the modal and remove the grayed-out background.

If the user clicks the CTA button the Bronze, Gold, or Family price cards, please bring them to the next step in the checkout flow as if they clicked the CTA button on the pricing page.

Please make the price cards scrollable horizontally on mobile and narrow desktop views.

Clicking the “X” should also close the modal.

### **1. initTooltips()**

**Purpose:** Initialize tooltips for info icons.

**How it works:**

- Removes any existing tooltips.
- Finds all info icons and attaches event listeners (`mouseenter`, `mouseleave`, `focus`).
- Calls `showTooltip()` or `hideTooltip()` depending on the user action.

```jsx
function initTooltips() {
  var existingTooltips = document.querySelectorAll(
    `.${variation_name}-tooltip`,
  );
  existingTooltips.forEach((tooltip) => tooltip.remove());

  var infoIcons = document.querySelectorAll(`.${variation_name}-info-icon`);
  infoIcons.forEach(function (icon) {
    icon.addEventListener("mouseenter", () => showTooltip(icon));
    icon.addEventListener("mouseleave", () => hideTooltip(icon));
    icon.addEventListener("focus", () => showTooltip(icon));
  });
}
```

**What I learned:**

- Tooltips need to be dynamically added and removed.
- Focus events help accessibility (keyboard users).

**Obstacles:**

- Tooltip may overlap or not disappear correctly; you have to track the `currentTooltip` and remove it on every hover/focus.

---

### **2. showTooltip(icon)**

**Purpose:** Show tooltip for a specific icon.

**How it works:**

- Calls `hideAllTooltips()` to remove existing tooltips.
- Gets tooltip text from `getTooltipContent(icon)`.
- Inserts tooltip HTML inside parent element.
- Calls `positionTooltip(icon, tooltip)` to calculate proper position.

```jsx
function showTooltip(icon) {
  hideAllTooltips();
  var tooltipContent = getTooltipContent(icon);
  var tooltip = `<div class="${variation_name}-tooltip" role="tooltip">${tooltipContent}</div>`;
  var parentLi = icon.closest(`.${variation_name}-tooltip-icon-wrapper-main`);
  if (parentLi) parentLi.insertAdjacentHTML("beforeend", tooltip);

  currentTooltip = document.querySelector(`.${variation_name}-tooltip`);
  currentIcon = icon;
  if (currentTooltip) positionTooltip(icon, currentTooltip);
}
```

**What I learned:**

- Dynamic tooltip creation using DOM insertion.
- Closest parent search with `closest()` is very handy.

**Obstacles:**

- Tooltip positioning was tricky for different screen sizes.

---

### **3. getTooltipContent(icon)**

**Purpose:** Provide tooltip text based on the feature the icon belongs to.

```jsx
function getTooltipContent(icon) {
  var listItem = icon.closest(`.${variation_name}-card-bullet-list`);
  var textSpan = listItem
    ? listItem.querySelector(`.${variation_name}-card-bullet-text`)
    : null;
  var featureText = textSpan ? textSpan.textContent.trim() : "";
  var tooltipMap = {
    "Custody and activity calendars": "Explore popular custody schedules...",
    "All your child's info in one place":
      "Store your child's clothing sizes...",
    // ...more mappings
  };
  return tooltipMap[featureText] || "More information about this feature";
}
```

**What I learned:**

- Mapping dynamic text to tooltip content.
- Use `closest()` to traverse DOM from a child to parent element.

**Obstacles:**

- If the DOM structure changes, `closest()` and query selectors may fail.

---

### **4. positionTooltip(icon, tooltip)**

**Purpose:** Calculate tooltip position dynamically to prevent overflow.

```jsx
function positionTooltip(icon, tooltip) {
  var iconRect = icon.getBoundingClientRect();
  var viewportWidth = window.innerWidth;
  var tooltipWidth = 380;
  if (viewportWidth < 768) tooltipWidth = Math.min(280, viewportWidth - 40);

  tooltip.style.width = tooltipWidth + "px";
  // logic for left, center, or right positioning
}
```

**What I learned:**

- `getBoundingClientRect()` is crucial for positioning.
- Tooltips must adapt to screen size, otherwise they overflow.

**Obstacles:**

- Handling small screen widths (<480px) required additional logic.

---

### **5. showModal(data)**

**Purpose:** Show modal with subscription plan cards and pricing.

```jsx
function showModal(data) {
  var html = `<div class="${variation_name}-modal-wrapper"> ... </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  document
    .querySelector(`.${variation_name}-modal-close`)
    .addEventListener("click", closeModal);
  document
    .querySelectorAll(`.${variation_name}-subscribe-btn`)
    .forEach((btn) =>
      btn.addEventListener("click", (e) =>
        onSubscribeClick(btn.dataset.package),
      ),
    );
}
```

**What I learned:**

- Dynamically create modal content using template strings.
- Attach event listeners immediately after adding DOM elements.
- Can use sessionStorage to remember modal state.

**Obstacles:**

- Ensuring all buttons and tooltips work after inserting HTML dynamically.

---

### **6. updatePrices(isAnnual)**

**Purpose:** Toggle between monthly and annual prices in modal.

```jsx
function updatePrices(isAnnual) {
  var wrapper = document.querySelector(`.${variation_name}-modal-wrapper`);
  wrapper
    .querySelectorAll(`.${variation_name}-price-monthly`)
    .forEach((el) => (el.style.display = isAnnual ? "none" : "block"));
  wrapper
    .querySelectorAll(`.${variation_name}-price-annual`)
    .forEach((el) => (el.style.display = isAnnual ? "block" : "none"));
}
```

**What I learned:**

- CSS `display` property can toggle between pricing views.
- Easier than dynamically re-rendering HTML every time.

**Obstacles:**

- Forgetting some elements may lead to inconsistent display.

---

### **7. onSubscribeClick(packageName)**

**Purpose:** Handles click event for subscribing a plan.

```jsx
function onSubscribeClick(packageName) {
  sessionStorage.setItem("selectedPackage", packageName);
  var userBtn = document.querySelector(".user-button");
  userBtn.click();

  helper.waitForElement(
    '.user-dropdown li a[href="/a/account/upgrade"]',
    function () {
      document
        .querySelector('.user-dropdown li a[href="/a/account/upgrade"]')
        .click();
    },
  );
}
```

**What I learned:**

- How to interact with another part of the page (different domain actions).
- `sessionStorage` is useful to share state across page reloads.
- Can simulate user clicks programmatically.

**Obstacles:**

- Need to wait for elements to appear (`waitForElement`) before interacting.
- Cross-domain data fetching requires proper credentials (`fetch` with `credentials: include`).

---

### **8. fetchPrice()**

**Purpose:** Fetch plan data from the server and show modal.

```jsx
function fetchPrice() {
  fetch("https://app.custodyxchange.com/api/account/plans", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => showModal(data))
    .catch((err) => console.error(err));
}
```

**What I learned:**

- Fetching JSON data from a different domain using CORS and `credentials`.
- Pass data into modal creation dynamically.
- Learned to combine `fetch` and sessionStorage for modal display control.

**Obstacles:**

- Handling errors if server data is missing or format changes.

---

---

## Code

```jsx
(function () {
  try {
    var debug = 1;
    var variation_name = "cre-t-215";

    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();

    // Adding Swiper SLider Styles

    // Global variables for tooltip management
    var currentTooltip = null;
    var currentIcon = null;

    // Tooltip functionality
    function initTooltips() {
      // Remove existing tooltips
      var existingTooltips = document.querySelectorAll(
        `.${variation_name}-tooltip`,
      );
      existingTooltips.forEach((tooltip) => tooltip.remove());

      var infoIcons = document.querySelectorAll(`.${variation_name}-info-icon`);

      infoIcons.forEach(function (icon) {
        // Mouse enter event
        icon.addEventListener("mouseenter", function (e) {
          showTooltip(e.target);
        });

        // // Mouse leave event
        icon.addEventListener("mouseleave", function (e) {
          hideTooltip(e.target);
        });

        // Focus event for keyboard accessibility
        icon.addEventListener("focus", function (e) {
          showTooltip(e.target);
        });

        // Blur event for keyboard accessibility
        // icon.addEventListener("blur", function (e) {
        //   hideTooltip(e.target);
        // });
      });
    }
    // Showing tooltip Functions
    function showTooltip(icon) {
      // Remove any existing tooltip
      hideAllTooltips();

      // Get tooltip content based on the feature
      var tooltipContent = getTooltipContent(icon);

      var tooltip = `<div class="${variation_name}-tooltip" role="tooltip">${tooltipContent}</div>`;

      // Find the parent li element and add tooltip there
      var parentLi = icon.closest(
        `.${variation_name}-tooltip-icon-wrapper-main`,
      );
      console.log(parentLi);
      // var parentLi = document.querySelector(`#tip-plan`);
      if (parentLi) {
        parentLi.insertAdjacentHTML("beforeend", tooltip);
      }

      // Store references
      // currentTooltip = tooltip;
      currentTooltip = document.querySelector(`.${variation_name}-tooltip`);
      // console.log(document.querySelector(`.${variation_name}-tooltip`));
      currentIcon = icon;

      if (currentTooltip) {
        positionTooltip(icon, currentTooltip);
      }
    }
    // Hiding tooltip Function
    function hideTooltip(icon) {
      hideAllTooltips();
    }

    function hideAllTooltips() {
      // Remove tooltip
      if (currentTooltip) {
        currentTooltip.classList.add("hide");
        currentTooltip = null;
        currentIcon = null;
      }

      // Fallback: remove any remaining tooltips
      var tooltips = document.querySelectorAll(`.${variation_name}-tooltip`);
      tooltips.forEach((tooltip) => tooltip.remove());
    }

    function getTooltipContent(icon) {
      // Get the feature text from the parent li element
      var listItem = icon.closest(`.${variation_name}-card-bullet-list`);
      console.log("List item:", listItem);

      if (!listItem) return "More information about this feature";

      // Get only the text from the span with the specific class, not all text content
      var textSpan = listItem.querySelector(
        `.${variation_name}-card-bullet-text`,
      );
      console.log("Text span:", textSpan);

      if (!textSpan) return "More information about this feature";

      var featureText = textSpan.textContent.trim();
      console.log("Feature text:", featureText);

      // Define tooltip content for each feature
      var tooltipMap = {
        "Custody and activity calendars":
          "Explore popular custody schedules and create yours fast. Layer schedules for holidays and school breaks on top. Get reminders about exchanges and your children's activities",
        "All your child's info in one place":
          "Store your child's clothing sizes, ID numbers and more to access from anywhere. If you link with your co-parent, get notified when they update the information.",
        "Co-parent messaging, if linked":
          "If your co-parent also subscribes, link with them to message through Custody X Change. Print conversations by topic, with hostile language automatically flagged. Plus, see when they've read your message.",
        "Professional-quality printouts":
          "Whether you're printing a calendar for your wall or messages from your co-parent for court, you can rest assured it will look polished.",
        "Parenting plans in court wording":
          "Make a plan that impresses the judge and keeps you from returning to court. Our template offers over 140 common provisions and lets you enter custom ones.",
        "Expense tracking":
          "Log what you spend on your children and automatically calculate what your co-parent owes you. Upload receipts to avoid disputes.",
        "Time calculations and tracking":
          "Instantly calculate your exact parenting time for any period. You can even remove time your child spends at school, sleeping, etc. Reports with graphs help prove when you're not getting the right time.",
        "Private journal to record events":
          "Detailed, dated notes make some of the best evidence for a custody case — especially when you add attachments. Choose which entries to print by date, topic or keyword.",
        "Free account for your co-parent":
          "Your co-parent's subscription is included in the price of yours for simplicity. You can collaborate on calendars, expense tracking and more.",
        "Free account for each child":
          "Your children can see their custody schedules and edit their activity schedules. A lifesaver for parents of busy tweens and teens.",
        "Free account for your legal pros":
          "Cut down on expensive meetings by linking with your lawyer. They can edit your parenting plan, print what they need for court and more.",
      };

      console.log("Tooltip map lookup result:", tooltipMap[featureText]);
      return tooltipMap[featureText] || "More information about this feature";
    }
    // Tooltip Positioning Function
    function positionTooltip(icon, tooltip) {
      // Check if elements still exist
      if (
        !icon ||
        !tooltip ||
        !document.body.contains(icon) ||
        !document.body.contains(tooltip)
      ) {
        return;
      }

      // Remove all positioning classes first
      tooltip.classList.remove(`${variation_name}-tooltip-left`);
      tooltip.classList.remove(`${variation_name}-tooltip-center`);
      tooltip.classList.remove(`${variation_name}-tooltip-below`);

      var iconRect = icon.getBoundingClientRect();
      var modalRect = document
        .querySelector(`.${variation_name}-modal`)
        .getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var tooltipWidth = 380; // Default tooltip width

      // Adjust tooltip width for smaller screens
      if (viewportWidth < 768) {
        tooltipWidth = Math.min(280, viewportWidth - 40);
        tooltip.style.width = tooltipWidth + "px";
      }

      // Calculate positions
      var iconCenterX = iconRect.left + iconRect.width / 2;
      var tooltipLeftPosition = iconCenterX + 20; // Right side positioning
      var tooltipRightEdge = tooltipLeftPosition + tooltipWidth;

      // Check if tooltip would overflow on the right side
      var modalRightEdge = modalRect.right - 20; // 20px padding
      var viewportRightEdge = viewportWidth - 20;
      var rightBoundary = Math.min(modalRightEdge, viewportRightEdge);

      // Determine positioning strategy
      if (tooltipRightEdge > rightBoundary) {
        // Check if left positioning would work
        var tooltipLeftSide = iconCenterX - 20 - tooltipWidth;
        var modalLeftEdge = modalRect.left + 20; // 20px padding
        var leftBoundary = Math.max(modalLeftEdge, 20);

        if (tooltipLeftSide >= leftBoundary) {
          // Use left positioning
          tooltip.classList.add(`${variation_name}-tooltip-left`);
        } else {
          // Use center positioning for very small screens
          tooltip.classList.add(`${variation_name}-tooltip-center`);

          // Further reduce width if needed
          if (viewportWidth < 480) {
            tooltipWidth = Math.min(200, viewportWidth - 60);
            tooltip.style.width = tooltipWidth + "px";
          }
        }
      }

      // For very small screens, always use center positioning
      if (viewportWidth < 480) {
        tooltip.classList.remove(`${variation_name}-tooltip-left`);
        tooltip.classList.add(`${variation_name}-tooltip-center`);
        tooltipWidth = Math.min(200, viewportWidth - 60);
        tooltip.style.width = tooltipWidth + "px";
      }
    }
    // Showing Modal Function with Data
    function showModal(data) {
      if (document.querySelector(`.${variation_name}-modal-wrapper`)) {
        helper.log("Modal already exists, skipping showModal");
        return;
      }
      // console.log("Data from Modal:", data);
      const planData = {};
      for (const key in data) {
        if (data[key] && data[key].upgrade && data[key].upgrade.purchase) {
          const planName = data[key].upgrade.purchase.planName.toLowerCase();
          planData[planName] = data[key].upgrade.purchase;
        }
      }
      console.log("Plan Data precentage:", planData);

      var highestDiscount = 0;

      Object.entries(planData).forEach(function ([key, plan]) {
        var annual = plan.pricing.find(function (p) {
          return p.duration === 12;
        });
        if (annual && annual.discountPerc !== undefined) {
          var discount = parseFloat(annual.discountPerc);
          if (discount > highestDiscount) {
            highestDiscount = discount;
          }
        }
      });

      var html = `<div class="${variation_name}-modal-wrapper" role="dialog" aria-modal="true"
  aria-labelledby="${variation_name}-modal-title">
  <div class="${variation_name}-modal-backdrop"></div>
  <div class="${variation_name}-modal">
    <button class="${variation_name}-modal-close" aria-label="Close Modal">X</button>
    <h2 id="${variation_name}-modal-title" class="${variation_name}-modal-title">Choose your Package</h2>

    <div class="${variation_name}-toggle-pricing">
      <span class="${variation_name}-toggle-label">Monthly</span>
      <label class="${variation_name}-switch">
        <input type="checkbox" id="${variation_name}-billing-toggle" checked />
        <span class="${variation_name}-slider"></span>
      </label>
      <span class="${variation_name}-toggle-label">Annual <span class="${variation_name}-save active">(Save
          ${highestDiscount}%)</span></span>
    </div>

    <div class="${variation_name}-cards-container">
      ${createCard("free")}
      ${createCard("bronze", planData)}
      ${createCard("gold", planData)}
      ${createCard("family", planData)}
    </div>

    <div class="${variation_name}-cards-container-mobile">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            ${createCard("free")}
          </div>
          <div class="swiper-slide">
            ${createCard("bronze", planData)}
          </div>
          <div class="swiper-slide">
            ${createCard("gold", planData)}
          </div>
          <div class="swiper-slide">
            ${createCard("family", planData)}
          </div>
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev">
      </div>
    </div>

    

  </div>
</div>`;

      document.body.insertAdjacentHTML("beforeend", html);

      document
        .querySelector(`.${variation_name}-modal-close`)
        .addEventListener("click", closeModal);
      document
        .querySelector(`.${variation_name}-subscribe-btn-free.getStarted`)
        .addEventListener("click", closeModal);
      document.querySelectorAll(`.${variation_name}-try-text`).forEach((btn) =>
        btn.addEventListener("click", function (e) {
          closeModal();
        }),
      );

      document
        .querySelectorAll(`.${variation_name}-subscribe-btn`)
        .forEach((btn) =>
          btn.addEventListener("click", function (e) {
            var packageName = e.target.dataset.package;
            if (packageName) {
              var packageToggle = document.querySelector(
                "#cre-t-215-billing-toggle",
              ).checked;
              console.log(packageToggle);
              sessionStorage.setItem("packageToggle", packageToggle);
            }
            onSubscribeClick(packageName);
          }),
        );

      var toggleCheckbox = document.getElementById(
        `${variation_name}-billing-toggle`,
      );
      toggleCheckbox.addEventListener("change", function () {
        var isAnnual = toggleCheckbox.checked;
        updatePrices(isAnnual);
      });
      updatePrices(true);

      // Initialize tooltips after modal is created
      setTimeout(initTooltips, 100);

      setTimeout(function () {
        if (window.innerWidth <= 768) {
          waitForSwiper(function () {
            sliderInit();
          });
        }
      }, 200);
    }

    function upgradePlan(btn) {
      helper.waitForElement(
        'input[type="checkbox"]+ .slider',
        function () {
          var packageStatus = sessionStorage.getItem("packageToggle");
          if (packageStatus === "false") {
            var toggle = document.querySelector(
              'input[type="checkbox"]+ .slider',
            );
            if (toggle) {
              toggle.click();
              helper.log("Clicked the toggle button");
              setTimeout(() => {
                btn.click();
              }, 50);
            } else {
              helper.log("Toggle button not found");
              setTimeout(() => {
                btn.click();
              }, 50);
            }
          } else if (packageStatus === "true") {
            setTimeout(() => {
              btn.click();
            }, 50);
          }
        },
        25,
        25000,
      );
    }

    function createCard(name, planData) {
      // Try to get purchase info from planData
      var purchaseInfo = planData && planData[name] ? planData[name] : null;
      console.log("Purchase Info:", purchaseInfo);

      // Your content map and bullet generation logic here...
      var contentMap = {
        free: [
          "Create your first calendar",
          "Start your parenting plan",
          "Start organizing your child’s info",
          "Add your first few expenses",
        ],
        bronze: [
          "Custody and activity calendars",
          "All your child's info in one place",
          "Co-parent messaging, if linked",
          "Professional-quality printouts",
        ],
        gold: [
          "Parenting plans in court wording",
          "Expense tracking",
          "Time calculations and tracking",
          "Private journal to record events",
        ],
        family: [
          "Free account for your co-parent",
          "Free account for each child",
          "Link with legal professionals",
        ],
      };

      // Generate bullets with or without tooltip icon for bronze and gold only
      var bullets = contentMap[name]
        .map((txt) => {
          var iconHtml =
            name === "bronze" || name === "gold"
              ? `<div class="${variation_name}-tooltip-icon-wrapper-main">
              <img id="tip-plan" src="https://cdn-3.convertexperiments.com/uf/10007679/10007226/tip-button_6834131c70847.svg" class="${variation_name}-info-icon" alt="Info Icon">
          </div>`
              : "";

          return `
            <ul class="${variation_name}-card-bullet-list">
              <li class=""> <span class="bullet">•</span> <span class='${variation_name}-card-bullet-text'>${txt}</span> ${iconHtml}</li>
            </ul>`;
        })
        .join("");

      return `
        <div class="${variation_name}-card ${variation_name}-card-${name}">
          <div class="${variation_name}-card-header">
            ${
              name !== "free"
                ? `<div class="${variation_name}-plan-name">${purchaseInfo.planName}</div>`
                : `<div class="${variation_name}-plan-name">Starter</div>
                   <div class="${variation_name}-plan-name freeExtra">Free</div>`
            }
            ${
              name !== "free"
                ? `
              <div class="${variation_name}-price-monthly">US$${purchaseInfo.pricing[0].monthlyAmount}/month</div>
              <div class="${variation_name}-price-monthly-for-yearDiscount">US$${purchaseInfo.pricing[1].monthlyAmount}/month</div>
             
              <div class="${variation_name}-price-annual" aria-hidden="true">Billed US$${purchaseInfo.pricing[1].amount}/year</div>
             <div class="${variation_name}-save-text">
                Save $${Math.round(parseFloat(purchaseInfo.pricing[1].discountAmount))} with annual
              </div>
              `
                : ""
            }
          </div>
          <div class="${variation_name}-card-body">
            <p><strong>${getCardHeaderText(name)}</strong></p>
            <div class="${variation_name}-card-benefits">${getCardHeaderBenefits(name)}:</div>
            <div class="${variation_name}-card-bullets-wrapper">${bullets}</div>
          </div>
          
          ${
            name === "free"
              ? `<div class="${variation_name}-subscribe-btn-wrapper getStarted-wrapper">
            <button class="${variation_name}-subscribe-btn-free getStarted" data-package="${name}">Get Started</button>
          </div>`
              : `<div class="${variation_name}-subscribe-btn-wrapper">
            <button class="${variation_name}-subscribe-btn" data-package="${name}">Subscribe</button>
          </div>`
          }
          ${name === "free" ? `<div class="${variation_name}-cancel-text hideTry"><span>Try it</span> free before subscribing</div>` : `<div class="${variation_name}-cancel-text"><span class="${variation_name}-try-text">Try it</span> free before subscribing</div>`}
        </div>`;
    }

    function getCardHeaderText(name) {
      var headerTexts = {
        free: "Basic tools to begin your plan.",
        bronze: "Schedule and organize.",
        gold: "Prepare for the future.",
        family: "Co-parent successfully.",
      };
      return headerTexts[name] || "";
    }
    function getCardHeaderBenefits(name) {
      var headerTexts = {
        free: "Benefits",
        bronze: "Benefits",
        gold: "Everything in Bronze, plus",
        family: "Everything in Gold, plus",
      };
      return headerTexts[name] || "";
    }

    function closeModal() {
      var modalWrapper = document.querySelector(
        `.${variation_name}-modal-wrapper`,
      );
      console.log("Closing modal");
      if (modalWrapper) {
        modalWrapper.remove();
        sessionStorage.setItem("modalClosed", "true");
      }

      // Clean up tooltips
      hideAllTooltips();
    }
    // Price Update Function Monthly and Annual
    function updatePrices(isAnnual) {
      var wrapper = document.querySelector(`.${variation_name}-modal-wrapper`);
      if (!wrapper) return;

      if (!isAnnual) {
        wrapper.querySelector(".cre-t-215-save").classList.remove("active");
      } else {
        wrapper.querySelector(".cre-t-215-save").classList.add("active");
      }

      wrapper
        .querySelectorAll(`.${variation_name}-price-monthly-for-yearDiscount`)
        .forEach((el) => {
          el.style.display = isAnnual ? "block" : "none";
        });

      wrapper
        .querySelectorAll(`.${variation_name}-price-monthly`)
        .forEach((el) => {
          el.style.display = isAnnual ? "none" : "block";
        });
      wrapper
        .querySelectorAll(`.${variation_name}-price-annual`)
        .forEach((el) => {
          el.style.display = isAnnual ? "block" : "none";
        });
      wrapper.querySelectorAll(`.${variation_name}-save-text`).forEach((el) => {
        el.style.display = isAnnual ? "block" : "none";
      });
    }

    function onSubscribeClick(packageName) {
      if (!packageName) {
        helper.log("No package name provided to onSubscribeClick");
        return;
      }
      helper.log("Subscribe clicked for package:", packageName);

      sessionStorage.removeItem("selectedPackage");
      sessionStorage.setItem("selectedPackage", packageName);

      var userBtn = document.querySelector(".user-button");
      if (!userBtn) {
        helper.log("User button not found");
        return;
      }
      userBtn.click();
      helper.log("Clicked user dropdown button");

      helper.waitForElement(
        '.user-dropdown li a[href="/a/account/upgrade"]',
        function () {
          var upgradeLink = document.querySelector(
            '.user-dropdown li a[href="/a/account/upgrade"]',
          );
          if (!upgradeLink) {
            helper.log("Upgrade link not found");
            return;
          }
          upgradeLink.click();
          helper.log("Clicked upgrade account link");

          helper.waitForElement(
            ".pricing-boxes .pricing-box .plan-name",
            function () {
              var planNames = document.querySelectorAll(
                ".pricing-boxes .pricing-box .plan-name",
              );
              var matchedBox = null;
              planNames.forEach(function (planNameEl) {
                if (
                  planNameEl.textContent.trim().toLowerCase() ===
                  packageName.toLowerCase()
                ) {
                  matchedBox = planNameEl.closest(".pricing-box");
                }
              });

              if (!matchedBox) {
                helper.log(
                  "No matching pricing box found for package:",
                  packageName,
                );
                return;
              }

              var btn = matchedBox.querySelector(".btn-primary");
              if (!btn) {
                helper.log(
                  "Subscribe button not found inside matched pricing box",
                );
                return;
              }
              upgradePlan(btn);
              helper.log("Clicked subscribe button for package:", packageName);
              closeModal();
            },
            50,
            10000,
          );
        },
        50,
        10000,
      );
    }

    //Slider Implementation
    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }
    // Adding Swiper JS
    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src =
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss =
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.2/swiper-bundle.css" integrity="sha512-ipO1yoQyZS3BeIuv2A8C5AwQChWt2Pi4KU3nUvXxc4TKr8QgG8dPexPAj2JGsJD6yelwKa4c7Y2he9TTkPM4Dg==" crossorigin="anonymous" referrerpolicy="no-referrer" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }
    // Adding Swiper SLider for Mobile
    function sliderInit() {
      var isMobile = window.innerWidth <= 768;
      console.log("isMobile:", isMobile);

      // Only initialize if we're on mobile and Swiper is available
      if (!isMobile || typeof window.Swiper === "undefined") {
        console.log("Skipping slider init - not mobile or Swiper not loaded");
        return;
      }

      // Check if swiper container exists
      var swiperContainer = document.querySelector(".swiper");
      if (!swiperContainer) {
        console.log("Swiper container not found");
        return;
      }

      try {
        var swiper = new Swiper(".cre-t-215-cards-container-mobile .swiper", {
          slidesPerView: 1.25,
          speed: 650,
          spaceBetween: 17,
          navigation: {
            nextEl: ".cre-t-215-cards-container-mobile .swiper-button-next",
            prevEl: ".cre-t-215-cards-container-mobile .swiper-button-prev",
          },
          breakpoints: {
            766: {
              spaceBetween: 20,
              slidesPerView: 2,
            },
            480: {
              spaceBetween: 17,
              slidesPerView: 1.5,
            },
            375: {
              spaceBetween: 17,
              slidesPerView: 1.15,
            },
          },
        });

        console.log("Swiper initialized successfully");
      } catch (error) {
        console.error("Error initializing Swiper:", error);
      }
    }

    function fetchPrice() {
      fetch("https://app.custodyxchange.com/api/account/plans", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Plans Data:", data);
          console.log(data[1003].upgrade.purchase.planName);
          console.log(data[1003].upgrade.purchase.currency);
          console.log(data[1003].upgrade.purchase.pricing[0].amount);
          console.log(data[1003].upgrade.purchase.pricing[0].period);
          var modalClosed = sessionStorage.getItem("modalClosed");
          if (!modalClosed) {
            showModal(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching plan data:", error);
        });
    }

    function setBmCookie() {
      return (document.cookie = "cre-t-215-modal=true; path=/");
    }

    function getCookieModal(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }

    function init() {
      helper.log("Init called");
      _$("body").addClass(variation_name);
      function getCookie(name) {
        let matches = document.cookie.match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)",
          ),
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      // getCookie("creCookie19");
      var cookieName = getCookieModal("cre-t-215-modal");
      console.log("Cookie Name:", cookieName);

      if (getCookie("creCookie_219") === "true" && cookieName !== "true") {
        fetchPrice();
        addScript();
        helper.log("**********Cookie Found************");
        setBmCookie();
      }
    }

    helper.waitForElement("body", init, 50, 5000);
  } catch (e) {
    if (debug) console.log(e, "error in Test" + variation_name);
  }
})();
```

---

## **Test Name:** Hastings Bath - Test 07 - Design Consultation LP - Test shortening the contact a designer form.

**Variation Name:** `cre-t-07`

---

### **Test Requirements**

1. Convert an existing single-step HubSpot form into a **2-step form**.
2. Step 1: Collect basic user info (`Name`, `Email`, `User-type`).
3. Step 2: Collect additional info (`Interests`, `Message`).
4. Hide step 2 fields until the user completes step 1.
5. Implement a **custom Next button** instead of the default submit button.
6. Trigger a **conversion tracking event** when step 1 is completed successfully.
7. Ensure proper error handling if required fields are missing.

---

### **Key Functions & Code**

### **1. `formSeparate()`**

**Purpose:** Split the existing form into 2 steps and handle field visibility and navigation.

**How it works:**

1. Waits for the form element to load using `helper.waitForElement`.
2. Adds a `form-step` attribute to the form (`1` initially).
3. Adds a custom **Next button** after the default submit button.
4. Sets up **event listeners** for:
   - Clicking the Next button → validate step 1 fields → proceed to step 2.
   - Clicking submit on step 2 → hides any error messages if needed.
5. Adds `data-fieldset` attributes to fieldsets based on label text for easier targeting.

```jsx
mainForm.setAttribute("form-step", "1");
mainSubmitBtn.insertAdjacentHTML(
  "afterend",
  '<div class="cre-t-07-button-wrapper"><div class="cre-t-07-button-next">Next</div></div>',
);
```

**What I learned:**

- How to dynamically **modify an existing DOM form** without touching the backend.
- Using `setAttribute` to manage step states (`form-step`).
- Use `insertAdjacentHTML` to inject custom buttons dynamically.

**Obstacles:**

- Ensuring error messages are correctly handled before advancing to step 2.
- Waiting for DOM elements to load before modifying them.

---

### **2. Step Navigation & Validation**

**Next button click handler:**

```jsx
helper.live('[form-step="1"] .cre-t-07-button-wrapper', "click", function () {
  document
    .querySelector('[data-hs-cos-type] [form-step="1"]  .actions input')
    .click();

  setTimeout(function () {
    if (
      !document.querySelector('[data-fieldset="Name"] .hs-error-msgs') &&
      !document.querySelector('[data-fieldset="Email"]  .hs-error-msgs') &&
      !document.querySelector('[data-fieldset="User-type"]  .hs-error-msgs')
    ) {
      mainForm.setAttribute("form-step", "2");
      document
        .querySelector(
          '[data-fieldset="interests"] .hs_i_am_interested_in .hs-error-msgs',
        )
        .classList.add("cre-t-07-main-error-hide");
      // Trigger custom goal tracking
      window._conv_q = window._conv_q || [];
      _conv_q.push(["triggerConversion", "100036079"]);
    }
  }, 500);
});
```

**What I learned:**

- Using `helper.live` for **dynamic event binding**, useful for elements created after page load.
- Step validation by checking for `.hs-error-msgs` elements.
- How to **trigger custom tracking events** using `window._conv_q`.

**Obstacles:**

- Step 1 validation needed a **timeout** because HubSpot renders error messages asynchronously.

---

### **3. Hide & Show Fields Using CSS**

**Purpose:** Display only relevant fields per step.

```css
/* Step 1: Hide interests & message */
form[form-step="1"] [data-fieldset="interests"],
form[form-step="1"] [data-fieldset="message"] {
  display: none;
}

/* Step 2: Hide name, email, user-type */
form[form-step="2"] [data-fieldset="Name"],
form[form-step="2"] [data-fieldset="Email"],
form[form-step="2"] [data-fieldset="User-type"] {
  display: none;
}
```

**What I learned:**

- Simple CSS `display: none` is enough to toggle form steps.
- Keeping `form-step` attribute allows **conditional styling** for multiple steps.

**Obstacles:**

- Needed to carefully target fieldsets using `data-fieldset` attributes to avoid hiding wrong fields.

---

### **4. Dynamic Fieldset Attributes**

**Purpose:** Assign a unique identifier to each fieldset for easier handling.

```jsx
fieldset.forEach(function (fieldset) {
  var label = fieldset.querySelector("label");
  if (label) {
    var labelText = label.innerText.trim().toLowerCase();
    if (labelText.includes("first name"))
      fieldset.setAttribute("data-fieldset", "Name");
    else if (labelText.includes("email"))
      fieldset.setAttribute("data-fieldset", "Email");
    else if (labelText.includes("i am a/an"))
      fieldset.setAttribute("data-fieldset", "User-type");
    else if (labelText.includes("i am interested in"))
      fieldset.setAttribute("data-fieldset", "interests");
    else if (labelText.includes("message"))
      fieldset.setAttribute("data-fieldset", "message");
  }
});
```

**What I learned:**

- Use `label` text to identify fields dynamically.
- Makes it easier to reference fields without hardcoding class names.

**Obstacles:**

- Label text must not change, otherwise attribute mapping fails.

---

### **5. Helper Library (`helper`)**

**Purpose:** Provides utilities like:

- Waiting for an element (`waitForElement`)
- Dynamic event binding (`live`)
- DOM manipulation (`addClass`)

**What I learned:**

- Useful for **managing asynchronous DOM changes** in single-page applications.
- Simplifies repetitive tasks like element selection and event binding.

---

### **6. Custom Button Styling**

**Purpose:** Make Next button visually distinct.

```css
.cre-t-07-button-next {
  padding: 14px 30px;
  border-radius: 60px;
  background-color: #b65633;
  color: #fff;
  font-weight: 800;
  text-align: center;
}
.cre-t-07-button-next:hover {
  background-color: #8e8d70;
  cursor: pointer;
}
```

**What I learned:**

- CSS alone can handle step navigation visuals without JS interference.

---

### **Test Insights & Learnings**

1. Learned to **split an existing form into multi-step** without changing backend logic.
2. Learned **dynamic DOM manipulation** using `insertAdjacentHTML`, `setAttribute`, and `querySelector`.
3. Learned **step validation** by checking for error messages.
4. Learned **event delegation** using `helper.live` for dynamically created elements.
5. Learned **CSS + JS coordination** for showing/hiding fields per step.
6. Learned **triggering custom conversion events** on form completion.

---

### **Obstacles & Challenges**

- Handling **HubSpot asynchronous error rendering** (required `setTimeout`).
- Ensuring **dynamic elements exist** before binding events (solved with `waitForElement`).
- Mapping fieldsets correctly using label text — fragile if labels change.
- Managing **visibility of multiple steps** while maintaining form validation.

---

## CODE

## Javascript

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-07";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (var index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },

        // Adding Class
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },

        // Waiting for element to load
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },

        live: function (selector, event, callback, context) {
          /****Helper Functions****/
          // helper for enabling IE 8 event bindings
          function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent("on" + type, handler);
            else el.addEventListener(type, handler);
          }
          // matches polyfill
          this.Element &&
            (function (ElementPrototype) {
              ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                  var node = this,
                    nodes = (node.parentNode || node.document).querySelectorAll(
                      selector,
                    ),
                    i = -1;
                  while (nodes[++i] && nodes[i] != node);
                  return !!nodes[i];
                };
            })(Element.prototype);
          // live binding helper using matchesSelector
          function live(selector, event, callback, context) {
            addEvent(context || document, event, function (e) {
              var found,
                el = e.target || e.srcElement;
              while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
              )
                el = el.parentElement;
              if (found) callback.call(el, e);
            });
          }
          live(selector, event, callback, context);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();
    // Helper Library

    function formSeparate() {
      helper.waitForElement(
        '[data-path="/contact/design-strategist"] .hs_cos_wrapper_type_form form',
        function () {
          // Add form-step
          var mainForm = document.querySelector(
            '[data-path="/contact/design-strategist"] .hs_cos_wrapper_type_form form',
          );
          mainForm.setAttribute("form-step", "1");

          var mainSubmitBtn = document.querySelector(
            'body[data-path="/contact/design-strategist"] .hs_cos_wrapper_type_form .hs_submit.hs-submit',
          );

          if (mainSubmitBtn) {
            mainSubmitBtn.insertAdjacentHTML(
              "afterend",
              '<div class="cre-t-07-button-wrapper"><div class="cre-t-07-button-next">Next</div></div>',
            );

            // Listen for Next button click
            helper.live(
              '[form-step="1"] .cre-t-07-button-wrapper',
              "click",
              function (e) {
                document
                  .querySelector(
                    '[data-hs-cos-type] [form-step="1"]  .actions input',
                  )
                  .click();

                setTimeout(function () {
                  if (
                    !document.querySelector(
                      '[data-fieldset="Name"] .hs-error-msgs',
                    ) &&
                    !document.querySelector(
                      '[data-fieldset="Email"]  .hs-error-msgs',
                    ) &&
                    !document.querySelector(
                      '[data-fieldset="User-type"]  .hs-error-msgs',
                    )
                  ) {
                    mainForm.setAttribute("form-step", "2");
                    document
                      .querySelector(
                        '[data-fieldset="interests"] .hs_i_am_interested_in .hs-error-msgs',
                      )
                      .classList.add("cre-t-07-main-error-hide");
                    // Custom Goal Tracking
                    window._conv_q = window._conv_q || [];
                    _conv_q.push(["triggerConversion", "100036079"]);
                  }
                }, 500);
              },
            );

            helper.live(
              `[form-step="2"]  .hs_submit.hs-submit .actions input`,
              "click",
              function () {
                // Hide error message when user selects an interest
                var errorMsg = document.querySelector(
                  ".cre-t-07-main-error-hide",
                );
                if (errorMsg) {
                  errorMsg.classList.remove("cre-t-07-main-error-hide");
                }
              },
            );
          }

          // Add attributes based on fieldset label
          var fieldset = mainForm.querySelectorAll("fieldset");
          fieldset.forEach(function (fieldset) {
            var label = fieldset.querySelector("label");
            if (label) {
              var labelText = label.innerText.trim().toLowerCase();
              if (labelText.includes("first name")) {
                fieldset.setAttribute("data-fieldset", "Name");
              } else if (labelText.includes("email")) {
                fieldset.setAttribute("data-fieldset", "Email");
              } else if (labelText.includes("i am a/an")) {
                fieldset.setAttribute("data-fieldset", "User-type");
              } else if (labelText.includes("i am interested in")) {
                fieldset.setAttribute("data-fieldset", "interests");
              } else if (labelText.includes("message")) {
                fieldset.setAttribute("data-fieldset", "message");
              }
            }
          });
        },
        25,
        25000,
      );
    }

    /* Variation Init */
    function init() {
      _$("body").addClass(variation_name);
      formSeparate();
    }

    /* Initialize variation */
    helper.waitForElement("body", init, 50, 15000);
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```

## css

```css
/* Submit button */
body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="1"]
  .hs_submit.hs-submit {
  display: none;
}

/* Hide fields interests and message */
body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="1"]
  [data-fieldset="interests"] {
  display: none;
}

body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="1"]
  [data-fieldset="message"] {
  display: none;
}

body[data-path="/contact/design-strategist"] .cre-t-07-button-wrapper {
  display: flex;
}

body[data-path="/contact/design-strategist"] .cre-t-07-button-next {
  padding: 14px 30px;
  border-radius: 60px;
  background-color: #b65633;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  line-height: 18.06px;
  text-align: center;
  border: none;
}

body[data-path="/contact/design-strategist"] .cre-t-07-button-next:hover {
  background-color: #8e8d70;
  cursor: pointer;
}

/* Hide fields interests and message */
body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="2"]
  [data-fieldset="Name"] {
  display: none;
}

body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="2"]
  [data-fieldset="Email"] {
  display: none;
}

body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="2"]
  [data-fieldset="User-type"] {
  display: none;
}

body[data-path="/contact/design-strategist"]
  .hs_cos_wrapper_type_form
  form[form-step="2"]
  .cre-t-07-button-wrapper {
  display: none;
}

body[data-path="/contact/design-strategist"] .cre-t-07-main-error-hide {
  display: none;
}
```

## **1. Background / Problem**

In our initial implementation of the CRE-T-143 variation, I used **`async/await`** for fetching restaurant data from our GraphQL endpoint.

While the data itself loaded correctly, I noticed **slow client-side performance**, especially for the slider and skeleton loader. The perceived load time was noticeably higher compared to the previous version.

---

## **2. Why Async/Await Was Slowing Things Down**

### **Sequential Execution**

The main issue was **sequential behavior**. Each region (Sydney → Melbourne → Gold Coast → Brisbane → Cairns → Sunshine Coast) was waiting for the previous fetch to complete:

```jsx
await restaurantList(193, "sydney");
await restaurantList(426, "melbourne");
```

This caused a domino effect—each region had to wait for the previous one to finish, delaying overall rendering.

---

### **Main Thread Blocking**

`async/await` pauses execution until the Promise resolves. While this is fine on the server, on the client it meant:

- **DOM painting delayed**
- Skeleton loader appeared late
- Slider initialization delayed

The single-threaded nature of JS caused a **blocking effect** during network requests.

---

### **Skeleton Delay**

Even though `showSkeleton(true)` was called, the DOM couldn't render it immediately because the main thread was blocked by awaiting data.

---

## **3. Why `.then()` Fixes the Problem**

By switching to **raw `.then()` chains**, we achieved:

- **Non-blocking fetch:** main thread continues; skeleton appears instantly
- **Parallel data fetching:** all regions request at the same time
- **Faster perceived performance:** user sees content (skeleton + partial data) faster

Example:

```jsx
fetch(url)
  .then((res) => res.json())
  .then((data) => renderData(data));
```

This ensures that each fetch runs asynchronously in the background, while the page remains interactive.

---

### **Technical Advantages**

- **Skeleton shows immediately** → better UX
- **All regions load concurrently** → faster LCP & TTFB
- **DOM updates happen earlier** → reduced CLS / layout shift
- **Slider initialization smoother** → no visual freezing

---

## **4. Additional Notes**

- We optimized **images** in this variation by defining **width, height, and URL** directly in the `<img>` tag. This ensures faster rendering and avoids layout shifts.

```html
<img src="https://images.firsttable.net/212x150/IMAGE_ID" alt="Restaurant" />
```

- This pattern improves **client-side perceived performance**, which is critical for fast interactions and slider responsiveness.
- ALSO ITS IMPORTANT Whenever work on SPA sites Always and Always Add inline style `“display:none:”` whenever adding a an element to the DOM. and On cse use `“display:block/flex !important;”`

```jsx
(function () {
  try {
    var debug = 1;
    var variation_name = "cre-t-143";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();

    var starImagesJSON = [
      { id: 0, src: "https://v2.crocdn.com/FirstTable/zeroStar.svg" },
      { id: 1, src: "https://v2.crocdn.com/FirstTable/oneStar.svg" },
      { id: 2, src: "https://v2.crocdn.com/FirstTable/oneHalf.svg" },
      { id: 3, src: "https://v2.crocdn.com/FirstTable/twoStar.svg" },
      { id: 4, src: "https://v2.crocdn.com/FirstTable/twoHalf.svg" },
      { id: 5, src: "https://v2.crocdn.com/FirstTable/threeStar.svg" },
      { id: 6, src: "https://v2.crocdn.com/FirstTable/threeHalf.svg" },
      { id: 7, src: "https://v2.crocdn.com/FirstTable/fourStar.svg" },
      { id: 8, src: "https://v2.crocdn.com/FirstTable/fourHalf.svg" },
      { id: 9, src: "https://v2.crocdn.com/FirstTable/fiveStar.svg" },
    ];

    function getStarImage(rating) {
      if (rating <= 0) return starImagesJSON[0].src;
      if (rating >= 5) return starImagesJSON[9].src;

      if (rating >= 1 && rating <= 1.2) return starImagesJSON[1].src;
      if (rating >= 1.3 && rating <= 1.7) return starImagesJSON[2].src;
      if (rating >= 1.8 && rating <= 2.2) return starImagesJSON[3].src;
      if (rating >= 2.3 && rating <= 2.7) return starImagesJSON[4].src;
      if (rating >= 2.8 && rating <= 3.2) return starImagesJSON[5].src;
      if (rating >= 3.3 && rating <= 3.7) return starImagesJSON[6].src;
      if (rating >= 3.8 && rating <= 4.2) return starImagesJSON[7].src;
      if (rating >= 4.3 && rating <= 4.7) return starImagesJSON[8].src;
      if (rating >= 4.8 && rating <= 4.9) return starImagesJSON[9].src;

      return starImagesJSON[0].src; // fallback
    }

    const endpoint = "https://stellate.firsttable.net/graphql";

    const query = `
  query GetRegions($siteId: Int!) {
    sydney: City(siteId: $siteId, slug: "/sydney") {
      regionId
      slug
    }
    melbourne: City(siteId: $siteId, slug: "/melbourne") {
      regionId
      slug

    }
    gold_coast: City(siteId: $siteId, slug: "/gold-coast") {
      regionId
      slug
    }
    brisbane: City(siteId: $siteId, slug: "/brisbane") {
      regionId
      slug
    }
    cairns: City(siteId: $siteId, slug: "/cairns") {
      regionId
      slug
    }
    sunshine_coast: City(siteId: $siteId, slug: "/sunshine-coast") {
      regionId
      slug
    }
  }
`;

    const variables = {
      siteId: 2,
    };

    function showSkelton(isLoading) {
      var loaderWrapper = document.querySelector(".cre-t-143-loader-wrapper");
      // console.log(isLoading);
      if (isLoading) {
        if (!loaderWrapper) {
          var skeletonHTML = `
      <div class='cre-t-143-loader-wrapper'>
        <div class="cre-t-143-top-restaurants-section-header">
          <div class="cre-t-143-top-restaurants-section-header-container">
            <div class="cre-t-143-top-restaurants-section-header-title skeleton-text skeleton-title"></div>
            <div class="cre-t-143-top-restaurants-section-header-subtitle skeleton-link"></div>
          </div>
        </div>
        <div class="cre-t-143-top-restaurants-slider-container">
          <div class="cre-t-143-top-restaurants-cards">
            ${Array(5)
              .fill(0)
              .map(
                () => `
              <div class="cre-t-143-top-restaurants-card skeleton-card">
                <div class="cre-t-143-top-restaurants-card-image-wrapper skeleton-image"></div>
                <div class="cre-t-143-top-restaurants-card-content">
                  <div class="skeleton-text skeleton-title"></div>
                  <div class="skeleton-text skeleton-rating"></div>
                  <div class="skeleton-text skeleton-location"></div>
                  <div class="skeleton-text skeleton-cuisine"></div>
                </div>
              </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>`;
          var alreadLoader = document.querySelector(
            ".cre-t-143-loader-wrapper",
          );
          if (!alreadLoader) {
            document
              .querySelector('[data-attribe="booking_details_section"]')
              .insertAdjacentHTML("afterend", skeletonHTML);
            loaderWrapper = document.querySelector(".cre-t-143-loader-wrapper");
          }
        }

        loaderWrapper.classList.remove("loader-hidden");
      } else {
        // Hide the loader
        if (loaderWrapper) loaderWrapper.classList.add("loader-hidden");
      }
    }

    function addRegionSlider(formattedRestaurants, regionName, prevSection) {
      // Prevent adding duplicate sliders

      if (
        document.querySelector(
          `[data-region="${regionName.split(" ").join("-")}"]`,
        )
      ) {
        return;
      }

      // var prevRegion = regionName === "sydney" ? '[data-attribe="booking_details_section"]' : regionName === "melbourne" ? '[data-region="sydney"]' : regionName === "gold_coast" ? '[data-region="melbourne"]' : regionName === "brisbane" ? '[data-region="gold_coast"]' : regionName === "cairns" ? '[data-region="brisbane"]' : regionName === "sunshine_coast" ? '[data-region="cairns"]' : null;

      helper.waitForElement(
        prevSection,
        function () {
          document
            .querySelector(prevSection)
            .insertAdjacentHTML(
              "afterend",
              generateCardsHTML(formattedRestaurants, regionName),
            );
          sliderInit(regionName);
          if (regionName === "sydney") {
            showSkelton(false);
          }

          // console.log("slider added after -->",prevRegion);
        },
        50,
        15000,
      );
    }

    function restaurantList(regionId, regionName, prevSection) {
      // Helper function remains the same

      // console.log(`%c ${regionName}`, "color: yellow; font-weight: bold; font-size: 16px;");
      function generateSortSeed(periodHours = 4) {
        const periodSeconds = periodHours * 60 * 60;
        const nowUtcSeconds = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds
        return `${Math.floor(nowUtcSeconds / periodSeconds)}`;
      }

      if (regionName === "sydney" && regionId === 193) {
        showSkelton(true);
      }

      fetch("https://stellate.firsttable.net/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "x-graphql-client-name": "Website",
          "x-graphql-client-version": "https://www.firsttable.com.au/",
          stage: "Live",
        },
        body: JSON.stringify({
          query: `query Restaurants(
    $regionId: Int
    $suburbs: [Int]
    $tags: [Int]
    $sort: RestaurantSortTypes
    $features: [RestaurantFilterTypes]
    $sessions: [SessionTypes]
    $dates: [String]
    $nearTo: NearToInput
    $limit: Int
    $offset: Int
    $ids: [Int]
    $sortSeed: String
    $offersSession: [SessionTypes]
  ) {
    paginatedRestaurants(
      input: {
        prioritiseByAvailability: { forSession: $sessions, onDate: $dates }
        status: [LIVE, ON_HOLD]
        regionId: $regionId
        suburbs: $suburbs
        tags: $tags
        sort: $sort
        features: $features
        nearTo: $nearTo
        id: $ids
        sortSeed: $sortSeed
        offersSession: $offersSession
      }
      limit: $limit
      offset: $offset
    ) {
      nodes {
        ...RestaurantFragment
      }
    }
  }

  fragment RestaurantFragment on Restaurant {
    __typename
    id
    menuTitle
    gallery
    rating
    approvedReviewsCount
    slug
    suburb {
      ...RestaurantLocationFragment
    }
    region {
      ...RestaurantLocationFragment
    }
    cuisines {
      edges {
        node {
          ...RestaurantCuisineFragment
        }
      }
    }
  }

  fragment RestaurantLocationFragment on City {
    __typename
    id
    menuTitle
  }

  fragment RestaurantCuisineFragment on RestaurantCuisine {
    __typename
    id
    title
  }

`,
          variables: {
            regionId: regionId,
            tags: [],
            features: [],
            offersSession: ["DINNER", "DINNER2"],
            sort: `RANKING`,
            limit: 10,
            offset: 0,
            sortSeed: generateSortSeed(),
          },
        }),
      })
        .then((restaurantResponse) => {
          if (restaurantResponse.status === 404)
            throw new Error("Restaurants not found");
          return restaurantResponse.json();
        })
        .then((restaurantData) => {
          var restaurantList = restaurantData.data.paginatedRestaurants.nodes;
          //  console.log(restaurantList)

          var formattedRestaurants = restaurantList.map((restaurant) => ({
            heroImage: restaurant?.gallery || "",
            title: restaurant?.menuTitle,
            rating: restaurant?.rating || 0,
            reviewsCount: restaurant?.approvedReviewsCount || 0,
            city:
              restaurant?.suburb?.menuTitle ||
              restaurant?.region?.menuTitle ||
              "",
            cuisine: restaurant.cuisines?.edges?.[0]?.node?.title || "",
            slug: restaurant?.slug,
          }));

          addRegionSlider(formattedRestaurants, regionName, prevSection);
          // showSkelton(false);
        })
        .catch((error) => {
          console.error("Error fetching restaurants:", error);
          if (regionName === "sydney" && regionId === 193) {
            showSkelton(false);
          }
        });
    }

    /* wait for swiper js */
    function waitForSwiper(trigger) {
      var interval = setInterval(function () {
        if (typeof window.Swiper != "undefined") {
          clearInterval(interval);
          trigger();
        }
      }, 50);
      setTimeout(function () {
        clearInterval(interval);
      }, 15000);
    }

    /* load swiper library */

    function addScript() {
      var scriptOne = document.createElement("script");
      scriptOne.src =
        "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";
      document.querySelector("head").appendChild(scriptOne);

      var swiperCss =
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css" />';
      document.querySelector("head").insertAdjacentHTML("beforeend", swiperCss);
    }

    // Adding Script to the DOM 1st Step
    if (!window.CRE_143_SLIDER) {
      addScript();
      window.CRE_143_SLIDER = true;
    }

    /* Initialize variables for storing restaurant data */

    /* Generate Cards HTML dynamically from JSON */
    function generateCardsHTML(restaurants, regionName) {
      var formattedRegionName = regionName;
      var htmlRegionName = regionName.replace(/_/g, " ");

      // var titleLine = htmlRegionName
      //   .split(" ")[0]
      //   .toLowerCase()
      //   .replace(/^./, (c) => c.toUpperCase());

      var titleLine = htmlRegionName
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      return `
<div class="cre-t-143-top-restaurants-container" data-region="${formattedRegionName}" style="display: none;">
<div class="cre-t-143-top-restaurants-section-header">
    <div class="cre-t-143-top-restaurants-section-header-container">
        <div class="cre-t-143-top-restaurants-section-header-title">Top restaurants in ${titleLine}</div>
        <a href="${window.location.origin}/${formattedRegionName.replace(/_/g, "-")}/?sort=FEATURED_NEW_TOP" class="cre-t-143-top-restaurants-section-header-subtitle">See all</a>
    </div>
</div>
<div class="cre-t-143-top-restaurants-slider-container">
    <div class="swiper cre-t-143-swiper mainSwiper143 ${formattedRegionName}" >
        <div class="swiper-wrapper">
            ${restaurants
              .map(
                (r) => `
            <div class="cre-t-143-top-restaurants-card card1 swiper-slide">
              <a href="${r?.slug}">
                <div class="cre-t-143-top-restaurants-card-image-wrapper">
                    <img class="cre-t-143-top-restaurants-card-image" src="https://images.firsttable.net/212x150/${r.heroImage}" alt="${r.title}">
                </div>
                <div class="cre-t-143-top-restaurants-card-content">
                    <div class="cre-t-143-top-restaurants-card-restaurant-name">${r.title}</div>
                    <div class="cre-t-143-top-restaurants-card-restaurant-rating">
                        <span
                            class="cre-t-143-top-restaurants-card-restaurant-rating-value">${r.rating.toFixed(1)}</span>
                        <div class="cre-t-143-top-restaurants-card-restaurant-rating-stars">
                            <img class="cre-t-143-star-img"
                                src="${getStarImage(r.rating.toFixed(1))}"
                                alt="star" />
                        </div>
                        <span class="cre-t-143-top-restaurants-card-restaurant-rating-count">(${r.reviewsCount})</span>
                    </div>
                    <div class="cre-t-143-top-restaurants-card-restaurant-location">
                        <div class="cre-t-143-top-restaurants-card-restaurant-location-icon">
                            <img class="cre-t-143-location-img"
                                src="https://v2.crocdn.com/FirstTable/locationIcon.svg"
                                alt="location" />
                        </div>
                        <div class="cre-t-143-top-restaurants-card-restaurant-location-text">${r.city}</div>
                    </div>
                    <div class="cre-t-143-top-restaurants-card-restaurant-cuisines">
                        <div class="cre-t-143-top-restaurants-card-restaurant-cuisine-icon">
                            <img class="cre-t-143-cuisine-img"
                                src="https://v2.crocdn.com/FirstTable/resturantIcon.svg"
                                alt="cuisine" />

                        </div>
                        <div class="cre-t-143-top-restaurants-card-restaurant-cuisine-text">${r.cuisine}</div>
                    </div>
                </div>
              </a>
            </div>`,
              )
              .join("")}
        </div>
    </div>
    <div class="swiper-button-prev cre-t-143-swiper-button-prev"></div>
  <div class="swiper-button-next cre-t-143-swiper-button-next"></div>
</div>

</div>
`;
    }

    /* Slider initialization */
    function sliderInit(sliderRegion) {
      waitForSwiper(function () {
        var creSwiper143 = new Swiper(`.swiper.mainSwiper143.${sliderRegion}`, {
          slidesPerView: 5, // default (mobile first)
          spaceBetween: 10,
          speed: 600,
          loop: false,
          allowTouchMove: true,
          slideToClickedSlide: false,
          navigation: {
            nextEl: `.mainSwiper143.${sliderRegion} ~ .swiper-button-next.cre-t-143-swiper-button-next`,
            prevEl: `.mainSwiper143.${sliderRegion} ~ .swiper-button-prev.cre-t-143-swiper-button-prev`,
          },
          breakpoints: {
            320: {
              slidesPerView: 1.75,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2.5,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          },
        });
      });
    }

    function textUnderLine() {
      helper.waitForElement(
        'html body[data-path="/"] [data-attribute="hero-dropdown"] h1[data-textnodetype="h1"]',
        function () {
          var heroheadLine = document.querySelector(
            'html body[data-path="/"] [data-attribute="hero-dropdown"] h1[data-textnodetype="h1"]',
          );
          if (heroheadLine) {
            var text = heroheadLine.textContent;
            var newText = text.replace(
              /save 50%/,
              '<span class="cre-t-143-text-underline" style="display:none;">$&</span>',
            );
            heroheadLine.innerHTML = newText;
          }
        },
        25,
        25000,
      );
    }

    function forSydney() {
      restaurantList(193, "sydney", '[data-attribe="booking_details_section"]');
    }

    function forMelbourne() {
      restaurantList(426, "melbourne", '[data-region="sydney"]');
    }

    function forGoldCoast() {
      restaurantList(320, "gold_coast", '[data-region="melbourne"]');
    }

    function forBrisbane() {
      restaurantList(425, "brisbane", '[data-region="gold_coast"]');
    }
    function forCarins() {
      restaurantList(752, "cairns", '[data-region="brisbane"]');
    }
    function forSunshineCoast() {
      restaurantList(428, "sunshine_coast", '[data-region="cairns"]');
    }

    /* Initialize variation */
    function init() {
      if (window.location.hostname === "www.firsttable.com.au") {
        _$("body").addClass(variation_name);
        if (document.querySelector(".cre-t-143-loader-wrapper")) return;
        forSydney();
        forMelbourne();
        forGoldCoast();
        forBrisbane();
        forCarins();
        forSunshineCoast();
        textUnderLine();
      }
    }
    // 2nd step initialization
    helper.waitForElement(
      '[data-attribe="booking_details_section"]',
      init,
      50,
      15000,
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```

**Task Link:** https://web.rock.so/space/dpma8W1p/task/2458

**Task:** Add custom checkout, sign-in, and create account buttons on the Radwell website for US users using HTML + JavaScript string injection.

**Note:** To access the site for this task, a **USA VPN connection** is required.

---

## Overview

This script injects a **button group** into the Radwell checkout page (`html[lang="en-US"] .section-form`). It provides three options for users:

1. **Guest Checkout**
2. **Sign In**
3. **Create Account**

It also manages click behavior and ensures the buttons only appear once.

---

## Main Components

### 1. Helper Library (`_$`)

- A mini DOM utility created for this variation (similar to jQuery):
  - `eq(n)` → select a specific element from a collection.
  - `each(fn)` → iterate over selected elements.
  - `addClass(className)` → add class(es) to elements.
  - `waitForElement(selector, trigger, interval, timeout)` → waits for a DOM element to appear before executing a callback.
  - `live(selector, event, callback)` → binds events to dynamically inserted elements.

**Purpose:** Makes DOM manipulation and event binding consistent and easy across browsers.

---

### 2. HTML Injection

The button group is defined as a **string**:

```jsx
var groupButonHTML =
  '<div class="cre-t-14-button-container">' +
  '<div class="cre-t-14-button-wrapper">' +
  '<div class="cre-t-14-button guestCheckout">Guest checkout</div>' +
  '<div class="cre-t-14-button signIn">Sign In</div>' +
  '<div class="cre-t-14-button createAccount">Create An Account</div>' +
  "</div></div>";
```

**Insertion Logic:**

- Wait for the main form section: `html[lang="en-US"] .section-form`
- Append the button group **only if it doesn’t already exist**.

---

### 3. Click Handlers

1. **Guest Checkout:**
   - Clicks the native checkout button inside `.section-form__wrapper .checkoutbutton`.
2. **Sign In / Create Account:**
   - Shows the form section (`.section-form__wrapper`)
   - Hides the injected button group
   - Triggers the respective native button:
     - Sign In → `button.login-btn`
     - Create Account → `button.rgstr-btn`

**Implementation:** Uses the `helper.live()` method to bind events to buttons dynamically.

---

### 4. Initialization

- Add a class to `<body>`: `cre-t-14` (helps with CSS targeting)
- Insert new button group
- Attach click handlers (ensures handlers are only attached once)
- Wait for the page to fully load before initialization:
  ```jsx
  helper.waitForElement(
    'html[lang="en-US"] .section-form__wrapper a.checkoutbutton',
    init,
    50,
    15000,
  );
  ```

---

### 5. Notes

- **USA VPN Required:** The script specifically targets `html[lang="en-US"]`, meaning only US pages.
- **Single Injection:** Checks if the button group already exists to avoid duplicate buttons.

```jsx
(function () {
  try {
    /* main variables */
    var debug = 1;
    var variation_name = "cre-t-14";

    /* helper library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (var index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },

        // Adding Class
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },

        // Waiting for element to load
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },

        live: function (selector, event, callback, context) {
          /****Helper Functions****/
          // helper for enabling IE 8 event bindings
          function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent("on" + type, handler);
            else el.addEventListener(type, handler);
          }
          // matches polyfill
          this.Element &&
            (function (ElementPrototype) {
              ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                  var node = this,
                    nodes = (node.parentNode || node.document).querySelectorAll(
                      selector,
                    ),
                    i = -1;
                  while (nodes[++i] && nodes[i] != node);
                  return !!nodes[i];
                };
            })(Element.prototype);
          // live binding helper using matchesSelector
          function live(selector, event, callback, context) {
            addEvent(context || document, event, function (e) {
              var found,
                el = e.target || e.srcElement;
              while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
              )
                el = el.parentElement;
              if (found) callback.call(el, e);
            });
          }
          live(selector, event, callback, context);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });

    var helper = _$();
    // Helper Library
    var groupButonHTML =
      '<div class="cre-t-14-button-container">' +
      '<div class="cre-t-14-button-wrapper">' +
      '<div class="cre-t-14-button guestCheckout">Guest checkout</div>' +
      '<div class="cre-t-14-button signIn">Sign In</div>' +
      '<div class="cre-t-14-button createAccount">Create An Account</div>' +
      "</div>" +
      "</div>";

    function newButtonInsertion() {
      helper.waitForElement('html[lang="en-US"] .section-form', function () {
        var mainSection = document.querySelector(
          'html[lang="en-US"] .section-form',
        );
        var newButtonContainer = document.querySelector(
          ".cre-t-14-button-container",
        );
        if (!newButtonContainer) {
          mainSection.insertAdjacentHTML("beforeend", groupButonHTML);
        }
      });
    }

    function clickHandlers() {
      // check out button click
      helper.live(".cre-t-14-button.guestCheckout", "click", function () {
        var guestCheckOutButton = document.querySelector(
          ".section-form__wrapper .checkoutbutton",
        );
        if (guestCheckOutButton) guestCheckOutButton.click();
      });

      function showFormAndHideGroup(buttonSelector) {
        var formSection = document.querySelector(".section-form__wrapper");
        var buttonGroup = document.querySelector(".cre-t-14-button-container");
        var targetButton = document.querySelector(buttonSelector);

        if (formSection) formSection.classList.add("show-form");
        if (buttonGroup) buttonGroup.classList.add("hide-button-group");
        if (targetButton) targetButton.click();
      }

      // sign in button click
      helper.live(".cre-t-14-button.signIn", "click", function () {
        showFormAndHideGroup("html button.login-btn");
      });

      // create account button click
      helper.live(".cre-t-14-button.createAccount", "click", function () {
        showFormAndHideGroup("html button.rgstr-btn");
      });
    }

    /* Variation Init */
    function init() {
      _$("body").addClass(variation_name);
      newButtonInsertion();
      if (!window.CRE_T_14_CLICK_HANDLERS) {
        clickHandlers();
        window.CRE_T_14_CLICK_HANDLERS = true;
      }

      // Find target element to append the button
    }

    /* Initialize variation */
    helper.waitForElement(
      'html[lang="en-US"] .section-form__wrapper a.checkoutbutton',
      init,
      50,
      15000,
    );
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```

```css
html[lang="en-US"] body.cre-t-14 .section-form__wrapper {
  display: none !important;
}

html[lang="en-US"] body.cre-t-14 #account-login .benefits {
  height: 100%;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 428px;
  margin: 0 auto;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button {
  max-width: 428px;
  display: flex;
  justify-content: center;
  padding: 12px 0px;
  border-radius: 50px;
  border: 1px solid #0055b8;
  background: #fff;
  color: #0055b8;
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: 0.25s;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button:hover {
  background: #0055b8;
  color: #fff;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button.guestCheckout {
  background: #0055b8;
  color: #fff;
  transition: 0.25s;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button.guestCheckout:hover {
  background: #000;
  border: 1px solid #000;
}

html[lang="en-US"] body.cre-t-14 #account-login .section-form {
  margin: 0 auto;
  width: 48% !important;
  border-radius: 10px;
  background: #e7eef8;
}

/* Show Hide */

html[lang="en-US"] body.cre-t-14 .section-form__wrapper.show-form {
  display: flex !important;
  max-width: 428px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 0px;
}

html[lang="en-US"] body.cre-t-14 .cre-t-14-button-container.hide-button-group {
  display: none;
}

@media screen and (max-width: 800px) {
  html[lang="en-US"] body.cre-t-14 #account-login .section-form {
    width: 95% !important;
    padding: 1.5rem;
  }

  html[lang="en-US"] body.cre-t-14 .section-form__wrapper.show-form {
    max-width: 100%;
    padding: 0px;
  }
}

@media screen and (min-width: 800px) and (max-width: 1200px) {
  html[lang="en-US"] body.cre-t-14 #account-login {
    gap: 50px;
    /* adjust gap value as needed */
  }
}
```

**Task Link:** https://web.rock.so/space/dpma8W1p/task/2396
**Task:** Add a USP (Unique Selling Proposition) bar with a slider for mobile users on the native Radwell website.

**Platform:** AB Tasty (Variation runs via AB Tasty, JS + CSS directly injected)

**Note:** This variation is **native website specific**, meaning it runs directly on the live site, not a staging/test environment.

---

## Overview

This variation introduces:

- A **desktop USP bar** with icons and text (static layout)
- A **mobile USP bar** with a Swiper slider for horizontal scrolling
- Event handling for **search open/close** to hide/show the mobile slider
- Direct **CSS injection** via JS to style elements

**Goal:** Improve mobile user experience and highlight USPs in a visually interactive slider.

---

## Key Components

### 1. Helper Library (`_$`)

- A mini utility library for:
  - Selecting DOM elements
  - Adding classes
  - Waiting for elements
  - Event delegation (`live`)
- Ensures cross-browser compatibility and dynamic DOM handling

---

### 2. HTML Injection

- **Desktop USP bar:** simple flex layout
- **Mobile USP bar:** Swiper slider with `.swiper-slide` for each USP
- Buttons: navigation arrows (`next` / `prev`)
- HTML injected after the header:

```jsx
header.insertAdjacentHTML("afterend", desktopUspHTML);
```

---

### 3. Swiper Slider Initialization

```jsx
if (window.innerWidth < 960) {
  document
    .querySelector(".cre-t-01-usp-bar-wrapper-mobile")
    .classList.add("showSlider");
  window.dispatchEvent(new Event("resize"));

  setTimeout(function () {
    var el = document.querySelector(".cre-t-01-usp-bar-wrapper-mobile.mobile");
    if (el && el.swiper) {
      var x = el.swiper;
      if (x.params.autoplay && x.autoplay) {
        x.params.autoplay.disableOnInteraction = false;
        x.autoplay.start();
      }
      x.update();
      console.log("Swiper autoplay enabled and slider updated.");
    } else {
      console.log("Swiper not found on .cre-t-01-usp-bar-wrapper.mobile");
    }
    window.dispatchEvent(new Event("resize"));
  }, 2000);
}
```

**Explanation:**

1. **Mobile Only (`< 960px`)**
   - Checks viewport width
   - Adds `showSlider` class to display the mobile slider
   - Triggers `resize` event to ensure layout updates
2. **Delayed Swiper Update (`setTimeout`)**
   - Waits 2 seconds to ensure Swiper has initialized
   - Accesses Swiper instance via `el.swiper`
   - Ensures autoplay works and continues after interaction (`disableOnInteraction = false`)
   - Calls `x.update()` to refresh slider layout
3. **Why This is Done**
   - Swiper sometimes initializes **before CSS or DOM fully loads**, causing broken autoplay or misaligned slides
   - Delayed update ensures:
     - Slider displays correctly
     - Autoplay continues even after user interacts
     - Responsive resizing works dynamically
4. **Resize Event Dispatch**
   - Forces layout recalculation for mobile slider
   - Ensures arrows, slides, and container adjust correctly

---

### 4. Event Handling

- Hide mobile USP bar when **search is opened**
- Show it again when **search is closed**
- Handled via `helper.live()` for dynamic elements

---

### 5. CSS Injection

- Injected directly via JS for AB Tasty

# Switest 76 Implementation

---

## Overview

This documentation provides a technical and operational breakdown of the Swftes76 JavaScript variation. It is designed to help team members understand how we replace standard Trustpilot logos with a custom "Pet Insurance Gurus Score" and how we solve common issues like data mismatching during dynamic filtering.

---

## Project Goal

We replace the default rating section with a custom interactive UI. When a user hovers (on desktop) or clicks (on mobile) the score, a modal (dropdown) appears showing detailed metrics: **Popularity, Value for Money, and Reviews.**

---

## 1. How We Ensure Data Accuracy

The biggest challenge in dynamic insurance lists is ensuring that "Lemonade's" score doesn't accidentally show up on "MetLife's" card, especially when filters change the order of the list.

### A. The `data-unique` Identifier Logic

We don't rely on the order of the listings (1st, 2nd, 3rd). Instead, we use a unique "Fingerprint" for each partner found in the website's code.

JavaScript

```jsx
// Example of how we map data to a specific HTML element
var listItemLabel = item.getAttribute("data-unique"); // Captures the unique ID from the site
var matchedData = insurancePartners.find(function (data) {
  return data.dataLabel === listItemLabel; // Matches the ID to our score database
});
```

### B. Prevention of Duplicates

When filters are applied, the website often re-renders the list. If we simply "append" our code, you might see two or three score boxes on one card.

- **The Solution:** Inside `insurancePartnersFunctionality()`, we check `if (existingContainer)`. If the custom UI is already there, we only **update the numbers** instead of adding new HTML.

---

## 2. Handling Dynamic Filters & Sorting

When a user interacts with the "Filter" or "Sort" sections, the website often fetches new data via AJAX (Fetch API) without a page refresh. This usually breaks standard JavaScript injections.

### The `fetchDetect()` Mechanism

We use a `PerformanceObserver` to "listen" to the browser's background network activity.

- **What it does:** It watches for any network call containing `/v1/quotes` (the API the site uses to update the list).
- **The Action:** As soon as a fetch is detected:
  1. It wipes out all currently injected custom containers to start fresh.
  2. It triggers a "Force Insertion" (a 1-second interval) to re-inject the correct data once the new listings appear in the DOM.

JavaScript

```jsx
function fetchDetect() {
  var performanceObserver = new PerformanceObserver((list) => {
    var entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === "resource" && entry.initiatorType === "fetch") {
        if (entry.name.includes("/v1/quotes")) {
          var existingContainer = document.querySelectorAll(
            ".cre-t-76-container",
          );
          if (existingContainer.length > 0) {
            existingContainer.forEach(function (existElement) {
              existElement.remove();
            });
          }

          var forceInsertion2 = setInterval(function () {
            insurancePartnersFunctionality();
            renderLibertyMutual();
          }, 250);

          setTimeout(function () {
            clearInterval(forceInsertion2);
          }, 1000);
        }
      }
    });
  });
  performanceObserver.observe({ entryTypes: ["resource"] });
}
```

---

## 3. UI and Interaction Part

### A. Reusable HTML Generator

Instead of writing HTML for every partner, we use the `getInsuranceHtml(data)` function. This ensures that the progress bars for "Popularity" or "Value for Money" are calculated accurately based on the percentages in our `insurancePartners` array.

### B. Mobile vs. Desktop

- **Desktop:** The modal is designed for hover/visual clarity.
- **Mobile:** Since there is no "hover" on phones, we added a `live` click listener. Clicking the score toggles the `.cre-t-76-dropdown-active` class.
- **Closing:** We implemented a "click outside" listener—if a user clicks anywhere else on the body, the modal closes.

---

## 4. Special Case: Liberty Mutual

Liberty Mutual often behaves differently in compared to other partners (different naming attributes or dynamic IDs). We created a dedicated function `renderLibertyMutual()` that uses a **wildcard selector** `[data-unique*="Liberty"]` to ensure we find it even if the ID changes slightly.

---

## Summary for Future Developers

1. **Adding a New Partner:** Simply add a new object to the `insurancePartners` array. Ensure the `dataLabel` matches the `data-unique` attribute on the website.
2. **Changing Scores:** Update the values in the `insurancePartners` array; the UI will update automatically.
3. **Filter Issues:** If the UI disappears after filtering, check if the API endpoint name has changed from `/v1/quotes` to something else in the `fetchDetect` function.

On this site, clicking "Show More" loads additional insurance partners into the list without refreshing the page. If we don’t track this, the new listings will show the old Trustpilot logo instead of our custom UI.

**How we handle it:**
We use a "Live" event listener on the `.oxy-read-more-link`. This ensures that every time the list expands, our injection functions run again specifically for those new items.

JavaScript

```jsx
// Located inside the eventHandler() function
live("html body .oxy-read-more-link", "click", function () {
  // Re-run the functions to find new items and inject HTML
  insurancePartnersFunctionality();
  renderLibertyMutual();
});
```

**Future Note:** If the class name of the "Show More" button changes, update this selector immediately to maintain functionality

---

```jsx
(function () {
  try {
    /* Main Variables */
    var debug = 1;
    var variation_name = "cre-t-76";

    /* Helper Library */
    var _$;
    !(function (factory) {
      _$ = factory();
    })(function () {
      var bm = function (s) {
        if (typeof s === "string") {
          this.value = Array.prototype.slice.call(document.querySelectorAll(s));
        }
        if (typeof s === "object") {
          this.value = [s];
        }
      };
      bm.prototype = {
        eq: function (n) {
          this.value = [this.value[n]];
          return this;
        },
        each: function (fn) {
          [].forEach.call(this.value, fn);
          return this;
        },
        log: function () {
          var items = [];
          for (let index = 0; index < arguments.length; index++) {
            items.push(arguments[index]);
          }
          console && console.log(variation_name, items);
        },
        addClass: function (v) {
          var a = v.split(" ");
          return this.each(function (i) {
            for (var x = 0; x < a.length; x++) {
              if (i.classList) {
                i.classList.add(a[x]);
              } else {
                i.className += " " + a[x];
              }
            }
          });
        },
        waitForElement: function (
          selector,
          trigger,
          delayInterval,
          delayTimeout,
        ) {
          var interval = setInterval(function () {
            if (_$(selector).value.length) {
              clearInterval(interval);
              trigger();
            }
          }, delayInterval);
          setTimeout(function () {
            clearInterval(interval);
          }, delayTimeout);
        },
      };
      return function (selector) {
        return new bm(selector);
      };
    });
    var helper = _$();

    /* Live Event Listener */
    function live(selector, event, callback, context) {
      function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
      }
      this &&
        this.Element &&
        (function (ElementPrototype) {
          ElementPrototype.matches =
            ElementPrototype.matches ||
            ElementPrototype.matchesSelector ||
            ElementPrototype.webkitMatchesSelector ||
            ElementPrototype.msMatchesSelector ||
            function (selector) {
              var node = this,
                nodes = (node.parentNode || node.document).querySelectorAll(
                  selector,
                ),
                i = -1;
              while (nodes[++i] && nodes[i] != node);
              return !!nodes[i];
            };
        })(Element.prototype);
      function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
          var found,
            el = e.target || e.srcElement;
          while (
            el &&
            el.matches &&
            el !== context &&
            !(found = el.matches(selector))
          )
            el = el.parentElement;
          if (found) callback.call(el, e);
        });
      }
      live(selector, event, callback, context);
    }

    var crossIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1.05375 13.3075L0 12.2538L5.6 6.65375L0 1.05375L1.05375 0L6.65375 5.6L12.2537 0L13.3075 1.05375L7.7075 6.65375L13.3075 12.2538L12.2537 13.3075L6.65375 7.7075L1.05375 13.3075Z" fill="white" fill-opacity="0.6" />
      </svg>
    `;

    /*Insurance Partners Data */
    var insurancePartners = [
      {
        dataLabel: "outbound-partner-clicks-Lemonade-Listing-Only",
        partner: "Lemonade",
        classification: "Exceptional",
        total: "9.6",
        popularity: "10.0",
        valueForMoney: "9.8",
        reviews: "9.0",
        popularityPercentage: "100%",
        valueForMoneyPercentage: "98%",
        reviewsPercentage: "90%",
      },
      {
        dataLabel: "outbound-partner-clicks-Pumpkin-Listing-Only",
        partner: "Pumpkin",
        classification: "Very Good",
        total: "8.1",
        popularity: "7.9",
        valueForMoney: "8.0",
        reviews: "8.3",
        popularityPercentage: "79%",
        valueForMoneyPercentage: "80%",
        reviewsPercentage: "83%",
      },
      {
        dataLabel: "outbound-partner-clicks-Fetch-Listing-Only",
        partner: "Fetch",
        classification: "Excellent",
        total: "8.5",
        popularity: "8.6",
        valueForMoney: "8.3",
        reviews: "8.5",
        popularityPercentage: "86%",
        valueForMoneyPercentage: "83%",
        reviewsPercentage: "85%",
      },
      {
        dataLabel: "outbound-partner-clicks-ASPCA-Listing-Only",
        partner: "ASPCA",
        classification: "Excellent",
        total: "8.5",
        popularity: "8.5",
        valueForMoney: "8.4",
        reviews: "8.7",
        popularityPercentage: "85%",
        valueForMoneyPercentage: "84%",
        reviewsPercentage: "87%",
      },
      {
        dataLabel: "outbound-partner-clicks-Embrace-Listing-Only",
        partner: "Embrace",
        classification: "Excellent",
        total: "8.5",
        popularity: "8.4",
        valueForMoney: "8.7",
        reviews: "8.3",
        popularityPercentage: "84%",
        valueForMoneyPercentage: "87%",
        reviewsPercentage: "83%",
      },
      {
        dataLabel: "outbound-partner-clicks-Figo-Listing-Only",
        partner: "Figo",
        classification: "Very Good",
        total: "7.4",
        popularity: "7.1",
        valueForMoney: "7.7",
        reviews: "7.5",
        popularityPercentage: "71%",
        valueForMoneyPercentage: "77%",
        reviewsPercentage: "75%",
      },
      {
        dataLabel: "outbound-partner-clicks-Trupanion-Listing-Only",
        partner: "Trupanion",
        classification: "Good",
        total: "6.9",
        popularity: "6.7",
        valueForMoney: "7.6",
        reviews: "6.5",
        popularityPercentage: "67%",
        valueForMoneyPercentage: "76%",
        reviewsPercentage: "65%",
      },
      {
        dataLabel: "outbound-partner-clicks-AKC-Listing-Only",
        partner: "AKC Pet Insurance",
        classification: "Average",
        total: "4.3",
        popularity: "4.2",
        valueForMoney: "4.2",
        reviews: "4.5",
        popularityPercentage: "42%",
        valueForMoneyPercentage: "42%",
        reviewsPercentage: "45%",
      },
      {
        dataLabel: "outbound-partner-clicks-MetLife-Listing-Only",
        partner: "MetLife",
        classification: "Good",
        total: "6.6",
        popularity: "7.9",
        valueForMoney: "9.0",
        reviews: "2.8",
        popularityPercentage: "79%",
        valueForMoneyPercentage: "90%",
        reviewsPercentage: "28%",
      },
      {
        dataLabel: "outbound-partner-clicks-Odie-Listing-Only",
        partner: "Odie",
        classification: "Average",
        total: "4.8",
        popularity: "4.1",
        valueForMoney: "4.5",
        reviews: "5.7",
        popularityPercentage: "41%",
        valueForMoneyPercentage: "45%",
        reviewsPercentage: "57%",
      },
    ];

    /* REUSABLE HTML GENERATOR FUNCTION */
    function getInsuranceHtml(data) {
      return `
        <div class="cre-t-76-container" croDataLabel="${data.dataLabel}">
          <div class="cre-t-76-wrapper">
            <div class="cre-t-76-reviews">
              <div class="cre-t-76-review-top">
                <div class="cre-t-76-top-content1">
                  <div class="cre-t-76-top-content1-text">
                    <span class="cre-t-76-total">${data.total}</span>
                    <span class="cre-t-76-star">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M3.25125 16L4.6325 10.0842L0 6.10526L6.12 5.57895L8.5 0L10.88 5.57895L17 6.10526L12.3675 10.0842L13.7487 16L8.5 12.8632L3.25125 16Z" fill="#00C481" />
                      </svg>
                    </span>
                    <span class="cre-t-76-classification">${data.classification}</span>
                  </div>
                  <div class="cre-t-76-top-content1-mobile">
                    <div class="cre-t-76-classification">${data.classification}</div>
                    <div class="cre-t-76-top-content2-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4" fill="none">
                        <path d="M3.5 4L0 0.756757L0.816667 0L3.5 2.48649L6.18333 0L7 0.756757L3.5 4Z" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="cre-t-76-top-content2">
                  <div class="cre-t-76-top-content2-text">Pet Insurance Gurus Score</div>
                  <div class="cre-t-76-top-content2-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4" fill="none">
                      <path d="M3.5 4L0 0.756757L0.816667 0L3.5 2.48649L6.18333 0L7 0.756757L3.5 4Z" fill="black" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="cre-t-76-review-dropdown">
                <div class="cre-t-76-dropdown-wrapper">
                  <div class="cre-t-76-cross">${crossIcon}</div>
                  <div class="cre-t-76-dropdown-top">
                    <div class="cre-t-76-dropdown-content cre-t-76-dropdown-content1">
                      <div class="cre-t-76-dropdown-info1">
                        <div class="cre-t-76-dropdown-info1-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                            <path d="M0 13V4.33333H3.85V13H0ZM5.075 13V0H8.925V13H5.075ZM10.15 13V5.77778H14V13H10.15Z" fill="#EEA650" />
                          </svg>
                        </div>
                        <div class="cre-t-76-dropdown-info1-text">Popularity</div>
                      </div>
                      <div class="cre-t-76-dropdown-info2">
                        <div class="cre-t-76-dropdown-info2-bar"><div class="cre-t-76-dropdown-bar" style="width:${data.popularityPercentage}"></div></div>
                        <div class="cre-t-76-dropdown-info2-score">${data.popularity}</div>
                      </div>
                      <div class="cre-t-76-dropdown-info3">Based on sales in the last 7 days</div>
                    </div>

                    <div class="cre-t-76-dropdown-content cre-t-76-dropdown-content2">
                      <div class="cre-t-76-dropdown-info1">
                        <div class="cre-t-76-dropdown-info1-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                            <path
                              d="M9.8 6.15789C9.99833 6.15789 10.1646 6.09232 10.2987 5.96118C10.4329 5.83004 10.5 5.66754 10.5 5.47368C10.5 5.27982 10.4329 5.11732 10.2987 4.98618C10.1646 4.85504 9.99833 4.78947 9.8 4.78947C9.60167 4.78947 9.43542 4.85504 9.30125 4.98618C9.16708 5.11732 9.1 5.27982 9.1 5.47368C9.1 5.66754 9.16708 5.83004 9.30125 5.96118C9.43542 6.09232 9.60167 6.15789 9.8 6.15789ZM4.2 4.78947H7.7V3.42105H4.2V4.78947ZM1.75 13C1.35333 11.7 0.9625 10.4029 0.5775 9.10855C0.1925 7.81425 0 6.4886 0 5.13158C0 4.08246 0.373333 3.19298 1.12 2.46316C1.86667 1.73333 2.77667 1.36842 3.85 1.36842H7.35C7.68833 0.935088 8.09958 0.598684 8.58375 0.359211C9.06792 0.119737 9.59 0 10.15 0C10.4417 0 10.6896 0.0997807 10.8938 0.299342C11.0979 0.498904 11.2 0.741228 11.2 1.02632C11.2 1.08333 11.1708 1.21447 11.1125 1.41974C11.0658 1.54518 11.0221 1.67346 10.9812 1.80461C10.9404 1.93575 10.9083 2.06974 10.885 2.20658L12.4775 3.76316H14V8.53553L12.0225 9.16842L10.85 13H7V11.6316H5.6V13H1.75Z"
                              fill="#5DC087"
                            />
                          </svg>
                        </div>
                        <div class="cre-t-76-dropdown-info1-text">Value for Money</div>
                      </div>
                      <div class="cre-t-76-dropdown-info2">
                        <div class="cre-t-76-dropdown-info2-bar"><div class="cre-t-76-dropdown-bar" style="width:${data.valueForMoneyPercentage}"></div></div>
                        <div class="cre-t-76-dropdown-info2-score">${data.valueForMoney}</div>
                      </div>
                      <div class="cre-t-76-dropdown-info3">Based on features & benefits for the price</div>
                    </div>
                    <div class="cre-t-76-dropdown-content cre-t-76-dropdown-content3">
                      <div class="cre-t-76-dropdown-info1">
                        <div class="cre-t-76-dropdown-info1-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M0 14V1.4C0 1.015 0.137083 0.685417 0.41125 0.41125C0.685417 0.137083 1.015 0 1.4 0H12.6C12.985 0 13.3146 0.137083 13.5887 0.41125C13.8629 0.685417 14 1.015 14 1.4V9.8C14 10.185 13.8629 10.5146 13.5887 10.7887C13.3146 11.0629 12.985 11.2 12.6 11.2H2.8L0 14ZM4.9525 8.575L7 7.3325L9.0475 8.575L8.505 6.2475L10.325 4.6725L7.9275 4.48L7 2.275L6.0725 4.48L3.675 4.6725L5.495 6.2475L4.9525 8.575Z" fill="#5AACF5" />
                          </svg>
                        </div>
                        <div class="cre-t-76-dropdown-info1-text">Reviews</div>
                      </div>
                      <div class="cre-t-76-dropdown-info2">
                        <div class="cre-t-76-dropdown-info2-bar"><div class="cre-t-76-dropdown-bar" style="width:${data.reviewsPercentage}"></div></div>
                        <div class="cre-t-76-dropdown-info2-score">${data.reviews}</div>
                      </div>
                      <div class="cre-t-76-dropdown-info3">Based on third-party ratings like Trustpilot</div>
                    </div>
                  </div>
                  <div class="cre-t-76-dropdown-bottom">For more details see our <span class="cre-t-76-dropdown-bottom-link">ranking methodology</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }

    function updateInsuranceData(data, item) {
      const container = item && item.querySelector(".cre-t-76-container");
      if (!container) return;

      // Top score & classification
      container.querySelector(".cre-t-76-total").textContent = data.total;
      container.querySelectorAll(".cre-t-76-classification").forEach((el) => {
        el.textContent = data.classification;
      });

      // Popularity
      container.querySelector(
        ".cre-t-76-dropdown-content1 .cre-t-76-dropdown-bar",
      ).style.width = data.popularityPercentage;

      container.querySelector(
        ".cre-t-76-dropdown-content1 .cre-t-76-dropdown-info2-score",
      ).textContent = data.popularity;

      // Value for money
      container.querySelector(
        ".cre-t-76-dropdown-content2 .cre-t-76-dropdown-bar",
      ).style.width = data.valueForMoneyPercentage;

      container.querySelector(
        ".cre-t-76-dropdown-content2 .cre-t-76-dropdown-info2-score",
      ).textContent = data.valueForMoney;

      // Reviews
      container.querySelector(
        ".cre-t-76-dropdown-content3 .cre-t-76-dropdown-bar",
      ).style.width = data.reviewsPercentage;

      container.querySelector(
        ".cre-t-76-dropdown-content3 .cre-t-76-dropdown-info2-score",
      ).textContent = data.reviews;
    }

    function insurancePartnersFunctionality() {
      var listItemsSection = document.querySelectorAll(
        "#comparison-section .oxy-dynamic-list > [data-unique]",
      );

      listItemsSection.forEach(function (item) {
        var listItemLabel = item.getAttribute("data-unique");
        if (!listItemLabel) return;

        var matchedData = insurancePartners.find(function (data) {
          return data.dataLabel === listItemLabel;
        });

        if (!matchedData) return;

        var existingContainer = item.querySelector(".cre-t-76-container");

        // If container already exists → update data
        if (existingContainer) {
          updateInsuranceData(matchedData, item);
          return;
        }

        // Otherwise → insert HTML
        var trustpilotImage = item.querySelector(".ct-image.trustpilot-image");
        if (!trustpilotImage) return;

        trustpilotImage.parentElement?.classList.add(
          "cre-t-76-container-parent",
        );

        var insuranceHtml = getInsuranceHtml(matchedData);
        trustpilotImage.insertAdjacentHTML("afterend", insuranceHtml);
      });
    }

    /* Function 2: Handle Specific Liberty Mutual Logic */
    // we are separating this function because ***Liberty Mutual*** has different data-unique and we want to make sure it is handled correctly
    /* Specific Liberty Mutual Data */
    var libertyData = {
      dataLabel: "outbound-partner-clicks-Liberty-Mutual-Listing-Only",
      partner: "Liberty Mutual",
      classification: "Average",
      total: "5.1",
      popularity: "5.2",
      valueForMoney: "4.7",
      reviews: "5.3",
      popularityPercentage: "52%",
      valueForMoneyPercentage: "47%",
      reviewsPercentage: "53%",
    };

    function renderLibertyMutual() {
      helper.waitForElement(
        '[data-unique*="Liberty"][data-unique*="Mutual"]',
        function () {
          var item = document.querySelector(
            '[data-unique*="Liberty"][data-unique*="Mutual"]',
          );
          if (item) {
            var existingContainer = item.querySelector(".cre-t-76-container");
            var uniqueClass = "cre-t-76-liberty-mutual";
            if (existingContainer) {
              updateInsuranceData(libertyData);
              return;
            }
            var trustpilotImage = item.querySelector(
              ".ct-image.trustpilot-image",
            );
            if (trustpilotImage) {
              var insuranceHtml = getInsuranceHtml(libertyData);
              trustpilotImage.parentElement?.classList.add(
                "cre-t-76-container-parent",
              );
              trustpilotImage.insertAdjacentHTML("afterend", insuranceHtml);
            }
          }
        },
        25,
        25000,
      );
    }

    function creScroll(bmContentId) {
      var bmContent = document.querySelector(bmContentId);
      if (bmContent) {
        var scrollTop =
          bmContent.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    }

    function eventHandler() {
      function dropdownActiveClass() {
        document
          .querySelectorAll(".cre-t-76-container")
          .forEach(function (item) {
            if (item.classList.contains("cre-t-76-dropdown-active")) {
              item.classList.remove("cre-t-76-dropdown-active");
            }
          });
      }

      live(".cre-t-76-dropdown-bottom span", "click", function () {
        creScroll("#content-section");
        dropdownActiveClass();
      });

      live(".cre-t-76-review-top", "click", function () {
        if (window.innerWidth < 992) {
          var parent = this.closest(".cre-t-76-container");

          if (parent) {
            if (parent.classList.contains("cre-t-76-dropdown-active")) {
              parent.classList.remove("cre-t-76-dropdown-active");
            } else {
              dropdownActiveClass();
              parent.classList.add("cre-t-76-dropdown-active");
            }
          }
        }
      });

      live(".cre-t-76-cross", "click", function () {
        dropdownActiveClass();
      });

      live("body", "click", function (e) {
        if (window.innerWidth < 992) {
          if (
            !e.target.closest(".cre-t-76-review-top") &&
            !e.target.closest(".cre-t-76-cross") &&
            !e.target.closest(".cre-t-76-container")
          ) {
            dropdownActiveClass();
          }
        }
      });
      live("html body .oxy-read-more-link", "click", function () {
        insurancePartnersFunctionality();
        renderLibertyMutual();
      });
    }

    /**
     * Monitors network activity to detect dynamic content updates (AJAX/Fetch).
     * Specifically looks for '/v1/quotes' API calls. When a fetch is detected:
     * It removes any previously injected custom review containers to prevent duplicates.
     * (insurancePartnersFunctionality & renderLibertyMutual) as the new data loads into the DOM with second time force insertion.
     */
    function fetchDetect() {
      var performanceObserver = new PerformanceObserver((list) => {
        var entries = list.getEntries();
        entries.forEach((entry) => {
          if (
            entry.entryType === "resource" &&
            entry.initiatorType === "fetch"
          ) {
            if (entry.name.includes("/v1/quotes")) {
              var existingContainer = document.querySelectorAll(
                ".cre-t-76-container",
              );
              if (existingContainer.length > 0) {
                existingContainer.forEach(function (existElement) {
                  existElement.remove();
                });
              }

              var forceInsertion2 = setInterval(function () {
                insurancePartnersFunctionality();
                renderLibertyMutual();
              }, 250);

              setTimeout(function () {
                clearInterval(forceInsertion2);
              }, 1000);
            }
          }
        });
      });
      performanceObserver.observe({ entryTypes: ["resource"] });
    }

    /* Initialize Variation */
    function init() {
      _$("body").addClass(variation_name);
      if (!window.cre_t_76_EventHandler) {
        fetchDetect();
        var forceInsertion = setInterval(function () {
          insurancePartnersFunctionality();
          renderLibertyMutual();
        }, 250);
        setTimeout(function () {
          clearInterval(forceInsertion);
        }, 2000);

        eventHandler();
        window.cre_t_76_EventHandler = true;
      }
    }

    /* Wait for Element to Load and Initialize */
    helper.waitForElement("#comparison-section", init, 25, 25000);
  } catch (e) {
    if (debug) console.log(e, "Error in Test " + variation_name);
  }
})();
```

---

**Library:** Lightweight Charts by TradingView

https://www.tradingview.com/lightweight-charts/

This document explains how to create a **basic sparkline chart** using the **Lightweight Charts** library.

It is written in a simple way so that **beginners** can easily understand how everything works.

---

## API Reference (Token Data)

**Endpoint for 4 Largest Gainers**

https://fan-token-hub.fantokens.com/public/tokens?orderBy=percentChange24h&limit=4&direction=desc&currency=USD

**Available fields:**

- `name`
- `symbol`
- `percentChange24h`
- `price`
- `platforms`
- `images`
- `slug` → used to build trade links (`/trade/{slug}`)
- `sparklines` → **this data is passed into the Lightweight Charts library**

---

## What Is a Sparkline?

A **sparkline** is a very small line chart used to show a trend over time.

It is commonly used in:

- Dashboards
- Tables
- Cards
- Market overview components

**All supported series types:**

https://tradingview.github.io/lightweight-charts/docs/series-types

---

## Raw Data Example

```jsx
const rawData = ["4.5093911295659", "4.4490736915442", "4.3823164871221"];
```

### Explanation

- The data is an **array of numbers stored as strings**
- Each value represents a point on the chart
- Order matters:
  - Index `0` → first data point
  - Index `1` → second data point
  - And so on…

---

## Chart Container

The chart needs a DOM element to render into.

```jsx
const container = document.getElementById("sparkline");
```

### Example HTML

```html
<div id="sparkline" style="width: 120px; height: 40px;"></div>
```

---

## Creating the Chart

```jsx
const chart = window.LightweightCharts.createChart(container, {
  width: container.clientWidth,
  height: container.clientHeight,
  grid: {
    vertLines: { visible: false },
    horzLines: { visible: false },
  },
  rightPriceScale: { visible: false },
  timeScale: { visible: false, borderVisible: false },
  crosshair: {
    vertLine: { visible: false },
    horzLine: { visible: false },
  },
  handleScroll: false,
  handleScale: false,
});
```

### Why These Settings Are Used

- ❌ No grid lines → clean sparkline look
- ❌ No price scale → hides numbers on the right
- ❌ No time scale → hides bottom axis
- ❌ No crosshair → prevents hover indicators
- ❌ Scroll & zoom disabled → chart stays fixed

---

## Adding a Line Series

You can add **multiple series** to the same chart if needed.

**Reference:**

https://tradingview.github.io/lightweight-charts/docs/series-types#:~:text=Series Definition%3A LineSeries,of SeriesOptionsCommon and LineStyleOptions

### Line Series Documentation

- **Series Definition**: `LineSeries`
- **Data format**: `LineData` or `WhitespaceData`
- **Style options**: a mix of `SeriesOptionsCommon` and `LineStyleOptions`

```jsx
const lineSeries = chart.addSeries(LightweightCharts.LineSeries, {
  color: "red",
  lineWidth: 2,
  priceLineVisible: false,
  lastValueVisible: false,
  borderVisible: false,
  crosshairMarkerVisible: false,
});
```

### Explanation

- `color` → line color
- `lineWidth` → thickness of the line
- `priceLineVisible: false` → hides horizontal price line
- `lastValueVisible: false` → hides the last value label
- `crosshairMarkerVisible: false` → removes hover dot marker 🔴

---

## Formatting Data for the Chart

To use raw API sparkline data, it must be converted into a format that **Lightweight Charts understands** (e.g., indexed or time-based data points).

_(This section can be extended with a data-mapping example if needed.)_

---

```jsx
// 🔹 Convert numeric array to chart format
const chartData = rawData.map((value, index) => ({
  time: index,
  value: value,
}));

lineSeries.setData(chartData);
```

Full code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Line Sparkline Chart</title>

    <!-- Lightweight Charts (Standalone) -->
    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

    <style>
      body {
        font-family: Arial, sans-serif;

        background: #f5f5f5;
      }

      .sparkline-box {
        width: 359px;
        height: 100px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      #sparkline {
        width: 100%;
        height: 100%;
      }

      [title="Charting by TradingView"] svg {
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="sparkline-box">
      <div id="sparkline"></div>
    </div>

    <script>
      // 🔹 Raw numeric data
      const rawData = [
        "4.5093911295659",
        "4.4490736915442",
        "4.3823164871221",
        "4.3872068846538",
        "4.4014257458726",
        "4.4381831986581",
        "4.4495562134054",
        "4.3558672672752",
      ];

      const container = document.getElementById("sparkline");

      // 🔹 Create chart
      const chart = window.LightweightCharts.createChart(container, {
        width: container.clientWidth,
        height: container.clientHeight,
        // layout: {
        //   background: { color: "#222" },
        //   textColor: "#C3BCDB",
        // },
        grid: { vertLines: { visible: false }, horzLines: { visible: false } },
        rightPriceScale: { visible: false },
        timeScale: { visible: false, borderVisible: false },
        crosshair: {
          vertLine: { visible: false },
          horzLine: { visible: false },
        },
        handleScroll: false,
        handleScale: false,
      });

      // chart.timeScale().fitContent(); it takes time to find

      // 🔹 Add line series
      const lineSeries = chart.addSeries(LightweightCharts.BaselineSeries, {
        color: "red", // green line
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
        borderVisible: false,
        crosshairMarkerVisible: false, //it takes time to find
      });

      // 🔹 Convert numeric array to chart format
      const chartData = rawData.map((value, index) => ({
        time: index,
        value: value,
      }));

      lineSeries.setData(chartData);

      // 🔹 Responsive
      // window.addEventListener("resize", () => {
      //   chart.applyOptions({
      //     width: container.clientWidth,
      //     height: container.clientHeight,
      //   });
      // });
    </script>
  </body>
</html>
```

```jsx
window.addEventListener("message", function (event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onFormSubmitted"
  ) {
    console.log("✅ HubSpot form submitted successfully!", event.data);
  }
});
```

```jsx
//custom activation test 201
(function () {
  try {
    /* main variables */
    var debug = 0;
    var variation_name = "creT201Activation";
    /* all Pure helper functions */
    function waitForElement(
      selector,
      trigger,
      delayInterval = 50,
      delayTimeout = 15000,
    ) {
      var interval = setInterval(function () {
        if (
          document &&
          document.querySelector(selector) &&
          document.querySelectorAll(selector).length > 0
        ) {
          clearInterval(interval);
          trigger();
        }
      }, delayInterval);
      setTimeout(function () {
        clearInterval(interval);
      }, delayTimeout);
    }
    function scrollDetect(callback) {
      var hasFired = false;
      var lastScrollY = window.scrollY;
      function onScroll() {
        if (!hasFired) {
          var currentScrollY = window.scrollY;
          if (currentScrollY !== lastScrollY) {
            // Vertical scroll detect
            hasFired = true;
            //test fire
            callback();
          }
        }
      }
      window.addEventListener("scroll", onScroll, false);
    }
    /* Variation functions */
    /* Variation Init */
    function init() {
      /* start your code here */
      // Your logic here
      if (!window.creT201_scroll_detected) {
        window.creT201_scroll_detected = true;
        scrollDetect(function () {
          if (!window.test_201_activated) {
            window.test_201_activated = 1;
            window._conv_q = window._conv_q || [];
            window._conv_q.push(["executeExperiment", "100348743"]);
            console.log("test 201 activated");
          }
        });
      }
      if (debug) console.log(variation_name + " initialized");
    }
    if (window.location.pathname === "/") {
      waitForElement("body", init, 50, 15000);
    }
    /* Initialise variation */
  } catch (e) {
    if (debug) console.log(e, "error in Test " + variation_name);
  }
})();
```
