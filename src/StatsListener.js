const StatsListener = (() => {
    const defaultRate = 0.8;
    const defaultActive = true;

    const activeConfig = {
        rate: defaultRate,
        active: defaultActive
    }
    setInterval(() => {
        chrome.storage.local.get(["settings"], (data) => {
            if (data == undefined || data == null || data.settings == null) {
                chrome.storage.local.set({settings: {rate: defaultRate, active: defaultActive} })
            } else {
                activeConfig.active = data.settings.active;
                activeConfig.rate = data.settings.rate;
            }
        });
      }, 200);
    return {
        isActive() {
            return activeConfig.active;
        },
        getRate() {
            return activeConfig.rate;
        }
    }
})()

export {
    StatsListener
}