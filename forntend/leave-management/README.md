# LeaveHub Leave Management

LeaveHub is a static leave management dashboard built with HTML, CSS, and JavaScript.

It is designed as a practical HR self-service workspace where employees can submit leave requests and managers can review request status.

## What It Includes

- Leave balance cards
- Accessible leave request form
- Leave duration calculation
- Request status table
- Status filter
- Search by employee or leave type
- Team calendar
- Toast messages for user feedback
- Responsive desktop and mobile layout

## Accessibility Details

- Semantic landmarks and headings
- Skip link for keyboard users
- Real labels for form controls
- Visible keyboard focus styles
- Table caption for screen readers
- `aria-live` status messages
- Responsive layout without hiding core content

## Tech Used

- HTML5
- CSS3
- JavaScript

## Files

```text
forntend/leave-management/
  index.html    Page structure and accessible markup
  styles.css    Visual design and responsive layout
  app.js        Form handling, filters, search, and UI updates
  README.md     Project notes
```

## How To Run

Open `index.html` directly in a browser, or start a local static server:

```bash
cd forntend/leave-management
python -m http.server 4174
```

Then open:

```text
http://127.0.0.1:4174
```
