# Buildcade Creator Workflow Reference

Use this reference for the repository-distributed Skill v1. The canonical implementation remains in `apps/cli`; if this reference and the executable differ, stop and report the mismatch.

## Invocation

The CLI is private `@buildcade/cli@0.1.0` and requires Node `>=24`. From the repository root on Windows, invoke it through:

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade <command> <arguments>
```

Use the equivalent repository `pnpm` wrapper on other hosts. Do not substitute an unverified global npm package.

## Canonical sequence

### 1. Initialize only when needed

Interactive terminals may ask for the Runtime Contract. Non-interactive agents must provide explicit choices, for example:

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade init <artifact-root> `
  --input keyboard,mouse --orientation any --fullscreen no --network none
```

Do not guess input capabilities or allowed HTTPS origins. Ask the Creator when they are not already declared.

### 2. Validate with machine output

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade validate <artifact-root> --json
```

Expected output is one JSON document with `schemaVersion`, `command`, `ok`, `result`, and `diagnostics`. Exit `0` means pass or pass-with-warnings; exit `1` means validation failure. Preserve stable diagnostic codes. Representative fixtures include:

- `vanilla-minimal` and `phaser`: valid;
- `remote-script-invalid`: `BC3001`;
- `service-worker-invalid`: `BC3003`;
- `traversal`: `BC2002`;
- `malformed-manifest`: `BC1002`.

Never rewrite a diagnostic into a different code or suppress it.

### 3. Preview after validation

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade preview <artifact-root> --no-open --json
```

The command stays running until interrupted. Capture the returned local URL, exercise only the requested smoke path, and stop it with Ctrl+C or the process-control equivalent. A local preview does not prove cloud Runtime, browser matrix, accessibility, or formal acceptance.

### 4. Pack deterministically

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade pack <artifact-root> --json
```

The JSON result includes `artifactPath`, `artifactHash`, `sizeBytes`, spec, and warning count. Packaging excludes top-level `.git`, `.buildcade`, `node_modules`, `.env`, and `.env.*`; still inspect the resulting entry list before upload and fail closed on credential-like material.

### 5. Authenticate and upload only on explicit request

```powershell
.\pnpm.ps1 --filter @buildcade/cli buildcade login
.\pnpm.ps1 --filter @buildcade/cli buildcade whoami --json
.\pnpm.ps1 --filter @buildcade/cli buildcade upload <artifact-root> --game <game-id> --wait --json
```

Do not echo credential files or tokens. Upload validates and packs again, creates an upload session, transfers the body, and returns a Build candidate/status. It does not publish, submit, review, approve, or release the game.

## Failure behavior

- Exit `1`: validation gate failed; fix only the diagnosed project issue and rerun.
- Authentication/authorization failure: stop and ask the user to reauthenticate or obtain the correct project authority. Never borrow Staff or Reviewer credentials.
- Filesystem/package failure: preserve the source tree, report the exact path and operation, and avoid partial artifact claims.
- API/network failure: report the request phase and retry boundary without exposing credentials or copying secrets into evidence.
- Missing repository CLI, Node 24, or workspace dependencies: report the prerequisite and offer the direct manual command after it is installed.

## Repository sources

- CLI command summary: `apps/cli/src/commands/README.md`
- Executable command contracts: `apps/cli/src/commands/`
- Game Spec: `docs/specifications/prd/Buildcade Game Spec V1 + Manifest Technical Specification.md`
- CLI/Validator specification: `docs/specifications/prd/Buildcade CLI + Validator Implementation Specification.md`
- Fixtures: `packages/test-fixtures/fixtures/`
