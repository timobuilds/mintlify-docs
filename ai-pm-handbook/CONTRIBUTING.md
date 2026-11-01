# Contributing

1. Branch from the current handbook branch. Work inside ai-pm-handbook/; leave the starter at repository root alone.
2. Reuse templates/chapter.mdx.template, source.mdx.template or worksheet.mdx.template. Give every page a title and description.
3. Retrieve supporting sources; record canonical URL, authors, access scope, review date and status in data/sources.yaml. Do not infer inaccessible content.
4. Label original synthesis and illustrative data. Do not upload paid source captures, private traces or copyrighted figures.
5. Add the page path without .mdx to docs.json. Use root-relative handbook links such as /book/chapter-04.
6. Run npm ci, npm run check, npm run validate:mint and npm run links:mint. Preview the changed pages with npm run dev.
7. Open a PR describing the learner outcome, changed source IDs, source access limits and validation results. Review accuracy, scope and rendering before merging.

Foundation changes should improve role clarity, economics, requirements, evaluation or observability. Propose advanced curriculum separately. The CI workflow verifies the handbook directory; branch protection is an owner setting and has not been enabled by this project.
