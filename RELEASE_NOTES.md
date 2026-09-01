# Buildcade Creator Skill v1.1.0

## Included

- Project and static artifact root identification.
- Explicit Game Spec v1 Runtime Contract initialization or inspection.
- Stable `validate --json` diagnostic preservation and bounded repair/revalidation.
- Validated local preview with an explicit stop path.
- Deterministic artifact packing with hash, size, warnings and secret/repository-material exclusion checks.
- Explicitly requested `login`, `whoami`, Game association and Upload workflow, ending before Review or Release.
- `games list/create/link/unlink`, `builds list/show --wait` and `logout` resource recovery commands.
- Versioned `.buildcade/project.json` association without credentials and with Artifact exclusion.
- Three-locale human output plus stable single-document JSON output, including device-login completion.
- Creator Center handoff URLs, bounded Build polling and upload-session idempotency retry.
- Codex metadata plus progressive-disclosure workflow reference.
- Checksum-verifying `npx` installer for Codex and explicit directories used by other agents.
- Bundled public Creator CLI for `init`, `validate`, `preview`, `pack`, `login`, `whoami`, `games`, `builds`, `upload` and `logout`.
- Canonical production API origin with explicit-over-environment precedence and no bundled fixed local API fallback.
- Explicit loopback `--api-url` requirement for `login --dev`.
- Versioned credentials partitioned by normalized API origin, with legacy loopback credentials rejected until re-login.
- Target-origin diagnostics and network failures that exclude request paths, query strings, tokens and raw exception text.

## Verified candidate

- Reviewed core commit: `d76d5997fe918ae9cbcff7841612a9d70aeb6f28`.
- Vanilla and Phaser Validate, live HTTP Preview and Pack.
- Stable remote-executable-code `BC3001` failure and bounded artifact-local repair.
- Install, upgrade, rollback and uninstall rehearsal.
- Entry-by-entry exclusion of `.env`, `.git`, `.buildcade`, `node_modules` and injected secret sentinels.
- Direct public CLI use when the Skill is not installed.
- Public bundle scan requiring the production API origin and rejecting fixed local API origins on ports 3000 and 3100.

## Not included

Review, Approve, Publish, Release, Staff authorization, provider mutation, database/Cloudflare/DLQ operations, general game generation, an npm-registry mirror, Runtime SDK or generated API SDK are not part of this release.
