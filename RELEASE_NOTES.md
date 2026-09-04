# Buildcade Creator Skill v1.1.2

## Included

- Project and static artifact root identification.
- Explicit Game Spec v1 Runtime Contract initialization or inspection.
- Stable `validate --json` diagnostic preservation and bounded repair/revalidation.
- Validated local preview with an explicit stop path.
- Deterministic artifact packing with hash, size, warnings and secret/repository-material exclusion checks.
- Exact versioned Profile selection carried consistently through Validate, Preview, Pack and Upload for Generic Web, Unity WebGL and RPG Maker MZ artifacts.
- Progressive display/mobile adaptation guidance for fixed-aspect containment, safe areas, rotation, touch, audio recovery and Runtime fullscreen request/exit/state handling without claiming device eligibility.
- Provider-neutral Buildcade Device Authorization by default: localized browser confirmation after any Product login method, recoverable URL/short-code fallback, bounded polling, one-hour access and rotating refresh credentials.
- Explicitly requested `login`, `whoami`, Game association and Upload workflow, ending before Submission, Review or Release.
- `games list/create/link/unlink`, `builds list/show --wait` and `logout` resource recovery commands.
- Versioned `.buildcade/project.json` association without credentials and with Artifact exclusion.
- Three-locale human output plus stable single-document JSON output, including device-login completion.
- Creator Center handoff URLs, bounded Build polling and upload-session idempotency retry.
- Codex metadata plus progressive-disclosure workflow reference.
- Checksum-verifying `npx` installer for Codex and explicit directories used by other agents.
- Bundled public Creator CLI for `init`, `validate`, `preview`, `pack`, `login`, `whoami`, `games`, `builds`, `upload` and `logout`.
- Checksum-verified one-time CLI installation through pinned `npx`, followed by the installed `buildcade` executable and global `--version`.
- Canonical production API origin with explicit-over-environment precedence and no bundled fixed local API fallback.
- Explicit loopback `--api-url` requirement for `login --dev`.
- Versioned credentials partitioned by normalized API origin, with legacy loopback credentials rejected until re-login.
- Server-side credential-family revocation on current-origin logout and refresh-token replay.
- Target-origin diagnostics and network failures that exclude request paths, query strings, tokens and raw exception text.

## Verified candidate

- Reviewed core commit: `9cac840b531096b447b39cf7337c4c31ffbcb00a`.
- Vanilla and Phaser Validate, live HTTP Preview and Pack.
- Separate Generic Web, Unity WebGL and RPG Maker MZ deterministic Build uploads plus desktop Runtime input, media and fullscreen enter/exit evidence.
- Stable remote-executable-code `BC3001` failure and bounded artifact-local repair.
- Install, upgrade, rollback and uninstall rehearsal.
- Entry-by-entry exclusion of `.env`, `.git`, `.buildcade`, `node_modules` and injected secret sentinels.
- Installed public CLI use when the Skill is not installed.
- Public bundle scan requiring the production API origin and rejecting fixed local API origins on ports 3000 and 3100.

## Not included

Review, Approve, Publish, Release, Staff authorization, provider mutation, database/Cloudflare/DLQ operations, general game generation, an npm-registry mirror, Runtime SDK or generated API SDK are not part of this release.
