const Requests = (() => {
    let requests = [];
  
    const removeOldTabIds = (id) => {
      requests = requests.filter( x=> x.tabId == id);
    }

    setInterval(() => {
      const currentTab = ActiveTabListener.getCurrentTab();
      removeOldTabIds(currentTab.id);
      chrome.storage.local.set({requests});
    }, 200)

    console.log("RequestMap Setup");
    return {
      add: (request) => {
        const currentTab = ActiveTabListener.getCurrentTab();

        if (request.tabId != currentTab.id) {
          return
        }
        removeOldTabIds(currentTab.id);
        requests.push(request);
        chrome.storage.local.set({requests})
      },
    };
  })();
