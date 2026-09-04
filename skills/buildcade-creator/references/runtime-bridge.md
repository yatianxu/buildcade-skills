# Runtime Bridge Reference

`permissions.fullscreen: true` allows the isolated game to ask the trusted Buildcade Shell to enter or leave fullscreen. Directly calling `document.documentElement.requestFullscreen()` inside the iframe is not the platform contract.

Send a request from a real user gesture:

```js
window.parent.postMessage(
  { type: "bridge.fullscreen.request", version: "core.v1" },
  "*",
);
```

Exit through the same Host authority:

```js
window.parent.postMessage(
  { type: "bridge.fullscreen.exit", version: "core.v1" },
  "*",
);
```

Keep the game control synchronized when the Shell button or Escape changes state:

```js
window.addEventListener("message", (event) => {
  if (event.source !== window.parent) return;
  if (event.data?.type !== "bridge.fullscreen.state") return;
  if (event.data?.version !== "core.v1") return;
  updateFullscreenControl(event.data.active === true);
});
```

The game uses `"*"` only because an artifact does not know the trusted Shell origin in advance. The Host still validates the exact iframe source and origin before acting or replying. Do not accept unrelated parent messages as trusted application data.

When fullscreen is undeclared, remove or disable the game-owned fullscreen control and do not claim the bridge will succeed. Creator Preview may expose its own trusted outer-Shell button; that does not grant the game capability. Verify enter, Shell-button exit, Escape exit, game-requested exit, and `bridge.fullscreen.state` in Preview.
