# Validation record — November 1, 2026

## Passed in GitHub CI

[Handbook validation run 41317642921](https://github.com/timobuilds/mintlify-docs/actions/runs/41317642921) passed for source commit `9897060ef57a2ff8676a2f85cdf5c58ab54a259d` (tested through the PR merge ref) on Node 22.23.4. All steps succeeded: locked installation, schema/navigation/MDX checks, `mint validate` (build and validation passed), and `mint broken-links`.

This verifies the documentation build, not a live deployment or visual review. The npm installation reported 36 dependency advisories (5 low, 10 moderate, 21 high) in the development toolchain; this was not a security audit and those advisories have not been remediated.

## Passed locally

- Installed the locked dependencies with `npm ci` (Node 24.22.1).
- Official Mintlify configuration schema validation via `@mintlify/validation` 0.1.955: passed.
- All 30 navigation entries resolve to pages; all 30 pages are included once.
- Compiled all 30 MDX pages using `@mdx-js/mdx` 3.1.1 and GFM support.
- Checked 78 local links, including anchor resolution where present: no errors.
- Validated eight source records and their corresponding reference pages.
- `mint broken-links` with Mintlify CLI 4.2.1184: no broken links.
- Retrieved the four core source URLs and the official Mintlify setup/CLI/GitHub documentation. Deferred source URLs are explicitly unverified; external URL availability is not certified by the internal-link checks.

## Environment limitation

`mint validate` could not complete locally. The CLI failed while enumerating network interfaces (`uv_interface_addresses`). A local-only fallback returning no interfaces reached its offline path, which reported that initial preview resources require internet access. No workaround is included in the committed project. This is not a passing full Mintlify preview build, and visual rendering has not been verified.

The repository-level `Handbook validation` GitHub Actions workflow runs `npm ci`, the schema/MDX checks, `mint validate` and `mint broken-links`. The successful remote run above resolves the local build-validation limitation.

## Deployment status

This source preparation does not establish a live website. No Mintlify account, GitHub App connection, production branch setting, hosted domain or deployment URL has been verified. Follow README.md to connect the `ai-pm-handbook` documentation directory, then inspect build logs and the signed-out website.
