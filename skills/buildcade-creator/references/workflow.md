# Buildcade Creator Workflow Reference

Use this reference for the public Skill v1. Pin the immutable public release; if this reference and the executable differ, stop and report the mismatch.

## Invocation

The public Creator CLI requires Node `>=24`. Invoke the immutable release from the selected game directory:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.0 <command> <arguments>
```

The same command works on supported Node platforms. Do not substitute the moving `main` branch, an unknown fork or an unverified global package.

## Canonical sequence

### 1. Initialize only when needed

Interactive terminals may ask for the Runtime Contract. Non-interactive agents must provide explicit choices, for example:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.0 init <artifact-root> `
  --input keyboard,mouse --orientation any --fullscreen no --network none
```

Do not guess input capabilities or allowed HTTPS origins. Ask the Creator when they are not already declared.

### 2. Validate with machine output

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.0 validate <artifact-root> --json
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
npx --yes github:yatianxu/buildcade-skills#v1.1.0 preview <artifact-root> --no-open --json
```

The command stays running until interrupted. Capture the returned local URL, exercise only the requested smoke path, and stop it with Ctrl+C or the process-control equivalent. A local preview does not prove cloud Runtime, browser matrix, accessibility, or formal acceptance.

### 4. Pack deterministically

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.0 pack <artifact-root> --json
```

The JSON result includes `artifactPath`, `artifactHash`, `sizeBytes`, spec, and warning count. Packaging excludes top-level `.git`, `.buildcade`, `node_modules`, `.env`, and `.env.*`; still inspect the resulting entry list before upload and fail closed on credential-like material.

### 5. Authenticate and upload only on explicit request

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.0 login
npx --yes github:yatianxu/buildcade-skills#v1.1.0 whoami --json
npx --yes github:yatianxu/buildcade-skills#v1.1.0 games list --json
npx --yes github:yatianxu/buildcade-skills#v1.1.0 games link <artifact-root> --game <game-id-or-name>
npx --yes github:yatianxu/buildcade-skills#v1.1.0 upload <artifact-root> --wait --json
npx --yes github:yatianxu/buildcade-skills#v1.1.0 builds show <build-id-or-number> --wait --json
```

The public CLI defaults to `https://api.tokenaimax.com` and stores credentials in separate profiles keyed by normalized API origin. Local developer authentication must use an explicit loopback origin, for example `login --dev --api-url http://localhost:<port>`; the CLI does not guess a development port. Legacy single-origin loopback credentials fail closed and require a fresh login.

Do not echo credential files or tokens. Upload validates and packs again, creates an upload session, transfers the body, and returns a Build candidate/status. It does not publish, submit, review, approve, or release the game.

## Failure behavior

- Exit `1`: validation gate failed; fix only the diagnosed project issue and rerun.
- Authentication/authorization failure: stop and ask the user to reauthenticate or obtain the correct project authority. Never borrow Staff or Reviewer credentials.
- Filesystem/package failure: preserve the source tree, report the exact path and operation, and avoid partial artifact claims.
- API/network failure: report the request phase and retry boundary without exposing credentials or copying secrets into evidence.
- Missing Node 24, `npx`, or public release access: report the prerequisite and offer the same pinned command after it is available.

## Public references

- Platform documentation: `https://game.tokenaimax.com/en/docs/skills`
- Immutable public release: `https://github.com/yatianxu/buildcade-skills/releases/tag/v1.1.0`
- Game Spec overview: `https://game.tokenaimax.com/en/docs/game-spec`
- CLI guide: `https://game.tokenaimax.com/en/docs/cli`
