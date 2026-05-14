---
apply: always
---

# Project Architecture

The project follows Atomic Design Methodology:

- Small, reusable UI primitives (Label, Input, Button) in `src/components/atoms`
- Combinations of atoms (FormField, SearchBar) in `src/components/molecules`
- Complex UI sections (Header, Footer, CardGrid) in `src/components/organisms`
- Page layouts (DashboardLayout) in `src/components/templates`
- Next.js App Router pages and layouts in `src/app`

## Coding Standards

- Atoms must not depend on molecules or organisms.
- Molecules may use atoms only.
- Organisms may use atoms and molecules.
- Pages/templates compose organisms.

## Exceptions and notes

- Utility modules (hooks, utils, services, context) should live outside components (e.g., src/hooks, src/lib, src/context) and may be imported by any layer.
- Shared styles, tokens or design-system primitives (colors, spacing, typography) are allowed to be imported by any layer.
- Keep dependency graph acyclic: higher-level layers can import lower-level layers, but not vice versa.
