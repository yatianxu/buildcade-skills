# Display and Mobile Web Reference

Game Spec v1 intentionally has no free-text resolution, pixel-size, engine, or device-eligibility field. Describe layout with `display.orientation` and optional `display.aspectRatio`:

- omit `aspectRatio` for a genuinely responsive artifact that fills the available viewport;
- use a canonical ratio such as `16:9` for a fixed internal canvas; the trusted Runtime contains it, centers it, and letterboxes unused space;
- never crop or stretch fixed-ratio content to make a screenshot look full-screen;
- treat `orientation` as a preferred layout. Runtime may show a dismissible rotation suggestion but must not force device lock.

An engine's internal render size does not belong in Listing metadata. For RPG Maker MZ, keep its internal canvas ratio, make the exported page/root 100% sized, enable browser stretch independent of user-agent guessing, and handle resize/orientation changes. For Unity WebGL, make the template container/canvas follow the available viewport while preserving the chosen aspect behavior. Generic games should use responsive CSS unless they truly require a fixed canvas.

Declare `input.touch` only after the artifact has real touch controls. A mouse click produced by automation is not touch evidence.

## Local pre-certification checks

After explicit-Profile validation, use Preview at 390×844 and 320×568, then rotate to landscape. Check:

1. no game content is cropped or stretched;
2. safe-area padding does not hide controls;
3. a rotation suggestion is non-blocking and dismissible;
4. every required action works with touch, not only keyboard/mouse;
5. audio starts after a real gesture and can recover after page hide/resume or interruption;
6. fullscreen can be entered and exited, with the game button synchronized to Shell/Escape changes;
7. console and network remain free of unexpected failures.

These checks show that adaptation work is ready for platform evidence. They do not grant `mobile_web`. Buildcade can grant desktop and mobile eligibility separately for an exact artifact/Profile/evidence version. Automated mobile Chromium/WebKit is pre-certification; a formal mobile claim also requires the platform's real Android Chrome and real iOS Safari evidence. When those results are absent, report `desktop-only / mobile evidence pending` rather than calling the whole game incompatible.
