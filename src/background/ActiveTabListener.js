const ActiveTabListener = (() => {
    let currentTab = undefined;
    let allTabs = undefined;
    setInterval(() =>  chrome.tabs.query({currentWindow:true, lastFocusedWindow: true, active: true }, (tab) => {
        if(tab.length == 0) {
            return
        }
        currentTab = tab[0]
        chrome.storage.local.set({info: currentTab})
    }), 200)
    setInterval(() => {
        chrome.tabs.query({}, (tabs) => {
            allTabs = tabs;
        })
    }, 200)
    return {
        getCurrentTab() {
            return currentTab;
        },
        getAllTabs() {
            return allTabs;
        }
    }
})();

export {
    ActiveTabListener
}