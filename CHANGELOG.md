# Changelog

## [0.1.0] - 2026-02-21

### Added
- **GUS REGON Database Integration:** Added a secure, server-side Next.js API route (`/api/gus`) that interfaces with the Polish Central Statistical Office (GUS) using the `bir1` library. Users can now perfectly auto-complete their clients' data (Company Name, Street, Building Number, City, ZIP code) by entering only the 10-digit NIP number in the Offer Builder form.
- **Product Categories in UI and PDF:** A brand new `category` property was added to the standard `Product` type. This category is gracefully displayed underneath product names in the Product Picker, summary tables, and is directly injected into the PDF generation's Hero Section layout.
- **Automated Catalog Images:** Implemented an automated slugification system inside `mockData.ts` to seamlessly map all 26 real uploaded `.png` asset images (from `/assets/products`) to the correct product objects.

### Changed
- **Industry Label Updates:** Removed the industry label ("Branża", e.g. Myjnie Tir) completely from both the HTML live preview and the final generated PDF Offer. The cleaner layouts now exclusively show the Product Name, Category, and identifier Code.
- **Form Layout Refinements:** Visually highlighted the priority Contact section using robust UI borders to ensure it's not missed by the sales agents. Added a dropdown for the country code formatting inside the Phone input, which defaults to `+48`.
- **Date Picking Adjustments:** Form defaults validity period strictly to 14 days to improve contract clarity.

### Fixed
- **PDF Generation Bug:** Fixed a deep `@react-pdf/renderer` rendering error where background container transparency (`opacity: 0.1`) leaked into all subsequent visual children nodes. Transmuted it into a static RGBA color overlay to secure consistent page rendering.
- **ESLint/TypeScript Errors:** Remediated stray JSX closing tag issues affecting the PricingTable component and removed unsafe `any` typings within API endpoints, allowing for successful production builds.
