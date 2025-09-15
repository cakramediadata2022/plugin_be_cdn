# Agents Development Rules

## 1. File Naming
- All files and directories must use lowercase letters only.
- Use hyphens (`-`) to separate words in filenames (e.g., `booking-engine.ts`).
- Avoid spaces, uppercase letters, or special characters in file and folder names.

## 2. CSS Styling
- All CSS must use [Tailwind CSS](https://tailwindcss.com/) utility classes.
- Do not use custom CSS classes or inline styles unless absolutely necessary.
- For layout, spacing, colors, and typography, always prefer Tailwind utility classes.
- Example:
  ```html
  <button class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Book Now</button>
  ```
- If you need to extend Tailwind, use the official configuration and plugins.

## 3. General Coding Practices
- Keep code modular and readable.
- Use TypeScript for all source files.
- Document public APIs and important logic with comments.

---

> Follow these rules to ensure consistency and maintainability in the agents codebase.
