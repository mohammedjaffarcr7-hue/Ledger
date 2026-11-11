// Registers the offline cache so Daftar opens like an installed app,
// and checks for a new version every time the app is opened or brought back.
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js", {updateViaCache: "none"}).then(reg => {
      const check = () => reg.update().catch(() => {});
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
      check();
    }).catch(() => {});
    // when a new version takes over, reload once so the new screens show
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (!reloaded) { reloaded = true; location.reload(); } });
  });
}
