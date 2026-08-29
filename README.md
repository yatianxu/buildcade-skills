# Buildcade Skills

This repository distributes the public Buildcade Creator Skill as an immutable, checksum-verifiable package.

| Field | Value |
| --- | --- |
| Release | `v1.0.2` |
| Package | `skills/buildcade-creator/` |
| Reviewed core commit | `eaf16f8fc19c181ba1cae76c6264638148aa51ca` |
| Game contract | Buildcade Game Spec v1 |
| CLI | Included public Creator CLI, runnable through pinned `npx` |

## Install in Codex

Install the immutable release directly:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.0.2 skill install --agent codex
```

Restart or reopen the agent task, then request:

```text
$buildcade-creator validate this game and prepare a local preview
```

## Install in another agent

Choose that agent's Skill directory explicitly:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.0.2 skill install --target <agent-skill-directory>
```

Convenience presets are available for `codex`, `claude`, `cursor` and `agents`. The explicit target remains the portable path for any directory-based agent.

## Use the public CLI

Run the same pinned release from any Creator project without a global install:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.0.2 validate . --json
npx --yes github:yatianxu/buildcade-skills#v1.0.2 preview . --no-open
npx --yes github:yatianxu/buildcade-skills#v1.0.2 pack . --json
```

Authenticated commands default to `https://api.tokenaimax.com`. Credentials are stored in separate profiles keyed by normalized API origin. Local developer authentication requires an explicit loopback origin: `login --dev --api-url http://localhost:<port>`.

## Business boundary

The V1 Skill helps a Creator identify an artifact root, establish or inspect the Game Spec v1 contract, preserve BC diagnostics, preview locally, create a deterministic package and perform an explicitly requested authenticated Upload.

It cannot Review, Approve, Publish, Release, Unpublish, grant Staff access, mutate DNS/cloud infrastructure or bypass platform authority. Database, Cloudflare, DLQ and Staff operational commands are not included. GitHub is the free public distribution authority for this release; no npm-registry publication is claimed.

## Upgrade, rollback and uninstall

Install a newer immutable tag with `--upgrade`; the installer verifies the release and moves the current Skill to a version-labelled backup before replacement. Rollback restores that backup. Uninstall moves or removes only `buildcade-creator`; it must not remove the parent Skills directory, Creator projects, `.buildcade` metadata, artifacts or CLI credentials.

See `RELEASE_NOTES.md` and `RELEASE-MANIFEST.json` for the reviewed release boundary.
