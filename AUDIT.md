# Portfolio redesign audit and local validation

## Original issues and implemented changes

- Projects required a separate page and appeared below a large introduction. The one-page site now presents three selected systems immediately after the hero/tool strip; seven further systems remain in an expandable list.
- Dense, equally weighted cards made scanning difficult. Featured examples now separate the business problem, contribution, outcome and detailed case study.
- Cursor, glow, magnification and marquee effects competed with the content. Native pointers, a static tool list, restrained transitions and visible-by-default content replace them.
- Dialogs previously lacked focus containment. Native modal dialogs now provide keyboard containment, Escape dismissal, focus restoration, shareable hashes and Back/Forward support.
- Forms now have explicit labels, visible focus, linked validation errors, sending/success/failure/timeout messages and duplicate-submit protection.
- Removed Tailwind browser runtime and eager Calendly embed. Fonts are self-hosted; images have dimensions, responsive WebP previews and lazy loading, with original screenshots linked for enlargement.
- Original screenshots total 5,843,524 bytes; 640px previews total 410,864 bytes (93% smaller). This is an asset comparison, not a measured total-page speed improvement.
- The independent portfolio-project distinction is explicit. No testimonials, new metrics or client results were invented.

## Recorded checks

- Production build: passes, all ten case studies rendered.
- Six Node tests: pass, covering field contract, optional fields, validation, local simulation isolation, production request shape with mocked fetch, HTTP failures and aborts, generated case studies, local assets and legacy fallback links.
- Browser layout widths 375, 768, 1024 and 1440px: no horizontal page overflow; no broken loaded images. Desktop and mobile screenshots saved.
- Mobile menu opens and closes on section selection.
- All ten case studies open and close with Escape at 375px; no horizontal dialog overflow.
- Keyboard Shift+Tab stays inside a modal; close restores focus to the originating project link.
- Browser Back closes a case study; Forward reopens it. Direct case-study hash opens the correct dialog.
- All four legacy routes resolve to the corresponding homepage anchors.
- Browser form checks: empty required fields show errors; simulated success displays confirmation; submit is disabled while sending; simulated server failure enables retry; the 15-second timeout displays its error, retains entered details and enables retry.
- Browser console error log: empty during case-study checks.
- Lighthouse 13.5, mobile simulated run on localhost: Performance 98, Accessibility 100, Best Practices 100, SEO 100. Reports: `artifacts/lighthouse.report.html` and `.json`. These are lab results, not a guarantee of public-hosting performance or full accessibility conformance.

## Remaining limitations before public launch

- Actual 200% browser zoom, physical touch devices, Safari/Firefox and screen-reader testing have not been verified in this environment.
- Reduced-motion CSS is implemented and source-reviewed; OS preference switching has not been exercised.
- Production contact delivery and Calendly booking were deliberately not invoked. Confirm production CORS/delivery separately after design approval.
- Public CDN caching, compression and social-preview fetching depend on the eventual host and should be checked after approval/deployment.

These results were recorded against the local preview before publication.

## Approved follow-up revisions

- Header branding changed to RC automation, the portrait caption to AI workflow automation engineer, and the selected-work label to Projects.
- Project tool names now loop left, with a pause control and static wrapping when reduced motion is requested. Duplicate tool groups are hidden from assistive technology.
- Gentle pointer-responsive portrait/project-image movement and hover lifts were added on fine-pointer devices only, respecting reduced-motion preferences.
- Build and all six Node tests pass after these revisions. Browser checks confirmed the updated content, tools animation and pause toggle, with no page overflow at the current desktop viewport. The earlier Lighthouse scores predate these motion changes.
