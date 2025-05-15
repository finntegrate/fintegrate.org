# Copilot Instructions

## Code Style

### Accessibility

- Use semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`, `<footer>`, etc.) to improve accessibility and SEO.
- Use ARIA roles and attributes to enhance accessibility for screen readers.
- Ensure that all interactive elements (buttons, links, etc.) are keyboard accessible.
- Use `alt` attributes for images to provide descriptive text for screen readers.
- Use `aria-label` or `aria-labelledby` to provide additional context for screen readers when necessary.
- Ensure that color contrast ratios meet WCAG standards for readability.
- Use `lang` attribute in HTML to specify the language of the document.
- Use `tabindex` to manage focus order for keyboard navigation.

### SEO

- Use descriptive and meaningful titles for each page.
- Use meta tags for descriptions, keywords, and author information.
- Use heading tags (`<h1>`, `<h2>`, etc.) to create a clear hierarchy of content.
- Use descriptive anchor text for links to improve SEO and accessibility.
- Use structured data (JSON-LD) to provide additional context to search engines.
- Use canonical tags to prevent duplicate content issues.
- Use Open Graph tags for social media sharing.

### Icons

We use the Iconify library for icons. Our project currently has the Material Design Icons (MDI) and Material Symbols sets installed.

```javascript
---
import { Icon } from 'astro-icon/components'
---

<!-- Embed the `account` icon from `@iconify-json/mdi` -->
<Icon name="mdi:account" />

<!-- Embed the `person` icon from `@iconify-json/material-symbols` -->
<Icon name="material-symbols:person" />
```

### Context7

- Use the `context7` model context protocol provider to get the most recent documentation for project dependencies.

### Tailwind CSS and daisyUI

We configure Tailwind CSS and daisyUI in our global.css file like so:

```css
@import "tailwindcss";
@plugin 'daisyui';
```

Do not remove those configuration options, as they are the official way to configure Tailwind CSS and daisyUI. If you need to add custom styles, do so in the `global.css` file, but keep the configuration options intact.
