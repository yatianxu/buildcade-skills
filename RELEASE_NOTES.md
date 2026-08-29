# Buildcade Creator Skill v1.0.1

## Included

- Project and static artifact root identification.
- Explicit Game Spec v1 Runtime Contract initialization or inspection.
- Stable `validate --json` diagnostic preservation and bounded repair/revalidation.
- Validated local preview with an explicit stop path.
- Deterministic artifact packing with hash, size, warnings and secret/repository-material exclusion checks.
- Explicitly requested `login`, `whoami` and Upload workflow, ending before Review or Release.
- Codex metadata plus progressive-disclosure workflow reference.
- Checksum-verifying `npx` installer for Codex and explicit directories used by other agents.
- Bundled public Creator CLI for `init`, `validate`, `preview`, `pack`, `login`, `whoami` and `upload`.

## Verified candidate

- Reviewed core commit: `11c1d5f7abcda7bbb5b7906a2946a782226e77d9`.
- Vanilla and Phaser Validate, live HTTP Preview and Pack.
- Stable remote-executable-code `BC3001` failure and bounded artifact-local repair.
- Install, upgrade, rollback and uninstall rehearsal.
- Entry-by-entry exclusion of `.env`, `.git`, `.buildcade`, `node_modules` and injected secret sentinels.
- Direct public CLI use when the Skill is not installed.

## Not included

Review, Approve, Publish, Release, Staff authorization, provider mutation, database/Cloudflare/DLQ operations, general game generation, an npm-registry mirror, Runtime SDK or generated API SDK are not part of this release.
