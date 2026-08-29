# Buildcade Skills

This repository distributes the public Buildcade Creator Skill as an immutable, checksum-verifiable package.

| Field | Value |
| --- | --- |
| Release | `v1.0.0` |
| Package | `skills/buildcade-creator/` |
| Reviewed core commit | `4ddbb428ecc9060c9e060ad74652e88bc6753cd6` |
| Game contract | Buildcade Game Spec v1 |
| CLI compatibility | private workspace `@buildcade/cli` `0.1.x` |

## Install

Pin the immutable release tag rather than installing from a moving branch:

```powershell
git clone --branch v1.0.0 --depth 1 https://github.com/yatianxu/buildcade-skills.git
Set-Location buildcade-skills
```

Verify every released file before installation:

```powershell
Get-Content SHA256SUMS | ForEach-Object {
  $hash, $path = $_ -split '  ', 2
  if ((Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash.ToLowerInvariant() -ne $hash) {
    throw "Checksum mismatch: $path"
  }
}
```

Copy only the Skill directory to the agent's supported Skill location. For Codex on Windows:

```powershell
$skillHome = if ($env:CODEX_HOME) {
  Join-Path $env:CODEX_HOME 'skills'
} else {
  Join-Path $env:USERPROFILE '.codex\skills'
}
Copy-Item -LiteralPath '.\skills\buildcade-creator' `
  -Destination (Join-Path $skillHome 'buildcade-creator') -Recurse
```

Restart or reopen the agent task, then request:

```text
$buildcade-creator validate this game and prepare a local preview
```

## Business boundary

The V1 Skill helps a Creator identify an artifact root, establish or inspect the Game Spec v1 contract, preserve BC diagnostics, preview locally, create a deterministic package and perform an explicitly requested authenticated Upload.

It cannot Review, Approve, Publish, Release, Unpublish, grant Staff access, mutate DNS/cloud infrastructure or bypass platform authority. The CLI remains a private package in the checked-out Buildcade core workspace; this release does not claim npm availability.

## Upgrade, rollback and uninstall

Install a newer immutable tag into a new directory, verify its checksum and move the prior installed directory to an exact backup before replacement. Rollback restores that backup. Uninstall moves or removes only `buildcade-creator`; it must not remove the parent Skills directory, Creator projects, `.buildcade` metadata, artifacts or CLI credentials.

See `RELEASE_NOTES.md` and `RELEASE-MANIFEST.json` for the reviewed release boundary.
