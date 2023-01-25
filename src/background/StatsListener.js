import { ActiveTabListener } from "./ActiveTabListener";
import { Requests } from "./Request";
const StatsListener = (() => {
  const defaultRate = 0.8;
  const defaultActive = true;

  const activeConfig = {
    rate: defaultRate,
    active: defaultActive,
  };
  setInterval(() => {
    browser.storage.local.get("settings").then((data) => {
      if (data == undefined || data == null || data.settings == null) {
        browser.storage.local.set({
          settings: { rate: defaultRate, active: defaultActive },
        });
      } else {
        const shouldReload =
          data.settings.active != activeConfig.active ||
          data.settings.rate != activeConfig.rate;
        activeConfig.active = data.settings.active;
        activeConfig.rate = data.settings.rate;
        if (shouldReload) {
          const tabId = ActiveTabListener.getCurrentTab().id;
          browser.tabs.reload(tabId, { bypassCache: true }).then(() => {
            console.log("Current tab reloaded due to config change");
          });
          Requests.refreshDataForTab(tabId);
        }
      }
    });
  }, 200);
  return {
    isActive() {
      return activeConfig.active;
    },
    getRate() {
      return activeConfig.rate;
    },
  };
})();

export { StatsListener };
