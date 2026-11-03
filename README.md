# EcoPulse — Know. Act. Track.

Updated from the supplied index(1).html, styles(1).css and script(1).js on 3 November 2026.

## Use on the existing GitHub Pages website

Replace index.html, styles.css and script.js at the current publishing root of amir2501/ecoPuls with these files. Keep these exact filenames together. Commit to the branch/folder configured in the repository's Pages settings. This package does not create a separate website and has not been pushed or deployed to GitHub.

For a local preview, open index.html in a modern browser, or serve the directory using `python3 -m http.server 8000`. External fonts and photographs require internet access.

## Audit and architecture

The supplied project is a buildless, single-page HTML/CSS/JavaScript documentary-style site branded EYES OPEN. Its strengths are a consistent dark/paper/orange palette, editorial typography, responsive CSS, source notes, climate story sections and image carousels. Its package.json has no dependencies and no working test suite. No repository checkout was supplied, and the live URL could not be retrieved in this environment; file comparison against production was therefore unavailable.

This update preserves the existing layout, images, climate stories and source links. EcoPulse's five destinations are anchor sections in this same site: Pulse, Learn, Take Action, Eco Market and My Profile. No framework or build tool is required.

## Implemented

- EcoPulse identity, primary action, topic links and core navigation.
- Short learning modules with action links.
- Three explicitly labelled sample events with search, category and format filtering, details, registration and cancellation.
- Three sample market concepts with category filtering, detail views and saved ideas; no checkout or real purchase simulation.
- A browser-local display name, registrations, simulated attendance and derived Green Points.
- 50 demo points per sample event, awarded once; completed demo attendance cannot be cancelled into another points award.
- Local data reset and handling for malformed/unavailable browser storage.
- Skip link, visible focus styles, native dialog, status announcements, labelled inputs and image pause controls.
- Offscreen carousel timing correction, reduced-motion updates and corrected mobile-menu accessible label.

Data arrays in script.js hold the sample events and market concepts. State uses the single localStorage key `ecopulse-prototype-v1`. User-entered profile text is rendered with textContent. The original CSS is retained, with new module styles appended.

## Verification

JavaScript syntax and internal anchor/unique-ID checks passed. A lightweight DOM test harness exercised filtering and empty results, registration, cancellation, duplicate attendance prevention, derived points, saved ideas, literal profile text, reload persistence, reset and corrupted storage. This is logic testing, not a real browser test.

Browser rendering, image loading, external links, mobile layout, keyboard focus behavior and screen-reader behavior remain unverified because the environment's preview daemon was unavailable.

## Remaining work before a real pilot

- Recheck every retained environmental statistic against the linked primary publication, including its observation period. This update retains the original source claims rather than presenting a new research verification.
- Replace illustrative stock photos with licensed, attributed Uzbekistan images. The hero now explicitly identifies the images as illustrative and not location-verified. No location authenticity or photo-license audit was performed.
- Confirm real organisers, event dates, capacity, locations and accessibility/safety information. Current sample events are not bookable real events.
- Add a backend, authentication, organiser authorisation and server-side attendance verification before awarding real participation points. Local storage is editable by the visitor and not secure verification.
- Add operational privacy/consent and deletion procedures before collecting pilot participant data. Current prototype asks only for a display name and keeps it on the device.
- Confirm products, providers and evidence for sustainability attributes before enabling commerce or reward redemption.
- Add verified data feeds, charts, real pilot metrics and translations in subsequent iterations. None are simulated as live data here.

EcoPulse is a five-student WIUT SDG 13 project. No government, NGO, retailer or Yashil AI partnership or integration is claimed.
