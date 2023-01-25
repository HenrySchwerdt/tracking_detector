const ActiveTabListener = (() => {
  let currentTab = undefined;
  let allTabs = undefined;
  setInterval(
    () =>
      browser.tabs
        .query({ currentWindow: true, lastFocusedWindow: true, active: true })
        .then((tab) => {
          if (tab.length == 0) {
            return;
          }
          currentTab = tab[0];
          browser.storage.local.set({ info: currentTab });
        }),
    200
  );
  setInterval(() => {
    browser.tabs.query({}).then((tabs) => {
      allTabs = tabs;
    });
  }, 200);
  return {
    getCurrentTab() {
      return currentTab;
    },
    getAllTabs() {
      return allTabs;
    },
  };
})();

export { ActiveTabListener };
