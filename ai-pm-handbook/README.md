# The AI PM Handbook — foundation

Public educational documentation, edited through GitHub. This is the recovered and reviewed foundation of the October 22 project. See PROVENANCE.md for reuse and scope.

## Run and validate

From this directory, with Node.js 22 or 24:

```bash
npm ci
npm run check
npm run validate:mint
npm run links:mint
npm run dev
```

`check` verifies navigation, frontmatter, local links/anchors, source IDs and compiles every MDX page. `validate:mint` uses Mintlify’s validator. `links:mint` checks internal links with Mintlify. These do not prove that external URLs remain accessible or that a live website exists. Check source access separately before changing summaries.

## Structure

- `docs.json`: Mintlify configuration and navigation.
- `book/`, `getting-started/`: six foundation chapters and orientation.
- `course/`: one learning path using those chapters.
- `practice/`: four product worksheets.
- `library/`, `data/sources.yaml`: source access records and glossary.
- `templates/`: reusable authoring scaffolds, excluded from public MDX pages.
- `scripts/`: reproducible checks.

## Publishing

The repository is public, but that does not deploy a Mintlify website. In your Mintlify project’s Git settings, connect `timobuilds/mintlify-docs`, choose the branch containing this release, and set documentation directory to `ai-pm-handbook`. The starter at repository root is separate. Install/authorize the Mintlify GitHub App for this repository if required.

Review the feature branch/PR before selecting it for production. If merging to `main`, update the Edit on GitHub URL in docs.json to the main branch. Configure the production branch, trigger a build, and inspect its logs. Open the returned deployment URL signed out; check the home page, every navigation tab and the editing link. Record the URL and deployed commit only after those checks pass.

Rollback by selecting the last known-good commit through Mintlify’s deployment controls or reverting the content commit. Keep GitHub as the source of truth. No account, domain, paid plan or deployment has been created by this source project.

Official references checked November 1, 2026:
- https://www.mintlify.com/docs/organize/settings
- https://www.mintlify.com/docs/cli/install
- https://www.mintlify.com/docs/cli/commands
- https://www.mintlify.com/docs/deploy/github

See VALIDATION.md for the actual checks completed in this environment.
