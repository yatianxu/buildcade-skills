# Buildcade Creator Workflow Reference

Use this reference for the public Skill v1. Pin the immutable public release; if this reference and the executable differ, stop and report the mismatch.

## Invocation

The public Creator CLI requires Node `>=24`. Install the immutable release once, then invoke the installed executable from the selected game directory:

```powershell
npx --yes github:yatianxu/buildcade-skills#v1.1.2 install
buildcade --version
```

The installer works on supported Node platforms. After installation, use `buildcade <command> <arguments>` directly. Do not substitute the moving `main` branch, an unknown fork or an unverified global package.

## Canonical sequence

### 1. Initialize only when needed

Interactive terminals may ask for the Runtime Contract. Non-interactive agents must provide explicit choices, for example:

```powershell
buildcade init <artifact-root> `
  --input keyboard,mouse --orientation any `
  --fullscreen no --network none
```

Do not guess input capabilities or allowed HTTPS origins. Ask the Creator when they are not already declared.

Omit `display.aspectRatio` when the artifact owns responsive layout. For a fixed canvas, add a canonical value such as `"aspectRatio": "16:9"` under `display` in `buildcade.json`; Runtime then contains and letterboxes it. A newer CLI may advertise `--aspect-ratio responsive|W:H` in `buildcade init --help`; use that convenience only when the installed executable actually exposes it. Read [display-mobile.md](display-mobile.md) before changing touch or mobile behavior. Read [runtime-bridge.md](runtime-bridge.md) before adding a game-owned fullscreen button.

### 2. Validate with machine output

```powershell
buildcade validate <artifact-root> --profile <profile-id> --json
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
buildcade preview <artifact-root> --profile <profile-id> --no-open --json
```

The command stays running until interrupted. Capture the returned local URL, exercise only the requested smoke path, and stop it with Ctrl+C or the process-control equivalent. A local preview does not prove cloud Runtime, browser matrix, accessibility, or formal acceptance.

### 4. Pack deterministically

```powershell
buildcade pack <artifact-root> --profile <profile-id> --json
```

The JSON result includes `artifactPath`, `artifactHash`, `sizeBytes`, spec, and warning count. Packaging excludes top-level `.git`, `.buildcade`, `node_modules`, `.env`, and `.env.*`; still inspect the resulting entry list before upload and fail closed on credential-like material.

### 5. Authenticate and upload only on explicit request

```powershell
buildcade login
buildcade whoami --json
buildcade upload <artifact-root> --game <game-id> `
  --profile <profile-id> --wait --json
```

Default `login` creates a Buildcade Device Grant, writes the URL/code/waiting progress to stderr, opens the localized Product confirmation page when possible, and polls only Buildcade. The browser may use any existing Product login method, then returns to the same grant for explicit approval. A browser-open failure is recoverable from the displayed URL and short code. The CLI never receives a provider token or Product Web session; `--json` reserves stdout for one final JSON document. `login --email` and `login --github` remain explicit compatibility paths, not prerequisites.

The public CLI defaults to `https://api.tokenaimax.com` and stores short-lived access/rotating refresh credentials in separate profiles keyed by normalized API origin. `logout` revokes the current origin's server credential family before removing its local profile. Local developer authentication must use an explicit loopback origin, for example `login --dev --api-url http://localhost:<port>`; the CLI does not guess a development port. Legacy single-origin loopback credentials fail closed and require a fresh login.

Do not echo credential files or tokens. Upload validates and packs again, creates an upload session, transfers the body, and returns a Build candidate/status. It does not publish, submit, review, approve, or release the game.

## Failure behavior

- Exit `1`: validation gate failed; fix only the diagnosed project issue and rerun.
- Authentication/authorization failure: stop and ask the user to reauthenticate or obtain the correct project authority. Never borrow Staff or Reviewer credentials.
- Filesystem/package failure: preserve the source tree, report the exact path and operation, and avoid partial artifact claims.
- API/network failure: report the request phase and retry boundary without exposing credentials or copying secrets into evidence.
- Missing Node 24, the installed `buildcade` executable, `npx`, or public release access: report the prerequisite and offer the same pinned installer after it is available.

## Public references

- Platform documentation: `https://game.tokenaimax.com/en/docs/skills`
- Immutable public release: `https://github.com/yatianxu/buildcade-skills/releases/tag/v1.1.2`
- Game Spec overview: `https://game.tokenaimax.com/en/docs/game-spec`
- CLI guide: `https://game.tokenaimax.com/en/docs/cli`
