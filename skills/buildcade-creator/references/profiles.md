# Compatibility Profile Reference

Choose one Profile from the artifact that the Creator actually exported. Automatic detection is a suggestion only; it must not silently change the requested Profile or be reported as certification.

## Current Profile IDs

- `generic-static-web-v1@1`: engine-neutral static HTML/JS/CSS/WASM output.
- `rpg-maker-mz-web-v1@1`: a Web Deployment produced locally by an authorized RPG Maker MZ user. Do not point it at the editable project root.
- `unity-web-v1@1`: Unity WebGL output without Threads. Keep loader/data/framework/WASM delivery metadata consistent with the export settings.

Use the same exact Profile on every command:

```powershell
$profile = "rpg-maker-mz-web-v1"
buildcade validate <artifact-root> --profile $profile --json
buildcade preview <artifact-root> --profile $profile --no-open --json
buildcade pack <artifact-root> --profile $profile --json
buildcade upload <artifact-root> --game <game-id> --profile $profile --wait --json
```

The Profile is command/API context, not a `buildcade.json` field. A successful explicit run proves that the artifact satisfies current local admission checks. It does not publish the Profile definition, execute repository-only candidate/finalize certification, submit for Review, or release the game.

For the public v1.1.2 CLI, use the exact `id@1` notation throughout `validate`, `preview`, `pack`, and `upload`, then verify that every JSON response resolves the same ID and version. Do not mix an unversioned or automatically suggested Profile into an explicit-profile run.

For a future engine, stop if no published Profile matches. Do not disguise it as RPG Maker or Unity. A new engine needs a versioned adapter, legal provenance, exact-artifact evidence, and the shared desktop/mobile browser matrix.
