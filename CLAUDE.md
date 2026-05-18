# vue-components

Shared Vue 2 / Vuetify component library published as `@stampinup/vue-components` to npmjs.com.

## Key Commands

| Command | Purpose |
|---------|---------|
| `yarn install --ignore-engines` | Install dependencies |
| `yarn test` | Run unit tests |
| `yarn lint:ci` | Lint without auto-fix |
| `yarn ci` | Lint + test (used in CI) |
| `yarn release` | Run ci then cut a release via standard-version |

## Pipelines

| File | Trigger | Purpose |
|------|---------|---------|
| `azure-pipelines-publish.yml` | Push to `master` only (`pr: none`) | Release + publish to npm |
| `azure-pipelines.yml` | All branches except `master` | CI only |

## Important Notes

- **Never bump the version manually** — `standard-version` handles it via `yarn release`
- Release commits are tagged `[skip ci]` to prevent publish pipeline loop
- `ts-jest` must stay at `^27.1.5` — blocked by `@vue/cli-plugin-unit-jest@5.0.8`
- Node version: **22**
- Package manager: **yarn**
